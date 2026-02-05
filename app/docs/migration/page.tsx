import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightLeft, FileJson, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Migration Guide - Upgrade ClawdBot to OpenClaw v2',
    description: 'Step-by-step guide to migrating your agents from ClawdBot v1 (Legacy) to OpenClaw v2. Convert YAML to JSON and update skill definitions.',
};

export default function MigrationPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            {/* Header */}
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                    <ArrowRightLeft className="w-3 h-3" /> Upgrade Path
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Migrating from <br />
                    <span className="text-zinc-500 line-through decoration-red-500 decoration-4">ClawdBot v1</span> to <span className="text-blue-400">OpenClaw v2</span>
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl">
                    OpenClaw v2 introduces a new plugin architecture and switches from YAML to JSON configs. Here is what you need to change.
                </p>
            </div>

            {/* Key Changes Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
                <Card className="bg-zinc-900 border-white/10">
                    <CardContent className="pt-6">
                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                            <Settings className="w-5 h-5 text-red-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Config Format</h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            <code>agent.yaml</code> is deprecated. You must now use <code>clawhub.json</code>.
                        </p>
                        <div className="bg-black p-3 rounded border border-white/5 font-mono text-xs text-zinc-500">
                            - model: gpt-3.5<br />
                            + "model": "gpt-4o"
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-white/10">
                    <CardContent className="pt-6">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                            <FileJson className="w-5 h-5 text-green-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Skill Loading</h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Skills are no longer hardcoded python files. They are installed via NPM-style packages.
                        </p>
                        <div className="bg-black p-3 rounded border border-white/5 font-mono text-xs text-zinc-500">
                            - import my_skill<br />
                            + clawhub install @skill/web
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Comparison Table (For Google Snippets) */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6">Version Comparison</h2>
                <div className="overflow-hidden rounded-xl border border-white/10">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-white font-bold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Feature</th>
                                <th className="px-6 py-4 text-zinc-500">ClawdBot v1 (Legacy)</th>
                                <th className="px-6 py-4 text-blue-400">OpenClaw v2 (Current)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 bg-zinc-900/50">
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">Config File</td>
                                <td className="px-6 py-4 text-zinc-400">YAML</td>
                                <td className="px-6 py-4 text-green-400">Strict JSON</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">Memory</td>
                                <td className="px-6 py-4 text-zinc-400">Local .txt files</td>
                                <td className="px-6 py-4 text-green-400">Vector DB (Chroma/Lance)</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">Models</td>
                                <td className="px-6 py-4 text-zinc-400">OpenAI Only</td>
                                <td className="px-6 py-4 text-green-400">OpenAI, Anthropic, DeepSeek, Local</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CTA */}
            <div className="p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Ready to upgrade?</h2>
                <p className="text-zinc-400 mb-6">
                    Don't convert your config files manually. Our wizard can generate a v2-compliant JSON file for you in seconds.
                </p>
                <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200">
                    <Link href="/tools/config">
                        Launch Config Wizard
                    </Link>
                </Button>
            </div>
        </div>
    );
}