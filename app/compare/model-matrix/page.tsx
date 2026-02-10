import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, Shield, Zap } from 'lucide-react';
import { MODEL_MATRIX, type ModelMatrixEntry } from '@/data/models';

export const metadata: Metadata = {
    title: 'Model Compatibility Matrix — Which LLM Works Best with OpenClaw? | ClawKit',
    description: 'Compare GPT-4.1, DeepSeek V3.2, Claude Sonnet 4.5, Gemini 2.5, Grok 4, and Ollama for AI agent autonomy, rate limits, and best-use scenarios.',
    keywords: ['openclaw model comparison', 'llm compatibility', 'ai agent model', 'deepseek vs gpt', 'claude vs gemini', 'best model for openclaw'],
};

const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Model Compatibility Matrix for OpenClaw Agents",
    "description": metadata.description,
};

function AutonomyBadge({ level }: { level: ModelMatrixEntry['autonomy'] }) {
    const styles = {
        full: 'bg-green-500/15 text-green-400 border-green-500/30',
        limited: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
        none: 'bg-red-500/15 text-red-400 border-red-500/30',
    };
    const labels = { full: 'Full', limited: 'Limited', none: 'None' };
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${styles[level]}`}>
            {labels[level]}
        </span>
    );
}

function RateLimitIndicator({ risk }: { risk: ModelMatrixEntry['rateLimitRisk'] }) {
    const colors = {
        low: 'bg-green-500',
        medium: 'bg-yellow-500',
        high: 'bg-red-500',
    };
    const labels = { low: 'Low', medium: 'Medium', high: 'High' };
    return (
        <span className="inline-flex items-center gap-1.5 text-[11px] text-foreground/80">
            <span className={`w-2 h-2 rounded-full ${colors[risk]}`} />
            {labels[risk]}
        </span>
    );
}

export default function ModelMatrixPage() {
    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
            />
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <Cpu className="w-3 h-3" /> Model Comparison
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
                            Model Compatibility Matrix
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Not every LLM is built for autonomous agents. Compare autonomy support, rate limit risks, and ideal use cases to pick the right model for your OpenClaw setup.
                        </p>
                    </div>

                    {/* Why it matters */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="p-6 bg-card/50 border border-border rounded-2xl">
                            <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                            <h3 className="text-lg font-bold text-foreground mb-2">Autonomy Matters</h3>
                            <p className="text-sm text-muted-foreground">
                                Full autonomy means the model can reliably chain multi-step tool calls without losing context or hallucinating actions.
                            </p>
                        </div>
                        <div className="p-6 bg-card/50 border border-border rounded-2xl">
                            <Shield className="w-8 h-8 text-red-400 mb-4" />
                            <h3 className="text-lg font-bold text-foreground mb-2">Rate Limits Kill Agents</h3>
                            <p className="text-sm text-muted-foreground">
                                A rate-limited model mid-task can leave your browser agent stuck. Choose providers with generous per-minute quotas.
                            </p>
                        </div>
                        <div className="p-6 bg-card/50 border border-border rounded-2xl">
                            <Cpu className="w-8 h-8 text-blue-400 mb-4" />
                            <h3 className="text-lg font-bold text-foreground mb-2">Match Model to Task</h3>
                            <p className="text-sm text-muted-foreground">
                                Use a flagship model for complex reasoning and a budget model for simple sub-tasks. ClawKit presets make switching easy.
                            </p>
                        </div>
                    </div>

                    {/* Matrix Table */}
                    <div className="overflow-x-auto mb-16">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left text-foreground py-3 px-4 font-bold">Model</th>
                                    <th className="text-left text-foreground py-3 px-4 font-bold">Provider</th>
                                    <th className="text-left text-foreground py-3 px-4 font-bold">Autonomy</th>
                                    <th className="text-left text-foreground py-3 px-4 font-bold">Rate Limit Risk</th>
                                    <th className="text-left text-foreground py-3 px-4 font-bold">Best For</th>
                                    <th className="text-left text-foreground py-3 px-4 font-bold">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MODEL_MATRIX.map((model) => (
                                    <tr key={model.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                        <td className="py-3 px-4 font-semibold text-foreground whitespace-nowrap">{model.name}</td>
                                        <td className="py-3 px-4 text-muted-foreground">{model.provider}</td>
                                        <td className="py-3 px-4"><AutonomyBadge level={model.autonomy} /></td>
                                        <td className="py-3 px-4"><RateLimitIndicator risk={model.rateLimitRisk} /></td>
                                        <td className="py-3 px-4 text-foreground/80">{model.bestFor}</td>
                                        <td className="py-3 px-4 text-muted-foreground text-xs">{model.notes || '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* CTAs */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-8">
                            <h3 className="text-blue-400 font-bold text-lg mb-2">Configure Your Model</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                Use our Config Wizard to generate a ready-to-use config for any supported model.
                            </p>
                            <Link
                                href="/tools/config"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-primary-foreground font-bold rounded-lg transition-colors"
                            >
                                Open Config Wizard <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-8">
                            <h3 className="text-green-400 font-bold text-lg mb-2">Estimate Your Costs</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                See how much each model costs for your expected usage with our interactive calculator.
                            </p>
                            <Link
                                href="/tools/cost"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-colors"
                            >
                                Open Cost Estimator <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
