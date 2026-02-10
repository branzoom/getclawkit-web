import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, Wrench, ShieldCheck, Terminal, BookOpen } from 'lucide-react';
import LocalDoctor from '@/components/LocalDoctor';

export const metadata: Metadata = {
    title: 'Fix ECONNREFUSED 0.0.0.0:3000 | OpenClaw Setup Error | ClawKit',
    description: 'Struggling with ECONNREFUSED on localhost:3000 in OpenClaw? Learn how to fix Windows path errors, permission issues, and host binding in minutes with ClawKit.',
};

export default function ErrorFixPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* SEO Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <AlertTriangle className="w-3 h-3" /> Error Found: ECONNREFUSED
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                            Fixing <span className="text-red-500 font-mono">ECONNREFUSED</span> on localhost:3000
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            The most common error in OpenClaw setup. Usually caused by port conflicts,
                            incorrect Windows path escaping, or service binding issues.
                        </p>
                    </div>

                    {/* Quick Diagnostic Tool */}
                    <div className="mb-20">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-foreground">Automated Diagnostic</h2>
                            <div className="text-xs text-muted-foreground">Run this to find the root cause in seconds</div>
                        </div>
                        <div className="bg-card border border-border rounded-2xl overflow-hidden p-8">
                            <LocalDoctor />
                        </div>
                    </div>

                    {/* Step-by-Step Fixes */}
                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">1. Update Node.js Version</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                OpenClaw requires Node 18+. If you are on an older version, the local server may fail to bind to the port correctly.
                                Use <code>nvm install 20</code> to update instantly.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-6">
                                <Wrench className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">2. Host Binding Issues</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Windows handles <code>0.0.0.0</code> differently than Unix. Try changing your host to <code>127.0.0.1</code>
                                in your configuration. Use our Config Wizard to generate valid path strings.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-border rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Still having trouble?</h2>
                        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                            Our Config Wizard generates strict JSON that prevents path escaping errors and port conflicts automatically.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/tools/config"
                                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
                            >
                                Generate New Config
                            </Link>
                            <Link
                                href="/docs"
                                className="px-8 py-4 bg-muted text-foreground font-bold rounded-xl hover:bg-muted border border-border transition-all"
                            >
                                View Detailed Docs
                            </Link>
                        </div>
                        <p className="text-xs text-muted-foreground/70 mt-8">
                            <ShieldCheck className="w-3 h-3 inline mr-1" />
                            ClawKit is a community-driven initiative for OpenClaw reliability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
