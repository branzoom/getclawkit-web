import type { Metadata } from 'next';
import LocalDoctor from '@/components/LocalDoctor';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Local Doctor - Diagnose OpenClaw Environment',
    description: 'Safe, read-only diagnostic script for OpenClaw. Fix "Node.js not found" and "Permission denied" errors instantly.',
};

export default function DoctorPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Header */}
            <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3" /> Safe Mode
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                    Why is my Agent not starting?
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                    Don&apos;t guess. Use this <strong>read-only</strong> diagnostic script to check your Node.js version, permissions, and config files in seconds.
                </p>
            </div>

            {/* Tool */}
            <LocalDoctor />

            {/* SEO Content: Common Errors */}
            <div className="mt-24 border-t border-white/10 pt-16">
                <h2 className="text-2xl font-bold text-white mb-8">Common Issues Fixes</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <span className="text-red-400">🔴</span> Node.js Not Found
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            OpenClaw requires Node.js v18 or newer. Check our <Link href="/docs/getting-started/installation" className="text-blue-400 hover:text-blue-300">Installation Guide</Link> for detailed setup steps.
                        </p>
                        <Link href="/docs/getting-started/installation" className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1 transition-colors">
                            Read Installation Guide <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <span className="text-yellow-400">🟡</span> Permission Denied (EACCES)
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Permission errors are common on macOS/Linux. View our <Link href="/docs/troubleshooting/windows-issues" className="text-blue-400 hover:text-blue-300">Platform Troubleshooting</Link> for fixes.
                        </p>
                        <Link href="/docs/troubleshooting/windows-issues" className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1 transition-colors">
                            View Fixes <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <span className="text-orange-400">🟠</span> JSON Parse Error
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Trailing commas or unescaped backslashes can break your agent. Use our <Link href="/docs/troubleshooting/json-parse-errors" className="text-blue-400 hover:text-blue-300">JSON Guide</Link> to debug.
                        </p>
                        <Link href="/docs/troubleshooting/json-parse-errors" className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1 transition-colors">
                            Fix JSON Errors <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <span className="text-purple-400">🟣</span> Help & Support
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Can&apos;t find your issue? Browse our full <Link href="/docs" className="text-blue-400 hover:text-blue-300">Documentation</Link> or join the Discord.
                        </p>
                        <Link href="/docs" className="text-blue-400 text-sm hover:text-blue-300 flex items-center gap-1 transition-colors">
                            Browse All Docs <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}