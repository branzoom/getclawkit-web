import Link from 'next/link';
import { Library, BookOpen, Rocket, GitBranch, Zap, Layers, Cpu, Compass, ChevronRight } from 'lucide-react';

export default function WikiIndexPage() {
    const sections = [
        {
            title: 'The Forge',
            icon: <Cpu className="w-6 h-6" />,
            description: 'Deep dives into OpenClaw internals, architecture, and core systems.',
            color: 'text-orange-400',
            bg: 'bg-orange-500/10 border-orange-500/20',
            links: [
                { title: 'Architecture Overview', href: '/wiki/architecture', desc: 'How OpenClaw processes signals and makes decisions.' },
                { title: 'Skill System Design', href: '/wiki/skill-system', desc: 'Understanding the MCP-based plugin architecture.' },
            ]
        },
        {
            title: 'The Grimoire',
            icon: <Layers className="w-6 h-6" />,
            description: 'Core concepts, agent theory, and the philosophy behind autonomous tools.',
            color: 'text-amber-400',
            bg: 'bg-amber-500/10 border-amber-500/20',
            links: [
                { title: 'Agent Fundamentals', href: '/wiki/agent-theory', desc: 'Memory, Planning, and Tool Use explained.' },
                { title: 'Goal Decomposition', href: '/wiki/goal-decomposition', desc: 'How agents break complex tasks into sub-steps.' },
            ]
        },
        {
            title: 'The Horizon',
            icon: <Compass className="w-6 h-6" />,
            description: 'Project roadmap, community guidelines, and future visions.',
            color: 'text-red-400',
            bg: 'bg-red-500/10 border-red-500/20',
            links: [
                { title: 'Project Roadmap', href: '/wiki/roadmap', desc: 'What is coming next for OpenClaw and ClawKit.' },
                { title: 'Community Guidelines', href: '/wiki/community', desc: 'How to contribute effectively.' },
            ]
        }
    ];

    return (
        <>
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">The Repository of Knowledge</h2>
                <p className="text-zinc-400 max-w-2xl leading-relaxed">
                    Welcome to the ClawKit Wiki. While the <strong>Documentation</strong> focuses on &quot;How to run it&quot;,
                    the <strong>Wiki</strong> is dedicated to &quot;How it works&quot; and &quot;Why we built it like this&quot;.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
                <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl">
                    <Zap className="w-6 h-6 text-yellow-400 mb-4" />
                    <h3 className="font-bold text-white mb-2">Fast Track</h3>
                    <p className="text-sm text-zinc-500 mb-4">Just looking to fix an error?</p>
                    <Link href="/docs" className="text-sm text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1">
                        Go to Docs <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
                {/* Add more highlights if needed */}
            </div>

            <div className="space-y-12">
                {sections.map((section, idx) => (
                    <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: `${idx * 150}ms` }}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`${section.color}`}>
                                {section.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                                <p className="text-sm text-zinc-500">{section.description}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {section.links.map((link, linkIdx) => (
                                <Link
                                    key={linkIdx}
                                    href={link.href}
                                    className={`p-5 rounded-2xl border ${section.bg} hover:scale-[1.01] transition-transform group`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-bold text-white group-hover:${section.color} transition-colors">
                                            {link.title}
                                        </h4>
                                        <ChevronRight className={`w-4 h-4 ${section.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                    </div>
                                    <p className="text-sm text-zinc-400">{link.desc}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
