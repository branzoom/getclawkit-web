import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, Zap, Coins, TrendingDown, AlertCircle } from 'lucide-react';
import CostEstimator from '@/components/CostEstimator';

export const metadata: Metadata = {
    title: 'DeepSeek V3.2 vs GPT-4.1 Cost Comparison for AI Agents | ClawKit',
    description: 'Stop overpaying for AI agents. Compare real-world costs of DeepSeek V3.2 and GPT-4.1. Save up to 85% on API fees with context caching and ClawKit optimization.',
};

export default function DeepSeekComparePage() {
    return (
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* SEO Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <Coins className="w-3 h-3" /> Cost Strategy 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            DeepSeek V3.2 vs GPT-4.1:<br />
                            <span className="text-blue-500 font-mono">The 85% Savings Gap</span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            For long-running AI agents, context accumulation is the silent killer.
                            See how DeepSeek V3.2's aggressive pricing and native caching outperform OpenAI's latest GPT-4.1.
                        </p>
                    </div>

                    {/* Comparison Highlights */}
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                            <TrendingDown className="w-8 h-8 text-green-400 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Input Price</h3>
                            <p className="text-sm text-zinc-500 font-mono">
                                GPT-4.1: $2.00 / 1M<br />
                                DeepSeek V3.2: $0.28 / 1M
                            </p>
                        </div>
                        <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                            <Zap className="w-8 h-8 text-blue-400 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Context Caching</h3>
                            <p className="text-sm text-zinc-500">
                                DeepSeek V3.2 offers $0.028/1M caching, making complex Browser-Use agents sustainable.
                            </p>
                        </div>
                        <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                            <Bot className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2">Agent ROI</h3>
                            <p className="text-sm text-zinc-500">
                                Run 10x more experiments with the same budget using ClawKit presets.
                            </p>
                        </div>
                    </div>

                    {/* Interactive Section */}
                    <div className="mb-20">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Interactive Burn-Rate Simulator</h2>
                            <div className="text-xs text-zinc-500">Includes 30-day exponential growth projection</div>
                        </div>
                        <CostEstimator />
                    </div>

                    {/* SEO Rich Text */}
                    <div className="prose prose-invert max-w-none border-t border-white/10 pt-16">
                        <h2 className="text-white">Why DeepSeek V3.2 is the "Agent Model" of Choice</h2>
                        <p className="text-zinc-400">
                            OpenClaw and other agent frameworks rely on repeated context. Every time your agent takes a step (clicks a button, reads a screen),
                            the entire history is sent back to the LLM. With GPT-4.1, your costs grow linearly with history length, leading to "bankruptcy steps"
                            where a single interaction costs over $1.00.
                        </p>
                        <p className="text-zinc-400 font-bold italic">
                            DeepSeek V3.2 solves this through native context caching, which ClawKit enables by default in our config wizard.
                        </p>

                        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-8 mt-12 mb-12">
                            <h3 className="text-blue-400 mt-0">Ready to switch?</h3>
                            <p className="text-zinc-300">
                                Our Config Wizard has built-in presets for DeepSeek. Stop editing YAML manually and fix your environment in seconds.
                            </p>
                            <Link
                                href="/tools/config"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors mt-4"
                            >
                                Open Config Wizard <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2 className="text-white mt-16">FAQ: DeepSeek V3.2 vs GPT-4.1 for Agents</h2>
                        <div className="space-y-8 mt-8">
                            <div>
                                <h4 className="text-white">Is DeepSeek V3.2 as smart as GPT-4.1?</h4>
                                <p className="text-zinc-400 text-sm">For coding and agentic reasoning (Tool Use), DeepSeek V3.2 is comparable to GPT-4.1, often exceeding it in specific logic benchmarks while costing a fraction of the price.</p>
                            </div>
                            <div>
                                <h4 className="text-white">Does ClawKit support local DeepSeek via Ollama?</h4>
                                <p className="text-zinc-400 text-sm">Yes. ClawKit's Config Wizard supports both DeepSeek API and local Ollama deployments, ensuring you can scale privately and cheaply.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
