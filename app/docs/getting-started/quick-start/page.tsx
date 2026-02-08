import type { Metadata } from 'next';
import Link from 'next/link';
import { Terminal, ExternalLink, Clock, AlertTriangle, ArrowRight, Zap, Shield } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Quick Start - Deploy OpenClaw in 5 Minutes (2026) | ClawKit',
    description: 'Deploy OpenClaw from zero in 5 minutes. Step-by-step guide for beginners: generate config, install, start your AI agent. No coding required.',
    keywords: ['openclaw quick start', 'openclaw setup', 'how to install openclaw', 'openclaw beginner guide', 'deploy openclaw', 'openclaw tutorial'],
};

const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Deploy OpenClaw in 5 Minutes",
    "description": "Complete beginner guide to deploy OpenClaw AI agent from scratch. No coding experience required.",
    "totalTime": "PT5M",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
    "tool": [
        { "@type": "HowToTool", "name": "ClawKit Config Wizard" },
        { "@type": "HowToTool", "name": "ClawKit Local Doctor" },
    ],
    "step": [
        {
            "@type": "HowToStep",
            "name": "Generate your config file",
            "text": "Use the ClawKit Config Wizard to generate an error-free clawhub.json config file. Choose your AI model, enter your API key, and download the file.",
            "url": "https://getclawkit.com/tools/config",
        },
        {
            "@type": "HowToStep",
            "name": "Install OpenClaw",
            "text": "Open your terminal and run: npm install -g openclaw. This installs the OpenClaw CLI globally on your machine.",
        },
        {
            "@type": "HowToStep",
            "name": "Start your AI agent",
            "text": "Run: openclaw start --config clawhub.json. Your agent will start on http://127.0.0.1:3000.",
        },
    ],
};

export default function QuickStartPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
            />

            <h1>Quick Start: Deploy OpenClaw in 5 Minutes</h1>

            <p className="lead">
                This guide takes you from <strong>zero to a running AI agent</strong> in 5 minutes.
                No coding experience needed. We will walk you through every step.
            </p>

            {/* Time comparison */}
            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                <div className="p-5 bg-zinc-800/50 border border-white/10 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-5 h-5 text-zinc-500" />
                        <span className="text-sm font-bold text-zinc-400">Without ClawKit</span>
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-400">
                        <li>Read official docs: ~30 min</li>
                        <li>Write JSON config manually: ~20 min</li>
                        <li>Debug JSON syntax errors: ~15 min</li>
                        <li>Fix ECONNREFUSED: ~30 min</li>
                        <li className="pt-2 border-t border-white/10 text-white font-bold">Total: 1-2 hours</li>
                    </ul>
                </div>
                <div className="p-5 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-green-400" />
                        <span className="text-sm font-bold text-green-400">With ClawKit</span>
                    </div>
                    <ul className="space-y-2 text-sm text-zinc-300">
                        <li>Config Wizard generates config: 30 sec</li>
                        <li>Install + start: 2 min</li>
                        <li>Local Doctor auto-fixes errors: 10 sec</li>
                        <li className="invisible">placeholder</li>
                        <li className="pt-2 border-t border-green-500/20 text-green-400 font-bold">Total: under 5 minutes</li>
                    </ul>
                </div>
            </div>

            {/* What you'll need */}
            <h2>What You Will Need</h2>
            <p>Before we start, make sure you have these three things. Don&apos;t worry — we will explain each one.</p>

            <div className="not-prose space-y-3 my-6">
                <div className="flex items-start gap-4 p-4 bg-zinc-900 border border-white/10 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">1</div>
                    <div>
                        <h4 className="text-white font-semibold">Node.js (version 18 or higher)</h4>
                        <p className="text-sm text-zinc-400 mt-1">
                            Node.js is the runtime that powers OpenClaw. Think of it as the &quot;engine&quot; that runs the AI agent on your computer.
                        </p>
                        <p className="text-sm text-zinc-400 mt-2">
                            <strong>How to check:</strong> Open your terminal (Command Prompt on Windows, Terminal on Mac) and type:
                        </p>
                        <code className="block mt-2 text-sm bg-zinc-800 px-3 py-2 rounded text-zinc-300">node --version</code>
                        <p className="text-xs text-zinc-500 mt-2">
                            If you see <code className="text-zinc-400">v18.x.x</code> or higher, you are good.
                            If not, <a href="https://nodejs.org/" target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-300">download Node.js here</a> (choose the &quot;LTS&quot; version).
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-zinc-900 border border-white/10 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">2</div>
                    <div>
                        <h4 className="text-white font-semibold">An API Key (for the AI model)</h4>
                        <p className="text-sm text-zinc-400 mt-1">
                            OpenClaw needs access to an AI model to &quot;think&quot;. You will need an API key from one of these providers:
                        </p>
                        <div className="grid grid-cols-3 gap-2 mt-3">
                            <div className="text-center p-2 bg-zinc-800 rounded-lg">
                                <div className="text-xs font-bold text-green-400">DeepSeek</div>
                                <div className="text-[10px] text-zinc-500 mt-1">Cheapest option</div>
                            </div>
                            <div className="text-center p-2 bg-zinc-800 rounded-lg">
                                <div className="text-xs font-bold text-zinc-300">OpenAI</div>
                                <div className="text-[10px] text-zinc-500 mt-1">Most popular</div>
                            </div>
                            <div className="text-center p-2 bg-zinc-800 rounded-lg">
                                <div className="text-xs font-bold text-orange-400">Claude</div>
                                <div className="text-[10px] text-zinc-500 mt-1">Best reasoning</div>
                            </div>
                        </div>
                        <p className="text-xs text-zinc-500 mt-3">
                            Not sure which one? We recommend <strong className="text-green-400">DeepSeek</strong> — it is 90% cheaper than OpenAI with similar performance.
                            Use our <Link href="/tools/cost" className="text-blue-400 hover:text-blue-300">Cost Estimator</Link> to compare.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-zinc-900 border border-white/10 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">3</div>
                    <div>
                        <h4 className="text-white font-semibold">A Terminal (Command Line)</h4>
                        <p className="text-sm text-zinc-400 mt-1">
                            You will need to type a few commands. Don&apos;t worry, we will tell you exactly what to type.
                        </p>
                        <div className="mt-2 text-xs text-zinc-500 space-y-1">
                            <p><strong>Windows:</strong> Press <code className="text-zinc-400">Win + R</code>, type <code className="text-zinc-400">cmd</code>, press Enter</p>
                            <p><strong>Mac:</strong> Press <code className="text-zinc-400">Cmd + Space</code>, type <code className="text-zinc-400">Terminal</code>, press Enter</p>
                            <p><strong>Linux:</strong> Press <code className="text-zinc-400">Ctrl + Alt + T</code></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Step 1 */}
            <h2>Step 1: Generate Your Config File (30 seconds)</h2>
            <p>
                The config file tells OpenClaw which AI model to use and how to connect.
                Instead of writing it by hand (which causes 90% of setup errors), let our tool do it for you.
            </p>

            <div className="not-prose bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-6">
                <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Open the Config Wizard</h3>
                        <ol className="text-sm text-zinc-300 space-y-2 mb-4">
                            <li>1. Click the button below to open the Config Wizard</li>
                            <li>2. Choose your AI provider (DeepSeek, OpenAI, or Claude)</li>
                            <li>3. Paste your API key</li>
                            <li>4. Click <strong>&quot;Download Config&quot;</strong></li>
                            <li>5. Save the <code className="bg-zinc-800 px-1 rounded">clawhub.json</code> file to a folder you will remember</li>
                        </ol>
                        <Link
                            href="/tools/config"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-black font-bold rounded-lg hover:bg-blue-400 transition-colors"
                        >
                            Open Config Wizard
                            <ExternalLink className="w-4 h-4" />
                        </Link>
                        <p className="text-xs text-zinc-500 mt-3">
                            Your API key stays in your browser. We never see it or store it.
                        </p>
                    </div>
                </div>
            </div>

            {/* Step 2 */}
            <h2>Step 2: Install OpenClaw (1 minute)</h2>
            <p>
                Open your terminal and paste this command:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Copy and paste into your terminal</span>
                </div>
                <pre className="text-sm text-zinc-300"><code>npm install -g openclaw</code></pre>
            </div>

            <details className="my-4">
                <summary className="text-sm text-zinc-400 cursor-pointer hover:text-white">
                    What does this command do?
                </summary>
                <div className="mt-2 pl-4 border-l-2 border-white/10 text-sm text-zinc-500">
                    <p><code>npm</code> = Node Package Manager (comes with Node.js)</p>
                    <p><code>install -g</code> = Install globally (so you can use it from any folder)</p>
                    <p><code>openclaw</code> = The AI agent software</p>
                </div>
            </details>

            <div className="not-prose bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 my-4">
                <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-yellow-200 font-medium">Getting a &quot;permission denied&quot; error?</p>
                        <p className="text-xs text-zinc-400 mt-1">
                            <strong>Mac/Linux:</strong> Add <code className="text-zinc-300">sudo</code> before the command: <code className="text-zinc-300">sudo npm install -g openclaw</code>
                        </p>
                        <p className="text-xs text-zinc-400 mt-1">
                            <strong>Windows:</strong> Right-click Command Prompt and select &quot;Run as Administrator&quot;
                        </p>
                    </div>
                </div>
            </div>

            {/* Step 3 */}
            <h2>Step 3: Start Your Agent (30 seconds)</h2>
            <p>
                Navigate to the folder where you saved <code>clawhub.json</code>, then run:
            </p>

            <div className="not-prose bg-zinc-900 border border-white/10 rounded-lg p-4 my-4">
                <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">Copy and paste into your terminal</span>
                </div>
                <pre className="text-sm text-zinc-300"><code>{`cd /path/to/your/folder
openclaw start --config clawhub.json`}</code></pre>
            </div>

            <details className="my-4">
                <summary className="text-sm text-zinc-400 cursor-pointer hover:text-white">
                    How do I navigate to the folder?
                </summary>
                <div className="mt-2 pl-4 border-l-2 border-white/10 text-sm text-zinc-500 space-y-2">
                    <p><strong>Example (Mac):</strong> If you saved it to Downloads: <code className="text-zinc-300">cd ~/Downloads</code></p>
                    <p><strong>Example (Windows):</strong> If you saved it to Desktop: <code className="text-zinc-300">cd C:\Users\YourName\Desktop</code></p>
                    <p><strong>Tip:</strong> On Mac, you can type <code className="text-zinc-300">cd </code> (with a space) then drag the folder into the terminal window.</p>
                </div>
            </details>

            <p>If everything works, you will see:</p>

            <div className="not-prose bg-zinc-900 border border-green-500/20 rounded-lg p-4 my-4">
                <pre className="text-sm text-green-400"><code>{`✓ Config loaded: clawhub.json
✓ LLM connected: deepseek (deepseek-chat)
✓ Agent started on http://127.0.0.1:3000

Your AI agent is running! Open http://127.0.0.1:3000 in your browser.`}</code></pre>
            </div>

            {/* Troubleshooting */}
            <h2>Something Not Working?</h2>
            <p>
                Don&apos;t worry — our <strong>Local Doctor</strong> tool can automatically find and explain the problem.
            </p>

            <div className="not-prose bg-green-500/10 border border-green-500/20 rounded-xl p-6 my-6">
                <h3 className="text-lg font-bold text-white mb-3">Auto-Diagnose with Local Doctor</h3>
                <p className="text-sm text-zinc-300 mb-4">
                    Instead of searching Google for error messages, let our tool check everything for you in 10 seconds.
                </p>
                <Link
                    href="/tools/doctor"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors"
                >
                    Open Local Doctor
                    <ExternalLink className="w-4 h-4" />
                </Link>
            </div>

            <p>Or check these common issues:</p>
            <div className="not-prose space-y-2 my-4">
                <Link href="/docs/troubleshooting/connection-errors" className="flex items-center gap-3 p-3 bg-zinc-900 border border-white/10 rounded-lg hover:border-blue-500/30 transition-colors group">
                    <span className="text-sm text-zinc-400 group-hover:text-white">See &quot;ECONNREFUSED&quot; or &quot;Connection Refused&quot;?</span>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 ml-auto shrink-0" />
                </Link>
                <Link href="/docs/troubleshooting/json-parse-errors" className="flex items-center gap-3 p-3 bg-zinc-900 border border-white/10 rounded-lg hover:border-blue-500/30 transition-colors group">
                    <span className="text-sm text-zinc-400 group-hover:text-white">See &quot;JSON Parse Error&quot; or &quot;Unexpected token&quot;?</span>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 ml-auto shrink-0" />
                </Link>
                <Link href="/docs/troubleshooting/windows-issues" className="flex items-center gap-3 p-3 bg-zinc-900 border border-white/10 rounded-lg hover:border-blue-500/30 transition-colors group">
                    <span className="text-sm text-zinc-400 group-hover:text-white">Using Windows and something looks wrong?</span>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 ml-auto shrink-0" />
                </Link>
                <Link href="/docs/troubleshooting/api-key-problems" className="flex items-center gap-3 p-3 bg-zinc-900 border border-white/10 rounded-lg hover:border-blue-500/30 transition-colors group">
                    <span className="text-sm text-zinc-400 group-hover:text-white">See &quot;Invalid API Key&quot; or &quot;401 Unauthorized&quot;?</span>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 ml-auto shrink-0" />
                </Link>
            </div>

            {/* Prefer Docker? */}
            <h2>Prefer Docker? (Optional)</h2>
            <p>
                If you are familiar with Docker, you can run OpenClaw in a container for better isolation.
                This is <strong>completely optional</strong> — the steps above work fine without Docker.
            </p>
            <div className="not-prose my-4">
                <Link href="/docs/getting-started/docker-setup" className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium rounded-lg hover:bg-purple-500/20 transition-colors">
                    Docker Setup Guide <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Next Steps */}
            <h2>Your Agent is Running — What Next?</h2>
            <div className="not-prose grid md:grid-cols-3 gap-4 my-8">
                <Link href="/docs/getting-started/first-config" className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-colors group">
                    <h3 className="text-white font-semibold mb-2 flex items-center justify-between">
                        Customize Config
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-blue-400" />
                    </h3>
                    <p className="text-sm text-zinc-400">Fine-tune your agent settings</p>
                </Link>
                <Link href="/skills" className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl hover:bg-orange-500/20 transition-colors group">
                    <h3 className="text-white font-semibold mb-2 flex items-center justify-between">
                        Add Plugins
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-orange-400" />
                    </h3>
                    <p className="text-sm text-zinc-400">Browser control, memory, and more</p>
                </Link>
                <Link href="/docs/guides/cost-optimization" className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-colors group">
                    <h3 className="text-white font-semibold mb-2 flex items-center justify-between">
                        Save on Costs
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-green-400" />
                    </h3>
                    <p className="text-sm text-zinc-400">Cut API spending by up to 90%</p>
                </Link>
            </div>

            <hr className="my-8 border-white/10" />

            <p className="text-sm text-zinc-500">
                <strong>Last Updated:</strong> February 8, 2026 |
                <strong> Estimated Time:</strong> 5 minutes (with Config Wizard)
            </p>
        </>
    );
}
