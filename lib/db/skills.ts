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

// Paginated skills with optional search
const skillSelectFields = {
    id: true,
    name: true,
    shortDesc: true,
    tags: true,
    author: true,
    stars: true,
    sourceRepo: true,
} as const;

export async function getSkillsPaginated({
    page = 1,
    pageSize = 30,
    search = '',
}: {
    page?: number;
    pageSize?: number;
    search?: string;
}) {
    const skip = (page - 1) * pageSize;

    const where = search.trim()
        ? {
              OR: [
                  { name: { contains: search, mode: 'insensitive' as const } },
                  { shortDesc: { contains: search, mode: 'insensitive' as const } },
                  { author: { contains: search, mode: 'insensitive' as const } },
                  { tags: { has: search.toLowerCase() } },
              ],
          }
        : {};

    const [skills, total] = await Promise.all([
        prisma.skill.findMany({
            where,
            select: skillSelectFields,
            orderBy: { stars: 'desc' },
            skip,
            take: pageSize,
        }),
        prisma.skill.count({ where }),
    ]);

    return { skills, total, page, pageSize };
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
