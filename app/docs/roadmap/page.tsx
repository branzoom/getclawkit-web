import { Compass, Calendar, Target, Flag, Zap, Rocket, Globe, Shield } from 'lucide-react';
import Link from 'next/link';

export default function RoadmapPage() {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-500/20 rounded-xl">
                    <Target className="w-8 h-8 text-red-400" />
                </div>
                <h1 className="!my-0">The Horizon: Project Roadmap</h1>
            </div>

            <p className="lead">
                Our vision is to make autonomous agents accessible, safe, and cost-effective. This is our plan for 2026 and beyond.
            </p>

            <div className="space-y-12 my-16">
                {/* Milestone 1 */}
                <div className="relative pl-8 border-l border-red-500/30">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-0.5 rounded">Current Phase</span>
                        <h3 className="!my-0 text-foreground font-bold">Foundation & Ecology</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                        Focus on stable v2 core, ClawKit tool suite (Wizard, Doctor, Cost), and expanding the verified Skill Registry.
                    </p>
                    <ul className="grid md:grid-cols-2 gap-2">
                        <li className="flex items-center gap-2 text-xs text-foreground/80">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Config Wizard v1.0
                        </li>
                        <li className="flex items-center gap-2 text-xs text-foreground/80">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Doctor CLI 50+ Checks
                        </li>
                    </ul>
                </div>

                {/* Milestone 2 */}
                <div className="relative pl-8 border-l border-border">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-muted rounded-full" />
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded">Q3 2026</span>
                        <h3 className="!my-0 text-foreground font-bold">Distributed Signal Mesh</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                        Introduction of multi-agent coordination. One agent plans, while specialized sub-agents execute tasks in parallel.
                    </p>
                    <div className="p-4 bg-card rounded-xl border border-border text-xs text-muted-foreground italic">
                        "Enabling agents to talk to other agents via decentralized MCP bridges."
                    </div>
                </div>

                {/* Milestone 3 */}
                <div className="relative pl-8 border-l border-border">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-muted rounded-full" />
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2 py-0.5 rounded">Q4 2026</span>
                        <h3 className="!my-0 text-foreground font-bold">Self-Correcting Memory</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                        Local vector databases integrated directly into the core, allowing agents to learn from past mistakes without re-prompting.
                    </p>
                </div>
            </div>

            <div className="not-prose p-1 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-2xl">
                <div className="bg-card p-8 rounded-[calc(1rem-1px)] text-center">
                    <h3 className="text-foreground font-bold mb-4">Want to influence the roadmap?</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                        We are an open project. Your feedback on tools like <strong>Cost Estimator</strong> or <strong>Skill Registry</strong> directly shapes our priorities.
                    </p>
                    <Link href="https://github.com/branzoom/getclawkit-web" className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                        Join GitHub Discussions
                    </Link>
                </div>
            </div>
        </>
    );
}
