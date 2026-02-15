import type { Metadata } from 'next';
import { Users, ChevronRight, Heart, GitPullRequest, MessageSquare, BookOpen, Shield, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Community & Contributing — Join the OpenClaw Ecosystem | ClawKit',
    description: 'Contribute to ClawKit and OpenClaw. Community guidelines, how to submit plugins, report bugs, and join the discussion.',
};

export default function CommunityPage() {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-500/20 rounded-xl">
                    <Users className="w-8 h-8 text-red-400" />
                </div>
                <h1 className="!my-0">Community Guidelines</h1>
            </div>

            <p className="lead">
                ClawKit and OpenClaw are open-source projects built by contributors like you. These guidelines help maintain a welcoming, productive community.
            </p>

            <h2>Code of Conduct</h2>
            <p>
                We follow a simple principle: <strong>treat everyone with respect</strong>. This community includes people from diverse backgrounds, experience levels, and perspectives. Harassment, discrimination, or personal attacks are not tolerated.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-6 my-12">
                <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-2xl">
                    <div className="flex items-center gap-2 text-green-400 font-bold mb-4">
                        <CheckCircle2 className="w-5 h-5" /> Encouraged
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Constructive feedback on code and ideas</li>
                        <li>Helping newcomers with setup issues</li>
                        <li>Sharing your use cases and configurations</li>
                        <li>Reporting bugs with reproduction steps</li>
                        <li>Suggesting features with clear rationale</li>
                    </ul>
                </div>
                <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
                    <div className="flex items-center gap-2 text-red-400 font-bold mb-4">
                        <AlertTriangle className="w-5 h-5" /> Not Acceptable
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Personal attacks or hostile language</li>
                        <li>Spam, self-promotion, or off-topic content</li>
                        <li>Sharing others&apos; private information</li>
                        <li>Submitting malicious code or Skills</li>
                        <li>Dismissing questions as &quot;obvious&quot;</li>
                    </ul>
                </div>
            </div>

            <h2>How to Contribute</h2>

            <div className="not-prose space-y-6 my-8">
                <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-center gap-2 text-blue-400 font-bold mb-3">
                        <GitPullRequest className="w-5 h-5" /> Pull Requests
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        We welcome PRs of all sizes — from typo fixes to new features.
                    </p>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                        <li><strong>1. Fork</strong> the repository and create a feature branch</li>
                        <li><strong>2. Develop</strong> your changes with clear, focused commits</li>
                        <li><strong>3. Test</strong> locally — run <code>npm run build</code> and verify no errors</li>
                        <li><strong>4. Submit</strong> your PR with a clear description of what changed and why</li>
                        <li><strong>5. Respond</strong> to review feedback promptly</li>
                    </ol>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-center gap-2 text-green-400 font-bold mb-3">
                        <MessageSquare className="w-5 h-5" /> Issues & Discussions
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                        Found a bug or have an idea? Open a GitHub Issue:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><strong>Bug reports:</strong> Include your OS, Node version, error messages, and steps to reproduce</li>
                        <li><strong>Feature requests:</strong> Describe the problem you&apos;re solving, not just the solution you want</li>
                        <li><strong>Questions:</strong> Check existing issues and the <Link href="/docs" className="text-blue-400 hover:text-blue-300">documentation</Link> first</li>
                    </ul>
                </div>

                <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-center gap-2 text-purple-400 font-bold mb-3">
                        <BookOpen className="w-5 h-5" /> Wiki & Documentation
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Spotted an error in the wiki or docs? Know something that should be documented? Documentation contributions are just as valuable as code changes. Follow the same PR process.
                    </p>
                </div>
            </div>

            <h2>Contributing Skills</h2>
            <p>
                Want to add a Skill to the <Link href="/skills" className="text-red-400 hover:text-red-300">Skill Registry</Link>? Here&apos;s the process:
            </p>
            <ol>
                <li><strong>Build your Skill</strong> following the MCP tool specification (see <Link href="/docs/concepts/skill-system" className="text-red-400 hover:text-red-300">Skill System Design</Link>)</li>
                <li><strong>Test thoroughly</strong> — document expected inputs and outputs</li>
                <li><strong>Submit for review</strong> — open a PR adding your Skill to the registry data file</li>
                <li><strong>Community review</strong> — maintainers and community members test and verify</li>
                <li><strong>Published</strong> — once approved, your Skill appears in the registry with a verified badge</li>
            </ol>

            <div className="not-prose my-12 p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-foreground font-bold text-sm mb-1">Security Policy</h4>
                        <p className="text-xs text-muted-foreground">
                            If you discover a security vulnerability, please <strong>do not</strong> open a public issue. Instead, report it privately via GitHub&apos;s security advisory feature or email the maintainers directly. We take security seriously and will respond within 48 hours.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Recognition</h2>
            <p>
                We believe in recognizing contributors:
            </p>
            <div className="not-prose grid md:grid-cols-3 gap-4 my-8">
                {[
                    { icon: <Heart className="w-5 h-5" />, title: 'Contributors List', desc: 'All contributors are listed in the README and on the website.', color: 'text-pink-400' },
                    { icon: <GitPullRequest className="w-5 h-5" />, title: 'PR Credits', desc: 'Every merged PR is credited in the changelog with your GitHub handle.', color: 'text-blue-400' },
                    { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Skill Authors', desc: 'Skills in the registry display the author name and link to their profile.', color: 'text-green-400' },
                ].map((item, i) => (
                    <div key={i} className="p-5 bg-card border border-border rounded-xl text-center">
                        <div className={`flex justify-center mb-3 ${item.color}`}>{item.icon}</div>
                        <h4 className="text-foreground font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="not-prose mt-16 p-8 border-t border-border flex items-center justify-between">
                <Link href="/docs/roadmap" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Project Roadmap
                </Link>
                <Link href="/docs" className="inline-flex items-center gap-2 text-red-400 font-bold hover:underline">
                    Back to Wiki Home <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </>
    );
}
