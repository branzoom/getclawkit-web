import type { Metadata } from 'next';
import { skills } from '@/data/skills';
import SkillRegistry from '@/components/SkillRegistry';
import { Package, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Skill Registry - OpenClaw Plugins & Tools',
    description: 'Discover and install verified skills for OpenClaw. Browser automation, Crypto tracking, Discord bots, and more.',
};

export default function SkillsPage() {
    // Extract lightweight index on the server — only send ~1MB to client instead of 19MB
    const skillsIndex = skills.map(s => ({
        id: s.id,
        name: String(s.name || ''),
        shortDesc: String(s.shortDesc || ''),
        tags: Array.isArray(s.tags) ? s.tags.filter((t): t is string => typeof t === 'string') : [],
        author: s.author || '',
        stars: s.stars || 0,
        source_repo: s.source_repo || '',
    }));

    return (
        <div className="container mx-auto px-4 py-12 max-w-7xl">
            {/* Header */}
            <div className="text-center mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                    <Package className="w-3 h-3" /> Community Registry
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                    Supercharge your <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Agent Capabilities.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Browse {skillsIndex.length.toLocaleString()}+ community-verified skills. From web browsing to image generation, find the tools to build your dream agent.
                </p>
            </div>

            {/* The Registry Component — receives lightweight data as props */}
            <SkillRegistry skills={skillsIndex} />

            {/* SEO Content: Developer FAQ */}
            <div className="mt-24 border-t border-white/10 pt-16">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Developer FAQ
                </h2>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                    <div className="space-y-2">
                        <h3 className="font-bold text-white text-base">How do I install these skills?</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Click the &quot;Install&quot; button on any card to get the CLI command.
                            Run it in your terminal where OpenClaw is installed.
                            Example: <code>clawhub install skill-name</code>
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-white text-base">Are these safe to use?</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            We manually verify the top-ranked skills.
                            However, always review the code for community-submitted skills before running them in production environments.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold text-white text-base">Can I submit my own skill?</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Yes! Submit a PR to our GitHub repository.
                            Once approved, it will automatically appear in this registry within 24 hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}