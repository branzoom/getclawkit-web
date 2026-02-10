'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { Search, FileText, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface DocEntry {
    title: string;
    href: string;
    category: string;
    description: string;
}

const DOCS_INDEX: DocEntry[] = [
    // Getting Started
    { title: 'Quick Start Guide', href: '/docs/getting-started/quick-start', category: 'Getting Started', description: 'Deploy OpenClaw from zero in 5 minutes. Generate config, install, start your AI agent.' },
    { title: 'Your First Config', href: '/docs/getting-started/first-config', category: 'Getting Started', description: 'Create your first OpenClaw config file. JSON structure, API key setup, model selection.' },
    { title: 'Docker Setup Tutorial', href: '/docs/getting-started/docker-setup', category: 'Getting Started', description: 'Run OpenClaw in Docker. Docker Compose configuration, volumes, networking.' },

    // Troubleshooting
    { title: 'Fix Connection Refused Errors', href: '/docs/troubleshooting/connection-errors', category: 'Troubleshooting', description: 'ECONNREFUSED fix. localhost vs 127.0.0.1, IPv6 issues, Node.js binding problems.' },
    { title: 'JSON Parse Errors', href: '/docs/troubleshooting/json-parse-errors', category: 'Troubleshooting', description: 'Fix JSON syntax errors. Trailing commas, unescaped backslashes, Windows path issues.' },
    { title: 'Windows-Specific Issues', href: '/docs/troubleshooting/windows-issues', category: 'Troubleshooting', description: 'Windows path escaping, PowerShell vs CMD, line ending problems, permission errors.' },
    { title: 'API Key Problems', href: '/docs/troubleshooting/api-key-problems', category: 'Troubleshooting', description: 'Invalid API key, rate limiting, model access denied, billing issues.' },

    // Guides
    { title: 'Cost Optimization Guide', href: '/docs/guides/cost-optimization', category: 'Guides', description: 'Reduce API costs. Model routing, caching strategies, prompt optimization, DeepSeek savings.' },
    { title: 'DeepSeek Setup Guide', href: '/docs/guides/deepseek-setup', category: 'Guides', description: 'Configure DeepSeek V3.2 with OpenClaw. API base URL, model names, cost comparison.' },
    { title: 'Plugin Installation', href: '/docs/guides/plugin-installation', category: 'Guides', description: 'Install and manage OpenClaw skills. CLI commands, config registration, verification.' },
    { title: 'v1 to v2 Migration', href: '/docs/guides/v1-to-v2-migration', category: 'Guides', description: 'Migrate from OpenClaw v1 to v2. YAML to JSON, new plugin system, breaking changes.' },

    // Concepts
    { title: 'Architecture Overview', href: '/docs/concepts/architecture', category: 'Concepts', description: 'OpenClaw architecture. Control loop, MCP integration, decision pipeline, data sovereignty.' },
    { title: 'Skill System Design', href: '/docs/concepts/skill-system', category: 'Concepts', description: 'MCP-based skill system. Skill lifecycle, built-in categories, custom skill creation.' },
    { title: 'Agent Theory', href: '/docs/concepts/agent-theory', category: 'Concepts', description: 'Agent fundamentals. Perceive-Reason-Act loop, memory, planning, reactive vs deliberative.' },
    { title: 'Tool Use Patterns', href: '/docs/concepts/tool-use', category: 'Concepts', description: 'Tool use patterns. Observe-Act, Extract-Transform, multi-source aggregation, best practices.' },
    { title: 'Data Privacy', href: '/docs/concepts/data-privacy', category: 'Concepts', description: 'Data sovereignty. Local vs cloud data flow, Ollama setup, API key security, best practices.' },
    { title: 'Goal Decomposition', href: '/docs/concepts/goal-decomposition', category: 'Concepts', description: 'Goal decomposition strategies. Top-down vs reactive, hybrid approach, failure recovery.' },

    // Community
    { title: 'Community & Contributing', href: '/docs/community', category: 'Community', description: 'Contribute to ClawKit. Pull requests, issues, skill submission, code of conduct.' },
    { title: 'Project Roadmap', href: '/docs/roadmap', category: 'Community', description: 'OpenClaw and ClawKit roadmap. 2026 milestones, multi-agent coordination, self-correcting memory.' },

    // Tools (cross-reference)
    { title: 'Config Wizard', href: '/tools/config', category: 'Tools', description: 'Generate OpenClaw JSON config files. Provider presets, validation, Windows path fix.' },
    { title: 'Local Doctor', href: '/tools/doctor', category: 'Tools', description: 'Diagnose setup issues. Node.js version, port conflicts, API key validation.' },
    { title: 'Cost Estimator', href: '/tools/cost', category: 'Tools', description: 'Compare model costs. DeepSeek V3.2 vs GPT-4.1 vs Claude Sonnet 4.5 pricing calculator.' },
    { title: 'Skill Registry', href: '/skills', category: 'Tools', description: 'Browse 5700+ verified plugins. Browser control, memory, crypto, Discord bots.' },
];

export default function DocsSearch() {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const fuse = useMemo(
        () => new Fuse(DOCS_INDEX, {
            keys: ['title', 'description', 'category'],
            threshold: 0.4,
            includeScore: true,
        }),
        []
    );

    const results = useMemo(() => {
        if (!query.trim()) return [];
        return fuse.search(query).slice(0, 8).map(r => r.item);
    }, [query, fuse]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div ref={containerRef} className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
                ref={inputRef}
                type="text"
                placeholder="Search docs, guides, tools..."
                className="pl-11 pr-10 py-5 bg-card/50 border-border focus-visible:ring-blue-500 rounded-full text-foreground placeholder:text-muted-foreground"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
                onFocus={() => setIsOpen(true)}
            />
            {query && (
                <button
                    onClick={() => { setQuery(''); setIsOpen(false); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                    <X className="w-4 h-4" />
                </button>
            )}

            {/* Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                    {results.map((doc) => (
                        <Link
                            key={doc.href}
                            href={doc.href}
                            onClick={() => { setIsOpen(false); setQuery(''); }}
                            className="flex items-start gap-3 p-4 hover:bg-muted transition-colors border-b border-border last:border-0"
                        >
                            <FileText className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                            <div>
                                <div className="text-sm font-medium text-foreground">{doc.title}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{doc.category}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* No results */}
            {isOpen && query.trim() && results.length === 0 && (
                <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-2xl z-50 p-6 text-center">
                    <p className="text-muted-foreground text-sm">No results for &quot;{query}&quot;</p>
                </div>
            )}
        </div>
    );
}
