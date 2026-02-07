// data/skills.ts
import skillsData from './skills.json';

export interface SeoContent {
  seo_title: string;
  seo_description: string;
}

export interface Skill {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  author: string;
  authorUrl?: string;
  stars: number;
  lastUpdated: string;
  command: string;
  tags: string[];
  file_sha?: string;
  downloadUrl?: string;
  seo_content?: SeoContent;
  source_repo?: string;
  source_path?: string;
}

export const skills: Skill[] = skillsData as unknown as Skill[];
