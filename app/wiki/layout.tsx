import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Library, Home, ChevronRight, BookOpen } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Wiki - Deep Dives into OpenClaw & Agent Theory | ClawKit',
    description: 'Explore the technical architecture of OpenClaw, learn about AI agent theory, and follow the project roadmap.',
};

const wikiNav = [
    {
        title: 'The Forge (Technical)',
        items: [
            { title: 'Architecture Overview', href: '/wiki/architecture' },
            { title: 'Skill System Design', href: '/wiki/skill-system' },
            { title: 'Data Sovereignty', href: '/wiki/data-privacy' },
        ]
    },
    {
        title: 'The Grimoire (Theory)',
        items: [
            { title: 'Agent Fundamentals', href: '/wiki/agent-theory' },
            { title: 'Goal Decomposition', href: '/wiki/goal-decomposition' },
            { title: 'Tool Use Patterns', href: '/wiki/tool-use' },
        ]
    },
    {
        title: 'The Horizon (Project)',
        items: [
            { title: 'Project Roadmap', href: '/wiki/roadmap' },
            { title: 'Community Guidelines', href: '/wiki/community' },
        ]
    },
];

export default function WikiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            {/* Wiki Specific Header/Sub-header */}
            <div className="border-b border-orange-500/10 bg-orange-500/5">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                            <Library className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-white leading-none">ClawKit Wiki</h1>
                            <p className="text-xs text-orange-400/60 font-medium uppercase tracking-widest mt-1">Deep Learning & Theory</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="lg:w-64 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="sticky top-8">
                            <Link
                                href="/wiki"
                                className="flex items-center gap-2 text-sm font-bold text-white mb-6 hover:text-orange-400 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Wiki Dashboard
                            </Link>

                            <nav className="space-y-6">
                                {wikiNav.map((section, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                                            {section.title}
                                        </h3>
                                        <ul className="space-y-1">
                                            {section.items.map((item, itemIdx) => (
                                                <li key={itemIdx}>
                                                    <Link
                                                        href={item.href}
                                                        className="block text-sm text-zinc-400 hover:text-white hover:bg-white/5 px-2 py-1 rounded transition-colors"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </nav>

                            <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                <h4 className="text-sm font-bold text-white mb-2">Need Guidance?</h4>
                                <Link href="/docs" className="flex items-center gap-2 text-xs text-orange-400 hover:text-orange-300">
                                    <BookOpen className="w-3 h-3" />
                                    Switch to Docs
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <Breadcrumbs />

                        <article className="prose prose-invert prose-zinc max-w-none prose-orange">
                            {children}
                        </article>

                        {/* Wiki Footer CTA */}
                        <div className="mt-16 p-8 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl">
                            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">Wiki: Knowledge is Sovereignty</h3>
                                    <p className="text-sm text-zinc-400">
                                        Found a gap? Contribute to the Wiki on GitHub.
                                    </p>
                                </div>
                                <Link
                                    href="https://github.com/branzoom/getclawkit-web"
                                    target="_blank"
                                    className="px-6 py-2 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition-colors whitespace-nowrap"
                                >
                                    Contribute Now
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
