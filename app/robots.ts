import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'], // 保护 API 不被滥用
        },
        sitemap: 'https://getclawkit.com/sitemap.xml',
    };
}