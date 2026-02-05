# ClawKit - The Unofficial OpenClaw Setup Companion

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![Python](https://img.shields.io/badge/Python-3.9+-yellow)
![Status](https://img.shields.io/badge/Status-Active-green)

**ClawKit** is an open-source toolkit designed to help developers configure, debug, and extend their **OpenClaw** AI agents. We solve the most common "Day 1" problems: YAML indentation errors, Windows backslash paths, `ECONNREFUSED` connection issues, and finding verified community skills.

> **Note:** This is an unofficial community project and is not affiliated with the OpenClaw core team.

---

## ✨ Features

-   **🛠 Config Wizard**: Generate strict, validated JSON configs (v2.0 compliant). Automatically handles Windows path escaping and API provider presets (OpenAI, DeepSeek, Anthropic).
-   **🚑 Local Doctor**: A diagnostic script that scans your environment for Node.js version conflicts, port usage, and permission issues.
-   **💰 Cost Estimator**: Calculate 24/7 running costs for your agent based on context window and current model pricing.
-   **📦 Skill Registry**: A searchable, pSEO-optimized directory of official and community OpenClaw skills.
-   **🔒 Privacy First**: All config generation happens **Client-Side**. Your API keys are stored in your browser's `localStorage` and never sent to our servers.

---

## 🚀 Getting Started

### Prerequisites

-   **Node.js** 18+
-   **Python** 3.9+ (Only for the Skill Crawler)
-   **Git**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/clawkit.git
    cd clawkit
    ```

2.  **Install Frontend Dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Copy the example file (create one if it doesn't exist) to `.env`:
    ```bash
    cp .env.example .env
    ```
    Fill in the required keys in `.env`:
    ```ini
    # Required for fetching skills from GitHub
    GITHUB_TOKEN=your_github_personal_access_token

    # Required for generating AI summaries for skills (Optional)
    LLM_API_KEY=sk-your-api-key
    LLM_API_URL=https://api.deepseek.com/chat/completions
    LLM_MODEL=deepseek-chat

    # Dry run mode for crawler (True = don't write files)
    DRY_RUN=False
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` with your browser.

---

## 🕷️ Updating the Skill Registry

ClawKit uses a Python-based crawler to fetch skills from GitHub and generate SEO-friendly content using LLMs (DeepSeek/OpenAI).

1.  **Setup Python Environment**
    ```bash
    # Create virtual environment (optional but recommended)
    python -m venv .venv
    source .venv/bin/activate  # Windows: .venv\Scripts\activate

    # Install requirements
    pip install requests python-dotenv pyyaml
    ```

2.  **Configure Seeds**
    Edit `data/seeds.json` to add new GitHub repositories to crawl.
    ```json
    [
        {
            "id": "official-core",
            "type": "recursive_author",
            "repo": "openclaw/skills",
            "path": "skills",
            "description": "Official Registry"
        }
    ]
    ```

3.  **Run the Crawler**
    ```bash
    python scripts/update_skills.py
    ```
    This will update `data/skills.json` and `data/github_cache.json` incrementally.

---

## 🛠️ Tech Stack

*   **Framework**: Next.js 16 (App Router)
*   **Styling**: Tailwind CSS
*   **Components**: Shadcn/UI & Lucide React
*   **Crawler**: Python 3
*   **Database**: Local JSON (Zero-db architecture)

---

## 🤝 Contributing

We welcome contributions! Whether it's adding a new tool, fixing a bug, or submitting your own OpenClaw skill to our registry.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

**To submit a Skill:**
Please verify your skill repo has a `README.md` or `SKILL.md`, then open a PR adding your repo to `data/seeds.json`.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## ⚠️ Disclaimer

ClawKit is a community tool. While we strive for accuracy, please verify all generated configurations before deploying them in production environments. We are not responsible for any costs incurred by AI model usage.