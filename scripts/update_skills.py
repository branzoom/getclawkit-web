#!/usr/bin/env python3
"""
OpenClaw Skills Scraper v2.0

Fetches skills from GitHub repos and generates SEO content via LLM.

Key improvements over v1:
- Uses Git Trees API to discover all skills in 2 API calls per repo (was 4000+)
- Downloads file content from raw.githubusercontent.com (no rate limit cost)
- Rate-limit aware on every response header with auto-sleep
- Caches repo info (stars fetched once per repo, not per skill)
- Improved LLM prompts for natural, human-sounding descriptions
- Concurrent LLM calls with configurable parallelism
- Progress saving for resumability on interrupted runs
- Proper error handling for 403/rate-limit responses
"""

import requests
import json
import os
import sys
import time
import re
import yaml
from datetime import datetime
from collections import defaultdict
from dotenv import load_dotenv
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
from concurrent.futures import ThreadPoolExecutor, as_completed

load_dotenv()

# --- Configuration ---
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
LLM_API_KEY = os.getenv('LLM_API_KEY')
LLM_API_URL = os.getenv('LLM_API_URL', 'https://api.deepseek.com/chat/completions')
LLM_MODEL = os.getenv('LLM_MODEL', 'deepseek-chat')
LLM_CONCURRENCY = int(os.getenv('LLM_CONCURRENCY', '5'))
DRY_RUN = os.getenv('DRY_RUN', 'false').lower() == 'true'
# Set to a number to limit skills for testing, 0 = no limit
DEBUG_LIMIT = int(os.getenv('DEBUG_LIMIT', '0')) or None
# Max chars for longDesc in output JSON (0 = no limit)
LONG_DESC_MAX = int(os.getenv('LONG_DESC_MAX', '3000'))
# --- DB Sync (direct write to database via API) ---
SYNC_API_URL = os.getenv('SYNC_API_URL', '')  # e.g. https://getclawkit.com/api/skills/sync
SYNC_API_KEY = os.getenv('SYNC_API_KEY', '')

# --- Paths ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
SEEDS_FILE = os.path.join(DATA_DIR, "seeds.json")
SKILLS_FILE = os.path.join(DATA_DIR, "skills.json")
PROGRESS_FILE = os.path.join(DATA_DIR, ".scraper_progress.json")
BACKUP_DIR = os.path.join(DATA_DIR, "backups")

os.makedirs(BACKUP_DIR, exist_ok=True)

# Documentation file priority (prefer skill.md over readme.md)
DOC_FILE_PRIORITY = ['skill.md', 'readme.md']


# ============================================================
# GitHub Client with rate-limit tracking
# ============================================================
class GitHubClient:
    """GitHub API client with automatic rate-limit handling."""

    def __init__(self, token):
        self.session = requests.Session()
        retry = Retry(
            total=5, connect=3, read=3, backoff_factor=1,
            status_forcelist=[502, 503, 504]
        )
        self.session.mount('https://', HTTPAdapter(max_retries=retry))
        if token:
            self.session.headers['Authorization'] = f'token {token}'
        self.session.headers['Accept'] = 'application/vnd.github.v3+json'
        self.session.headers['User-Agent'] = 'ClawKit-Scraper/2.0'
        self.api_calls = 0
        self._rate_remaining = 5000
        self._rate_reset = 0
        self._repo_info_cache = {}

    def _update_rate(self, resp):
        """Track rate limit from response headers."""
        rem = resp.headers.get('X-RateLimit-Remaining')
        reset = resp.headers.get('X-RateLimit-Reset')
        if rem is not None:
            self._rate_remaining = int(rem)
        if reset is not None:
            self._rate_reset = int(reset)

    def _wait_if_needed(self):
        """Sleep if rate limit is getting dangerously low."""
        if self._rate_remaining < 50:
            wait = max(0, self._rate_reset - time.time()) + 5
            if wait > 0 and wait < 3700:  # Don't sleep more than ~1 hour
                print(f"   ⏳ Rate limit: {self._rate_remaining} left. Sleeping {int(wait)}s...")
                time.sleep(wait)

    def api_get(self, url, **kwargs):
        """GET request with rate-limit tracking and auto-retry on 403."""
        self._wait_if_needed()
        self.api_calls += 1
        kwargs.setdefault('timeout', 30)

        resp = self.session.get(url, **kwargs)
        self._update_rate(resp)

        # Handle rate-limit 403: sleep and retry once
        if resp.status_code == 403 and self._rate_remaining < 10:
            wait = max(0, self._rate_reset - time.time()) + 10
            if wait > 0 and wait < 3700:
                print(f"   🚫 Rate limited! Sleeping {int(wait)}s then retrying...")
                time.sleep(wait)
                self.api_calls += 1
                resp = self.session.get(url, **kwargs)
                self._update_rate(resp)

        return resp

    def get_repo_tree(self, repo):
        """
        Fetch the full recursive tree for a repo using the Git Trees API.
        Returns (tree_items, branch_name) or ([], branch_name) on failure.
        This uses only 2 API calls regardless of repo size.
        """
        branch = None
        # 1. Find default branch
        for b in ['main', 'master']:
            r = self.api_get(f"https://api.github.com/repos/{repo}/git/ref/heads/{b}")
            if r.status_code == 200:
                branch = b
                break
        if not branch:
            print(f"   ❌ Cannot find default branch for {repo}")
            return [], 'main'

        commit_sha = r.json()['object']['sha']

        # 2. Get recursive tree (handles up to 100,000 entries)
        r = self.api_get(f"https://api.github.com/repos/{repo}/git/trees/{commit_sha}?recursive=1")
        if r.status_code != 200:
            print(f"   ❌ Cannot get tree for {repo}: {r.status_code}")
            return [], branch

        data = r.json()
        items = data.get('tree', [])
        truncated = data.get('truncated', False)

        if truncated:
            print(f"   ⚠️  Tree truncated at {len(items)} entries. Some skills may be missing.")
        else:
            print(f"   📦 Tree loaded: {len(items)} entries")

        return items, branch

    def get_raw_file(self, repo, branch, path):
        """
        Download file content from raw.githubusercontent.com.
        This does NOT count against the GitHub API rate limit.
        """
        url = f"https://raw.githubusercontent.com/{repo}/{branch}/{path}"
        try:
            r = self.session.get(url, timeout=30)
            if r.status_code == 200:
                return r.text
        except Exception as e:
            print(f"      ❌ Download failed ({path}): {e}")
        return None

    def get_repo_info(self, repo):
        """Get repo metadata, cached per session (1 API call per unique repo)."""
        if repo in self._repo_info_cache:
            return self._repo_info_cache[repo]

        r = self.api_get(f"https://api.github.com/repos/{repo}")
        info = r.json() if r.status_code == 200 else {}
        self._repo_info_cache[repo] = info
        return info

    def print_rate_status(self):
        """Print current rate limit status."""
        r = self.api_get("https://api.github.com/rate_limit")
        if r.status_code == 200:
            core = r.json()['resources']['core']
            reset_str = datetime.fromtimestamp(core['reset']).strftime('%H:%M:%S')
            icon = "✅" if core['remaining'] > 1000 else ("⚠️" if core['remaining'] > 100 else "❌")
            print(f"{icon} GitHub API: {core['remaining']}/{core['limit']} requests left (resets at {reset_str})")
            self._rate_remaining = core['remaining']
            self._rate_reset = core['reset']
            return core['remaining']
        return 0


# ============================================================
# Utility Functions
# ============================================================
def parse_frontmatter(content):
    """Extract YAML frontmatter and markdown body from content."""
    if not content:
        return {}, ""
    if content.startswith('---'):
        try:
            parts = content.split('---', 2)
            if len(parts) >= 3:
                meta = yaml.safe_load(parts[1]) or {}
                return meta, parts[2].strip()
        except Exception:
            pass
    return {}, content


def _safe_str(val, fallback=""):
    """Ensure a value is a plain string. Handles objects, lists, numbers from YAML."""
    if val is None:
        return fallback
    if isinstance(val, str):
        return val
    if isinstance(val, (int, float)):
        return str(val)
    if isinstance(val, list):
        # Try to join list items as strings
        parts = [str(v) for v in val if isinstance(v, (str, int, float))]
        return ', '.join(parts) if parts else fallback
    if isinstance(val, dict):
        # Some YAML fields are objects like {TODO: "..."}
        return fallback
    return str(val)


def _normalize_tags(raw_tags):
    """Ensure tags is always a list of strings, handling comma-separated strings."""
    if not raw_tags:
        return []
    if isinstance(raw_tags, list):
        # Flatten: each item could still be comma-separated
        result = []
        for t in raw_tags:
            if isinstance(t, str):
                result.extend(s.strip().lower() for s in t.split(',') if s.strip())
            else:
                result.append(str(t).lower().strip())
        return result
    if isinstance(raw_tags, str):
        return [s.strip().lower() for s in raw_tags.split(',') if s.strip()]
    return []


def truncate_text(text, max_len):
    """Truncate text to max_len characters, ending at a sentence or paragraph boundary."""
    if not text or max_len <= 0 or len(text) <= max_len:
        return text

    truncated = text[:max_len]

    # Try to end at a paragraph boundary
    last_para = truncated.rfind('\n\n')
    if last_para > max_len * 0.6:
        return truncated[:last_para].rstrip()

    # Try to end at a sentence boundary
    for sep in ['. ', '.\n', '!\n', '?\n']:
        last_sentence = truncated.rfind(sep)
        if last_sentence > max_len * 0.6:
            return truncated[:last_sentence + 1].rstrip()

    return truncated.rstrip() + '...'


def discover_skills_from_tree(tree_items, seed):
    """
    Parse the Git tree to discover all skills and their doc files.
    Returns a list of dicts: {author, skill_name, doc_path, doc_sha}
    """
    path_prefix = seed['path']
    seed_type = seed['type']

    # Map: (author, skill_name) -> {filename_lower: {path, sha}}
    skill_files = defaultdict(dict)

    for item in tree_items:
        path = item['path']

        # Only blobs (files) under the seed path
        if item['type'] != 'blob' or not path.startswith(path_prefix + '/'):
            continue

        rel = path[len(path_prefix) + 1:]
        parts = rel.split('/')

        if seed_type == 'recursive_author':
            # Expected: {author}/{skill_name}/{filename}
            if len(parts) != 3:
                continue
            author, skill_name, filename = parts
        elif seed_type == 'flat':
            # Expected: {skill_name}/{filename}
            if len(parts) != 2:
                continue
            skill_name, filename = parts
            author = seed['repo'].split('/')[0]
        else:
            continue

        fname_lower = filename.lower()
        if fname_lower in DOC_FILE_PRIORITY:
            skill_files[(author, skill_name)][fname_lower] = {
                'path': path,
                'sha': item['sha'],
            }

    # Resolve: prefer skill.md over readme.md
    results = []
    for (author, skill_name), files in skill_files.items():
        doc_file = None
        for preferred in DOC_FILE_PRIORITY:
            if preferred in files:
                doc_file = files[preferred]
                break
        if doc_file:
            results.append({
                'author': author,
                'skill_name': skill_name,
                'doc_path': doc_file['path'],
                'doc_sha': doc_file['sha'],
            })

    return results


def build_skill_id(author, skill_name, seed):
    """Generate a unique skill ID."""
    if seed['repo'] in ['openclaw/skills', 'openclaw/openclaw']:
        return f"official-{author}-{skill_name}".lower()
    else:
        safe_repo = seed['repo'].replace('/', '-')
        return f"community-{safe_repo}-{skill_name}".lower()


# ============================================================
# LLM Integration
# ============================================================
def generate_seo_with_llm(skill_name, content, author):
    """
    Call LLM to generate natural-sounding descriptions.
    Returns dict with seo_title, seo_description, shortDesc, tags.
    """
    if not LLM_API_KEY:
        return None

    # Truncate input but keep the important parts (top of README)
    content_for_llm = content[:4000]

    prompt = f"""You are writing a brief, honest description of an open-source tool for a developer directory.
Write like a developer recommending a tool to a colleague — direct, specific, no marketing fluff.

Tool name: {skill_name}
Author: {author}

README content:
---
{content_for_llm}
---

Return a JSON object with exactly these fields:

1. "seo_title": A page title for SEO (50-70 chars). Format: "[What it does] with {skill_name} | ClawKit"
   Example: "Sync Hue Lights with Live Sports Scores using game-light-tracker | ClawKit"

2. "seo_description": 1-2 sentences (under 160 chars) for search engine snippet. Specific and actionable.
   Example: "Track live NBA, NFL, NHL, MLB games and auto-change your Hue light colors based on which team leads. Works with Home Assistant."

3. "shortDesc": One sentence (15-30 words) explaining what this actually does. Be concrete, not vague.
   BAD: "A powerful automation tool that leverages AI capabilities"
   GOOD: "Publishes Markdown files to WeChat Official Account drafts with theme support and auto image hosting"

4. "longDesc": 2-3 short paragraphs (100-150 words total). Separate paragraphs with \\n\\n.
   - Paragraph 1: What problem it solves, who would use it
   - Paragraph 2: How it works technically (key details, not fluff)
   - Paragraph 3 (optional): Setup notes, requirements, or gotchas
   Write like you're explaining to a developer friend. Avoid words like "leverage", "streamline",
   "cutting-edge", "empower", "robust", "comprehensive", "seamless".

5. "tags": Array of 3-5 lowercase tags for categorization (e.g. ["wechat", "publishing", "markdown"])"""

    try:
        resp = requests.post(
            LLM_API_URL,
            headers={
                "Authorization": f"Bearer {LLM_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": LLM_MODEL,
                "messages": [
                    {
                        "role": "system",
                        "content": "You write concise, developer-friendly tool descriptions. Always respond with valid JSON only."
                    },
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.5,
                "response_format": {"type": "json_object"}
            },
            timeout=90
        )
        if resp.status_code == 200:
            raw = resp.json()['choices'][0]['message']['content']
            raw = raw.strip()
            if raw.startswith('```'):
                raw = re.sub(r'^```(?:json)?\s*', '', raw)
                raw = re.sub(r'\s*```$', '', raw)
            return json.loads(raw)
        else:
            print(f"      ❌ LLM API error {resp.status_code}: {resp.text[:200]}")
    except json.JSONDecodeError as e:
        print(f"      ❌ LLM JSON parse error: {e}")
    except requests.exceptions.Timeout:
        print(f"      ❌ LLM timeout for {skill_name}")
    except Exception as e:
        print(f"      ❌ LLM error: {e}")

    return None


# ============================================================
# Progress Management
# ============================================================
def save_progress(skills_dict, filename=PROGRESS_FILE):
    """Save intermediate results for resumability."""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump({
            'skills': skills_dict,
            'timestamp': datetime.now().isoformat()
        }, f, ensure_ascii=False)


def load_progress(filename=PROGRESS_FILE):
    """Load progress from a previous interrupted run."""
    if os.path.exists(filename):
        try:
            with open(filename, 'r') as f:
                data = json.load(f)
                age_hours = (datetime.now() - datetime.fromisoformat(data['timestamp'])).total_seconds() / 3600
                if age_hours < 24:  # Only use progress less than 24h old
                    print(f"   📂 Resuming from progress file ({len(data['skills'])} skills, {age_hours:.1f}h old)")
                    return data['skills']
                else:
                    print(f"   📂 Progress file too old ({age_hours:.1f}h), starting fresh")
        except Exception:
            pass
    return {}


# ============================================================
# Main Pipeline
# ============================================================
def main():
    if not GITHUB_TOKEN:
        print("❌ GITHUB_TOKEN is required. Set it in .env or environment.")
        sys.exit(1)

    print("🚀 OpenClaw Skills Scraper v2.0")
    print(f"   LLM: {LLM_MODEL} ({'configured' if LLM_API_KEY else '⚠️  NOT configured'})")
    print(f"   LLM Concurrency: {LLM_CONCURRENCY}")
    print(f"   Debug Limit: {DEBUG_LIMIT or 'None (full scan)'}")
    print(f"   Long Desc Max: {LONG_DESC_MAX or 'Unlimited'}")
    print(f"   Dry Run: {DRY_RUN}")
    print()

    client = GitHubClient(GITHUB_TOKEN)
    remaining = client.print_rate_status()

    if remaining < 20:
        print("❌ Rate limit too low. Try again later.")
        sys.exit(1)

    # Load seeds
    if not os.path.exists(SEEDS_FILE):
        print(f"❌ Seeds file not found: {SEEDS_FILE}")
        sys.exit(1)
    with open(SEEDS_FILE, 'r') as f:
        seeds = json.load(f)

    # Load existing skills for incremental updates
    existing = {}
    if os.path.exists(SKILLS_FILE):
        with open(SKILLS_FILE, 'r') as f:
            for s in json.load(f):
                existing[s['id']] = s
        # Backup current file
        if not DRY_RUN:
            ts = datetime.now().strftime('%Y%m%d_%H%M%S')
            backup_path = os.path.join(BACKUP_DIR, f"skills_{ts}.json")
            with open(SKILLS_FILE, 'r') as src, open(backup_path, 'w') as dst:
                dst.write(src.read())
            print(f"   📋 Backed up to {os.path.basename(backup_path)}")
    print(f"   📊 Existing skills in file: {len(existing)}")

    # Load progress from interrupted run
    progress = load_progress()
    print()

    # ========================================
    # Phase 1: Discover all skills via Trees API
    # ========================================
    all_discovered = []  # List of (info_dict, seed) tuples

    for seed in seeds:
        print(f"🌱 Seed: {seed['repo']} (type={seed['type']})")

        tree_items, branch = client.get_repo_tree(seed['repo'])
        if not tree_items:
            print(f"   ⚠️  Empty tree, skipping")
            continue

        seed['_branch'] = branch  # Store branch for later use

        discovered = discover_skills_from_tree(tree_items, seed)
        print(f"   🔍 Found {len(discovered)} skills with documentation")

        if DEBUG_LIMIT:
            print(f"   ⚠️  DEBUG: Limiting to {DEBUG_LIMIT} skills")
            discovered = discovered[:DEBUG_LIMIT]

        for info in discovered:
            all_discovered.append((info, seed))

    # Deduplicate by skill_id (later seeds take priority)
    seen_ids = {}
    for info, seed in all_discovered:
        skill_id = build_skill_id(info['author'], info['skill_name'], seed)
        seen_ids[skill_id] = (info, seed)

    all_discovered = list(seen_ids.values())
    total = len(all_discovered)
    print(f"\n📊 Total unique skills to process: {total}")
    print(f"   GitHub API calls used so far: {client.api_calls}")
    print()

    # ========================================
    # Phase 2: Build skill records
    # ========================================
    print("📥 Phase 2: Fetching content & building records...")

    skills_map = {}  # skill_id -> record
    needs_llm = []   # skill_ids that need LLM processing
    cached = 0
    fetched = 0
    skipped = 0

    for idx, (info, seed) in enumerate(all_discovered):
        skill_id = build_skill_id(info['author'], info['skill_name'], seed)

        if (idx + 1) % 200 == 0 or idx == 0:
            print(f"   [{idx + 1}/{total}] Processing... (fetched={fetched}, cached={cached}, rate={client._rate_remaining})")

        # Check 1: Reuse from progress (interrupted run)
        if skill_id in progress:
            skills_map[skill_id] = progress[skill_id]
            cached += 1
            if not progress[skill_id].get('seo_content'):
                needs_llm.append(skill_id)
            continue

        # Check 2: Reuse from existing file (unchanged SHA)
        if skill_id in existing:
            old = existing[skill_id]
            if (old.get('file_sha') == info['doc_sha']
                    and old.get('seo_content')
                    and old.get('downloadUrl')):
                skills_map[skill_id] = old
                cached += 1
                continue

        # Need to fetch content
        branch = seed.get('_branch', 'main')
        content = client.get_raw_file(seed['repo'], branch, info['doc_path'])
        if not content:
            skipped += 1
            continue

        fetched += 1
        meta, body = parse_frontmatter(content)

        # Get repo stars (cached per repo, NOT per skill)
        repo_info = client.get_repo_info(seed['repo'])
        stars = repo_info.get('stargazers_count', 0)

        skill_dir = info['doc_path'].rsplit('/', 1)[0]

        fallback_name = info['skill_name'].replace('-', ' ').title()
        fallback_desc = f"Skill by {info['author']}"

        record = {
            "id": skill_id,
            "name": _safe_str(meta.get('name'), fallback_name) or fallback_name,
            "shortDesc": _safe_str(meta.get('description'), fallback_desc) or fallback_desc,
            "longDesc": truncate_text(body, LONG_DESC_MAX) if LONG_DESC_MAX else body,
            "author": info['author'],
            "authorUrl": f"https://github.com/{info['author']}",
            "stars": stars,
            "lastUpdated": datetime.now().strftime('%Y-%m-%d'),
            "command": f"clawhub install {seed['repo']}/{skill_dir}",
            "tags": _normalize_tags(meta.get('tags', [])),
            "file_sha": info['doc_sha'],
            "seo_content": None,
            "downloadUrl": f"https://github.com/{seed['repo']}/tree/{branch}/{skill_dir}",
            "source_repo": seed['repo'],
            "source_path": skill_dir,
        }

        # Store raw content temporarily for LLM processing
        record['_raw_content'] = content

        skills_map[skill_id] = record
        needs_llm.append(skill_id)

        # Save progress periodically
        if fetched % 500 == 0 and not DRY_RUN:
            save_progress(skills_map)
            print(f"   💾 Progress saved ({len(skills_map)} skills)")

    print(f"\n   ✅ Done: {cached} cached, {fetched} fetched, {skipped} skipped")
    print(f"   🤖 Need LLM: {len(needs_llm)} skills")
    print(f"   GitHub API calls total: {client.api_calls}")

    # ========================================
    # Phase 3: LLM Processing (concurrent)
    # ========================================
    if needs_llm and LLM_API_KEY:
        print(f"\n🤖 Phase 3: Generating descriptions for {len(needs_llm)} skills (workers={LLM_CONCURRENCY})...")

        def process_one_llm(skill_id):
            record = skills_map[skill_id]
            raw = record.get('_raw_content', record.get('longDesc', ''))
            result = generate_seo_with_llm(record['name'], raw, record['author'])
            return skill_id, result

        completed = 0
        failed = 0
        with ThreadPoolExecutor(max_workers=LLM_CONCURRENCY) as executor:
            futures = {executor.submit(process_one_llm, sid): sid for sid in needs_llm}
            for future in as_completed(futures):
                completed += 1
                try:
                    skill_id, seo_data = future.result()
                    if seo_data and skill_id in skills_map:
                        record = skills_map[skill_id]
                        # Store the full LLM response as seo_content
                        record['seo_content'] = {
                            'seo_title': seo_data.get('seo_title', ''),
                            'seo_description': seo_data.get('seo_description', ''),
                        }
                        # Override generic shortDesc with LLM-generated one
                        llm_short = seo_data.get('shortDesc', '')
                        if llm_short and (
                            record['shortDesc'].startswith('Skill by')
                            or len(record['shortDesc']) < 20
                        ):
                            record['shortDesc'] = llm_short
                        # Override longDesc with LLM-generated one if available
                        llm_long = seo_data.get('longDesc', '')
                        if llm_long and len(llm_long) > 50:
                            record['longDesc'] = llm_long
                        # Use LLM tags if none from frontmatter
                        if seo_data.get('tags') and not record['tags']:
                            record['tags'] = seo_data['tags']
                    else:
                        failed += 1
                except Exception as e:
                    failed += 1
                    print(f"   ❌ LLM worker error: {e}")

                if completed % 100 == 0:
                    print(f"   [{completed}/{len(needs_llm)}] LLM processing... ({failed} failed)")
                    # Save progress during LLM phase
                    if not DRY_RUN and completed % 500 == 0:
                        save_progress(skills_map)

        print(f"   ✅ LLM complete: {completed - failed} succeeded, {failed} failed")
    elif needs_llm:
        print(f"\n⚠️  {len(needs_llm)} skills need LLM but LLM_API_KEY is not set. Skipping.")

    # ========================================
    # Phase 4: Clean up and save
    # ========================================
    # Remove temporary fields
    for record in skills_map.values():
        record.pop('_raw_content', None)

    # Convert to sorted list
    final_list = sorted(skills_map.values(), key=lambda x: x.get('stars', 0), reverse=True)

    print(f"\n💾 Phase 4: Saving {len(final_list)} skills...")

    if not DRY_RUN:
        with open(SKILLS_FILE, 'w', encoding='utf-8') as f:
            json.dump(final_list, f, indent=2, ensure_ascii=False)

        # Clean up progress file on successful completion
        if os.path.exists(PROGRESS_FILE):
            os.remove(PROGRESS_FILE)

        print(f"   ✅ Saved to {os.path.basename(SKILLS_FILE)}")
    else:
        print(f"   🔍 DRY RUN: Would save {len(final_list)} skills")

    # ========================================
    # Phase 5: Sync to database via API
    # ========================================
    if SYNC_API_URL and SYNC_API_KEY and not DRY_RUN:
        print(f"\n🔄 Phase 5: Syncing {len(final_list)} skills to database...")
        sync_batch_size = 200
        sync_ok = 0
        sync_err = 0

        for i in range(0, len(final_list), sync_batch_size):
            batch = final_list[i:i + sync_batch_size]
            try:
                resp = requests.post(
                    SYNC_API_URL,
                    headers={
                        "Authorization": f"Bearer {SYNC_API_KEY}",
                        "Content-Type": "application/json",
                    },
                    json={"skills": batch},
                    timeout=120,
                )
                if resp.status_code == 200:
                    result = resp.json()
                    sync_ok += result.get('created', 0) + result.get('updated', 0)
                    print(f"   [{i + len(batch)}/{len(final_list)}] +{result.get('created', 0)} new, ~{result.get('updated', 0)} updated")
                else:
                    sync_err += len(batch)
                    print(f"   ❌ Batch {i}-{i + len(batch)} failed: {resp.status_code} {resp.text[:200]}")
            except Exception as e:
                sync_err += len(batch)
                print(f"   ❌ Batch {i}-{i + len(batch)} error: {e}")

        print(f"   ✅ DB sync: {sync_ok} synced, {sync_err} failed")
    elif not SYNC_API_URL:
        print(f"\n   ℹ️  SYNC_API_URL not set, skipping DB sync (file-only mode)")

    # Final report
    print(f"\n{'=' * 50}")
    print(f"📊 Final Report")
    print(f"{'=' * 50}")
    print(f"   Total skills:          {len(final_list)}")
    print(f"   With SEO content:      {sum(1 for s in final_list if s.get('seo_content'))}")
    print(f"   With tags:             {sum(1 for s in final_list if s.get('tags'))}")
    print(f"   GitHub API calls:      {client.api_calls}")
    print(f"   Rate limit remaining:  {client._rate_remaining}")

    # Tag distribution
    tag_counts = defaultdict(int)
    for s in final_list:
        for t in s.get('tags', []):
            tag_counts[t] += 1
    if tag_counts:
        top_tags = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)[:10]
        print(f"   Top tags: {', '.join(f'{t}({c})' for t, c in top_tags)}")

    print(f"\n✅ Done!")


if __name__ == '__main__':
    main()
