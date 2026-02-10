import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Terminal } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Fix JSON Parse Errors in OpenClaw | ClawKit',
    description: 'Complete guide to fixing JSON parse errors in OpenClaw configs. Learn about trailing commas, escape characters, and use our Config Wizard to prevent errors.',
    keywords: ['openclaw json error', 'json parse error openclaw', 'fix json syntax openclaw', 'clawhub.json error'],
};

export default function JsonParseErrorsPage() {
    return (
        <>
            <h1>Fix JSON Parse Errors in OpenClaw</h1>

            <div className="not-prose bg-green-500/10 border border-green-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Prevent JSON Errors Forever</h3>
                        <p className="text-foreground/80 mb-4">
                            Our <Link href="/tools/config" className="text-green-400 hover:text-green-300">Config Wizard</Link> validates syntax in real-time and auto-fixes common mistakes.
                        </p>
                        <Link
                            href="/tools/config"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 transition-colors"
                        >
                            Generate Error-Free Config
                        </Link>
                    </div>
                </div>
            </div>

            <h2>Common Error Messages</h2>
            <p>You might see one of these:</p>
            <ul>
                <li><code>SyntaxError: Unexpected token</code></li>
                <li><code>JSON.parse: unexpected character</code></li>
                <li><code>Unexpected end of JSON input</code></li>
                <li><code>Unexpected token , in JSON at position X</code></li>
            </ul>

            <h2>Top 5 Causes</h2>

            <h3>1. Trailing Commas</h3>
            <p>
                <strong>Most common mistake.</strong> JSON doesn't allow commas after the last item.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-bold text-foreground">❌ Wrong</span>
                    </div>
                    <pre className="text-sm text-foreground/80 overflow-x-auto"><code>{`{
  "llm": {
    "provider": "openai",
    "model": "gpt-4o",  ← Extra comma!
  }
}`}</code></pre>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-bold text-foreground">✅ Correct</span>
                    </div>
                    <pre className="text-sm text-foreground/80 overflow-x-auto"><code>{`{
  "llm": {
    "provider": "openai",
    "model": "gpt-4o"
  }
}`}</code></pre>
                </div>
            </div>

            <h3>2. Unescaped Backslashes (Windows Paths)</h3>
            <p>
                Windows paths need <strong>double backslashes</strong>.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-bold text-foreground">❌ Wrong</span>
                    </div>
                    <pre className="text-sm text-foreground/80"><code>{`"path": "C:\\Users\\name"`}</code></pre>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-bold text-foreground">✅ Correct</span>
                    </div>
                    <pre className="text-sm text-foreground/80"><code>{`"path": "C:\\\\Users\\\\name"`}</code></pre>
                </div>
            </div>

            <h3>3. Missing Quotes</h3>
            <p>
                All keys and string values must be in double quotes.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-bold text-foreground">❌ Wrong</span>
                    </div>
                    <pre className="text-sm text-foreground/80"><code>{`{
  provider: 'openai'
}`}</code></pre>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-bold text-foreground">✅ Correct</span>
                    </div>
                    <pre className="text-sm text-foreground/80"><code>{`{
  "provider": "openai"
}`}</code></pre>
                </div>
            </div>

            <h3>4. Comments (Not Allowed)</h3>
            <p>
                Standard JSON doesn't support comments.
            </p>

            <div className="not-prose bg-red-500/10 border border-red-500/20 rounded-lg p-4 my-4">
                <pre className="text-sm text-foreground/80"><code>{`{
  "model": "gpt-4o"  // This is my preferred model ← ERROR!
}`}</code></pre>
            </div>

            <h3>5. Missing Closing Brackets</h3>
            <p>
                Every <code>{'{'}</code> needs a matching <code>{'}'}</code>.
            </p>

            <h2>How to Fix</h2>

            <h3>Option 1: Use Config Wizard (Recommended)</h3>
            <div className="not-prose bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 my-4">
                <p className="text-foreground/80 mb-4">
                    Paste your broken config into our <Link href="/tools/config" className="text-blue-400 hover:text-blue-300">Config Wizard</Link>. It will:
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Auto-remove trailing commas</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Escape Windows paths automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Show exact error location</span>
                    </li>
                </ul>
            </div>

            <h3>Option 2: Use a JSON Validator</h3>
            <p>
                Copy your config to <a href="https://jsonlint.com/" target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-300">JSONLint.com</a> to find the exact error.
            </p>

            <h3>Option 3: Manual Debugging</h3>
            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Terminal</span>
                </div>
                <pre className="text-sm text-foreground/80"><code>node -e "JSON.parse(require('fs').readFileSync('clawhub.json'))"</code></pre>
            </div>
            <p className="text-sm text-muted-foreground">
                This will show the exact line number of the error.
            </p>

            <h2>Prevention Tips</h2>
            <div className="not-prose space-y-3 my-6">
                {[
                    { title: 'Always use Config Wizard', desc: 'Generates valid JSON every time' },
                    { title: 'Use a JSON-aware editor', desc: 'VS Code highlights syntax errors' },
                    { title: 'Validate before deploying', desc: 'Run npx clawkit-doctor@latest' },
                    { title: 'Keep a backup', desc: 'Save working configs before editing' },
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

            <h2>Still Getting Errors?</h2>
            <p>
                Run our <Link href="/tools/doctor" className="text-blue-400 hover:text-blue-300">Local Doctor</Link> for automated diagnosis:
            </p>

            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <pre className="text-sm text-foreground/80"><code>npx clawkit-doctor@latest</code></pre>
            </div>

            <hr className="my-8 border-border" />

            <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> February 6, 2026 |
                <strong> Time to Fix:</strong> 30 seconds (with Config Wizard) or 5 minutes (manual)
            </p>
        </>
    );
}
