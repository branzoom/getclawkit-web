import { MetadataRoute } from 'next';
// 确保 tsconfig 允许读取 json，或者用 fs 读取
import skills from '@/data/skills.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://getclawkit.com';

    // 1. 静态核心页面 (权重高)
    const staticRoutes = [
        '',
        '/status',
        '/tools/config',
        '/tools/doctor',
        '/tools/cost',
        '/skills',
        '/docs',
        '/docs/getting-started/installation',
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
        '/wiki',
        '/wiki/architecture',
        '/wiki/roadmap',
        '/compare/deepseek-vs-gpt4o',
        '/errors/econnrefused',
        '/privacy',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : (route === '/docs' ? 0.9 : 0.8),
    }));

    // 2. 动态 pSEO 页面 (Skills)
    // 自动为每一个 Skill 生成一个 Sitemap 条目
    const skillRoutes = skills.map((skill) => ({
        url: `${baseUrl}/skills/${skill.id}`,
        lastModified: new Date(skill.lastUpdated), // 告诉 Google 这是什么时候更新的
        changeFrequency: 'weekly' as const,
        priority: 0.6, // 权重略低于核心页，但依然重要
    }));

    return [...staticRoutes, ...skillRoutes];
}