import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'], // 不让爬虫爬 API
        },
        sitemap: 'https://getclawkit.com/sitemap.xml',
    };
}