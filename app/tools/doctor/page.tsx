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
                            OpenClaw requires Node.js v18 or newer. If the script shows red, verify your installation by running <code>node -v</code> in your terminal.
                        </p>
                        <Link href="https://nodejs.org/" target="_blank" className="text-blue-400 text-sm hover:underline flex items-center gap-1">
                            Download Node.js <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                            <span className="text-yellow-400">🟡</span> Permission Denied (EACCES)
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            If you see permission errors on macOS/Linux, your <code>~/.openclaw</code> folder might be owned by root. Fix it by running:
                            <br />
                            <code className="bg-zinc-900 px-2 py-1 rounded text-xs mt-2 block w-fit">sudo chown -R $(whoami) ~/.openclaw</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}