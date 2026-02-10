import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const jsonPath = path.join(process.cwd(), 'data', 'skills.json');

    console.log(`Reading file: ${jsonPath}...`);
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const skills: any[] = JSON.parse(rawData);

    console.log(`Importing ${skills.length} records...`);

    let count = 0;
    let skipped = 0;

    for (const skill of skills) {
        if (!skill.id) {
            console.warn(`Skipping invalid entry: ${skill.name}`);
            skipped++;
            continue;
        }

        // Parse lastUpdated safely — fall back to now if invalid
        let lastUpdated: Date;
        try {
            lastUpdated = new Date(skill.lastUpdated);
            if (isNaN(lastUpdated.getTime())) lastUpdated = new Date();
        } catch {
            lastUpdated = new Date();
        }

        await prisma.skill.upsert({
            where: { id: skill.id },
            update: {
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
            },
            create: {
                id: skill.id,
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
            },
        });

        count++;
        if (count % 100 === 0) {
            process.stdout.write(`\rProcessed: ${count}/${skills.length}`);
        }
    }

    console.log(`\nImport complete: ${count} records written, ${skipped} skipped.`);

    // Post-seed verification
    const dbCount = await prisma.skill.count();
    const jsonIds = new Set(skills.filter(s => s.id).map(s => s.id));
    const dbSkills = await prisma.skill.findMany({ select: { id: true } });
    const dbIds = new Set(dbSkills.map((s: { id: string }) => s.id));

    const missingInDb = [...jsonIds].filter(id => !dbIds.has(id));
    const extraInDb = [...dbIds].filter(id => !jsonIds.has(id));

    console.log(`\n--- Verification ---`);
    console.log(`JSON records (with id): ${jsonIds.size}`);
    console.log(`DB records: ${dbCount}`);

    if (missingInDb.length > 0) {
        console.error(`MISSING in DB (${missingInDb.length}):`, missingInDb.slice(0, 10));
    }
    if (extraInDb.length > 0) {
        console.warn(`Extra in DB (${extraInDb.length}):`, extraInDb.slice(0, 10));
    }
    if (missingInDb.length === 0 && extraInDb.length === 0) {
        console.log(`All ${dbCount} records match. Zero data loss.`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
