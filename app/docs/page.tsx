import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Wrench, Rocket, GitCompare, Shield, ArrowRight, Library } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Documentation - OpenClaw Setup Guides & Tutorials | ClawKit',
    description: 'Complete guides for OpenClaw setup, troubleshooting, and best practices. Fix errors, optimize costs, and deploy with confidence.',
};

export default function DocsIndexPage() {
    const docCategories = [
        {
            title: 'Getting Started',
            icon: <Rocket className="w-6 h-6" />,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/20',
            description: 'New to OpenClaw? Start here.',
            articles: [
                { title: 'Installation Guide', href: '/docs/getting-started/installation', status: '✅ Live' },
                { title: 'Your First Config', href: '/docs/getting-started/first-config', status: '✅ Live' },
                { title: 'Docker Setup Tutorial', href: '/docs/getting-started/docker-setup', status: '✅ Live' },
            ]
        },
        {
            title: 'Troubleshooting',
            icon: <Wrench className="w-6 h-6" />,
            color: 'text-green-400',
            bg: 'bg-green-500/10 border-green-500/20',
            description: 'Fix common errors and issues.',
            articles: [
                { title: 'Fix "Connection Refused" Errors', href: '/docs/troubleshooting/connection-errors', status: '✅ Live' },
                { title: 'JSON Parse Errors', href: '/docs/troubleshooting/json-parse-errors', status: '✅ Live' },
                { title: 'Windows-Specific Issues', href: '/docs/troubleshooting/windows-issues', status: '✅ Live' },
                { title: 'API Key Problems', href: '/docs/troubleshooting/api-key-problems', status: '✅ Live' },
            ]
        },
        {
            title: 'Guides',
            icon: <BookOpen className="w-6 h-6" />,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10 border-purple-500/20',
            description: 'In-depth tutorials and how-tos.',
            articles: [
                { title: 'Cost Optimization Guide', href: '/docs/guides/cost-optimization', status: '✅ Live' },
                { title: 'DeepSeek Setup Guide', href: '/docs/guides/deepseek-setup', status: '✅ Live' },
                { title: 'Plugin Installation', href: '/docs/guides/plugin-installation', status: '✅ Live' },
                { title: 'v1 to v2 Migration', href: '/docs/guides/v1-to-v2-migration', status: '✅ Live' },
            ]
        },
        {
            title: 'Deep Dive (Wiki)',
            icon: <Library className="w-6 h-6" />,
            color: 'text-orange-400',
            bg: 'bg-orange-500/10 border-orange-500/20',
            description: 'Architecture and Agent Theory.',
            articles: [
                { title: 'Architecture Overview', href: '/wiki/architecture', status: '✅ Wiki' },
                { title: 'Project Roadmap', href: '/wiki/roadmap', status: '✅ Wiki' },
            ]
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <BookOpen className="w-3 h-3" />
                            Documentation
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            OpenClaw Setup Guides
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Complete guides, tutorials, and troubleshooting for OpenClaw. Fix errors in minutes, not hours.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="grid md:grid-cols-3 gap-4 mb-16">
                        <Link
                            href="/docs/troubleshooting/connection-errors"
                            className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-colors group"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Wrench className="w-5 h-5 text-green-400" />
                                <h3 className="font-bold text-white group-hover:text-green-400">Most Popular</h3>
                            </div>
                            <p className="text-sm text-zinc-400">Fix "Connection Refused" Errors</p>
                            <div className="flex items-center gap-2 mt-3 text-green-400 text-sm">
                                Read Guide <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>

                        <Link
                            href="/tools/doctor"
                            className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-colors group"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Wrench className="w-5 h-5 text-blue-400" />
                                <h3 className="font-bold text-white group-hover:text-blue-400">Quick Fix</h3>
                            </div>
                            <p className="text-sm text-zinc-400">Auto-diagnose with Local Doctor</p>
                            <div className="flex items-center gap-2 mt-3 text-blue-400 text-sm">
                                Run Tool <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>

                        <Link
                            href="/tools/config"
                            className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-xl hover:bg-purple-500/20 transition-colors group"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Rocket className="w-5 h-5 text-purple-400" />
                                <h3 className="font-bold text-white group-hover:text-purple-400">Start Fresh</h3>
                            </div>
                            <p className="text-sm text-zinc-400">Generate error-free configs</p>
                            <div className="flex items-center gap-2 mt-3 text-purple-400 text-sm">
                                Open Wizard <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </div>

                    {/* Documentation Categories */}
                    <div className="space-y-12">
                        {docCategories.map((category: { title: string; icon: React.ReactNode; color: string; bg: string; description: string; articles: { title: string; href: string; status: string }[] }, idx: number) => (
                            <div key={idx}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`${category.color}`}>
                                        {category.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                                        <p className="text-sm text-zinc-500">{category.description}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {category.articles.map((article: { title: string; href: string; status: string }, articleIdx: number) => (
                                        <Link
                                            key={articleIdx}
                                            href={article.href}
                                            className={`p-4 border rounded-xl ${category.bg} hover:scale-[1.02] transition-transform group ${article.status !== '✅ Live' && article.status !== '✅ Wiki' ? 'opacity-60 pointer-events-none' : ''}`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-white group-hover:${category.color} mb-1">
                                                        {article.title}
                                                    </h3>
                                                    <span className={`text-xs ${article.status === '✅ Live' || article.status === '✅ Wiki' ? 'text-green-400' : 'text-zinc-500'}`}>
                                                        {article.status}
                                                    </span>
                                                </div>
                                                {(article.status === '✅ Live' || article.status === '✅ Wiki') && (
                                                    <ArrowRight className={`w-5 h-5 ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-20 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold text-white mb-3">Can't Find What You're Looking For?</h3>
                        <p className="text-zinc-400 mb-6">
                            Try our automated tools to solve common issues instantly.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/tools/doctor"
                                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Run Local Doctor
                            </Link>
                            <Link
                                href="/tools/config"
                                className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
                            >
                                Config Wizard
                            </Link>
                            <Link
                                href="/skills"
                                className="px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
                            >
                                Browse Plugins
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
