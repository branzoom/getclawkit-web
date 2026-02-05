import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // 1. 对于所有普通爬虫（Google, Bing 等）：允许
            {
                userAgent: '*',
                allow: '/',
            },
            // 2. 专门封禁 AI 训练爬虫 (这是目前业界标准做法)
            {
                userAgent: [
                    'GPTBot',           // OpenAI (ChatGPT)
                    'Google-Extended',  // Google Gemini/Bard (保留搜索，只禁训练)
                    'CCBot',            // Common Crawl (很多 AI 公司的训练数据集来源)
                    'anthropic-ai',     // Claude
                    'Claude-Web',       // Claude
                    'Bytespider'        // ByteDance (Doubao)
                ],
                disallow: '/',
            },
        ],
        sitemap: 'https://getclawkit.com/sitemap.xml',
    };
}