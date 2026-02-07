import Link from 'next/link';
import { Github } from 'lucide-react';
import Image from 'next/image';

export function SiteFooter() {
    return (
        <footer className="border-t border-white/10 bg-black py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">

                    {/* Brand & Author (EEAT 重点) */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="ClawKit Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-md"
                            />
                            <span className="font-bold text-xl text-white">ClawKit</span>
                        </div>
                        <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
                            The unofficial setup companion for OpenClaw.
                            Built to help developers configure, debug, and deploy AI agents without the frustration.
                        </p>
                        <div className="pt-2">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2">Built By</p>
                            <a href="https://github.com/branzoom" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
                                <Github className="w-4 h-4" />
                                <span className="font-medium">@branzoom</span>
                                <span className="text-zinc-500 text-sm">(and the community)</span>
                            </a>
                        </div>
                    </div>

                    {/* Tools Links */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Tools</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/tools/config" className="hover:text-white transition-colors">Config Wizard</Link></li>
                            <li><Link href="/tools/doctor" className="hover:text-white transition-colors">Local Doctor</Link></li>
                            <li><Link href="/tools/cost" className="hover:text-white transition-colors">Cost Estimator</Link></li>
                            <li><Link href="/skills" className="hover:text-white transition-colors">Skill Registry</Link></li>
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                            <li><Link href="/docs/getting-started/installation" className="hover:text-white transition-colors">Installation Guide</Link></li>
                            <li><Link href="/docs/troubleshooting/connection-errors" className="hover:text-white transition-colors">Troubleshooting</Link></li>
                            <li><Link href="/docs/guides/v1-to-v2-migration" className="hover:text-white transition-colors">Migration Guide</Link></li>
                            <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
                        <p className="text-zinc-600">
                            © {new Date().getFullYear()} ClawKit. Not affiliated with OpenClaw.
                        </p>
                        <div className="flex items-center gap-2 text-zinc-500">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs">Skills Updated: Feb 6, 2026 | 3 new plugins added</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="https://github.com/branzoom/getclawkit-web" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}