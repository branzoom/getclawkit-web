import { Terminal, ShieldCheck, AlertCircle, Key, Lock, HelpCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ApiKeyProblemsPage() {
    return (
        <>
            <h1>Fix API Key Problems in OpenClaw</h1>

            <div className="not-prose bg-red-500/10 border border-red-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3 text-red-400">
                    <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold mb-2">Security Warning</h3>
                        <p className="text-foreground/80">
                            Never share your <code className="text-red-300">clawhub.json</code> or API keys in public Discord channels or GitHub issues.
                        </p>
                    </div>
                </div>
            </div>

            <p className="lead">
                API key errors are the #1 reason why OpenClaw agents fail to start. This guide covers how to identify and fix permission, quota, and synchronization issues.
            </p>

            <h2>Top 3 Common Errors</h2>

            <div className="grid md:grid-cols-3 gap-4 my-8">
                <div className="p-4 bg-card border border-border rounded-xl">
                    <div className="text-red-400 mb-2 font-bold flex items-center gap-2">
                        <Lock className="w-4 h-4" /> 401 Unauthorized
                    </div>
                    <p className="text-xs text-muted-foreground">Invalid key or expired session. Check for leading/trailing spaces.</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-xl">
                    <div className="text-yellow-400 mb-2 font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" /> 429 Rate Limit
                    </div>
                    <p className="text-xs text-muted-foreground">Zero balance or tier limits. Check provider dashboard.</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-xl">
                    <div className="text-blue-400 mb-2 font-bold flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" /> 404 No Model
                    </div>
                    <p className="text-xs text-muted-foreground">Key doesn't have access to specific model (e.g. GPT-4o).</p>
                </div>
            </div>

            <h2>Step-by-Step Fix</h2>

            <h3>1. Check for Spaces</h3>
            <p>
                Copy-pasting keys often includes a hidden space at the end. Open your <code className="text-blue-400">clawhub.json</code> and ensure the key is exactly between the quotes.
            </p>

            <h3>2. Verify Environment Variables</h3>
            <p>
                If you are using Docker, ensure variables are passed correctly in <code className="text-foreground/80">docker-compose.yml</code>.
            </p>

            <div className="not-prose bg-card rounded-lg p-4 my-4 font-mono text-xs text-foreground/80 border border-border">
                {`environment:
  - OPENAI_API_KEY=\${OPENAI_API_KEY}
  - DEEPSEEK_API_KEY=sk-xxxxxx # Manual way`}
            </div>

            <h3>3. Use the Config Wizard</h3>
            <div className="not-prose bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-8">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                    <div>
                        <h4 className="font-bold text-foreground mb-1">Instant Validation</h4>
                        <p className="text-sm text-foreground/80 mb-4">
                            Our <Link href="/tools/config" className="text-blue-400 underline">Config Wizard</Link> validates your API key format in real-time.
                        </p>
                        <Link href="/tools/config" className="inline-flex items-center px-4 py-2 bg-blue-500 text-black font-bold rounded-lg text-sm">
                            Validate Keys Now
                        </Link>
                    </div>
                </div>
            </div>

            <h2>Still Failing?</h2>
            <p>
                Run our diagnostic tool to see if the issue is with the key itself or your network connectivity to the provider.
            </p>
            <code className="block bg-card p-4 rounded-lg border border-border text-green-400 mb-8">
                npx clawkit-doctor@latest
            </code>

            <div className="not-prose mt-16 p-8 border-t border-border">
                <h4 className="text-muted-foreground font-bold uppercase tracking-widest text-xs mb-4">Related Guides</h4>
                <div className="flex flex-wrap gap-4">
                    <Link href="/docs/guides/cost-optimization" className="text-sm text-blue-400 hover:text-foreground transition-colors">Cost Optimization</Link>
                    <Link href="/docs/troubleshooting/connection-errors" className="text-sm text-blue-400 hover:text-foreground transition-colors">Connection Errors</Link>
                </div>
            </div>
        </>
    );
}
