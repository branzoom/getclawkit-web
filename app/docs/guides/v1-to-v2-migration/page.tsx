import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'OpenClaw v1 to v2 Migration Guide | ClawKit',
    description: 'Complete guide to migrate from OpenClaw v1 to v2. Learn about breaking changes, config format updates, and use our automated migration tools.',
    keywords: ['openclaw v2 migration', 'openclaw v1 to v2', 'openclaw upgrade', 'openclaw breaking changes'],
};

export default function MigrationPage() {
    return (
        <>
            <h1>OpenClaw v1 to v2 Migration Guide</h1>

            <div className="not-prose bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Breaking Changes Ahead</h3>
                        <p className="text-foreground/80 mb-4">
                            OpenClaw v2 introduces significant changes. Use our <Link href="/tools/config" className="text-yellow-400 hover:text-yellow-300">Config Wizard</Link> to generate v2-compatible configs automatically.
                        </p>
                    </div>
                </div>
            </div>

            <h2>What Changed in v2?</h2>

            <div className="not-prose space-y-4 my-6">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                        <span className="text-xl">1️⃣</span> Config Format: YAML → JSON
                    </h3>
                    <p className="text-sm text-muted-foreground">v1 used YAML, v2 requires strict JSON. No more indentation errors!</p>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                        <span className="text-xl">2️⃣</span> Plugin System Overhaul
                    </h3>
                    <p className="text-sm text-muted-foreground">New skill registry. Old plugins need updates. Browse <Link href="/skills" className="text-red-400 hover:text-red-300">v2-compatible plugins</Link>.</p>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                        <span className="text-xl">3️⃣</span> Docker Strongly Recommended
                    </h3>
                    <p className="text-sm text-muted-foreground">v2 has stricter dependency requirements. See our <Link href="/docs/getting-started/docker-setup" className="text-red-400 hover:text-red-300">Docker setup guide</Link>.</p>
                </div>
            </div>

            <h2>Migration Steps</h2>

            <h3>Step 1: Backup Your v1 Config</h3>
            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <pre className="text-sm text-foreground/80"><code>cp config.yaml config.yaml.backup</code></pre>
            </div>

            <h3>Step 2: Convert YAML to JSON</h3>
            <p>
                <strong>Option A (Recommended):</strong> Use our <Link href="/tools/config" className="text-blue-400 hover:text-blue-300">Config Wizard</Link>
            </p>
            <ul>
                <li>Paste your v1 YAML config</li>
                <li>Click "Convert to v2"</li>
                <li>Download the generated <code>clawhub.json</code></li>
            </ul>

            <p>
                <strong>Option B (Manual):</strong> Rewrite from scratch
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-foreground">❌ v1 (YAML)</span>
                    </div>
                    <pre className="text-sm text-foreground/80 overflow-x-auto"><code>{`llm:
  provider: openai
  api_key: sk-...
  model: gpt-4`}</code></pre>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-foreground">✅ v2 (JSON)</span>
                    </div>
                    <pre className="text-sm text-foreground/80 overflow-x-auto"><code>{`{
  "llm": {
    "provider": "openai",
    "apiKey": "sk-...",
    "model": "gpt-4o"
  }
}`}</code></pre>
                </div>
            </div>

            <h3>Step 3: Update Plugin References</h3>
            <p>
                Browse our <Link href="/skills" className="text-blue-400 hover:text-blue-300">Skill Registry</Link> to find v2-compatible versions of your plugins.
            </p>

            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <pre className="text-sm text-foreground/80 overflow-x-auto"><code>{`{
  "skills": [
    "browser-use",      // v2 compatible
    "memory-core",      // v2 compatible
    "crypto-tracker"    // v2 compatible
  ]
}`}</code></pre>
            </div>

            <h3>Step 4: Test Your Config</h3>
            <p>
                Run our <Link href="/tools/doctor" className="text-blue-400 hover:text-blue-300">Local Doctor</Link> to validate:
            </p>

            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <pre className="text-sm text-foreground/80"><code>npx clawkit-doctor@latest</code></pre>
            </div>

            <h2>Common Migration Issues</h2>

            <div className="not-prose space-y-3 my-6">
                <details className="p-4 bg-card border border-border rounded-lg">
                    <summary className="text-foreground font-semibold cursor-pointer">JSON Parse Error</summary>
                    <p className="text-sm text-muted-foreground mt-2">
                        Likely cause: Trailing commas or unescaped backslashes. Use our <Link href="/tools/config" className="text-blue-400 hover:text-blue-300">Config Wizard</Link> to auto-fix.
                    </p>
                </details>

                <details className="p-4 bg-card border border-border rounded-lg">
                    <summary className="text-foreground font-semibold cursor-pointer">Plugin Not Found</summary>
                    <p className="text-sm text-muted-foreground mt-2">
                        Your v1 plugin may not have a v2 version yet. Check our <Link href="/skills" className="text-blue-400 hover:text-blue-300">Skill Registry</Link> for alternatives.
                    </p>
                </details>

                <details className="p-4 bg-card border border-border rounded-lg">
                    <summary className="text-foreground font-semibold cursor-pointer">Connection Refused</summary>
                    <p className="text-sm text-muted-foreground mt-2">
                        v2 prefers <code>127.0.0.1</code> over <code>localhost</code>. See our <Link href="/docs/troubleshooting/connection-errors" className="text-blue-400 hover:text-blue-300">troubleshooting guide</Link>.
                    </p>
                </details>
            </div>

            <h2>Rollback Plan</h2>
            <p>
                If migration fails, revert to v1:
            </p>

            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <pre className="text-sm text-foreground/80"><code>{`# Restore backup
cp config.yaml.backup config.yaml

# Downgrade to v1
npm install -g openclaw@1.x`}</code></pre>
            </div>

            <h2>Why Migrate?</h2>
            <div className="not-prose space-y-3 my-6">
                {[
                    { title: 'Better Performance', desc: 'v2 is 30% faster with optimized LLM calls' },
                    { title: 'Improved Security', desc: 'Sandboxed plugin execution' },
                    { title: 'Active Development', desc: 'v1 is in maintenance mode only' },
                    { title: 'New Features', desc: 'Multi-agent orchestration, streaming responses' },
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-foreground font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Need Help?</h2>
            <div className="not-prose grid md:grid-cols-3 gap-4 my-8">
                <Link href="/tools/config" className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors">
                    <h3 className="text-foreground font-semibold mb-2">Config Wizard</h3>
                    <p className="text-sm text-muted-foreground">Auto-convert v1 to v2</p>
                </Link>
                <Link href="/tools/doctor" className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors">
                    <h3 className="text-foreground font-semibold mb-2">Local Doctor</h3>
                    <p className="text-sm text-muted-foreground">Validate your config</p>
                </Link>
                <Link href="/skills" className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition-colors">
                    <h3 className="text-foreground font-semibold mb-2">Skill Registry</h3>
                    <p className="text-sm text-muted-foreground">Find v2 plugins</p>
                </Link>
            </div>

            <hr className="my-8 border-border" />

            <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> February 6, 2026 |
                <strong> Migration Time:</strong> 15-30 minutes
            </p>
        </>
    );
}
