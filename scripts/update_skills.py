import requests
import json
import os
import time
from datetime import datetime
import base64
import yaml
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
DRY_RUN = os.getenv('DRY_RUN', 'True').lower() == 'true'
# 调试模式：设置数字 (e.g. 5) 只抓前几个作者目录；设置 None 抓全量
DEBUG_LIMIT = 5

OFFICIAL_REPO = "openclaw/skills"
OFFICIAL_PATH = "skills"
COMMUNITY_QUERIES = ["topic:openclaw-skill"]
MAX_DESC_LENGTH = 5000

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
CURRENT_FILE = os.path.join(DATA_DIR, "skills.json")
NEW_FILE = os.path.join(DATA_DIR, "skills_new.json")
BACKUP_DIR = os.path.join(DATA_DIR, "backups")

if not os.path.exists(BACKUP_DIR): os.makedirs(BACKUP_DIR)

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def fetch_file_content(url):
    try:
        r = requests.get(url, headers=headers, timeout=10)
        if r.status_code == 200:
            return base64.b64decode(r.json()['content']).decode('utf-8')
    except: pass
    return None

def parse_skill_md(content):
    if not content: return {}, ""
    if content.startswith('---'):
        try:
            parts = content.split('---', 2)
            if len(parts) >= 3:
                return yaml.safe_load(parts[1]), parts[2].strip()
        except: pass
    return {}, content

def truncate_text(text, length=MAX_DESC_LENGTH):
    if not text: return ""
    if len(text) <= length: return text
    return text[:length].rsplit(' ', 1)[0] + "\n\n...(Truncated)"

def process_official_recursive():
    print(f"\n--- Phase 1: Deep Scanning Official Repo ({OFFICIAL_REPO}) ---")
    skills_list = []
    
    # 1. 获取顶层目录 (Level 1: /skills)
    api_url = f"https://api.github.com/repos/{OFFICIAL_REPO}/contents/{OFFICIAL_PATH}"
    resp = requests.get(api_url, headers=headers)
    if resp.status_code != 200: return []
    
    # 这里拿到的是作者列表 (e.g., 0xbreadguy, 0xadamsu)
    authors = [i for i in resp.json() if i['type'] == 'dir']
    
    if DEBUG_LIMIT: 
        print(f"⚠️ Debug: Limiting scan to first {DEBUG_LIMIT} authors.")
        authors = authors[:DEBUG_LIMIT]

    repo_meta = requests.get(f"https://api.github.com/repos/{OFFICIAL_REPO}", headers=headers).json()
    base_stars = repo_meta.get('stargazers_count', 0)

    for idx, author_folder in enumerate(authors, 1):
        author_name = author_folder['name']
        print(f"\r[{idx}/{len(authors)}] 📂 Scanning Author: {author_name}...", end="", flush=True)
        
        # 2. 获取作者目录下的子文件夹 (Level 2: /skills/author/skill_name)
        author_url = author_folder['url']
        try:
            sub_resp = requests.get(author_url, headers=headers)
            if sub_resp.status_code != 200: continue
            
            # 这里拿到的才是真正的 Skills 目录
            skill_folders = [i for i in sub_resp.json() if i['type'] == 'dir']
            
            for skill_folder in skill_folders:
                skill_dir_name = skill_folder['name']
                skill_path = skill_folder['path'] # e.g. skills/0xbreadguy/megaeth-ai-developer-skills
                
                # 3. 在这个目录下找 SKILL.md
                skill_md_url = f"https://api.github.com/repos/{OFFICIAL_REPO}/contents/{skill_path}/SKILL.md"
                readme_url = f"https://api.github.com/repos/{OFFICIAL_REPO}/contents/{skill_path}/README.md"
                
                raw_content = fetch_file_content(skill_md_url)
                if not raw_content:
                    raw_content = fetch_file_content(readme_url)
                
                # 如果连 README 都没有，可能不是个 Skill，跳过
                if not raw_content: continue

                metadata, body = parse_skill_md(raw_content)
                
                # 构造数据
                # 优先用 metadata 里的 name，没有则用文件夹名
                display_name = metadata.get('name', skill_dir_name.replace('-', ' ').title())
                description = metadata.get('description', f"Official skill by {author_name}")
                
                skills_list.append({
                    "id": f"official-{author_name}-{skill_dir_name}", # ID包含作者名防止冲突
                    "name": display_name,
                    "shortDesc": description,
                    "longDesc": truncate_text(body or raw_content),
                    "author": author_name, # 这里用子目录名作为具体作者
                    "authorUrl": f"https://github.com/{author_name}", # 尝试猜测作者主页，或者指向 openclaw
                    "category": "Official",
                    "downloads": base_stars,
                    "stars": base_stars,
                    "lastUpdated": datetime.now().strftime('%Y-%m-%d'),
                    "version": metadata.get('version', '1.0.0'),
                    "license": "MIT",
                    "command": f"clawhub install {OFFICIAL_REPO}/{skill_path}",
                    "downloadUrl": skill_folder['html_url'],
                    "safetyRating": "Verified",
                    "tags": ["official"] + metadata.get('tags', [])
                })
                # 稍微延时防止速率限制
                time.sleep(0.05)
                
        except Exception as e:
            print(f" Error: {e}")
            pass

    return skills_list

def process_community():
    # 社区部分逻辑保持不变 (略)，因为它本来就是单层结构，不需要改
    print(f"\n\n--- Phase 2: Scanning Community ---")
    unique_repos = {}
    for q in COMMUNITY_QUERIES:
        params = {"q": q, "sort": "stars", "order": "desc"}
        try:
            r = requests.get("https://api.github.com/search/repositories", headers=headers, params=params)
            if r.status_code == 200:
                for item in r.json().get('items', []):
                    if item['full_name'] != OFFICIAL_REPO: unique_repos[item['id']] = item
        except: pass

    all_items = list(unique_repos.values())
    skills_list = []
    
    for idx, item in enumerate(all_items, 1):
        try:
            repo_name = item['name']
            owner = item['owner']['login']
            branch = item.get('default_branch', 'main')
            print(f"\r[{idx}/{len(all_items)}] 🌍 Community: {repo_name}...", end="", flush=True)
            
            # 尝试获取 SKILL.md
            skill_md_url = f"https://api.github.com/repos/{owner}/{repo_name}/contents/SKILL.md"
            readme_url = f"https://api.github.com/repos/{owner}/{repo_name}/contents/README.md"
            
            raw_content = fetch_file_content(skill_md_url) or fetch_file_content(readme_url)
            metadata, body = parse_skill_md(raw_content)
            
            skills_list.append({
                "id": repo_name.lower(),
                "name": metadata.get('name', repo_name.replace('-', ' ').title()),
                "shortDesc": metadata.get('description', item['description'] or f"Community skill"),
                "longDesc": truncate_text(body or raw_content),
                "author": owner,
                "authorUrl": item['owner']['html_url'],
                "category": "Community",
                "downloads": item.get('forks_count', 0),
                "stars": item.get('stargazers_count', 0),
                "lastUpdated": item['updated_at'].split('T')[0],
                "version": metadata.get('version', 'latest'),
                "license": item['license']['spdx_id'] or "None",
                "command": f"clawhub install {item['html_url']}",
                "downloadUrl": f"https://github.com/{owner}/{repo_name}/archive/refs/heads/{branch}.zip",
                "safetyRating": "Community",
                "tags": metadata.get('tags', item.get('topics', []))
            })
        except: pass
        
    return skills_list

def main():
    print(f"--- 🚀 Deep Skill Hunt (Dry Run: {DRY_RUN}) ---")
    if not GITHUB_TOKEN: return print("❌ Error: GITHUB_TOKEN missing.")

    # 这里调用新的递归函数
    skills = process_official_recursive() + process_community()
    skills.sort(key=lambda x: x['stars'], reverse=True)
    
    if not skills: return print("\n❌ No skills found.")

    print(f"\n\n💾 Saving {len(skills)} skills to: {os.path.basename(NEW_FILE)}")
    with open(NEW_FILE, 'w', encoding='utf-8') as f:
        json.dump(skills, f, indent=2, ensure_ascii=False)

    if not DRY_RUN:
        print("\n🔄 Updating LIVE files...")
        if os.path.exists(CURRENT_FILE):
            bk = f"skills_bk_{datetime.now().strftime('%H%M%S')}.json"
            os.rename(CURRENT_FILE, os.path.join(BACKUP_DIR, bk))
        os.replace(NEW_FILE, CURRENT_FILE)
        print("   ✅ DONE!")
    else:
        print("\n⚠️ DRY RUN: Live file NOT updated.")

if __name__ == "__main__":
    main()