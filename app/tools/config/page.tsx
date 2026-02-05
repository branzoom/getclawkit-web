import type { Metadata } from 'next';
import ConfigGenerator from '@/components/ConfigGenerator';
import { FileJson, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Config Wizard - Generate OpenClaw JSON',
    description: 'The easiest way to configure OpenClaw. Generate strict JSON configs for Windows, macOS, and Linux. Fixes path errors automatically.',
};

export default function ConfigPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">
            {/* Header Area */}
            <div className="text-center mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-3">
                    <FileJson className="w-3 h-3" /> JSON Generator v2.0
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                    Perfect Configs, <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Zero Errors.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Stop wrestling with YAML indentation and Windows backslashes.
                    Generate a production-ready <code>clawhub.json</code> in seconds.
                </p>
            </div>

            {/* The Tool Component */}
            <ConfigGenerator />

            {/* SEO Content / Value Props */}
            <div className="mt-24 grid md:grid-cols-2 gap-8 border-t border-white/10 pt-16">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Why use the Wizard?</h2>
                    <div className="space-y-4">
                        {[
                            { title: 'Strict JSON Mode', desc: 'Ensures zero syntax errors for OpenClaw v2 parser.', color: 'text-green-500' },
                            { title: 'Windows Path Fixer', desc: 'Auto-converts single backslashes to double escaped ones.', color: 'text-blue-500' },
                            { title: 'Privacy First', desc: 'API keys are processed in your browser. Nothing is sent to our servers.', color: 'text-purple-500' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <CheckCircle2 className={`w-6 h-6 ${item.color} mt-1 flex-shrink-0`} />
                                <div>
                                    <h3 className="font-semibold text-white">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Card className="bg-zinc-900/50 border-white/5">
                    <CardContent className="p-6 space-y-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                            Avoid Common Pitfalls
                        </h2>
                        <ul className="space-y-4">
                            <li className="text-sm text-muted-foreground">
                                <strong className="text-white block mb-1">Invalid Escape Characters</strong>
                                Windows paths like <code>C:\User</code> cause JSON parse errors. They must be <code>C:\\User</code>.
                            </li>
                            <li className="text-sm text-muted-foreground">
                                <strong className="text-white block mb-1">Trailing Commas</strong>
                                Unlike JS objects, standard JSON does not support trailing commas. Our generator handles this automatically.
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}