/**
 * Post-migration verification script.
 *
 * Run after seeding to confirm:
 * 1. All skill IDs from skills.json exist in the database
 * 2. No data loss occurred
 *
 * Usage: npx tsx scripts/verify-migration.ts
 */
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
    // 1. Load JSON source
    const jsonPath = path.join(process.cwd(), 'data', 'skills.json');
    if (!fs.existsSync(jsonPath)) {
        console.error(`File not found: ${jsonPath}`);
        process.exit(1);
    }

    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const jsonSkills: any[] = JSON.parse(rawData);
    const jsonIds = new Set<string>(jsonSkills.filter((s: any) => s.id).map((s: any) => s.id as string));

    console.log(`JSON source: ${jsonIds.size} skills (with valid id)`);

    // 2. Query database
    const dbSkills = await prisma.skill.findMany({ select: { id: true } });
    const dbIds = new Set<string>(dbSkills.map((s: { id: string }) => s.id));

    console.log(`Database:    ${dbIds.size} skills`);

    // 3. Compute diffs
    const missingInDb = [...jsonIds].filter(id => !dbIds.has(id));
    const extraInDb = [...dbIds].filter((id: string) => !jsonIds.has(id));

    // 4. Report
    console.log('\n--- Results ---');

    if (missingInDb.length > 0) {
        console.error(`MISSING from DB (${missingInDb.length}):`);
        missingInDb.forEach(id => console.error(`  - ${id}`));
    }

    if (extraInDb.length > 0) {
        console.warn(`EXTRA in DB (not in JSON) (${extraInDb.length}):`);
        extraInDb.forEach(id => console.warn(`  - ${id}`));
    }

    if (missingInDb.length === 0 && extraInDb.length === 0) {
        console.log(`All ${dbIds.size} IDs match perfectly. Migration verified.`);
    }

    // 5. Spot-check: sample 10 random skills and verify key fields
    console.log('\n--- Spot Check (10 random) ---');
    const sampleIds = [...jsonIds].sort(() => 0.5 - Math.random()).slice(0, 10);

    for (const id of sampleIds) {
        const jsonSkill = jsonSkills.find(s => s.id === id);
        const dbSkill = await prisma.skill.findUnique({ where: { id } });

        if (!dbSkill) {
            console.error(`  [FAIL] ${id}: not found in DB`);
            continue;
        }

        const checks = [
            dbSkill.name === String(jsonSkill.name || ''),
            dbSkill.author === String(jsonSkill.author || ''),
            dbSkill.stars === (Number(jsonSkill.stars) || 0),
            dbSkill.seoTitle === (jsonSkill.seo_content?.seo_title || null),
        ];

        const passed = checks.every(Boolean);
        console.log(`  [${passed ? 'OK' : 'FAIL'}] ${id}`);
        if (!passed) {
            console.log(`    DB:   name="${dbSkill.name}" author="${dbSkill.author}" stars=${dbSkill.stars}`);
            console.log(`    JSON: name="${jsonSkill.name}" author="${jsonSkill.author}" stars=${jsonSkill.stars}`);
        }
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
