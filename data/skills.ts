export type Skill = {
    id: string;
    name: string;
    description: string;
    author: string;
    category: 'tool' | 'adapter' | 'personality';
    installCmd: string;
    repoUrl: string;
};

export const INITIAL_SKILLS: Skill[] = [
    {
        id: 'web-search',
        name: 'Google Search Pro',
        description: 'Enables your agent to search the web using Google Custom Search API with advanced filtering.',
        author: 'official',
        category: 'tool',
        installCmd: 'clawhub install google-search',
        repoUrl: 'https://github.com/openclaw/skills'
    },
    {
        id: 'filesystem',
        name: 'File System Access',
        description: 'Grant safe read/write access to specific local directories.',
        author: 'community-hero',
        category: 'adapter',
        installCmd: 'clawhub install fs-access',
        repoUrl: 'https://github.com/community/fs-access'
    },
    {
        id: 'twitter-connector',
        name: 'X (Twitter) Bot',
        description: 'Post tweets and read timeline. Handles OAuth 2.0 flow automatically.',
        author: 'elon-fan',
        category: 'adapter',
        installCmd: 'clawhub install twitter-adapter',
        repoUrl: '#'
    },
    {
        id: 'coder-personality',
        name: 'Senior Dev Persona',
        description: 'System prompts optimized for Python/JS coding tasks. Strict mode enabled.',
        author: 'vibe-coder',
        category: 'personality',
        installCmd: 'clawhub install persona-dev',
        repoUrl: '#'
    },
    {
        id: 'notion-sync',
        name: 'Notion Sync',
        description: 'Sync conversation summaries to a Notion database.',
        author: 'productivity-guru',
        category: 'tool',
        installCmd: 'clawhub install notion-sync',
        repoUrl: '#'
    }
];