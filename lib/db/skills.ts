import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

// Skill detail page — /skills/[skillId]
export const getSkillById = unstable_cache(
    async (id: string) => {
        return prisma.skill.findUnique({ where: { id } });
    },
    ['skill-by-id'],
    { revalidate: 3600 }
);

// Skills registry page — lightweight index for client-side filtering
// Not wrapped in unstable_cache: 5700+ records exceed the 2MB cache limit
export async function getSkillsIndex() {
    return prisma.skill.findMany({
        select: {
            id: true,
            name: true,
            shortDesc: true,
            tags: true,
            author: true,
            stars: true,
            sourceRepo: true,
        },
        orderBy: { stars: 'desc' },
    });
}

// Total skill count for stats
export const getSkillsCount = unstable_cache(
    async () => {
        return prisma.skill.count();
    },
    ['skills-count'],
    { revalidate: 3600 }
);

// Sitemap — only id + lastUpdated
export async function getSitemapSkills() {
    return prisma.skill.findMany({
        select: { id: true, lastUpdated: true },
    });
}

// Random skills for homepage marquee
export const getRandomSkills = unstable_cache(
    async (count: number) => {
        // PostgreSQL random sampling
        const skills = await prisma.$queryRawUnsafe<
            Array<{ id: string; name: string; shortDesc: string; author: string }>
        >(
            `SELECT id, name, "shortDesc", author FROM "Skill" WHERE name IS NOT NULL AND length(name) > 2 ORDER BY RANDOM() LIMIT $1`,
            count
        );
        return skills;
    },
    ['skills-random'],
    { revalidate: 60 } // shorter cache for randomness
);
