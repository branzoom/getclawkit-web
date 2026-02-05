import requests
import json
import os
import time
import base64
import yaml
from datetime import datetime
from dotenv import load_dotenv
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# 加载环境变量
load_dotenv()

# --- 配置 ---
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
LLM_API_KEY = os.getenv('LLM_API_KEY')
LLM_API_URL = os.getenv('LLM_API_URL', 'https://api.deepseek.com/chat/completions')
LLM_MODEL = os.getenv('LLM_MODEL', 'deepseek-chat')
DRY_RUN = os.getenv('DRY_RUN', 'False').lower() == 'true'

# ⚠️ 调试模式：设置数字 (如 5) 只抓前 5 个，设为 None 则抓全量
DEBUG_LIMIT = 5 
# DEBUG_LIMIT = None 

# 路径配置
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
SEEDS_FILE = os.path.join(DATA_DIR, "seeds.json")
SKILLS_FILE = os.path.join(DATA_DIR, "skills.json")
CACHE_FILE = os.path.join(DATA_DIR, "github_cache.json") 
BACKUP_DIR = os.path.join(DATA_DIR, "backups")

if not os.path.exists(BACKUP_DIR): os.makedirs(BACKUP_DIR)

# --- 核心类：GitHub 客户端 (带 ETag 缓存和限流) ---
class GitHubClient:
    def __init__(self, token):
        self.session = requests.Session()
        retry = Retry(connect=3, read=3, redirect=3, backoff_factor=0.5)
        self.session.mount('https://', HTTPAdapter(max_retries=retry))
        self.session.headers.update({
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json"
        })
        self.cache = self._load_cache()
        self.api_calls = 0

    def _load_cache(self):
        if os.path.exists(CACHE_FILE):
            try:
                with open(CACHE_FILE, 'r') as f: return json.load(f)
            except: pass
        return {}

    def save_cache(self):
        if not DRY_RUN:
            with open(CACHE_FILE, 'w') as f:
                json.dump(self.cache, f, indent=2)

    def check_rate_limit(self):
        """检查剩余配额"""
        try:
            resp = self.session.get("https://api.github.com/rate_limit")
            if resp.status_code == 200:
                core = resp.json()['resources']['core']
                remaining = core['remaining']
                reset_time = core['reset']
                reset_str = datetime.fromtimestamp(reset_time).strftime('%H:%M:%S')
                
                icon = "✅" if remaining > 500 else "⚠️"
                print(f"{icon} Rate Limit: {remaining}/{core['limit']} (Resets at {reset_str})")
                
                if remaining < 100:
                    wait_seconds = reset_time - time.time() + 10
                    if wait_seconds > 0:
                        print(f"⏳ Rate limit low! Sleeping for {int(wait_seconds)}s...")
                        time.sleep(wait_seconds)
        except Exception as e:
            print(f"⚠️  Failed to check rate limit: {e}")

    def get_contents(self, repo, path):
        """获取目录内容，使用 ETag 缓存"""
        url = f"https://api.github.com/repos/{repo}/contents/{path}"
        headers = {}
        
        if url in self.cache:
            headers['If-None-Match'] = self.cache[url]['etag']

        try:
            r = self.session.get(url, headers=headers, timeout=20)
            self.api_calls += 1
            
            if r.status_code == 304:
                # print(f"   ⚡ 304 Not Modified: {repo}/{path}")
                return self.cache[url]['data'], False
            
            if r.status_code == 200:
                data = r.json()
                etag = r.headers.get('ETag')
                if etag:
                    self.cache[url] = {'etag': etag, 'data': data}
                return data, True
                
        except Exception as e:
            print(f"   ❌ Network Error ({url}): {e}")
        
        return [], True 

    def get_file_content_sha(self, download_url, sha_in_dir_list):
        """下载文件内容"""
        try:
            r = self.session.get(download_url, timeout=20)
            if r.status_code == 200:
                return r.text, sha_in_dir_list
        except Exception as e:
            print(f"   ❌ Failed to download file: {e}")
        return None, None

# --- 辅助函数 ---
def parse_frontmatter(content):
    if not content: return {}, ""
    if content.startswith('---'):
        try:
            parts = content.split('---', 2)
            if len(parts) >= 3:
                return yaml.safe_load(parts[1]), parts[2].strip()
        except: pass
    return {}, content

def generate_seo_with_llm(skill_name, readme_content):
    if not LLM_API_KEY: return None
    # print(f"      🤖 Calling DeepSeek for {skill_name}...")
    
    prompt = f"""
    Analyze this OpenClaw skill (Name: {skill_name}) README:
    {readme_content[:3000]}
    
    Output strictly JSON with 2 fields:
    1. "seo_title": Catchy title (e.g., "How to use [Name]...").
    2. "seo_description": 150-word summary highlighting benefits.
    """
    
    try:
        resp = requests.post(
            LLM_API_URL,
            headers={"Authorization": f"Bearer {LLM_API_KEY}", "Content-Type": "application/json"},
            json={
                "model": LLM_MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7,
                "response_format": {"type": "json_object"}
            },
            timeout=60
        )
        if resp.status_code == 200:
            res_content = resp.json()['choices'][0]['message']['content']
            return json.loads(res_content.replace('```json', '').replace('```', ''))
    except Exception as e:
        print(f"      ❌ LLM Error: {e}")
    return None

# --- 主逻辑 ---
def main():
    if not GITHUB_TOKEN: return print("❌ Error: GITHUB_TOKEN missing.")
    
    client = GitHubClient(GITHUB_TOKEN)
    client.check_rate_limit()

    if not os.path.exists(SEEDS_FILE):
        return print(f"❌ Seeds file not found: {SEEDS_FILE}")
    with open(SEEDS_FILE, 'r') as f: seeds = json.load(f)

    existing_skills = {}
    if os.path.exists(SKILLS_FILE):
        with open(SKILLS_FILE, 'r') as f:
            for s in json.load(f): existing_skills[s['id']] = s

    new_skills_list = []
    
    for seed in seeds:
        print(f"\n🌱 Processing Seed: {seed['repo']} ({seed['type']})")
        
        items, root_modified = client.get_contents(seed['repo'], seed['path'])
        
        potential_skills = []
        if seed['type'] == 'recursive_author':
            # 过滤只保留文件夹
            author_dirs = [i for i in items if i['type'] == 'dir']
            
            # ✅ 恢复功能：Debug Limit (作者层级)
            if DEBUG_LIMIT:
                print(f"   ⚠️ DEBUG MODE: Limiting to first {DEBUG_LIMIT} authors")
                author_dirs = author_dirs[:DEBUG_LIMIT]

            # ✅ 恢复功能：进度条打印
            total_authors = len(author_dirs)
            for idx, author_item in enumerate(author_dirs, 1):
                author_name = author_item['name']
                print(f"   [{idx}/{total_authors}] 📂 Scanning Author: {author_name}")
                
                skill_items, author_modified = client.get_contents(seed['repo'], author_item['path'])
                
                for sk in skill_items:
                    if sk['type'] == 'dir':
                        potential_skills.append({
                            "item": sk, 
                            "author": author_name,
                            "parent_modified": root_modified or author_modified
                        })
                        
        elif seed['type'] == 'flat':
            skill_dirs = [i for i in items if i['type'] == 'dir']
            
            # ✅ 恢复功能：Debug Limit (技能层级)
            if DEBUG_LIMIT:
                print(f"   ⚠️ DEBUG MODE: Limiting to first {DEBUG_LIMIT} skills")
                skill_dirs = skill_dirs[:DEBUG_LIMIT]

            total_skills = len(skill_dirs)
            for idx, sk in enumerate(skill_dirs, 1):
                print(f"   [{idx}/{total_skills}] 📂 Scanning Skill: {sk['name']}")
                potential_skills.append({
                    "item": sk, 
                    "author": seed['repo'].split('/')[0],
                    "parent_modified": root_modified
                })

        # 处理具体的 Skill
        for p_skill in potential_skills:
            item = p_skill['item']
            skill_name = item['name']
            author_name = p_skill['author']
            
            if seed['repo'] == 'openclaw/skills':
                skill_id = f"official-{author_name}-{skill_name}".lower()
            else:
                safe_repo = seed['repo'].replace('/', '-')
                skill_id = f"community-{safe_repo}-{skill_name}".lower()

            # 获取 Skill 文件夹内部列表
            skill_files, skill_dir_modified = client.get_contents(seed['repo'], item['path'])
            target_file = next((f for f in skill_files if f['name'].lower() in ['skill.md', 'readme.md']), None)
            
            if not target_file: continue

            current_sha = target_file['sha']
            
            skill_record = None
            # 增量检查
            if skill_id in existing_skills:
                old = existing_skills[skill_id]
                # 必须 SHA 相同 且 已有 SEO 内容 且 关键字段不缺
                if old.get('file_sha') == current_sha and old.get('seo_content') and old.get('downloadUrl'):
                    skill_record = old
                    # print(f"      ✅ Cached: {skill_name}")
                else:
                    print(f"      🔄 Updating: {skill_name} (Content Changed)")

            if not skill_record:
                print(f"      ⚡ Fetching & Analyzing {skill_name}...")
                raw_content, _ = client.get_file_content_sha(target_file['download_url'], current_sha)
                if not raw_content: continue
                
                seo_data = generate_seo_with_llm(skill_name, raw_content)
                meta, body = parse_frontmatter(raw_content)
                
                try:
                    # 简单获取 repo stars (注意：这里如果请求太频繁也可以加缓存，目前先直接请求)
                    # 优化：如果是 flat 模式，repo info 其实只用请求一次
                    repo_info = client.session.get(f"https://api.github.com/repos/{seed['repo']}").json()
                    stars = repo_info.get('stargazers_count', 0)
                except: stars = 0

                skill_record = {
                    "id": skill_id,
                    "name": meta.get('name', skill_name.replace('-', ' ').title()),
                    "shortDesc": meta.get('description', f"Skill by {author_name}"),
                    "longDesc": body,
                    "author": author_name,
                    "stars": stars,
                    "downloads": stars,
                    "lastUpdated": datetime.now().strftime('%Y-%m-%d'),
                    "command": f"clawhub install {seed['repo']}/{item['path']}",
                    "tags": meta.get('tags', []),
                    "file_sha": current_sha,
                    "seo_content": seo_data,
                    "downloadUrl": item['html_url'],
                    "authorUrl": f"https://github.com/{author_name}",
                    "source_repo": seed['repo'],
                    "source_path": item['path']
                }
            
            new_skills_list.append(skill_record)

    client.save_cache()
    
    new_skills_list.sort(key=lambda x: x['stars'], reverse=True)
    
    print(f"\n💾 Saving {len(new_skills_list)} skills to {os.path.basename(SKILLS_FILE)}...")
    with open(SKILLS_FILE, 'w', encoding='utf-8') as f:
        json.dump(new_skills_list, f, indent=2, ensure_ascii=False)
        
    print("✅ Done.")

if __name__ == "__main__":
    main()