import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'OpenClaw Security Checklist — Hardening Your AI Agent | ClawKit',
    description: 'Essential security checklist for OpenClaw deployments. Covers skill verification, browser sandbox risks, API key hygiene, agent permissions, and supply chain safety.',
    keywords: ['openclaw security', 'ai agent security', 'openclaw hardening', 'llm security checklist', 'browser agent safety'],
};

interface ChecklistItem {
    title: string;
    doText: string;
    dontText: string;
    detail: string;
}

const CHECKLIST: ChecklistItem[] = [
    {
        title: 'Skill Source Verification',
        doText: 'Only install skills from trusted GitHub repositories with verified READMEs and active maintainers.',
        dontText: 'Blindly install skills by name without checking the source repo — LLMs can hallucinate package names.',
        detail: 'Before adding a skill, inspect its GitHub repo, check the author\'s history, and verify the skill ID matches the official registry. Fake or typo-squatted skill names are a real attack vector.',
    },
    {
        title: 'Browser Sandbox Configuration',
        doText: 'Keep browser.evaluateEnabled set to false unless your workflow explicitly requires JavaScript execution.',
        dontText: 'Enable evaluateEnabled globally — this allows the agent to run arbitrary JS in the browser context.',
        detail: 'The browser sandbox is your primary defense against agent-injected scripts. If you must enable JS evaluation, restrict it to specific domains and audit the agent\'s actions via logs.',
    },
    {
        title: 'API Key Security',
        doText: 'Store API keys in environment variables (e.g. DEEPSEEK_API_KEY=sk-...) and rotate them monthly.',
        dontText: 'Hardcode API keys in clawhub.json or commit them to version control.',
        detail: 'Use .env files excluded from git, or a secrets manager. If a key leaks, revoke it immediately from the provider\'s dashboard. See our Data Privacy guide for more.',
    },
    {
        title: 'Agent Permission Minimization',
        doText: 'Restrict file system access to the project directory. Audit agent operation logs after each session.',
        dontText: 'Give the agent unrestricted access to your home directory or system paths.',
        detail: 'Configure dataPath and working directories to the narrowest scope possible. Review ~/.openclaw/logs periodically to catch unexpected file reads or writes.',
    },
    {
        title: 'Supply Chain Risk Mitigation',
        doText: 'Verify npm packages exist before installing. Use lockfiles and audit dependencies with npm audit.',
        dontText: 'Let the agent install arbitrary packages without review — it may hallucinate non-existent package names.',
        detail: 'Agents can suggest installing packages that don\'t exist (or worse, typo-squats of real packages). Always verify on npmjs.com before running npm install on agent-suggested packages.',
    },
];

export default function SecurityChecklistPage() {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-500/20 rounded-xl">
                    <Shield className="w-8 h-8 text-red-400" />
                </div>
                <h1 className="!my-0">Security Checklist</h1>
            </div>

            <p className="lead">
                AI agents that control browsers and file systems introduce unique security risks. Use this checklist to <strong>harden your OpenClaw deployment</strong> before going into production.
            </p>

            <div className="not-prose my-12 p-1 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl">
                <div className="bg-card p-8 rounded-[calc(1rem-1px)]">
                    <h3 className="text-foreground font-bold flex items-center gap-2 mb-4">
                        <Shield className="w-5 h-5 text-red-400" /> Why This Matters
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Unlike traditional software, AI agents make <strong>autonomous decisions</strong> about what files to read, what commands to run, and what packages to install. A compromised skill or misconfigured sandbox can escalate into a full system compromise. This checklist covers the most critical attack surfaces.
                    </p>
                </div>
            </div>

            <h2>The Checklist</h2>

            <div className="not-prose space-y-8 my-8">
                {CHECKLIST.map((item, i) => (
                    <div key={i} className="border border-border rounded-2xl overflow-hidden">
                        <div className="px-6 py-4 bg-muted/30 border-b border-border">
                            <h3 className="text-foreground font-bold text-lg flex items-center gap-2">
                                <span className="text-xs font-mono text-muted-foreground">#{i + 1}</span>
                                {item.title}
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-0">
                            <div className="p-5 bg-green-500/5 border-r border-border">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                                    <span className="text-sm font-bold text-green-400">Do</span>
                                </div>
                                <p className="text-sm text-foreground/80">{item.doText}</p>
                            </div>
                            <div className="p-5 bg-red-500/5">
                                <div className="flex items-center gap-2 mb-3">
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                    <span className="text-sm font-bold text-red-400">Don&apos;t</span>
                                </div>
                                <p className="text-sm text-foreground/80">{item.dontText}</p>
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-muted/20">
                            <p className="text-xs text-muted-foreground">{item.detail}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Further Reading</h2>
            <ul>
                <li><Link href="/docs/concepts/data-privacy">Data Privacy & Sovereignty</Link> — understand what data goes where</li>
                <li><Link href="/docs/concepts/skill-system">Skill System</Link> — how skills are loaded and verified</li>
                <li><Link href="/tools/config">Config Wizard</Link> — generate a secure config in seconds</li>
            </ul>

            <div className="not-prose mt-16 p-8 border-t border-border flex items-center justify-between">
                <Link href="/docs/guides/plugin-installation" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Plugin Installation
                </Link>
                <Link href="/docs/concepts/data-privacy" className="inline-flex items-center gap-2 text-red-400 font-bold hover:underline">
                    Next: Data Privacy <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </>
    );
}
