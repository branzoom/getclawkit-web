import { Brain, Eye, MemoryStick, Lightbulb, ChevronRight, Zap, Target, RotateCcw, Layers } from 'lucide-react';
import Link from 'next/link';

export default function AgentTheoryPage() {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                    <Brain className="w-8 h-8 text-amber-400" />
                </div>
                <h1 className="!my-0">Agent Fundamentals</h1>
            </div>

            <p className="lead">
                An AI agent is more than a chatbot. It <strong>perceives</strong> its environment, <strong>reasons</strong> about goals, and <strong>acts</strong> on the world. This page explains the core concepts behind autonomous agents.
            </p>

            <h2>The Agent Loop</h2>
            <p>
                Every agent — from simple scripts to OpenClaw — follows the same fundamental cycle:
            </p>

            <div className="not-prose my-12">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    {[
                        { icon: <Eye className="w-6 h-6" />, label: 'Perceive', desc: 'Observe the environment', color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                        { icon: <Brain className="w-6 h-6" />, label: 'Reason', desc: 'Decide next action', color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
                        { icon: <Zap className="w-6 h-6" />, label: 'Act', desc: 'Execute the action', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
                        { icon: <RotateCcw className="w-6 h-6" />, label: 'Evaluate', desc: 'Check the result', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
                    ].map((step, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className={`p-4 rounded-xl border ${step.color} text-center min-w-[120px]`}>
                                <div className="flex justify-center mb-2">{step.icon}</div>
                                <div className="font-bold text-white text-sm">{step.label}</div>
                                <div className="text-xs text-zinc-500 mt-1">{step.desc}</div>
                            </div>
                            {i < 3 && <ChevronRight className="w-4 h-4 text-zinc-600 hidden md:block" />}
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-zinc-600 mt-4">This loop repeats until the goal is achieved or the agent runs out of steps.</p>
            </div>

            <h2>The Three Pillars</h2>
            <p>
                Modern agent architectures rest on three capabilities. OpenClaw implements all three:
            </p>

            <div className="not-prose grid md:grid-cols-3 gap-6 my-12">
                <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
                    <MemoryStick className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Memory</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Agents need context to make good decisions. <strong>Short-term memory</strong> is the conversation history within a session. <strong>Long-term memory</strong> persists across sessions using vector databases or file storage.
                    </p>
                    <p className="text-xs text-zinc-600 mt-3">
                        OpenClaw uses in-context history (short-term) and plans local vector DB support for v3 (long-term).
                    </p>
                </div>
                <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
                    <Target className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Planning</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Given a complex goal, the agent must break it into achievable sub-tasks. This can be done <strong>upfront</strong> (plan-then-execute) or <strong>reactively</strong> (decide one step at a time based on the current state).
                    </p>
                    <p className="text-xs text-zinc-600 mt-3">
                        OpenClaw uses reactive planning by default, with optional goal decomposition for complex tasks.
                    </p>
                </div>
                <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
                    <Layers className="w-8 h-8 text-orange-400 mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">Tool Use</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        An LLM alone can only generate text. <strong>Tool use</strong> gives it the ability to interact with the world — clicking buttons, reading files, calling APIs. This is what transforms a chatbot into an agent.
                    </p>
                    <p className="text-xs text-zinc-600 mt-3">
                        OpenClaw&apos;s entire Skill System is built around tool use via MCP.
                    </p>
                </div>
            </div>

            <h2>Reactive vs. Deliberative Agents</h2>
            <p>
                There are two main schools of thought on how agents should operate:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-zinc-900 border border-white/10 rounded-xl">
                    <h4 className="text-white font-bold mb-2">Reactive (OpenClaw Default)</h4>
                    <p className="text-sm text-zinc-400 mb-3">
                        The agent observes the current state and decides the very next action. No upfront plan. Highly adaptable to dynamic environments like web pages.
                    </p>
                    <div className="text-xs space-y-1">
                        <div className="text-green-400">+ Handles unexpected changes well</div>
                        <div className="text-green-400">+ Lower latency per step</div>
                        <div className="text-red-400">- Can get stuck in loops</div>
                        <div className="text-red-400">- Less efficient for long tasks</div>
                    </div>
                </div>
                <div className="p-6 bg-zinc-900 border border-white/10 rounded-xl">
                    <h4 className="text-white font-bold mb-2">Deliberative (Plan-Then-Execute)</h4>
                    <p className="text-sm text-zinc-400 mb-3">
                        The agent creates a full plan first, then follows it step by step. More efficient but brittle when the environment changes mid-execution.
                    </p>
                    <div className="text-xs space-y-1">
                        <div className="text-green-400">+ More efficient for known tasks</div>
                        <div className="text-green-400">+ Easier to debug and review</div>
                        <div className="text-red-400">- Breaks when environment changes</div>
                        <div className="text-red-400">- Higher upfront cost</div>
                    </div>
                </div>
            </div>

            <h2>Why Context Length Matters</h2>
            <p>
                Every step the agent takes adds to its conversation history. After 20-30 steps, the context can grow to 50K+ tokens. This matters because:
            </p>
            <ul>
                <li><strong>Cost:</strong> You pay per token. Longer context = higher cost per step. This compounds exponentially.</li>
                <li><strong>Quality:</strong> LLMs perform worse with very long contexts. The agent may &quot;forget&quot; earlier observations.</li>
                <li><strong>Speed:</strong> Longer prompts take more time to process, slowing down the agent loop.</li>
            </ul>
            <p>
                This is why choosing a cost-effective model with good caching (like DeepSeek V3.2) is critical for agent workloads.
                See our <Link href="/compare/deepseek-vs-gpt4o" className="text-amber-400 hover:text-amber-300">cost comparison</Link> for details.
            </p>

            <div className="not-prose my-12 p-6 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-white font-bold text-sm mb-1">Key Insight</h4>
                        <p className="text-xs text-zinc-400">
                            The best agents are not the ones with the most powerful LLM — they&apos;re the ones with the best <strong>observation compression</strong>. OpenClaw&apos;s DOM-to-text compressor reduces a 500KB webpage to ~2KB of relevant signal.
                        </p>
                    </div>
                </div>
            </div>

            <div className="not-prose mt-16 p-8 border-t border-white/10 flex items-center justify-between">
                <Link href="/wiki/data-privacy" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Data Sovereignty
                </Link>
                <Link href="/wiki/goal-decomposition" className="inline-flex items-center gap-2 text-amber-400 font-bold hover:underline">
                    Next: Goal Decomposition <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </>
    );
}
