import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Terminal, Wrench, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Fix "Connection Refused" Errors in OpenClaw | ClawKit',
    description: 'Complete guide to fixing ECONNREFUSED and connection refused errors in OpenClaw. Auto-diagnose in 30 seconds with our Local Doctor tool.',
    keywords: ['openclaw connection refused', 'fix openclaw econnrefused', 'openclaw connection error', 'openclaw troubleshooting'],
};

export default function ConnectionErrorsPage() {
    return (
        <>
            <h1>How to Fix "Connection Refused" Errors in OpenClaw</h1>

            {/* TL;DR Box */}
            <div className="not-prose bg-green-500/10 border border-green-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">TL;DR - Quick Fix</h3>
                        <p className="text-zinc-300 mb-4">
                            Use our <Link href="/tools/doctor" className="text-green-400 hover:text-green-300">Local Doctor Tool</Link> to auto-diagnose this issue in 30 seconds.
                        </p>
                        <Link
                            href="/tools/doctor"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 transition-colors"
                        >
                            Run Diagnostic Now
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            <h2>Problem Description</h2>
            <p>
                You're trying to start your OpenClaw agent, but you see one of these errors:
            </p>
            <ul>
                <li><code>ECONNREFUSED 127.0.0.1:3000</code></li>
                <li><code>Error: connect ECONNREFUSED</code></li>
                <li><code>Connection refused to localhost:3000</code></li>
            </ul>

            <h2>Why This Happens</h2>
            <p>
                This is the <strong>#1 most common error</strong> in OpenClaw setups. It means your client is trying to connect to the agent server, but:
            </p>
            <ol>
                <li>The agent isn't running</li>
                <li>The agent is running on a different port</li>
                <li>Network interface binding issues (IPv4 vs IPv6)</li>
                <li>Firewall blocking the connection</li>
            </ol>

            <h2>Solution 1: Quick Fix (Recommended)</h2>

            <div className="not-prose bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
                <h3 className="text-lg font-bold text-white mb-3">Use ClawKit's Local Doctor</h3>
                <p className="text-zinc-300 mb-4">
                    Our diagnostic tool automatically checks for this issue and suggests fixes.
                </p>

                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-black text-sm font-bold flex-shrink-0">1</span>
                        <div>
                            <p className="text-white">Visit <Link href="/tools/doctor" className="text-blue-400 hover:text-blue-300">Local Doctor</Link></p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-black text-sm font-bold flex-shrink-0">2</span>
                        <div>
                            <p className="text-white">Run <code className="text-green-400">npx clawkit-doctor@latest</code></p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-black text-sm font-bold flex-shrink-0">3</span>
                        <div>
                            <p className="text-white">Follow the auto-fix suggestions</p>
                        </div>
                    </div>
                </div>
            </div>

            <h2>Solution 2: Manual Fix</h2>

            <h3>Step 1: Check if the Agent is Running</h3>
            <p>First, verify your agent is actually running:</p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Terminal</span>
                </div>
                <pre className="text-sm text-zinc-300"><code>docker ps</code></pre>
            </div>

            <p>
                You should see a container named <code>openclaw</code> or similar. If not, start your agent:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300"><code>docker-compose up -d</code></pre>
            </div>

            <h3>Step 2: Use 127.0.0.1 Instead of localhost</h3>
            <p>
                Node.js v18+ prefers IPv6, which can cause issues. Change your config:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-bold text-white">❌ Before</span>
                    </div>
                    <pre className="text-sm text-zinc-300"><code>{`{
  "host": "localhost",
  "port": 3000
}`}</code></pre>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-bold text-white">✅ After</span>
                    </div>
                    <pre className="text-sm text-zinc-300"><code>{`{
  "host": "127.0.0.1",
  "port": 3000
}`}</code></pre>
                </div>
            </div>

            <h3>Step 3: Check Firewall Settings</h3>
            <p>
                On Windows, ensure port 3000 is allowed:
            </p>
            <ul>
                <li>Open Windows Defender Firewall</li>
                <li>Click "Advanced settings"</li>
                <li>Add inbound rule for port 3000</li>
            </ul>

            <h2>Prevention</h2>
            <p>
                Avoid this error from the start by using our <Link href="/tools/config" className="text-blue-400 hover:text-blue-300">Config Wizard</Link> to generate error-free configs. It automatically:
            </p>
            <ul>
                <li>Uses <code>127.0.0.1</code> instead of <code>localhost</code></li>
                <li>Validates port numbers</li>
                <li>Checks for common misconfigurations</li>
            </ul>

            <div className="not-prose bg-zinc-900/50 border border-white/10 rounded-xl p-6 my-8">
                <h3 className="text-lg font-bold text-white mb-4">Related Tools</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/tools/doctor" className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <Wrench className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <div className="text-sm font-medium text-white group-hover:text-green-400">Local Doctor</div>
                            <div className="text-xs text-zinc-500">Auto-diagnose issues</div>
                        </div>
                    </Link>
                    <Link href="/tools/config" className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <div className="text-sm font-medium text-white group-hover:text-blue-400">Config Wizard</div>
                            <div className="text-xs text-zinc-500">Generate valid configs</div>
                        </div>
                    </Link>
                    <Link href="/tools/cost" className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                        <Terminal className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <div className="text-sm font-medium text-white group-hover:text-purple-400">Cost Estimator</div>
                            <div className="text-xs text-zinc-500">Optimize API costs</div>
                        </div>
                    </Link>
                </div>
            </div>

            <hr className="my-8 border-white/10" />

            <p className="text-sm text-zinc-500">
                <strong>Last Updated:</strong> February 6, 2026 |
                <strong> Time to Fix:</strong> 30 seconds (with Local Doctor) or 5-10 minutes (manual)
            </p>
        </>
    );
}
