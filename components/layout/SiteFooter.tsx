import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter } from 'lucide-react';

export function SiteFooter() {
    return (
        <footer className="border-t border-white/10 bg-black pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:opacity-80 transition-opacity">
                            <Image src="/logo.png" alt="ClawKit" width={24} height={24} className="rounded" />
                            ClawKit
                        </Link>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            The essential unofficial toolkit for the OpenClaw ecosystem. Built for developers, by developers.
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://github.com/your-repo/openclaw-nexus" target="_blank" className="text-zinc-400 hover:text-white transition-colors" aria-label="GitHub">
                                <Github className="w-5 h-5" />
                            </Link>
                            <Link href="https://twitter.com/your_handle" target="_blank" className="text-zinc-400 hover:text-white transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Column 1: Tools */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Core Tools</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/tools/config" className="hover:text-blue-400 transition-colors">Config Wizard</Link></li>
                            <li><Link href="/tools/doctor" className="hover:text-green-400 transition-colors">Local Doctor</Link></li>
                            <li><Link href="/tools/cost" className="hover:text-purple-400 transition-colors">Cost Estimator</Link></li> {/* [修复1] 补全 Cost */}
                            <li><Link href="/skills" className="hover:text-orange-400 transition-colors">Skill Registry</Link></li>
                            <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2: Resources (原 Support) */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Resources</h3> {/* 改名更准确 */}
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/docs/migration" className="hover:text-white transition-colors">Migration Guide 🦞</Link></li> {/* [修复2] 补全 SEO 重点页 */}
                            <li><Link href="/docs/troubleshooting" className="hover:text-white transition-colors">Troubleshooting</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="https://github.com/openclaw/openclaw" target="_blank" className="hover:text-white transition-colors">OpenClaw Docs</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 3: Legal */}
                    <div>
                        <h3 className="font-bold text-white mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-zinc-400">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
                    <p>© 2026 ClawKit. All rights reserved.</p>
                    <p>Not affiliated with or endorsed by the official OpenClaw team.</p>
                </div>
            </div>
        </footer>
    );
}