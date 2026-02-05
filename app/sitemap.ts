import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://getclawkit.com';

    // 定义所有静态路由
    const routes = [
        '', // 首页
        '/status',
        '/tools/config',
        '/tools/doctor',
        '/tools/cost', // 如果你保留了这个页面
        '/skills',
        '/docs/migration',
        '/docs/troubleshooting'
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`, // 直接拼接，没有 locale
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    }));
}