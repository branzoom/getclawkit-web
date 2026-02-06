import { GitBranch, Terminal, Shield, Cpu, Activity, Zap, Box, Lock, Globe } from 'lucide-react';
import Link from 'next/link';

export default function ArchitecturePage() {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                    <Cpu className="w-8 h-8 text-orange-400" />
                </div>
                <h1 className="!my-0">The Signal & The Act: Architecture Overview</h1>
            </div>

            <p className="lead">
                To master OpenClaw, you must understand how it transforms raw text into multi-step browser actions. It is not just a wrapper around GPT-4; it is a signal processing engine.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-6 my-12">
                <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 text-white font-bold mb-4">
                        <Zap className="w-5 h-5 text-yellow-400" /> Control Loop
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        OpenClaw uses a <strong>Reactive Planning</strong> loop. It doesn't plan the whole mission upfront; it observes the environment (DOM/Logs) and decides the next 100ms.
                    </p>
                </div>
                <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 text-white font-bold mb-4">
                        <Box className="w-5 h-5 text-blue-400" /> MCP Integration
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Every tool in OpenClaw is an <strong>MCP Server</strong> (Model Context Protocol). This allows the agent to treat your File System like its own memory.
                    </p>
                </div>
            </div>

            <h2>The Decision Pipeline</h2>
            <ol className="space-y-4">
                <li>
                    <strong>Ingest:</strong> The agent scrapes the current UI state using a specialized DOM-to-Text compressor.
                </li>
                <li>
                    <strong>Synthesize:</strong> The compressed signal is combined with the user's &quot;Mission Objective&quot; and previous history.
                </li>
                <li>
                    <strong>Reason:</strong> The LLM (Brain) determines if a tool call is needed or if the mission is complete.
                </li>
                <li>
                    <strong>Execute:</strong> The chosen Skill (Skill System) performs the action (Click, Type, Fetch) and returns the result.
                </li>
            </ol>

            <div className="my-12 p-1 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl overflow-hidden">
                <div className="bg-black p-8 rounded-[calc(1rem-1px)]">
                    <h3 className="!mt-0 text-white font-bold flex items-center gap-2">
                        <Lock className="w-5 h-5 text-green-400" /> Data Sovereignty
                    </h3>
                    <p className="text-zinc-400 text-sm">
                        Unlike cloud-based agents, OpenClaw architecture keeps the <strong>Signal Phase</strong> local. Only the reasoning prompt is sent to the LLM, while the raw DOM remains encrypted in your local memory.
                    </p>
                </div>
            </div>

            <h2>Advanced: The Tree-of-Thought Guard</h2>
            <p>
                OpenClaw v2 introduces a "Validator" layer. If the agent makes a potentially destructive action (like <code>rm -rf</code>), the architecture forces a secondary LLM check to verify intent against safety protocols.
            </p>

            <div className="not-prose mt-16 p-8 border-t border-white/10 text-center">
                <p className="text-zinc-500 mb-4 italic italic">"Architecture is what happens when you stop guessing and start measuring."</p>
                <Link href="/wiki/agent-theory" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:underline">
                    Next: Understanding Agent Theory <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </>
    );
}

// Minimal placeholder component since I don't have ChevronRight imported here but in the layout
function ChevronRight(props: any) {
    return <Activity {...props} />; // Placeholder
}
