// Centralized LLM model data & pricing
// Single source of truth for ConfigGenerator, CostEstimator, and Compare pages

export const PRICING_LAST_UPDATED = '2026-02-06';

// --- Provider & Model Definitions ---

export interface ModelPricing {
    id: string;
    name: string;
    inputPrice: number;  // $/1M tokens
    outputPrice: number; // $/1M tokens
    cachePrice: number;  // $/1M tokens
}

export interface LLMProvider {
    id: string;
    name: string;
    baseUrl: string;
    models: ModelPricing[];
    defaultModel: string;
}

export const LLM_PROVIDERS: LLMProvider[] = [
    {
        id: 'openai',
        name: 'OpenAI',
        baseUrl: 'https://api.openai.com/v1',
        defaultModel: 'gpt-4.1',
        models: [
            { id: 'gpt-4.1',      name: 'GPT-4.1',      inputPrice: 2.00, outputPrice: 8.00,  cachePrice: 0.50 },
            { id: 'gpt-4.1-mini', name: 'GPT-4.1 Mini', inputPrice: 0.40, outputPrice: 1.60,  cachePrice: 0.10 },
        ],
    },
    {
        id: 'deepseek',
        name: 'DeepSeek',
        baseUrl: 'https://api.deepseek.com',
        defaultModel: 'deepseek-chat',
        models: [
            { id: 'deepseek-chat',     name: 'DeepSeek V3.2 (Chat)',     inputPrice: 0.28, outputPrice: 0.42, cachePrice: 0.028 },
            { id: 'deepseek-reasoner', name: 'DeepSeek V3.2 (Reasoner)', inputPrice: 0.28, outputPrice: 0.42, cachePrice: 0.028 },
        ],
    },
    {
        id: 'anthropic',
        name: 'Anthropic',
        baseUrl: 'https://api.anthropic.com',
        defaultModel: 'claude-sonnet-4-5-20250929',
        models: [
            { id: 'claude-sonnet-4-5-20250929', name: 'Claude Sonnet 4.5', inputPrice: 3.00, outputPrice: 15.00, cachePrice: 0.30 },
            { id: 'claude-haiku-4-5-20251001',  name: 'Claude Haiku 4.5',  inputPrice: 1.00, outputPrice: 5.00,  cachePrice: 0.10 },
        ],
    },
    {
        id: 'google',
        name: 'Google Gemini',
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
        defaultModel: 'gemini-2.5-flash',
        models: [
            { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', inputPrice: 0.30, outputPrice: 2.50,  cachePrice: 0.03 },
            { id: 'gemini-2.5-pro',   name: 'Gemini 2.5 Pro',   inputPrice: 1.25, outputPrice: 10.00, cachePrice: 0.125 },
        ],
    },
    {
        id: 'ollama',
        name: 'Ollama (Local)',
        baseUrl: 'http://localhost:11434/v1',
        defaultModel: 'llama3.3',
        models: [
            { id: 'local', name: 'Local Model', inputPrice: 0, outputPrice: 0, cachePrice: 0 },
        ],
    },
];

// --- Helper: find a provider by id ---
export function getProvider(id: string) {
    return LLM_PROVIDERS.find(p => p.id === id);
}

// --- ConfigGenerator Presets ---

export const CONFIG_PRESETS = {
    openai: {
        id: 'openai',
        name: 'OpenAI',
        description: 'GPT-4.1 — Latest flagship',
        config: {
            provider: 'openai',
            model: 'gpt-4.1',
            baseUrl: 'https://api.openai.com/v1',
            apiKey: '',
        },
    },
    deepseek: {
        id: 'deepseek',
        name: 'DeepSeek',
        description: 'V3.2 — Ultra-low cost agent',
        config: {
            provider: 'deepseek',
            model: 'deepseek-chat',
            baseUrl: 'https://api.deepseek.com',
            apiKey: '',
        },
    },
    anthropic: {
        id: 'anthropic',
        name: 'Anthropic',
        description: 'Claude Sonnet 4.5',
        config: {
            provider: 'anthropic',
            model: 'claude-sonnet-4-5-20250929',
            baseUrl: 'https://api.anthropic.com',
            apiKey: '',
        },
    },
    google: {
        id: 'google',
        name: 'Google Gemini',
        description: 'Gemini 2.5 Flash — Budget',
        config: {
            provider: 'google',
            model: 'gemini-2.5-flash',
            baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
            apiKey: '',
        },
    },
    ollama: {
        id: 'ollama',
        name: 'Ollama (Local)',
        description: 'Llama 3.3 — Free local',
        config: {
            provider: 'ollama',
            model: 'llama3.3',
            baseUrl: 'http://localhost:11434/v1',
            apiKey: 'ollama',
        },
    },
} as const;

// --- CostEstimator Models ---

export interface CostEstimatorModel {
    id: string;
    name: string;
    provider: string;
    inputPrice: number;
    outputPrice: number;
    cachePrice: number;
    color: string;
    stroke: string;
    badge: string;
    isEditable: boolean;
}

export const COST_ESTIMATOR_MODELS: CostEstimatorModel[] = [
    {
        id: 'local',
        name: 'Local (Ollama)',
        provider: 'Ollama',
        inputPrice: 0,
        outputPrice: 0,
        cachePrice: 0,
        color: '#4ade80',
        stroke: '#22c55e',
        badge: 'Free',
        isEditable: false,
    },
    {
        id: 'deepseek',
        name: 'DeepSeek V3.2',
        provider: 'DeepSeek',
        inputPrice: 0.28,
        outputPrice: 0.42,
        cachePrice: 0.028,
        color: '#60a5fa',
        stroke: '#3b82f6',
        badge: 'Budget King',
        isEditable: true,
    },
    {
        id: 'gemini',
        name: 'Gemini 2.5 Flash',
        provider: 'Google',
        inputPrice: 0.30,
        outputPrice: 2.50,
        cachePrice: 0.03,
        color: '#f472b6',
        stroke: '#db2777',
        badge: 'Google Fast',
        isEditable: true,
    },
    {
        id: 'gpt4',
        name: 'GPT-4.1',
        provider: 'OpenAI',
        inputPrice: 2.00,
        outputPrice: 8.00,
        cachePrice: 0.50,
        color: '#c084fc',
        stroke: '#a855f7',
        badge: 'Standard',
        isEditable: true,
    },
    {
        id: 'claude',
        name: 'Claude Sonnet 4.5',
        provider: 'Anthropic',
        inputPrice: 3.00,
        outputPrice: 15.00,
        cachePrice: 0.30,
        color: '#fb923c',
        stroke: '#f97316',
        badge: 'Anthropic',
        isEditable: true,
    },
    {
        id: 'custom',
        name: 'Custom / Other',
        provider: 'User Defined',
        inputPrice: 1.00,
        outputPrice: 2.00,
        cachePrice: 0.10,
        color: '#94a3b8',
        stroke: '#64748b',
        badge: 'Custom',
        isEditable: true,
    },
];
