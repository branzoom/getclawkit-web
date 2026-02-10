import { MetadataRoute } from 'next';
import { getSitemapSkills } from '@/lib/db/skills';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://getclawkit.com';

    // 1. Static core pages
    const staticRoutes = [
        '',
        '/status',
        '/tools/config',
        '/tools/doctor',
        '/tools/cost',
        '/skills',
        '/docs',
        '/docs/getting-started/quick-start',
        '/docs/getting-started/first-config',
        '/docs/getting-started/docker-setup',
        '/docs/troubleshooting/connection-errors',
        '/docs/troubleshooting/json-parse-errors',
        '/docs/troubleshooting/windows-issues',
        '/docs/troubleshooting/api-key-problems',
        '/docs/guides/v1-to-v2-migration',
        '/docs/guides/cost-optimization',
        '/docs/guides/deepseek-setup',
        '/docs/guides/plugin-installation',
        '/docs/guides/security-checklist',
        '/docs/concepts/architecture',
        '/docs/concepts/skill-system',
        '/docs/concepts/data-privacy',
        '/docs/concepts/agent-theory',
        '/docs/concepts/goal-decomposition',
        '/docs/concepts/tool-use',
        '/docs/roadmap',
        '/docs/community',
        '/docs/migration',
        '/docs/troubleshooting',
        '/compare/deepseek-vs-gpt4o',
        '/compare/model-matrix',
        '/errors/econnrefused',
        '/contact',
        '/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date('2026-02-06'),
        changeFrequency: (route === '' || route === '/status' ? 'daily' : 'weekly') as 'daily' | 'weekly',
        priority: route === '' ? 1.0 : (route === '/docs' ? 0.9 : 0.8),
    }));

    // 2. Dynamic pSEO pages (Skills) — from DB
    const skills = await getSitemapSkills();
    const skillRoutes = skills.map((skill: { id: string; lastUpdated: Date }) => ({
        url: `${baseUrl}/skills/${skill.id}`,
        lastModified: new Date(skill.lastUpdated),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...skillRoutes];
}
