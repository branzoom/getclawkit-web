import { NextRequest, NextResponse } from 'next/server';
import { getSkillsPaginated } from '@/lib/db/skills';

export async function GET(req: NextRequest) {
    const sp = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(sp.get('page') || '1', 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(sp.get('pageSize') || '30', 10) || 30));
    const search = (sp.get('search') || '').slice(0, 100);

    const data = await getSkillsPaginated({ page, pageSize, search });

    return NextResponse.json(data, {
        headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
    });
}
