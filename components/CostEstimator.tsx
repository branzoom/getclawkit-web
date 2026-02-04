'use client';

import { useState } from 'react';
import { Calculator, Share2, TrendingDown, Info } from 'lucide-react';

const PRICING = {
    'claude-3-5-sonnet': { name: 'Claude 3.5 Sonnet', input: 3.0, output: 15.0, desc: 'High intelligence, high cost.' },
    'gpt-4o': { name: 'GPT-4o', input: 2.5, output: 10.0, desc: 'Balanced performance.' },
    'deepseek-v3': { name: 'DeepSeek V3', input: 0.14, output: 0.28, desc: 'The cost-efficiency king.' },
};

export default function CostEstimator() {
    const [model, setModel] = useState<keyof typeof PRICING>('claude-3-5-sonnet');
    const [tokens, setTokens] = useState(1); // Million tokens per month

    const calculateCost = (targetModel: keyof typeof PRICING) => {
        const p = PRICING[targetModel];
        // 假设输入输出比 3:1
        const cost = (tokens * 0.75 * p.input) + (tokens * 0.25 * p.output);
        return cost;
    };

    const currentCost = calculateCost(model);
    const deepseekCost = calculateCost('deepseek-v3');
    const savings = currentCost - deepseekCost;
    const savingsPercent = Math.round((savings / currentCost) * 100);

    return (
        <div className="space-y-8">
            {/* 1. 计算器卡片 */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">

                    {/* 左侧：输入 */}
                    <div className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-zinc-400 mb-2 block">Choose your Model</label>
                            <div className="grid grid-cols-1 gap-2">
                                {Object.entries(PRICING).map(([key, data]) => (
                                    <button
                                        key={key}
                                        onClick={() => setModel(key as any)}
                                        className={`flex items-center justify-between p-3 rounded-xl border text-sm transition-all ${model === key
                                                ? 'bg-blue-600/20 border-blue-500 text-white'
                                                : 'bg-zinc-800/50 border-white/5 text-zinc-400 hover:bg-zinc-800'
                                            }`}
                                    >
                                        <span className="font-medium">{data.name}</span>
                                        <span className="text-xs opacity-70">{data.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-zinc-400">Monthly Traffic</span>
                                <span className="text-white font-mono">{tokens}M Tokens</span>
                            </div>
                            <input
                                type="range" min="1" max="50" step="1"
                                value={tokens}
                                onChange={(e) => setTokens(Number(e.target.value))}
                                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <p className="text-xs text-zinc-500 mt-2">
                                *Based on typical Agent loop: 75% Input, 25% Output.
                            </p>
                        </div>
                    </div>

                    {/* 右侧：结果 */}
                    <div className="bg-black/40 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-white/5 relative">
                        <h3 className="text-zinc-400 text-sm uppercase tracking-widest mb-2">Estimated Monthly Cost</h3>
                        <div className="text-6xl font-bold text-white tracking-tighter mb-4">
                            ${currentCost.toFixed(2)}
                        </div>

                        {model !== 'deepseek-v3' && (
                            <div className="w-full bg-green-900/20 border border-green-500/30 p-4 rounded-lg animate-pulse-slow">
                                <div className="flex items-center justify-center gap-2 text-green-400 font-bold">
                                    <TrendingDown className="w-5 h-5" />
                                    <span>Save ${savings.toFixed(2)} with DeepSeek</span>
                                </div>
                                <p className="text-xs text-green-500/70 mt-1">That's a {savingsPercent}% reduction!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 2. SEO Table (增加内容深度) */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" /> Model Pricing Comparison (2026)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-zinc-400">
                        <thead className="text-xs text-zinc-500 uppercase bg-zinc-800/50">
                            <tr>
                                <th className="px-6 py-3">Model</th>
                                <th className="px-6 py-3">Input ($/1M)</th>
                                <th className="px-6 py-3">Output ($/1M)</th>
                                <th className="px-6 py-3">Context Window</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-white/5">
                                <td className="px-6 py-4 font-medium text-white">Claude 3.5 Sonnet</td>
                                <td className="px-6 py-4">$3.00</td>
                                <td className="px-6 py-4">$15.00</td>
                                <td className="px-6 py-4">200k</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="px-6 py-4 font-medium text-white">GPT-4o</td>
                                <td className="px-6 py-4">$2.50</td>
                                <td className="px-6 py-4">$10.00</td>
                                <td className="px-6 py-4">128k</td>
                            </tr>
                            <tr className="bg-blue-900/10 border-b border-blue-500/20">
                                <td className="px-6 py-4 font-bold text-blue-400">DeepSeek V3</td>
                                <td className="px-6 py-4 text-white">$0.14</td>
                                <td className="px-6 py-4 text-white">$0.28</td>
                                <td className="px-6 py-4 text-white">64k</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-sm text-zinc-500">
                    * Prices are based on official API documentation as of Feb 2026. DeepSeek pricing assumes cache hit/miss blended average.
                </p>
            </div>
        </div>
    );
}