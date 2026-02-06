import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Terminal, Download, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'OpenClaw Installation Guide (2026) | ClawKit',
    description: 'Complete step-by-step guide to install OpenClaw on Windows, macOS, and Linux. Get started in 5 minutes with our automated setup tools.',
    keywords: ['openclaw install', 'openclaw setup', 'openclaw installation guide', 'install openclaw windows', 'openclaw mac install'],
};

export default function InstallationPage() {
    return (
        <>
            <h1>OpenClaw Installation Guide (2026)</h1>

            <div className="not-prose bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Quick Start</h3>
                        <p className="text-zinc-300 mb-4">
                            Skip manual setup! Use our <Link href="/tools/config" className="text-blue-400 hover:text-blue-300">Config Wizard</Link> to generate your config file in 30 seconds, then follow Step 3 below.
                        </p>
                        <Link
                            href="/tools/config"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-black font-medium rounded-lg hover:bg-blue-400 transition-colors"
                        >
                            Open Config Wizard
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            <h2>Prerequisites</h2>
            <ul>
                <li><strong>Node.js v18+</strong> - <a href="https://nodejs.org/" target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-300">Download here</a></li>
                <li><strong>Docker</strong> (recommended) - <a href="https://www.docker.com/get-started" target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-300">Get Docker</a></li>
                <li><strong>API Key</strong> - OpenAI, DeepSeek, or Claude</li>
            </ul>

            <h2>Step 1: Install Node.js</h2>
            <p>
                OpenClaw requires Node.js v18 or higher. Check your version:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Terminal</span>
                </div>
                <pre className="text-sm text-zinc-300"><code>node --version</code></pre>
            </div>

            <p>
                If you see <code>v18.x.x</code> or higher, you're good to go. Otherwise, <a href="https://nodejs.org/" target="_blank" rel="noopener" className="text-blue-400">download the latest LTS version</a>.
            </p>

            <h2>Step 2: Install Docker (Recommended)</h2>
            <p>
                While not strictly required, Docker prevents dependency conflicts and makes deployment easier.
            </p>

            <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
                <a href="https://docs.docker.com/desktop/install/windows-install/" target="_blank" rel="noopener" className="p-4 bg-zinc-900 border border-white/10 rounded-lg hover:border-blue-500/50 transition-colors">
                    <Download className="w-6 h-6 text-blue-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Windows</h3>
                    <p className="text-xs text-zinc-500">Docker Desktop for Windows</p>
                </a>
                <a href="https://docs.docker.com/desktop/install/mac-install/" target="_blank" rel="noopener" className="p-4 bg-zinc-900 border border-white/10 rounded-lg hover:border-blue-500/50 transition-colors">
                    <Download className="w-6 h-6 text-blue-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">macOS</h3>
                    <p className="text-xs text-zinc-500">Docker Desktop for Mac</p>
                </a>
                <a href="https://docs.docker.com/desktop/install/linux-install/" target="_blank" rel="noopener" className="p-4 bg-zinc-900 border border-white/10 rounded-lg hover:border-blue-500/50 transition-colors">
                    <Download className="w-6 h-6 text-blue-400 mb-2" />
                    <h3 className="text-white font-semibold mb-1">Linux</h3>
                    <p className="text-xs text-zinc-500">Docker Engine for Linux</p>
                </a>
            </div>

            <h2>Step 3: Create Configuration File</h2>
            <p>
                This is where most beginners get stuck. We have two options:
            </p>

            <h3>Option A: Use Config Wizard (Recommended)</h3>
            <div className="not-prose bg-green-500/10 border border-green-500/20 rounded-lg p-6 my-4">
                <h4 className="text-lg font-bold text-white mb-3">Why use the wizard?</h4>
                <ul className="space-y-2 text-sm text-zinc-300">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Auto-validates syntax (zero errors)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Fixes Windows path escaping automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Supports DeepSeek, Claude, GPT-4 presets</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Privacy-first (runs in your browser)</span>
                    </li>
                </ul>
                <Link href="/tools/config" className="inline-block mt-4 px-4 py-2 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 transition-colors">
                    Open Config Wizard →
                </Link>
            </div>

            <h3>Option B: Manual Setup</h3>
            <p>
                Create a file named <code>clawhub.json</code> in your project directory:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`{
  "llm": {
    "provider": "openai",
    "apiKey": "YOUR_API_KEY_HERE",
    "model": "gpt-4o"
  },
  "agent": {
    "name": "MyAgent",
    "host": "127.0.0.1",
    "port": 3000
  }
}`}</code></pre>
            </div>

            <div className="not-prose bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 my-4">
                <p className="text-sm text-yellow-300">
                    <strong>⚠️ Windows Users:</strong> Use double backslashes in paths: <code>C:\\\\Users\\\\...</code> not <code>C:\\Users\\...</code>
                </p>
            </div>

            <h2>Step 4: Install OpenClaw</h2>
            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300"><code>npm install -g openclaw</code></pre>
            </div>

            <h2>Step 5: Start Your Agent</h2>
            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300"><code>openclaw start --config clawhub.json</code></pre>
            </div>

            <p>
                You should see:
            </p>
            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-green-400"><code>✓ Agent started on http://127.0.0.1:3000</code></pre>
            </div>

            <h2>Troubleshooting</h2>
            <p>
                If you see errors, run our <Link href="/tools/doctor" className="text-blue-400 hover:text-blue-300">Local Doctor</Link> for instant diagnosis:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300"><code>npx clawkit-doctor@latest</code></pre>
            </div>

            <p>
                Common issues:
            </p>
            <ul>
                <li><Link href="/docs/troubleshooting/connection-errors" className="text-blue-400 hover:text-blue-300">Connection Refused Errors</Link></li>
                <li><Link href="/docs/troubleshooting/json-parse-errors" className="text-blue-400 hover:text-blue-300">JSON Parse Errors</Link></li>
                <li><Link href="/docs/troubleshooting/windows-issues" className="text-blue-400 hover:text-blue-300">Windows-Specific Issues</Link></li>
            </ul>

            <h2>Next Steps</h2>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                <Link href="/docs/getting-started/first-config" className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors">
                    <h3 className="text-white font-semibold mb-2">Your First Config</h3>
                    <p className="text-sm text-zinc-400">Learn config best practices</p>
                </Link>
                <Link href="/docs/getting-started/docker-setup" className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors">
                    <h3 className="text-white font-semibold mb-2">Docker Setup</h3>
                    <p className="text-sm text-zinc-400">Deploy with Docker Compose</p>
                </Link>
            </div>

            <hr className="my-8 border-white/10" />

            <p className="text-sm text-zinc-500">
                <strong>Last Updated:</strong> February 6, 2026 |
                <strong> Setup Time:</strong> 5 minutes (with Config Wizard) or 15 minutes (manual)
            </p>
        </>
    );
}
