# ClawKit 爬虫系统维护备忘录 (v2.0)

> **最后更新时间:** 2026-02-05
> **核心架构:** Python 增量爬虫 + Next.js pSEO 静态生成 + ETag/SHA 双重缓存

## 1. 快速操作指令

### 🟢 日常更新 (手动触发)
如果你想立即抓取最新的 Skills 并更新网站：

```bash
# 1. 进入虚拟环境 (如果未激活)
source .venv/bin/activate  # macOS/Linux
# 或
.venv\Scripts\activate     # Windows

# 2. 运行爬虫脚本
python scripts/update_skills.py

# 3. 检查输出 (确保看到 "✅ Done")
# 4. 提交到 Git (触发 Vercel 自动部署)
git add data/skills.json data/github_cache.json
git commit -m "chore: update skills data"
git push origin main

如何填写：
{
    "id": "official-core",
    "type": "recursive_author", 
    "repo": "openclaw/skills",
    "path": "skills",
    "description": "The official OpenClaw skill registry"
  },
  {
    "id": "official-core-v2",
    "type": "recursive_author",
    "repo": "openclaw/openclaw/tree/main/skills",
    "path": "skills",
    "description": "The official OpenClaw skill registry v2"
  }

recursive_author: 适用于官方那种 repo/skills/作者名/技能名 的结构。
flat: 适用于 repo/技能名 甚至 repo/ 直接就是技能的结构。