import { getRandomSkills, getSkillsCount } from '@/lib/db/skills';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
    const [randomSkills, skillCount] = await Promise.all([
        getRandomSkills(30),
        getSkillsCount(),
    ]);

    return <HomePageClient skills={randomSkills} skillCount={skillCount} />;
}
