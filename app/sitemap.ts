import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://getclawkit.com';

    // 定义所有静态路由
    const routes = [
        '',
        '/status',
        '/tools/config',
        '/tools/doctor',
        '/tools/cost',
        '/skills',
        '/docs/migration',
        '/docs/troubleshooting'
    ];

    // 为每个路由生成 en 和 zh 两个版本
    const sitemapEntries = routes.flatMap((route) => {
        return ['en', 'zh'].map((locale) => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1.0 : 0.8,
        }));
    });

    return sitemapEntries;
}