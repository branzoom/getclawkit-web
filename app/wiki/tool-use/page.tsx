import { Wrench, ChevronRight, Code2, Shield, AlertTriangle, Zap, FileJson, MousePointer, Globe, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function ToolUsePage() {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                    <Wrench className="w-8 h-8 text-amber-400" />
                </div>
                <h1 className="!my-0">Tool Use Patterns</h1>
            </div>

            <p className="lead">
                Tool use is what separates an AI agent from a chatbot. When an LLM can call functions — click buttons, read files, make API requests — it becomes capable of acting on the real world. This page explains common patterns and best practices.
            </p>

            <h2>How Tool Use Works</h2>
            <p>
                Modern LLMs support &quot;function calling&quot; or &quot;tool use&quot; natively. The flow is:
            </p>
            <ol className="space-y-4">
                <li>
                    <strong>Registration:</strong> You tell the LLM what tools are available, along with their descriptions and parameter schemas.
                </li>
                <li>
                    <strong>Invocation:</strong> During generation, the LLM outputs a structured tool call instead of regular text (e.g., <code>{`{"tool": "click", "params": {"selector": "#submit"}}`}</code>).
                </li>
                <li>
                    <strong>Execution:</strong> Your application intercepts the tool call, executes it, and feeds the result back to the LLM.
                </li>
                <li>
                    <strong>Continuation:</strong> The LLM processes the tool result and decides whether to call another tool or respond with text.
                </li>
            </ol>

            <div className="not-prose my-12 p-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-2xl">
                <div className="bg-black p-8 rounded-[calc(1rem-1px)]">
                    <h3 className="text-white font-bold mb-4">In OpenClaw, Every Tool is an MCP Skill</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        OpenClaw wraps all tools in the <strong>Model Context Protocol (MCP)</strong> standard. This means your tools work across any MCP-compatible client, and you can use community Skills without modification. Learn more in <Link href="/wiki/skill-system" className="text-orange-400 hover:text-orange-300">Skill System Design</Link>.
                    </p>
                </div>
            </div>

            <h2>Common Tool Patterns</h2>

            <div className="not-prose space-y-6 my-8">
                <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 text-blue-400 font-bold mb-3">
                        <MousePointer className="w-5 h-5" /> Pattern 1: Observe-Act
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                        The most basic pattern. The agent observes the environment (e.g., takes a screenshot), then acts on it (e.g., clicks a button).
                    </p>
                    <div className="bg-black/50 rounded-lg p-3 text-xs font-mono text-zinc-500 space-y-1">
                        <div><span className="text-blue-400">screenshot()</span> → &quot;I see a login form&quot;</div>
                        <div><span className="text-yellow-400">type()</span> → Enter username</div>
                        <div><span className="text-yellow-400">type()</span> → Enter password</div>
                        <div><span className="text-green-400">click()</span> → Click &quot;Login&quot; button</div>
                        <div><span className="text-blue-400">screenshot()</span> → Verify success</div>
                    </div>
                </div>

                <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 text-green-400 font-bold mb-3">
                        <FileJson className="w-5 h-5" /> Pattern 2: Extract-Transform
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                        Read data from one source, process it, and write it to another. Common for data collection and report generation.
                    </p>
                    <div className="bg-black/50 rounded-lg p-3 text-xs font-mono text-zinc-500 space-y-1">
                        <div><span className="text-blue-400">navigate()</span> → Open data source</div>
                        <div><span className="text-blue-400">extract_text()</span> → Pull table data</div>
                        <div><span className="text-purple-400">LLM reasoning</span> → Summarize findings</div>
                        <div><span className="text-green-400">write_file()</span> → Save report.md</div>
                    </div>
                </div>

                <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 text-purple-400 font-bold mb-3">
                        <Globe className="w-5 h-5" /> Pattern 3: Multi-Source Aggregation
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                        Visit multiple sites, gather information, and synthesize. Useful for research and comparison tasks.
                    </p>
                    <div className="bg-black/50 rounded-lg p-3 text-xs font-mono text-zinc-500 space-y-1">
                        <div><span className="text-blue-400">navigate(site_1)</span> → Get price A</div>
                        <div><span className="text-blue-400">navigate(site_2)</span> → Get price B</div>
                        <div><span className="text-blue-400">navigate(site_3)</span> → Get price C</div>
                        <div><span className="text-purple-400">LLM reasoning</span> → &quot;Site 2 is cheapest&quot;</div>
                    </div>
                </div>
            </div>

            <h2>Tool Design Best Practices</h2>
            <p>
                Whether you&apos;re building custom Skills or configuring OpenClaw, follow these principles:
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                {[
                    { title: 'Atomic tools', desc: 'Each tool should do one thing. "click_and_wait" is better split into "click" + "wait".', icon: <Zap className="w-4 h-4 text-yellow-400" /> },
                    { title: 'Clear descriptions', desc: 'The LLM picks tools based on descriptions. Write them for an LLM audience, not a human developer.', icon: <Code2 className="w-4 h-4 text-blue-400" /> },
                    { title: 'Strict schemas', desc: 'Use JSON Schema with required fields, enums, and descriptions. Vague schemas cause tool call errors.', icon: <FileJson className="w-4 h-4 text-green-400" /> },
                    { title: 'Safe defaults', desc: 'Tools that modify state should require explicit confirmation parameters. Never auto-delete without a flag.', icon: <Shield className="w-4 h-4 text-red-400" /> },
                ].map((item, i) => (
                    <div key={i} className="p-5 bg-zinc-900 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                            {item.icon}
                            <h4 className="text-white font-bold text-sm">{item.title}</h4>
                        </div>
                        <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                ))}
            </div>

            <h2>Common Pitfalls</h2>

            <div className="not-prose space-y-3 my-8">
                {[
                    { title: 'Too many tools', desc: 'Registering 50+ tools confuses the LLM. Keep it under 15 active tools per session.' },
                    { title: 'Overlapping tools', desc: 'If two tools can do the same thing (e.g., "fetch_url" and "http_get"), the LLM picks randomly. Remove duplicates.' },
                    { title: 'Missing error handling', desc: 'Tools should return clear error messages. A silent failure leaves the agent stuck in a retry loop.' },
                    { title: 'No timeout limits', desc: 'A tool that hangs forever blocks the entire agent loop. Always set execution timeouts.' },
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-zinc-500">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Tool Use Across Providers</h2>
            <p>
                Not all LLMs handle tool use equally. Here&apos;s how they compare for agent workloads:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-6">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="text-left text-white py-2">Provider</th>
                            <th className="text-left text-white py-2">Parallel Tools</th>
                            <th className="text-left text-white py-2">Reliability</th>
                            <th className="text-right text-white py-2">Notes</th>
                        </tr>
                    </thead>
                    <tbody className="text-zinc-300">
                        <tr className="border-b border-white/5">
                            <td className="py-2">GPT-4.1</td>
                            <td className="text-green-400">Yes</td>
                            <td className="text-green-400">High</td>
                            <td className="text-right text-xs text-zinc-500">Best schema adherence</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="py-2">Claude Sonnet 4.5</td>
                            <td className="text-green-400">Yes</td>
                            <td className="text-green-400">High</td>
                            <td className="text-right text-xs text-zinc-500">Strong reasoning</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="py-2">DeepSeek V3.2</td>
                            <td className="text-yellow-400">Limited</td>
                            <td className="text-yellow-400">Medium</td>
                            <td className="text-right text-xs text-zinc-500">Great value for cost</td>
                        </tr>
                        <tr className="border-b border-white/5">
                            <td className="py-2">Gemini 2.5 Flash</td>
                            <td className="text-green-400">Yes</td>
                            <td className="text-yellow-400">Medium</td>
                            <td className="text-right text-xs text-zinc-500">Fast, budget-friendly</td>
                        </tr>
                        <tr>
                            <td className="py-2">Llama 3.3 (Ollama)</td>
                            <td className="text-red-400">No</td>
                            <td className="text-yellow-400">Medium</td>
                            <td className="text-right text-xs text-zinc-500">Fully local / free</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="not-prose mt-16 p-8 border-t border-white/10 flex items-center justify-between">
                <Link href="/wiki/goal-decomposition" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Goal Decomposition
                </Link>
                <Link href="/wiki/roadmap" className="inline-flex items-center gap-2 text-amber-400 font-bold hover:underline">
                    Next: Project Roadmap <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </>
    );
}
