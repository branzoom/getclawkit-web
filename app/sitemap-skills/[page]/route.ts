import { NextResponse } from 'next/server';
import { getSitemapSkillsPaginated } from '@/lib/db/skills';

export const dynamic = 'force-dynamic';

export async function GET(
    _request: Request,
    props: { params: Promise<{ page: string }> }
) {
    const { page } = await props.params;
    const pageNum = parseInt(page, 10);

    if (isNaN(pageNum) || pageNum < 0) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const baseUrl = 'https://getclawkit.com';

    let skills: Array<{ id: string; lastUpdated: Date }> = [];
    try {
        skills = await getSitemapSkillsPaginated(pageNum);
    } catch {
        return new NextResponse('Service Unavailable', { status: 503 });
    }

    if (!skills.length) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${skills
    .map(
        (skill) => `  <url>
    <loc>${baseUrl}/skills/${skill.id}</loc>
    <lastmod>${new Date(skill.lastUpdated).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    });
}
