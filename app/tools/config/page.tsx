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

            {/* Before/After Comparison */}
            <div className="mt-20 mb-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-3">Before ClawKit vs After ClawKit</h2>
                    <p className="text-zinc-400">See how much time and frustration you'll save</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Before Card */}
                    <Card className="bg-red-500/5 border-red-500/20">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                                    <span className="text-xl">❌</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">Before</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    { text: 'Manually edit YAML files', time: '30 min', emoji: '📝' },
                                    { text: 'Debug path escaping errors', time: '45 min', emoji: '🐛' },
                                    { text: 'Google "JSON parse error"', time: '20 min', emoji: '🔍' },
                                    { text: 'Worry about API key security', time: '∞', emoji: '😰' }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                        <span className="text-lg flex-shrink-0">{item.emoji}</span>
                                        <div className="flex-1">
                                            <span className="text-zinc-300">{item.text}</span>
                                            <span className="text-red-400 text-xs ml-2">({item.time})</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4 border-t border-red-500/20">
                                <p className="text-sm text-zinc-500">Total wasted time: <span className="text-red-400 font-bold">~2 hours</span></p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* After Card */}
                    <Card className="bg-green-500/5 border-green-500/20 relative overflow-hidden">
                        <div className="absolute top-3 right-3 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">RECOMMENDED</div>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <span className="text-xl">✅</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">After</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    { text: 'Visual form, zero errors', time: '30 sec', emoji: '⚡' },
                                    { text: 'Auto-fix Windows paths', time: '0 sec', emoji: '🔧' },
                                    { text: 'Instant validation', time: '0 sec', emoji: '✨' },
                                    { text: 'Browser-only processing', time: '0 sec', emoji: '🔒' }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                        <span className="text-lg flex-shrink-0">{item.emoji}</span>
                                        <div className="flex-1">
                                            <span className="text-zinc-300">{item.text}</span>
                                            <span className="text-green-400 text-xs ml-2">({item.time})</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4 border-t border-green-500/20">
                                <p className="text-sm text-zinc-500">Total time: <span className="text-green-400 font-bold">30 seconds</span></p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center mt-8">
                    <p className="text-2xl font-bold text-white">
                        Save <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">240x</span> your time
                    </p>
                    <p className="text-sm text-zinc-500 mt-2">That's 2 hours → 30 seconds</p>
                </div>
            </div>


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