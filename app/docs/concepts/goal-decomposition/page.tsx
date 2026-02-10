import { GitFork, ChevronRight, Target, Workflow, CheckCircle2, XCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function GoalDecompositionPage() {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                    <GitFork className="w-8 h-8 text-amber-400" />
                </div>
                <h1 className="!my-0">Goal Decomposition</h1>
            </div>

            <p className="lead">
                A user says &quot;Book me a flight to Tokyo next Tuesday.&quot; The agent must break this into dozens of concrete steps: open the browser, navigate to the airline site, search flights, compare prices, fill forms, and confirm. This process is called <strong>Goal Decomposition</strong>.
            </p>

            <h2>Why Decomposition Matters</h2>
            <p>
                LLMs are good at reasoning about individual steps, but they struggle with holding an entire complex plan in &quot;working memory.&quot; By breaking a high-level goal into a tree of sub-goals, we:
            </p>
            <ul>
                <li>Reduce cognitive load on each LLM call</li>
                <li>Make progress measurable (how many sub-goals completed?)</li>
                <li>Enable recovery — if one sub-goal fails, retry just that branch</li>
                <li>Allow parallelism — independent sub-goals can run concurrently</li>
            </ul>

            <h2>Decomposition Strategies</h2>

            <div className="not-prose grid md:grid-cols-2 gap-6 my-12">
                <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-center gap-2 text-blue-400 font-bold mb-4">
                        <Workflow className="w-5 h-5" /> Top-Down (Hierarchical)
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Break the goal into 3-5 major sub-goals, then recursively decompose each until reaching atomic actions the agent can execute directly.
                    </p>
                    <div className="bg-card/50 rounded-lg p-3 text-xs font-mono text-muted-foreground space-y-1">
                        <div>Book flight to Tokyo</div>
                        <div className="pl-4">1. Search available flights</div>
                        <div className="pl-8">1.1 Open airline website</div>
                        <div className="pl-8">1.2 Enter destination &quot;Tokyo&quot;</div>
                        <div className="pl-8">1.3 Select date &quot;next Tuesday&quot;</div>
                        <div className="pl-4">2. Compare options</div>
                        <div className="pl-4">3. Complete booking</div>
                    </div>
                </div>
                <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-center gap-2 text-purple-400 font-bold mb-4">
                        <Target className="w-5 h-5" /> Reactive (Step-by-Step)
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Don&apos;t plan ahead. At each step, look at the current state and decide the single next action that brings you closer to the goal.
                    </p>
                    <div className="bg-card/50 rounded-lg p-3 text-xs font-mono text-muted-foreground space-y-1">
                        <div className="text-green-400">State: Empty browser</div>
                        <div>Action: Navigate to airline.com</div>
                        <div className="text-green-400 mt-2">State: Airline homepage</div>
                        <div>Action: Click search field</div>
                        <div className="text-green-400 mt-2">State: Search focused</div>
                        <div>Action: Type &quot;Tokyo&quot;</div>
                        <div className="text-muted-foreground/70">... continues</div>
                    </div>
                </div>
            </div>

            <h2>OpenClaw&apos;s Approach: Hybrid</h2>
            <p>
                OpenClaw uses a <strong>hybrid strategy</strong>: reactive planning at the execution layer, with optional high-level goal hints. The user provides the top-level mission, and the agent decomposes reactively:
            </p>

            <div className="not-prose bg-card border border-border rounded-lg p-4 my-6">
                <pre className="text-sm text-foreground/80 overflow-x-auto"><code>{`// User's mission (high-level goal)
"Go to github.com/openai/openai-python and star the repo"

// Agent's internal decomposition (reactive):
// Step 1: navigate("https://github.com/openai/openai-python")
// Step 2: wait(page_loaded)
// Step 3: click("Star" button)
// Step 4: verify(star_count_increased)
// Done.`}</code></pre>
            </div>

            <h2>Failure & Recovery</h2>
            <p>
                Decomposition also defines how agents handle failure. When a sub-goal fails:
            </p>

            <div className="not-prose grid md:grid-cols-3 gap-4 my-8">
                <div className="p-5 bg-card border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        <h4 className="text-foreground font-bold text-sm">Retry</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Re-attempt the same sub-goal. Useful for transient failures like network timeouts or slow page loads.
                    </p>
                </div>
                <div className="p-5 bg-card border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <h4 className="text-foreground font-bold text-sm">Re-Plan</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Discard the current plan and re-decompose from the current state. Handles unexpected UI changes or navigation errors.
                    </p>
                </div>
                <div className="p-5 bg-card border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <XCircle className="w-4 h-4 text-red-400" />
                        <h4 className="text-foreground font-bold text-sm">Abort</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Stop execution and report the failure. Used when the goal is impossible given current constraints (e.g., login required but no credentials).
                    </p>
                </div>
            </div>

            <h2>The Cost of Over-Decomposition</h2>
            <p>
                More steps = more LLM calls = higher cost. A well-decomposed task might take 5-10 steps. A poorly decomposed one can take 50+, burning through your API budget. Tips to keep decomposition efficient:
            </p>
            <ul>
                <li><strong>Be specific in your mission prompt:</strong> &quot;Star the repo at github.com/openai/openai-python&quot; is better than &quot;Go star some OpenAI repo&quot;</li>
                <li><strong>Provide URLs when possible:</strong> Skip the search/navigation steps entirely</li>
                <li><strong>Set step limits:</strong> Configure <code>maxSteps</code> in your OpenClaw config to prevent runaway agents</li>
            </ul>

            <div className="not-prose my-12 p-6 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-foreground font-bold text-sm mb-1">Research Note</h4>
                        <p className="text-xs text-muted-foreground">
                            Goal decomposition in LLM agents is an active area of research. Techniques like Tree-of-Thought (ToT), ReAct, and Reflexion all address different aspects of this problem. OpenClaw&apos;s reactive approach is closest to the ReAct pattern.
                        </p>
                    </div>
                </div>
            </div>

            <div className="not-prose mt-16 p-8 border-t border-border flex items-center justify-between">
                <Link href="/docs/concepts/agent-theory" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Agent Fundamentals
                </Link>
                <Link href="/docs/concepts/tool-use" className="inline-flex items-center gap-2 text-amber-400 font-bold hover:underline">
                    Next: Tool Use Patterns <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </>
    );
}
