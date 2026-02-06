import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Terminal } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Fix Windows-Specific OpenClaw Issues | ClawKit',
    description: 'Complete guide to fixing Windows-specific OpenClaw problems: path escaping, PowerShell errors, firewall issues, and more.',
    keywords: ['openclaw windows', 'openclaw windows install', 'openclaw windows path', 'openclaw powershell error'],
};

export default function WindowsIssuesPage() {
    return (
        <>
            <h1>Fix Windows-Specific OpenClaw Issues</h1>

            <div className="not-prose bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Windows Auto-Fix</h3>
                        <p className="text-zinc-300 mb-4">
                            Our <Link href="/tools/config" className="text-blue-400 hover:text-blue-300">Config Wizard</Link> automatically fixes Windows path escaping and other Windows-specific issues.
                        </p>
                        <Link
                            href="/tools/config"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-black font-medium rounded-lg hover:bg-blue-400 transition-colors"
                        >
                            Generate Windows-Compatible Config
                        </Link>
                    </div>
                </div>
            </div>

            <h2>Top Windows Issues</h2>

            <h3>1. Path Escaping Errors</h3>
            <p>
                <strong>Most common Windows issue.</strong> Backslashes in paths must be doubled.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-bold text-white">❌ Wrong</span>
                    </div>
                    <pre className="text-sm text-zinc-300"><code>{`"workDir": "C:\\Users\\name\\project"`}</code></pre>
                    <p className="text-xs text-red-400 mt-2">Causes JSON parse error</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-bold text-white">✅ Correct</span>
                    </div>
                    <pre className="text-sm text-zinc-300"><code>{`"workDir": "C:\\\\Users\\\\name\\\\project"`}</code></pre>
                    <p className="text-xs text-green-400 mt-2">Valid JSON</p>
                </div>
            </div>

            <h3>2. PowerShell Execution Policy</h3>
            <p>
                You might see: <code>cannot be loaded because running scripts is disabled</code>
            </p>

            <div className="not-prose bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 my-4">
                <p className="text-sm text-yellow-300 mb-3">
                    <strong>⚠️ Solution:</strong> Run PowerShell as Administrator, then:
                </p>
                <div className="bg-zinc-900 border border-white/10 rounded-lg p-3">
                    <pre className="text-sm text-zinc-300"><code>Set-ExecutionPolicy RemoteSigned -Scope CurrentUser</code></pre>
                </div>
            </div>

            <h3>3. Windows Defender Firewall</h3>
            <p>
                Port 3000 might be blocked by default.
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <h4 className="text-white font-semibold mb-3">Steps to Allow Port 3000:</h4>
                <ol className="space-y-2 text-sm text-zinc-300">
                    <li>1. Open Windows Defender Firewall</li>
                    <li>2. Click "Advanced settings"</li>
                    <li>3. Click "Inbound Rules" → "New Rule"</li>
                    <li>4. Select "Port" → Next</li>
                    <li>5. Enter <code>3000</code> → Next</li>
                    <li>6. Select "Allow the connection" → Finish</li>
                </ol>
            </div>

            <h3>4. Node.js Not Found</h3>
            <p>
                After installing Node.js, you might need to restart your terminal.
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">PowerShell</span>
                </div>
                <pre className="text-sm text-zinc-300"><code>node --version</code></pre>
            </div>

            <p>
                If still not found, add Node.js to PATH manually:
            </p>
            <ul className="text-sm">
                <li>1. Search "Environment Variables" in Windows</li>
                <li>2. Edit "Path" under System Variables</li>
                <li>3. Add <code>C:\Program Files\nodejs\</code></li>
                <li>4. Restart terminal</li>
            </ul>

            <h3>5. Docker Desktop Not Starting</h3>
            <p>
                Requires WSL 2 on Windows 10/11.
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">PowerShell (Admin)</span>
                </div>
                <pre className="text-sm text-zinc-300"><code>wsl --install</code></pre>
            </div>

            <p className="text-sm text-zinc-400">
                Then restart your computer and start Docker Desktop.
            </p>

            <h2>Windows-Specific Best Practices</h2>
            <div className="not-prose space-y-3 my-6">
                {[
                    { title: 'Use PowerShell, not CMD', desc: 'Better Unicode support and modern features' },
                    { title: 'Install Windows Terminal', desc: 'Improved terminal experience from Microsoft Store' },
                    { title: 'Use forward slashes when possible', desc: 'Works in most Node.js contexts: "C:/Users/name"' },
                    { title: 'Run as Administrator for first install', desc: 'Avoids permission issues' },
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

            <h2>Quick Diagnostic</h2>
            <p>
                Run our <Link href="/tools/doctor" className="text-blue-400 hover:text-blue-300">Local Doctor</Link> to check for Windows-specific issues:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300"><code>npx clawkit-doctor@latest</code></pre>
            </div>

            <h2>Still Having Issues?</h2>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                <Link href="/docs/troubleshooting/connection-errors" className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors">
                    <h3 className="text-white font-semibold mb-2">Connection Errors</h3>
                    <p className="text-sm text-zinc-400">Fix ECONNREFUSED issues</p>
                </Link>
                <Link href="/docs/troubleshooting/json-parse-errors" className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition-colors">
                    <h3 className="text-white font-semibold mb-2">JSON Parse Errors</h3>
                    <p className="text-sm text-zinc-400">Fix config syntax issues</p>
                </Link>
            </div>

            <hr className="my-8 border-white/10" />

            <p className="text-sm text-zinc-500">
                <strong>Last Updated:</strong> February 6, 2026 |
                <strong> Platform:</strong> Windows 10/11
            </p>
        </>
    );
}
