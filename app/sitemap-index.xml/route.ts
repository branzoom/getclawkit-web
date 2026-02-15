import { NextResponse } from 'next/server';
import { getSkillsCount, SITEMAP_PAGE_SIZE } from '@/lib/db/skills';

export const dynamic = 'force-dynamic';

export async function GET() {
    const baseUrl = 'https://getclawkit.com';

    let totalSkills = 0;
    try {
        totalSkills = await getSkillsCount();
    } catch {
        // DB unavailable — only return static sitemap
    }

    const skillPages = Math.ceil(totalSkills / SITEMAP_PAGE_SIZE);

    const sitemaps = [
        `${baseUrl}/sitemap.xml`, // static pages
    ];
    for (let i = 0; i < skillPages; i++) {
        sitemaps.push(`${baseUrl}/sitemap-skills/${i}`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((url) => `  <sitemap><loc>${url}</loc></sitemap>`).join('\n')}
</sitemapindex>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
