import Link from 'next/link';
import { Github } from 'lucide-react';
import Image from 'next/image';

const footerNav = [
    {
        title: 'Tools',
        links: [
            { label: 'Config Wizard', href: '/tools/config' },
            { label: 'Local Doctor', href: '/tools/doctor' },
            { label: 'Cost Estimator', href: '/tools/cost' },
            { label: 'Skill Registry', href: '/skills' },
            { label: 'DeepSeek vs GPT-4.1', href: '/compare/deepseek-vs-gpt4o' },
        ],
    },
    {
        title: 'Documentation',
        links: [
            { label: 'Overview', href: '/docs' },
            { label: 'Quick Start', href: '/docs/getting-started/quick-start' },
            { label: 'First Config', href: '/docs/getting-started/first-config' },
            { label: 'Docker Setup', href: '/docs/getting-started/docker-setup' },
            { label: 'DeepSeek Setup', href: '/docs/guides/deepseek-setup' },
            { label: 'Troubleshooting', href: '/docs/troubleshooting' },
            { label: 'V1 → V2 Migration', href: '/docs/guides/v1-to-v2-migration' },
        ],
    },
    {
        title: 'Concepts',
        links: [
            { label: 'Architecture', href: '/docs/concepts/architecture' },
            { label: 'Skill System', href: '/docs/concepts/skill-system' },
            { label: 'Agent Theory', href: '/docs/concepts/agent-theory' },
            { label: 'Tool Use Patterns', href: '/docs/concepts/tool-use' },
            { label: 'Data Privacy', href: '/docs/concepts/data-privacy' },
            { label: 'Roadmap', href: '/docs/roadmap' },
        ],
    },
    {
        title: 'Project',
        links: [
            { label: 'System Status', href: '/status' },
            { label: 'Contact', href: '/contact' },
            { label: 'Community', href: '/docs/community' },
            { label: 'Error Reference', href: '/errors/econnrefused' },
            { label: 'Privacy Policy', href: '/privacy' },
        ],
    },
];

export function SiteFooter() {
    return (
        <footer className="border-t border-border bg-background py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">

                    {/* Brand & Author */}
                    <div className="col-span-2 space-y-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="ClawKit Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-md"
                            />
                            <span className="font-bold text-xl text-foreground">ClawKit</span>
                        </div>
                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            The unofficial setup companion for OpenClaw.
                            Configure, debug, and deploy AI agents without the frustration.
                        </p>
                        <div className="pt-2">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-2">Built By</p>
                            <a href="https://github.com/branzoom" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground hover:text-blue-400 transition-colors">
                                <Github className="w-4 h-4" />
                                <span className="font-medium">@branzoom</span>
                                <span className="text-muted-foreground text-sm">(and the community)</span>
                            </a>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {footerNav.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-bold text-foreground mb-4 text-sm">{section.title}</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="hover:text-foreground transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground/70">
                        © {new Date().getFullYear()} ClawKit. Not affiliated with OpenClaw.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/branzoom/getclawkit-web" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
