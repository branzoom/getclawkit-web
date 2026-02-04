import { Link } from '@/i18n/navigation'

export function SiteFooter() {
    return (
        <footer className="border-t border-white/10 bg-black py-16 text-zinc-400">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1 space-y-4">
                    <Link href="/" className="font-bold text-white text-lg flex items-center gap-2">
                        <span>🦞</span> GetClawKit
                    </Link>
                    <p className="text-sm leading-relaxed text-zinc-500">
                        The unofficial companion toolkit for OpenClaw.
                        Designed to simplify agent configuration, diagnosis, and discovery.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-medium mb-4">Core Tools</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/tools/config" className="hover:text-blue-400 transition-colors">Config Wizard</Link></li>
                        <li><Link href="/tools/doctor" className="hover:text-blue-400 transition-colors">Local Doctor</Link></li>
                        <li><Link href="/tools/cost" className="hover:text-blue-400 transition-colors">Cost Estimator</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-medium mb-4">Resources</h4>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/skills" className="hover:text-blue-400 transition-colors">Skill Registry</Link></li>
                        <li><Link href="/status" className="hover:text-blue-400 transition-colors">System Status</Link></li>
                        <li><Link href="/docs/migration" className="hover:text-blue-400 transition-colors">Migration Guide</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-medium mb-4">Legal</h4>
                    <ul className="space-y-3 text-sm">
                        <li><span className="text-zinc-600 cursor-not-allowed">Privacy Policy (N/A)</span></li>
                        <li><a href="https://github.com/openclaw" target="_blank" className="hover:text-blue-400 transition-colors">OpenClaw Official</a></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8 border-t border-white/5 text-xs text-center text-zinc-600 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© 2026 ClawKit. Open Source under MIT License.</p>
                <p>Not affiliated with or endorsed by the OpenClaw Team.</p>
            </div>
        </footer>
    );
}