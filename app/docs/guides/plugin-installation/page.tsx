import type { Metadata } from 'next';
import Link from 'next/link';
import { Package, CheckCircle2, Terminal, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'OpenClaw Plugin Installation Guide | ClawKit',
    description: 'Complete guide to installing and configuring OpenClaw plugins (skills). Browse verified plugins and learn best practices.',
    keywords: ['openclaw plugins', 'openclaw skills', 'install openclaw plugin', 'openclaw skill registry'],
};

export default function PluginInstallationPage() {
    return (
        <>
            <h1>OpenClaw Plugin Installation Guide</h1>

            <div className="not-prose bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3">
                    <Package className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Browse Verified Plugins</h3>
                        <p className="text-zinc-300 mb-4">
                            Our <Link href="/skills" className="text-purple-400 hover:text-purple-300">Skill Registry</Link> lists 45+ verified, v2-compatible plugins with installation instructions.
                        </p>
                        <Link
                            href="/skills"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-black font-medium rounded-lg hover:bg-purple-400 transition-colors"
                        >
                            Browse Plugins
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            <h2>What Are Plugins (Skills)?</h2>
            <p>
                Plugins extend your agent's capabilities:
            </p>
            <ul>
                <li><strong>browser-use</strong> - Web browsing and automation</li>
                <li><strong>memory-core</strong> - Long-term memory storage</li>
                <li><strong>crypto-tracker</strong> - Real-time crypto prices</li>
                <li><strong>email-sender</strong> - Send emails via SMTP</li>
            </ul>

            <h2>Installation Methods</h2>

            <h3>Method 1: Using Config Wizard (Recommended)</h3>
            <div className="not-prose bg-green-500/10 border border-green-500/20 rounded-lg p-6 my-4">
                <p className="text-zinc-300 mb-4">
                    Our <Link href="/tools/config" className="text-green-400 hover:text-green-300">Config Wizard</Link> has a plugin selector with descriptions and auto-configuration.
                </p>
                <ol className="space-y-2 text-sm text-zinc-300">
                    <li>1. Open Config Wizard</li>
                    <li>2. Scroll to "Skills" section</li>
                    <li>3. Select plugins from dropdown</li>
                    <li>4. Download generated config</li>
                </ol>
            </div>

            <h3>Method 2: Manual Installation</h3>
            <p>
                Add plugin IDs to your <code>clawhub.json</code>:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`{
  "llm": {
    "provider": "openai",
    "apiKey": "sk-..."
  },
  "skills": [
    "browser-use",
    "memory-core",
    "crypto-tracker"
  ]
}`}</code></pre>
            </div>

            <h2>Popular Plugins</h2>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-blue-400" />
                        <h3 className="text-white font-semibold">browser-use</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                        Control Chrome/Firefox for web automation, scraping, and testing.
                    </p>
                    <Link href="/skills/browser-use" className="text-xs text-blue-400 hover:text-blue-300">
                        View Details →
                    </Link>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-green-400" />
                        <h3 className="text-white font-semibold">memory-core</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                        Persistent memory across conversations. Remembers user preferences and context.
                    </p>
                    <Link href="/skills/memory-core" className="text-xs text-green-400 hover:text-green-300">
                        View Details →
                    </Link>
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-purple-400" />
                        <h3 className="text-white font-semibold">crypto-tracker</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                        Real-time cryptocurrency prices, charts, and market data.
                    </p>
                    <Link href="/skills/crypto-tracker" className="text-xs text-purple-400 hover:text-purple-300">
                        View Details →
                    </Link>
                </div>

                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-orange-400" />
                        <h3 className="text-white font-semibold">email-sender</h3>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                        Send emails via SMTP. Supports Gmail, Outlook, and custom servers.
                    </p>
                    <Link href="/skills/email-sender" className="text-xs text-orange-400 hover:text-orange-300">
                        View Details →
                    </Link>
                </div>
            </div>

            <h2>Plugin Configuration</h2>
            <p>
                Some plugins require additional config. Example for <code>browser-use</code>:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`{
  "skills": ["browser-use"],
  "skillConfig": {
    "browser-use": {
      "browser": "chrome",
      "headless": false,
      "viewport": {
        "width": 1920,
        "height": 1080
      }
    }
  }
}`}</code></pre>
            </div>

            <h2>Verifying Installation</h2>
            <p>
                After adding plugins, restart your agent:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Terminal</span>
                </div>
                <pre className="text-sm text-zinc-300"><code>openclaw start --config clawhub.json</code></pre>
            </div>

            <p>
                You should see:
            </p>
            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-green-400"><code>{`✓ Loaded skill: browser-use
✓ Loaded skill: memory-core
✓ Agent started on http://127.0.0.1:3000`}</code></pre>
            </div>

            <h2>Troubleshooting</h2>

            <h3>Plugin Not Found</h3>
            <p>
                Make sure you're using the exact plugin ID from our <Link href="/skills" className="text-blue-400 hover:text-blue-300">Skill Registry</Link>.
            </p>

            <h3>Version Compatibility</h3>
            <p>
                Only use plugins marked "v2 compatible". v1 plugins won't work with OpenClaw v2.
            </p>

            <h3>Configuration Errors</h3>
            <p>
                Run our <Link href="/tools/doctor" className="text-blue-400 hover:text-blue-300">Local Doctor</Link> to validate:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300"><code>npx clawkit-doctor@latest</code></pre>
            </div>

            <h2>Best Practices</h2>
            <div className="not-prose space-y-3 my-6">
                {[
                    { title: 'Start with essential plugins only', desc: 'Add more as needed to avoid complexity' },
                    { title: 'Check plugin documentation', desc: 'Each plugin may have specific requirements' },
                    { title: 'Test in development first', desc: 'Verify plugins work before deploying' },
                    { title: 'Keep plugins updated', desc: 'Check Skill Registry for updates' },
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-zinc-500">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Next Steps</h2>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                <Link href="/skills" className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors">
                    <h3 className="text-white font-semibold mb-2">Browse All Plugins</h3>
                    <p className="text-sm text-zinc-400">45+ verified plugins</p>
                </Link>
                <Link href="/tools/config" className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors">
                    <h3 className="text-white font-semibold mb-2">Config Wizard</h3>
                    <p className="text-sm text-zinc-400">Auto-configure plugins</p>
                </Link>
            </div>

            <hr className="my-8 border-white/10" />

            <p className="text-sm text-zinc-500">
                <strong>Last Updated:</strong> February 6, 2026 |
                <strong> Available Plugins:</strong> 45+ verified
            </p>
        </>
    );
}
