export interface Skill {
  id: string;
  name: string;
  shortDesc: string; // 列表页显示的短描述
  longDesc: string;  // 详情页显示的长描述 (支持简单的 HTML/Markdown)
  author: string;
  authorUrl: string; // 新增：作者链接
  category: 'Integration' | 'Tool' | 'Productivity' | 'Fun';
  downloads: number;
  stars: number;     // 新增：GitHub Stars
  lastUpdated: string; // 新增：最后更新时间
  version: string;
  license: string;
  command: string;
  safetyRating: 'Verified' | 'Community' | 'Experimental'; // 新增：安全分级
  tags: string[];    // 新增：SEO 关键词
}

export const skills: Skill[] = [
  {
    id: 'web-browser',
    name: 'Research Agent Pro',
    shortDesc: 'Give your OpenClaw agent the ability to browse the web using Puppeteer.',
    longDesc: `
      <h3>What is Research Agent Pro?</h3>
      <p>This skill equips your OpenClaw agent with a full headless Chrome browser. It can navigate websites, click buttons, scroll pages, and extract text content intelligently.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Deep Scraping:</strong> Extracts main content while ignoring ads and popups.</li>
        <li><strong>JS Rendering:</strong> Works on complex SPAs (React/Vue sites).</li>
        <li><strong>Summarization:</strong> Automatically summarizes long articles to save context window tokens.</li>
      </ul>

      <h3>Configuration</h3>
      <pre>
{
  "browser_headless": true,
  "timeout": 5000
}
      </pre>
    `,
    author: 'Official',
    authorUrl: 'https://github.com/openclaw',
    category: 'Productivity',
    downloads: 1240,
    stars: 345,
    lastUpdated: '2026-01-20',
    version: '1.2.0',
    license: 'MIT',
    command: 'clawhub install @openclaw/browser-pro',
    safetyRating: 'Verified',
    tags: ['puppeteer', 'scraping', 'web-search', 'automation']
  },
  {
    id: 'crypto-watcher',
    name: 'Crypto Price Watcher',
    shortDesc: 'Real-time cryptocurrency price tracking via CoinGecko API.',
    longDesc: `
      <h3>Track Crypto in Real-Time</h3>
      <p>Never miss a pump. This skill connects your agent to the CoinGecko API to fetch live prices, market caps, and trading volume.</p>
      <h3>Supported Tokens</h3>
      <p>BTC, ETH, SOL, DOGE, and 5000+ others.</p>
    `,
    author: 'SatoshiVibes',
    authorUrl: 'https://github.com/satoshivibes',
    category: 'Tool',
    downloads: 856,
    stars: 89,
    lastUpdated: '2026-02-01',
    version: '0.9.5',
    license: 'Apache-2.0',
    command: 'clawhub install crypto-watcher',
    safetyRating: 'Community',
    tags: ['crypto', 'bitcoin', 'finance', 'api']
  },
  // ... 你可以继续补充其他 Skill，格式同上
];