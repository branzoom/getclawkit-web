import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Wrench, Rocket, Shield, ArrowRight, Library, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DocsSearch from '@/components/DocsSearch';

export const metadata: Metadata = {
    title: 'Documentation - OpenClaw Setup Guides & Tutorials | ClawKit',
    description: 'Complete guides for OpenClaw setup, troubleshooting, and best practices. Fix errors, optimize costs, and deploy with confidence.',
};

const FAQ_ITEMS = [
    { q: 'Is ClawKit an official OpenClaw product?', a: 'No. ClawKit is an unofficial, community-driven project. We are not affiliated with the core team, but we build tools to make their ecosystem more accessible.' },
    { q: 'Is my API Key safe?', a: 'Yes. The Config Wizard runs entirely in your browser. Your API keys are never sent to our servers — they only exist in the JSON file you download.' },
    { q: 'Does this work on Windows?', a: 'Absolutely. Windows users often face "JSON Parse Error" due to backslash paths (e.g. C:\\Users). Our tools automatically detect and escape these paths for you.' },
    { q: 'Do I need Docker to run OpenClaw?', a: 'Not strictly required, but Docker is highly recommended to prevent dependency conflicts. ClawKit\'s Config Wizard can generate a docker-compose.yml optimized for v2.' },
    { q: 'How accurate is the Cost Estimator?', a: 'It provides a baseline estimate based on current public pricing (DeepSeek V3.2, GPT-4.1, Claude Sonnet 4.5, Gemini 2.5 Flash). Actual costs depend on your specific usage patterns.' },
    { q: 'Can I use DeepSeek with OpenClaw?', a: 'Yes! DeepSeek V3.2 is fully supported and is significantly cheaper than GPT-4.1 for similar performance. Our Config Wizard has a one-click preset for DeepSeek.' },
    { q: 'How do I fix "ECONNREFUSED" errors?', a: 'This is the #1 most common error. Usually your agent isn\'t running or Node.js is forcing IPv6. Try using 127.0.0.1 instead of localhost, or run our Local Doctor tool.' },
    { q: 'What changed in OpenClaw v2?', a: 'v2 uses strict JSON instead of YAML, has a new plugin system with skill registry, and strongly recommends Docker. See our Migration Guide for details.' },
    { q: 'How can I submit my own Skill?', a: 'Ensure your GitHub repo has a valid README.md or SKILL.md with YAML frontmatter, then submit a PR to our seeds.json file.' },
];

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
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
                { title: 'Quick Start Guide', href: '/docs/getting-started/quick-start' },
                { title: 'Your First Config', href: '/docs/getting-started/first-config' },
                { title: 'Docker Setup Tutorial', href: '/docs/getting-started/docker-setup' },
            ],
        },
        {
            title: 'Troubleshooting',
            icon: <Wrench className="w-6 h-6" />,
            color: 'text-green-400',
            bg: 'bg-green-500/10 border-green-500/20',
            description: 'Fix common errors and issues.',
            articles: [
                { title: 'Fix "Connection Refused" Errors', href: '/docs/troubleshooting/connection-errors' },
                { title: 'JSON Parse Errors', href: '/docs/troubleshooting/json-parse-errors' },
                { title: 'Windows-Specific Issues', href: '/docs/troubleshooting/windows-issues' },
                { title: 'API Key Problems', href: '/docs/troubleshooting/api-key-problems' },
            ],
        },
        {
            title: 'Guides',
            icon: <BookOpen className="w-6 h-6" />,
            color: 'text-purple-400',
            bg: 'bg-purple-500/10 border-purple-500/20',
            description: 'In-depth tutorials and how-tos.',
            articles: [
                { title: 'Cost Optimization Guide', href: '/docs/guides/cost-optimization' },
                { title: 'DeepSeek Setup Guide', href: '/docs/guides/deepseek-setup' },
                { title: 'Plugin Installation', href: '/docs/guides/plugin-installation' },
                { title: 'v1 to v2 Migration', href: '/docs/guides/v1-to-v2-migration' },
            ],
        },
        {
            title: 'Concepts',
            icon: <Library className="w-6 h-6" />,
            color: 'text-orange-400',
            bg: 'bg-orange-500/10 border-orange-500/20',
            description: 'Architecture and theory deep dives.',
            articles: [
                { title: 'Architecture Overview', href: '/docs/concepts/architecture' },
                { title: 'Skill System', href: '/docs/concepts/skill-system' },
                { title: 'Agent Theory', href: '/docs/concepts/agent-theory' },
                { title: 'Tool Use Patterns', href: '/docs/concepts/tool-use' },
                { title: 'Data Privacy & Sovereignty', href: '/docs/concepts/data-privacy' },
                { title: 'Goal Decomposition', href: '/docs/concepts/goal-decomposition' },
            ],
        },
        {
            title: 'Community',
            icon: <Shield className="w-6 h-6" />,
            color: 'text-cyan-400',
            bg: 'bg-cyan-500/10 border-cyan-500/20',
            description: 'Contributing, roadmap, and governance.',
            articles: [
                { title: 'Community & Contributing', href: '/docs/community' },
                { title: 'Project Roadmap', href: '/docs/roadmap' },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

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
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
                            Complete guides, tutorials, and troubleshooting for OpenClaw. Fix errors in minutes, not hours.
                        </p>

                        {/* Search */}
                        <DocsSearch />
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
                            <p className="text-sm text-zinc-400">Fix &quot;Connection Refused&quot; Errors</p>
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
                        {docCategories.map((category, idx) => (
                            <div key={idx}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={category.color}>
                                        {category.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                                        <p className="text-sm text-zinc-500">{category.description}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {category.articles.map((article, articleIdx) => (
                                        <Link
                                            key={articleIdx}
                                            href={article.href}
                                            className={`p-4 border rounded-xl ${category.bg} hover:scale-[1.02] transition-transform group`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <h3 className="font-semibold text-white mb-1">
                                                    {article.title}
                                                </h3>
                                                <ArrowRight className={`w-5 h-5 ${category.color} opacity-0 group-hover:opacity-100 transition-opacity shrink-0`} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-20 pt-16 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-8">
                            <HelpCircle className="w-6 h-6 text-yellow-400" />
                            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                        </div>

                        <Accordion type="single" collapsible className="w-full max-w-3xl">
                            {FAQ_ITEMS.map((item, i) => (
                                <AccordionItem key={i} value={`faq-${i}`} className="border-white/10">
                                    <AccordionTrigger className="text-white hover:text-blue-400 text-left">
                                        {item.q}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-zinc-400">
                                        {item.a}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-16 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl text-center">
                        <h3 className="text-2xl font-bold text-white mb-3">Can&apos;t Find What You&apos;re Looking For?</h3>
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
