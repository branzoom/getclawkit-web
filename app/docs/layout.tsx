import type { Metadata } from 'next';
import Link from 'next/link';
import { Home } from 'lucide-react';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Documentation - ClawKit',
    description: 'Complete guides, tutorials, and troubleshooting for OpenClaw setup and configuration.',
};

const docNav = [
    {
        title: 'Getting Started',
        items: [
            { title: 'Installation Guide', href: '/docs/getting-started/installation' },
            { title: 'Your First Config', href: '/docs/getting-started/first-config' },
            { title: 'Docker Setup', href: '/docs/getting-started/docker-setup' },
        ]
    },
    {
        title: 'Troubleshooting',
        items: [
            { title: 'Connection Errors', href: '/docs/troubleshooting/connection-errors' },
            { title: 'JSON Parse Errors', href: '/docs/troubleshooting/json-parse-errors' },
            { title: 'Windows Issues', href: '/docs/troubleshooting/windows-issues' },
            { title: 'API Key Problems', href: '/docs/troubleshooting/api-key-problems' },
        ]
    },
    {
        title: 'Guides',
        items: [
            { title: 'v1 to v2 Migration', href: '/docs/guides/v1-to-v2-migration' },
            { title: 'Cost Optimization', href: '/docs/guides/cost-optimization' },
            { title: 'DeepSeek Setup', href: '/docs/guides/deepseek-setup' },
            { title: 'Plugin Installation', href: '/docs/guides/plugin-installation' },
        ]
    },
];

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="hidden lg:block w-64 flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="sticky top-8">
                            <Link
                                href="/docs"
                                className="flex items-center gap-2 text-sm font-bold text-white mb-6 hover:text-blue-400 transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                Documentation Home
                            </Link>

                            <nav>
                                {docNav.map((section: { title: string; items: { title: string; href: string }[] }, index: number) => (
                                    <div key={index} className="mb-6">
                                        <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                                            {section.title}
                                        </h4>
                                        <ul>
                                            {section.items.map((item: { title: string; href: string }, itemIndex: number) => (
                                                <li key={itemIndex} className="mb-2">
                                                    <Link
                                                        href={item.href}
                                                        className="text-sm text-zinc-300 hover:text-blue-400 transition-colors"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <Breadcrumbs />

                        <article className="prose prose-invert prose-zinc max-w-none">
                            {children}
                        </article>

                        {/* Footer CTA */}
                        <div className="mt-16 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
                            <p className="text-sm text-zinc-400 mb-4">
                                Try our automated tools to solve common issues instantly.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/tools/doctor"
                                    className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Run Local Doctor
                                </Link>
                                <Link
                                    href="/tools/config"
                                    className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    Config Wizard
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
