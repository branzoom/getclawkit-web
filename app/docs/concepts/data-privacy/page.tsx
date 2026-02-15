import type { Metadata } from 'next';
import { Shield, Lock, Eye, Server, Globe, ChevronRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Data Privacy in OpenClaw — What Your Agent Sees and Sends | ClawKit',
    description: 'Understand what data OpenClaw agents can access, where it goes, and how to lock it down. Covers browser sandbox, API key safety, and local-only processing.',
    keywords: ['openclaw privacy', 'ai agent data privacy', 'openclaw security', 'is openclaw safe'],
};

export default function DataPrivacyPage() {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                    <Shield className="w-8 h-8 text-orange-400" />
                </div>
                <h1 className="!my-0">Data Sovereignty</h1>
            </div>

            <p className="lead">
                OpenClaw is built on a core principle: <strong>your data never leaves your machine unless you explicitly choose an external LLM</strong>. This page explains what data flows where, and how to stay in full control.
            </p>

            <div className="not-prose my-12 p-1 bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl">
                <div className="bg-background p-8 rounded-[calc(1rem-1px)]">
                    <h3 className="text-foreground font-bold flex items-center gap-2 mb-4">
                        <Lock className="w-5 h-5 text-green-400" /> The Privacy Guarantee
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        ClawKit and OpenClaw are <strong>open-source tools that run entirely on your machine</strong>. We have no servers, no telemetry, no analytics. Your configs, API keys, and browsing data stay local.
                    </p>
                </div>
            </div>

            <h2>Data Flow Map</h2>
            <p>
                Understanding what data goes where is critical when working with AI agents that interact with your browser and file system.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-2xl">
                    <div className="flex items-center gap-2 text-green-400 font-bold mb-4">
                        <CheckCircle2 className="w-5 h-5" /> Stays Local
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Your config files (JSON/YAML)</li>
                        <li>Browser DOM snapshots</li>
                        <li>Screenshot images</li>
                        <li>Local file contents</li>
                        <li>Agent execution logs</li>
                        <li>Skill Registry cache</li>
                    </ul>
                </div>
                <div className="p-6 bg-orange-500/5 border border-orange-500/20 rounded-2xl">
                    <div className="flex items-center gap-2 text-orange-400 font-bold mb-4">
                        <Globe className="w-5 h-5" /> Sent to LLM Provider
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Compressed DOM text (not raw HTML)</li>
                        <li>Your task description / prompt</li>
                        <li>Tool call results (text only)</li>
                        <li>Conversation history for context</li>
                    </ul>
                    <p className="text-xs text-orange-400/60 mt-4">
                        Only when using cloud LLMs (OpenAI, Anthropic, DeepSeek, Google).
                        Using Ollama keeps everything local.
                    </p>
                </div>
            </div>

            <h2>Running Fully Local with Ollama</h2>
            <p>
                For maximum privacy, run OpenClaw with a local LLM via Ollama. No data leaves your network:
            </p>

            <div className="not-prose bg-card border border-border rounded-lg p-4 my-6">
                <pre className="text-sm text-foreground/80 overflow-x-auto"><code>{`{
  "llm": {
    "provider": "ollama",
    "model": "llama3.3",
    "baseURL": "http://localhost:11434/v1"
  }
}`}</code></pre>
            </div>

            <p>
                Trade-off: Local models are less capable than cloud models like GPT-4.1 or Claude Sonnet 4.5, but for simple automation tasks they work well.
                Use our <Link href="/tools/config" className="text-orange-400 hover:text-orange-300">Config Wizard</Link> to set this up in seconds.
            </p>

            <h2>API Key Security</h2>
            <div className="not-prose space-y-4 my-8">
                {[
                    { icon: <Lock className="w-4 h-4" />, title: 'Keys stay in your config file', desc: 'ClawKit never transmits your API keys anywhere. They are read locally and passed directly to the provider SDK.' },
                    { icon: <Eye className="w-4 h-4" />, title: 'No key logging', desc: 'Keys are excluded from debug logs. Even if you share your logs, keys won\'t leak.' },
                    { icon: <Server className="w-4 h-4" />, title: 'No proxy servers', desc: 'API calls go directly from your machine to the LLM provider. There is no ClawKit intermediary.' },
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="text-green-400 mt-1">{item.icon}</div>
                        <div>
                            <h4 className="text-foreground font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Best Practices</h2>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                <div className="p-5 bg-card border border-border rounded-xl">
                    <h4 className="text-foreground font-bold text-sm mb-2">Use Environment Variables</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                        Instead of hardcoding API keys in your config, reference environment variables:
                    </p>
                    <code className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">DEEPSEEK_API_KEY=sk-...</code>
                </div>
                <div className="p-5 bg-card border border-border rounded-xl">
                    <h4 className="text-foreground font-bold text-sm mb-2">Rotate Keys Regularly</h4>
                    <p className="text-xs text-muted-foreground">
                        Regenerate API keys monthly from your provider dashboard. If a key leaks, revoke it immediately from the provider&apos;s console.
                    </p>
                </div>
                <div className="p-5 bg-card border border-border rounded-xl">
                    <h4 className="text-foreground font-bold text-sm mb-2">Set Spending Limits</h4>
                    <p className="text-xs text-muted-foreground">
                        Configure billing alerts and hard caps on your LLM provider account to prevent unexpected costs from runaway agents.
                    </p>
                </div>
                <div className="p-5 bg-card border border-border rounded-xl">
                    <h4 className="text-foreground font-bold text-sm mb-2">Review Agent Logs</h4>
                    <p className="text-xs text-muted-foreground">
                        Periodically check what your agent sends to the LLM. OpenClaw logs all prompts locally for your review.
                    </p>
                </div>
            </div>

            <div className="not-prose my-12 p-6 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-foreground font-bold text-sm mb-1">Sensitive Data Warning</h4>
                        <p className="text-xs text-muted-foreground">
                            If your agent browses pages with passwords, bank accounts, or personal data, that information may be included in the compressed DOM sent to the cloud LLM. Use Ollama for tasks involving sensitive information, or configure content filters in your OpenClaw setup.
                        </p>
                    </div>
                </div>
            </div>

            <div className="not-prose mt-16 p-8 border-t border-border flex items-center justify-between">
                <Link href="/docs/concepts/skill-system" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Skill System Design
                </Link>
                <Link href="/docs/concepts/agent-theory" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:underline">
                    Next: Agent Fundamentals <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </>
    );
}
