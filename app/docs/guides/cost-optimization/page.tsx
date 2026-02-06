import type { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, TrendingDown, CheckCircle2, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'OpenClaw Cost Optimization Guide | ClawKit',
    description: 'Complete guide to reducing OpenClaw API costs. Learn about model selection, prompt optimization, caching, and use our Cost Estimator tool.',
    keywords: ['openclaw cost', 'reduce openclaw cost', 'openclaw pricing', 'openclaw cost calculator', 'cheapest openclaw setup'],
};

export default function CostOptimizationPage() {
    return (
        <>
            <h1>OpenClaw Cost Optimization Guide</h1>

            <div className="not-prose bg-green-500/10 border border-green-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3">
                    <DollarSign className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Compare Costs Before You Commit</h3>
                        <p className="text-zinc-300 mb-4">
                            Our <Link href="/tools/cost" className="text-green-400 hover:text-green-300">Cost Estimator</Link> compares pricing across OpenAI, DeepSeek, Claude, and more.
                        </p>
                        <Link
                            href="/tools/cost"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 transition-colors"
                        >
                            Calculate Your Costs
                        </Link>
                    </div>
                </div>
            </div>

            <h2>Quick Wins</h2>

            <h3>1. Switch to DeepSeek (10x Cheaper)</h3>
            <p>
                DeepSeek V3 offers GPT-4-level performance at 1/10th the cost.
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-red-400">$30/M tokens</div>
                        <div className="text-xs text-zinc-500 mt-1">GPT-4o</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-orange-400">$15/M tokens</div>
                        <div className="text-xs text-zinc-500 mt-1">Claude 3.5</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-400">$2.19/M tokens</div>
                        <div className="text-xs text-zinc-500 mt-1">DeepSeek V3 ⭐</div>
                    </div>
                </div>
            </div>

            <p>
                Update your config:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <pre className="text-sm text-zinc-300 overflow-x-auto"><code>{`{
  "llm": {
    "provider": "deepseek",
    "apiKey": "sk-...",
    "model": "deepseek-chat",
    "baseURL": "https://api.deepseek.com/v1"
  }
}`}</code></pre>
            </div>

            <h3>2. Set maxTokens Limits</h3>
            <p>
                Prevent runaway costs by capping response length.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-bold text-white">❌ Risky</span>
                    </div>
                    <pre className="text-sm text-zinc-300"><code>{`{
  "llm": {
    "model": "gpt-4o"
    // No limit!
  }
}`}</code></pre>
                    <p className="text-xs text-red-400 mt-2">Could generate 128K tokens ($3.84 per request)</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-bold text-white">✅ Safe</span>
                    </div>
                    <pre className="text-sm text-zinc-300"><code>{`{
  "llm": {
    "model": "gpt-4o",
    "maxTokens": 4000
  }
}`}</code></pre>
                    <p className="text-xs text-green-400 mt-2">Capped at $0.12 per request</p>
                </div>
            </div>

            <h3>3. Use Smaller Models for Simple Tasks</h3>
            <p>
                Not every task needs GPT-4. Use cheaper models when possible.
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left text-white py-2">Task Type</th>
                            <th className="text-left text-white py-2">Recommended Model</th>
                            <th className="text-right text-white py-2">Cost/M Tokens</th>
                        </tr>
                    </thead>
                    <tbody className="text-zinc-300">
                        <tr className="border-b border-white/5">
                            <td className="py-2">Simple Q&A</td>
                            <td>gpt-4o-mini</td>
                            <td className="text-right text-green-400">$0.60</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="py-2">Code generation</td>
                            <td>deepseek-chat</td>
                            <td className="text-right text-green-400">$2.19</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="py-2">Complex reasoning</td>
                            <td>gpt-4o</td>
                            <td className="text-right text-orange-400">$30.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>Advanced Optimization</h2>

            <h3>4. Optimize Your Prompts</h3>
            <div className="not-prose space-y-3 my-6">
                {[
                    { title: 'Be specific and concise', desc: 'Shorter prompts = lower costs' },
                    { title: 'Avoid repeating context', desc: 'Use conversation history wisely' },
                    { title: 'Use system prompts', desc: 'Define behavior once, not in every message' },
                    { title: 'Limit examples', desc: 'Few-shot learning is expensive' },
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <TrendingDown className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-zinc-500">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h3>5. Enable Response Caching (If Supported)</h3>
            <p>
                Some providers cache repeated prompts. Check your provider's docs.
            </p>

            <h3>6. Monitor Usage</h3>
            <p>
                Set up alerts in your LLM provider dashboard:
            </p>
            <ul>
                <li><strong>OpenAI:</strong> Usage limits in Settings</li>
                <li><strong>DeepSeek:</strong> API dashboard</li>
                <li><strong>Claude:</strong> Anthropic Console</li>
            </ul>

            <h2>Cost Comparison Calculator</h2>
            <p>
                Use our <Link href="/tools/cost" className="text-blue-400 hover:text-blue-300">Cost Estimator</Link> to compare:
            </p>
            <ul>
                <li>Different providers (OpenAI, DeepSeek, Claude)</li>
                <li>Different models (GPT-4o, GPT-4o-mini, DeepSeek V3)</li>
                <li>Your expected usage (tokens per day)</li>
            </ul>

            <h2>Real-World Example</h2>
            <div className="not-prose bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 my-6">
                <h4 className="text-white font-bold mb-3">Scenario: 100K tokens/day</h4>
                <div className="space-y-2 text-sm text-zinc-300">
                    <div className="flex justify-between">
                        <span>GPT-4o:</span>
                        <span className="text-red-400 font-bold">$90/month</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Claude 3.5:</span>
                        <span className="text-orange-400 font-bold">$45/month</span>
                    </div>
                    <div className="flex justify-between">
                        <span>DeepSeek V3:</span>
                        <span className="text-green-400 font-bold">$6.57/month</span>
                    </div>
                </div>
                <p className="text-xs text-zinc-500 mt-4">
                    💡 Switching to DeepSeek saves $83.43/month (93% reduction)
                </p>
            </div>

            <h2>Best Practices</h2>
            <div className="not-prose space-y-3 my-6">
                {[
                    { title: 'Start with DeepSeek', desc: 'Test if it meets your needs before paying 10x more' },
                    { title: 'Set monthly budgets', desc: 'Use provider billing alerts' },
                    { title: 'Track per-feature costs', desc: 'Identify expensive operations' },
                    { title: 'Review logs monthly', desc: 'Look for optimization opportunities' },
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-zinc-500">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <hr className="my-8 border-white/10" />

            <p className="text-sm text-zinc-500">
                <strong>Last Updated:</strong> February 6, 2026 |
                <strong> Potential Savings:</strong> Up to 93% by switching to DeepSeek
            </p>
        </>
    );
}
