import requests
import json
import os
import subprocess
from datetime import datetime
import base64

# ================= 配置区 =================
# 1. 你的 GitHub Token (必须有 repo 和 user 权限)
# 建议设为环境变量: export GITHUB_TOKEN="你的token"
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')

# 2. 你的项目在 Server-B 上的绝对路径
REPO_PATH = "/root/openclaw-nexus"  # 修改为你 clone 下来的实际路径
DATA_FILE_PATH = os.path.join(REPO_PATH, "data/skills.json")

# 3. 搜索关键词 (寻找带有这些 topic 的仓库)
SEARCH_QUERY = "topic:openclaw-skill OR topic:openclaw-plugin"
# =========================================

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def fetch_readme(owner, repo):
    """获取仓库的 README 内容"""
    url = f"https://api.github.com/repos/{owner}/{repo}/readme"
    try:
        r = requests.get(url, headers=headers)
        if r.status_code == 200:
            content = base64.b64decode(r.json()['content']).decode('utf-8')
            # 简单的 Markdown 转 HTML 处理 (或者直接存 Markdown 前端渲染)
            # 这里为了简单，我们包装一下
            return f'<div class="markdown-body">{content}</div>'
    except Exception as e:
        print(f"Error fetching readme for {repo}: {e}")
    return "<p>No detailed description available.</p>"

def main():
    print(f"[{datetime.now()}] Starting OpenClaw Skill Hunt...")

    # 1. 搜索 GitHub
    search_url = f"https://api.github.com/search/repositories?q={SEARCH_QUERY}&sort=stars&order=desc"
    resp = requests.get(search_url, headers=headers)
    
    if resp.status_code != 200:
        print(f"Error searching GitHub: {resp.text}")
        return

    items = resp.json().get('items', [])
    print(f"Found {len(items)} repositories.")

    new_skills = []

    # 2. 处理数据
    for item in items:
        try:
            # 基础信息
            repo_name = item['name']
            owner = item['owner']['login']
            desc = item['description'] or "No description provided."
            stars = item['stargazers_count']
            updated_at = item['updated_at'].split('T')[0]
            html_url = item['html_url']
            
            print(f"Processing: {repo_name} by {owner}")

            # 获取详细 README (作为详情页内容)
            long_desc = fetch_readme(owner, repo_name)

            # 构造 Skill 对象 (符合你 data/skills.ts 的接口)
            skill = {
                "id": repo_name.lower(),
                "name": repo_name.replace('-', ' ').title(),
                "shortDesc": desc,
                "longDesc": long_desc,
                "author": owner,
                "authorUrl": item['owner']['html_url'],
                "category": "Community", # 默认分类，你可以根据 topic 细分
                "downloads": 0, # GitHub API 没有下载量，可以用 forks 代替或写 0
                "stars": stars,
                "lastUpdated": updated_at,
                "version": "latest",
                "license": item['license']['spdx_id'] if item['license'] else "Unknown",
                "command": f"clawhub install {html_url}", # 假设的安装命令
                "safetyRating": "Community",
                "tags": item.get('topics', [])
            }
            new_skills.append(skill)
        except Exception as e:
            print(f"Skipping {item['name']} due to error: {e}")

    # 3. 写入文件
    # 先读取旧文件，如果没有变动就不写，避免无意义 commit
    file_changed = True
    if os.path.exists(DATA_FILE_PATH):
        with open(DATA_FILE_PATH, 'r') as f:
            try:
                old_data = json.load(f)
                # 简单对比：如果数量和星数总和没变，可能就没变 (粗略)
                # 严谨做法是 Deep Compare，这里为了省事直接覆盖，依靠 Git 检测差异
            except:
                pass

    with open(DATA_FILE_PATH, 'w') as f:
        json.dump(new_skills, f, indent=2)
    
    print("JSON file updated.")

    # 4. Git 自动化提交
    # 切换到仓库目录
    os.chdir(REPO_PATH)
    
    # 检查是否有变动
    status = subprocess.check_output(["git", "status", "--porcelain"]).decode("utf-8")
    
    if not status:
        print("No changes detected. Skipping commit.")
        return

    print("Changes detected. Committing...")
    try:
        subprocess.run(["git", "config", "user.name", "ClawKit Bot"], check=True)
        subprocess.run(["git", "config", "user.email", "bot@clawkit.com"], check=True)
        subprocess.run(["git", "add", "data/skills.json"], check=True)
        subprocess.run(["git", "commit", "-m", f"chore(skills): auto-update {datetime.now().strftime('%Y-%m-%d')}"], check=True)
        subprocess.run(["git", "push"], check=True)
        print("Successfully pushed to GitHub! Vercel should be deploying now.")
    except subprocess.CalledProcessError as e:
        print(f"Git operation failed: {e}")

if __name__ == "__main__":
    main()