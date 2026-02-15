import { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

const baseUrl = 'https://getclawkit.com';

/**
 * Root sitemap: static pages only.
 * Skill sitemaps are served via /sitemap/[page]/route.ts
 * Sitemap index is at /sitemap-index.xml via /sitemap-index.xml/route.ts
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
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
}
