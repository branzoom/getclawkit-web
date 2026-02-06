import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Zap, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Your First OpenClaw Config File | ClawKit',
    description: 'Learn how to create your first OpenClaw configuration file with best practices. Generate error-free configs in 30 seconds with our Config Wizard.',
    keywords: ['openclaw config', 'openclaw config example', 'clawhub.json', 'openclaw configuration'],
};

export default function FirstConfigPage() {
    return (
        <>
            <h1>Your First OpenClaw Config File</h1>

            <div className="not-prose bg-green-500/10 border border-green-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Skip the Learning Curve</h3>
                        <p className="text-zinc-300 mb-4">
                            Our <Link href="/tools/config" className="text-green-400 hover:text-green-300">Config Wizard</Link> generates production-ready configs in 30 seconds. No YAML knowledge required.
                        </p>
                        <Link
                            href="/tools/config"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 transition-colors"
                        >
                            Generate Config Now
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            <h2>What is clawhub.json?</h2>
            <p>
                The <code>clawhub.json</code> file is your agent's brain. It tells OpenClaw:
            </p>
            <ul>
                <li>Which LLM to use (OpenAI, DeepSeek, Claude)</li>
                <li>Your API credentials</li>
                <li>Agent behavior and capabilities</li>
                <li>Plugin configurations</li>
            </ul>

            <h2>Minimal Example</h2>
            <p>
                Here's the simplest possible config:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`{
  "llm": {
    "provider": "openai",
    "apiKey": "sk-...",
    "model": "gpt-4o"
  }
}`}</code></pre>
            </div>

            <h2>Recommended Config (Production-Ready)</h2>
            <p>
                For real-world use, add these fields:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`{
  "llm": {
    "provider": "openai",
    "apiKey": "sk-...",
    "model": "gpt-4o",
    "temperature": 0.7,
    "maxTokens": 4000
  },
  "agent": {
    "name": "MyAssistant",
    "host": "127.0.0.1",
    "port": 3000,
    "logLevel": "info"
  },
  "skills": [
    "browser-use",
    "memory-core"
  ]
}`}</code></pre>
            </div>

            <h2>Using DeepSeek (10x Cheaper)</h2>
            <p>
                DeepSeek V3 offers GPT-4-level performance at 1/10th the cost:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`{
  "llm": {
    "provider": "deepseek",
    "apiKey": "sk-...",
    "model": "deepseek-chat",
    "baseURL": "https://api.deepseek.com/v1"
  }
}`}</code></pre>
            </div>

            <p>
                💡 <strong>Pro Tip:</strong> Use our <Link href="/tools/cost" className="text-blue-400 hover:text-blue-300">Cost Estimator</Link> to compare pricing before committing.
            </p>

            <h2>Common Mistakes to Avoid</h2>

            <div className="not-prose space-y-4 my-6">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">❌ Trailing Commas</h3>
                    <p className="text-sm text-zinc-400">JSON doesn't support trailing commas. Our <Link href="/tools/config" className="text-red-400 hover:text-red-300">Config Wizard</Link> handles this automatically.</p>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">❌ Windows Path Escaping</h3>
                    <p className="text-sm text-zinc-400">Use <code>C:\\\\Users</code> not <code>C:\\Users</code>. The wizard auto-fixes this.</p>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">❌ Hardcoded API Keys</h3>
                    <p className="text-sm text-zinc-400">Never commit API keys to Git. Use environment variables instead.</p>
                </div>
            </div>

            <h2>Best Practices</h2>
            <div className="not-prose space-y-3 my-6">
                {[
                    { title: 'Use 127.0.0.1 instead of localhost', desc: 'Avoids IPv6 issues in Node.js v18+' },
                    { title: 'Set maxTokens to prevent runaway costs', desc: 'Recommended: 4000 for most tasks' },
                    { title: 'Enable logging in development', desc: 'Set logLevel to "debug" for troubleshooting' },
                    { title: 'Validate before deploying', desc: 'Use Config Wizard to catch syntax errors' },
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
                <Link href="/docs/getting-started/docker-setup" className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors">
                    <h3 className="text-white font-semibold mb-2">Docker Setup</h3>
                    <p className="text-sm text-zinc-400">Deploy with Docker Compose</p>
                </Link>
                <Link href="/skills" className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition-colors">
                    <h3 className="text-white font-semibold mb-2">Browse Plugins</h3>
                    <p className="text-sm text-zinc-400">Add capabilities to your agent</p>
                </Link>
            </div>

            <hr className="my-8 border-white/10" />

            <p className="text-sm text-zinc-500">
                <strong>Last Updated:</strong> February 6, 2026 |
                <strong> Time to Create:</strong> 30 seconds (with Config Wizard) or 10 minutes (manual)
            </p>
        </>
    );
}
