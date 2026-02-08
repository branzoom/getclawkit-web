import type { Metadata } from 'next';
import Link from 'next/link';
import CostEstimator from '@/components/CostEstimator';
import { Flame, AlertTriangle, TrendingUp, ExternalLink, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
    title: 'Agent Cost Explosion Simulator - DeepSeek vs GPT-4.1 Calculator',
    description: 'Calculate AI Agent API costs. Simulate exponential token growth. Compare DeepSeek V3.2 ($0.28) vs GPT-4.1 ($2.00) and learn how to prevent bankruptcy.',
    keywords: ['AI Cost Calculator', 'DeepSeek Pricing', 'GPT-4.1 API Cost', 'Agent Token Usage', 'Ollama Cost Savings'],
    openGraph: {
        title: 'Why Your First Agent Might Bankrupt You (Simulator)',
        description: 'You think you are running an agent, but you are running an exponential function. Test the burn rate now.',
        type: 'website',
    }
};

export default function CostPage() {
    // SEO Schema: 告诉 Google 这是一个 Web App 工具
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ClawKit Agent Cost Simulator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "A calculator to simulate exponential token cost growth for AI Agents using DeepSeek, OpenAI, and Anthropic models.",
        "featureList": ["Exponential Growth Simulation", "Context Caching Calculator", "Local Model Comparison"]
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Inject Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Header Section */}
            <div className="text-center mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider animate-pulse">
                    <Flame className="w-3 h-3" /> Burn Rate Simulator
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                    Why your Agent might <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Bankrupt You.</span>
                </h1>

                <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    You aren't just running an agent; you are running an <strong>exponential function</strong>.
                    <br className="hidden md:inline" />
                    This tool simulates the <strong>worst-case scenario</strong> where context history spirals out of control.
                </p>

                <div className="flex justify-center mt-4">
                    <div className="inline-flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/5 px-4 py-2 rounded-lg border border-yellow-500/20">
                        <AlertTriangle className="w-4 h-4" />
                        <span><strong>Education Tool:</strong> Simulating 30-day continuous operation with aggressive context accumulation.</span>
                    </div>
                </div>
            </div>

            {/* The Interactive Tool (Google can't interact, but users love it) */}
            <section aria-label="Cost Calculator Tool">
                <CostEstimator />
            </section>

            {/* SEO Content Strategy: Static Analysis for Crawlers */}
            {/* 这部分内容是给爬虫 "吃" 的，确保页面有丰富的文本内容 */}
            <div className="mt-32 space-y-16">

                {/* 1. Pre-calculated Scenarios (Keyword Rich) */}
                <section>
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Common Cost Scenarios</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="bg-zinc-900/50 border-white/5">
                            <CardContent className="p-6 space-y-4">
                                <div className="p-3 bg-green-500/10 w-fit rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">The "Local Dev"</h3>
                                <p className="text-sm text-zinc-400">
                                    Running Llama 3 locally via Ollama.
                                </p>
                                <ul className="text-sm space-y-2 text-zinc-300 pt-2 border-t border-white/5">
                                    <li className="flex justify-between"><span>Model:</span> <span>Llama 3</span></li>
                                    <li className="flex justify-between"><span>Cost:</span> <span className="text-green-400 font-bold">$0 / mo</span></li>
                                    <li className="flex justify-between"><span>Privacy:</span> <span>100% Local</span></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-900/50 border-white/5">
                            <CardContent className="p-6 space-y-4">
                                <div className="p-3 bg-blue-500/10 w-fit rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">The "Budget Agent"</h3>
                                <p className="text-sm text-zinc-400">
                                    Using DeepSeek V3.2 with context caching enabled.
                                </p>
                                <ul className="text-sm space-y-2 text-zinc-300 pt-2 border-t border-white/5">
                                    <li className="flex justify-between"><span>Model:</span> <span>DeepSeek V3.2</span></li>
                                    <li className="flex justify-between"><span>Est. Cost:</span> <span className="text-blue-400 font-bold">~$5 - $15 / mo</span></li>
                                    <li className="flex justify-between"><span>Value:</span> <span>High ROI</span></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-zinc-900/50 border-white/5">
                            <CardContent className="p-6 space-y-4">
                                <div className="p-3 bg-purple-500/10 w-fit rounded-lg">
                                    <Flame className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">The "Bankruptcy"</h3>
                                <p className="text-sm text-zinc-400">
                                    Running GPT-4.1 without summarizing history.
                                </p>
                                <ul className="text-sm space-y-2 text-zinc-300 pt-2 border-t border-white/5">
                                    <li className="flex justify-between"><span>Model:</span> <span>GPT-4.1</span></li>
                                    <li className="flex justify-between"><span>Est. Cost:</span> <span className="text-red-400 font-bold">$500+ / mo</span></li>
                                    <li className="flex justify-between"><span>Risk:</span> <span>Extreme</span></li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* 2. Authority Links (E-E-A-T) */}
                <section className="border-t border-white/10 pt-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-zinc-400" /> Data Sources & Verification
                    </h2>
                    <div className="bg-zinc-900 p-6 rounded-xl border border-white/5">
                        <p className="text-zinc-400 mb-4">
                            Our calculator uses the following official pricing data (verified Feb 2026).
                            We recommend checking official pages for the latest updates.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Link href="https://platform.openai.com/pricing" target="_blank" className="flex items-center justify-between p-3 bg-black rounded border border-white/10 hover:border-white/30 transition-colors group">
                                <span className="text-zinc-300">OpenAI Pricing</span>
                                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                            </Link>
                            <Link href="https://www.anthropic.com/pricing" target="_blank" className="flex items-center justify-between p-3 bg-black rounded border border-white/10 hover:border-white/30 transition-colors group">
                                <span className="text-zinc-300">Anthropic Pricing</span>
                                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                            </Link>
                            <Link href="https://www.deepseek.com/" target="_blank" className="flex items-center justify-between p-3 bg-black rounded border border-white/10 hover:border-white/30 transition-colors group">
                                <span className="text-zinc-300">DeepSeek API</span>
                                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                            </Link>
                            <Link href="https://ollama.com/" target="_blank" className="flex items-center justify-between p-3 bg-black rounded border border-white/10 hover:border-white/30 transition-colors group">
                                <span className="text-zinc-300">Ollama (Local AI)</span>
                                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}