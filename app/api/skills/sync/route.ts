import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const SYNC_API_KEY = process.env.SYNC_API_KEY;
const BATCH_SIZE = 50;

export async function POST(req: NextRequest) {
    // Auth check
    const authHeader = req.headers.get('authorization');
    if (!SYNC_API_KEY || authHeader !== `Bearer ${SYNC_API_KEY}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const skills: any[] = body.skills;

    if (!Array.isArray(skills) || skills.length === 0) {
        return NextResponse.json({ error: 'skills array is required' }, { status: 400 });
    }

    let created = 0;
    let updated = 0;
    let skipped = 0;
    const errors: string[] = [];

    // Process in batches to avoid connection overload
    for (let i = 0; i < skills.length; i += BATCH_SIZE) {
        const batch = skills.slice(i, i + BATCH_SIZE);

        const promises = batch.map(async (skill) => {
            if (!skill.id) {
                skipped++;
                return;
            }

            let lastUpdated: Date;
            try {
                lastUpdated = new Date(skill.lastUpdated);
                if (isNaN(lastUpdated.getTime())) lastUpdated = new Date();
            } catch {
                lastUpdated = new Date();
            }

            const data = {
                name: String(skill.name || ''),
                shortDesc: String(skill.shortDesc || ''),
                longDesc: String(skill.longDesc || ''),
                author: String(skill.author || ''),
                authorUrl: skill.authorUrl || null,
                stars: Number(skill.stars) || 0,
                lastUpdated,
                command: String(skill.command || ''),
                tags: Array.isArray(skill.tags)
                    ? skill.tags.filter((t: unknown): t is string => typeof t === 'string')
                    : [],
                fileSha: skill.file_sha || null,
                seoTitle: skill.seo_content?.seo_title || null,
                seoDesc: skill.seo_content?.seo_description || null,
                downloadUrl: skill.downloadUrl || null,
                sourceRepo: skill.source_repo || null,
                sourcePath: skill.source_path || null,
            };

            try {
                const existing = await prisma.skill.findUnique({
                    where: { id: skill.id },
                    select: { id: true },
                });

                await prisma.skill.upsert({
                    where: { id: skill.id },
                    update: data,
                    create: { id: skill.id, ...data },
                });

                if (existing) updated++;
                else created++;
            } catch (e: any) {
                errors.push(`${skill.id}: ${e.message}`);
            }
        });

        await Promise.all(promises);
    }

    return NextResponse.json({
        ok: true,
        total: skills.length,
        created,
        updated,
        skipped,
        errors: errors.length > 0 ? errors.slice(0, 20) : undefined,
    });
}
