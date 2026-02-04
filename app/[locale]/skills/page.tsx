import SkillRegistry from '@/components/SkillRegistry';

export default function SkillsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Skill Registry</h1>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                    Explore the community-driven ecosystem of Skills, Adapters, and Tools for OpenClaw.
                </p>
            </div>

            <SkillRegistry />
        </div>
    );
}