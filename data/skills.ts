// data/skills.ts
import skillsData from './skills.json';
// 定义 SEO 内容的结构
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
  authorUrl: string;
  category: string; // 注意：JSON里通常是 string，前端用的时候可能需要 cast
  downloads: number;
  stars: number;
  lastUpdated: string;
  version: string;
  license: string;
  command: string;
  safetyRating: string;
  tags: string[];
  // 🔥 新增 pSEO 字段 (必须定义，否则前端报错) 🔥
  file_sha?: string;
  downloadUrl?: string;
  seo_content?: SeoContent;
}

// 强制类型转换，确保符合接口定义
export const skills: Skill[] = skillsData as unknown as Skill[];