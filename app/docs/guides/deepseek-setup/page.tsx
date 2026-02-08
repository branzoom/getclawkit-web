import { Zap, Cpu, Terminal, ShieldCheck, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function DeepSeekSetupPage() {
    return (
        <>
            <h1>DeepSeek Setup Guide for OpenClaw</h1>

            <div className="not-prose bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-4 text-blue-400">
                    <Zap className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold mb-2">The Economy King</h3>
                        <p className="text-zinc-300">
                            DeepSeek V3.2 provides GPT-4.1 level performance at a fraction of the cost. It is the highly recommended model for budget-conscious agent workflows.
                        </p>
                    </div>
                </div>
            </div>

            <h2>Why DeepSeek?</h2>
            <ul>
                <li><strong>Unbeatable Pricing:</strong> $0.14 per 1M tokens (Cache hit).</li>
                <li><strong>Open Weights:</strong> Native support in OpenClaw.</li>
                <li><strong>Code Expertise:</strong> Better at Bash/Python generation than many closed models.</li>
            </ul>

            <h2>Setup in 60 Seconds</h2>

            <h3>Step 1: Get Your API Key</h3>
            <p>
                Visit <Link href="https://platform.deepseek.com/" target="_blank" className="text-blue-400 underline">DeepSeek Platform</Link> and create an API Key. Ensure you have at least $1 balance.
            </p>

            <h3>Step 2: Update clawhub.json</h3>
            <div className="not-prose bg-zinc-900 rounded-lg p-4 my-4 font-mono text-xs text-zinc-300 border border-white/10">
                {`{
  "provider": "deepseek",
  "apiKey": "sk-xxxxxx",
  "model": "deepseek-chat",
  "maxTokens": 8192
}`}
            </div>

            <div className="not-prose bg-green-500/10 border border-green-500/20 rounded-xl p-6 my-8">
                <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Recommended: Use the Wizard
                </h4>
                <p className="text-zinc-300 mb-4 text-sm">
                    Manual JSON edits can lead to parse errors. Our <Link href="/tools/config" className="text-green-400 underline">Config Wizard</Link> has a one-click "DeepSeek Optimized" template.
                </p>
                <Link href="/tools/config" className="inline-flex items-center px-4 py-2 bg-green-500 text-black font-bold rounded-lg text-sm">
                    Load DeepSeek Template
                </Link>
            </div>

            <h2>Common Issues</h2>
            <p><strong>403 Forbidden:</strong> DeepSeek has regional restrictions in some areas. Ensure your server/IP is located in a supported region.</p>
            <p><strong>Timeouts:</strong> DeepSeek can be busy during peak hours. Increase your <code className="text-zinc-300">timeout</code> setting in the config to 60000ms.</p>

            <div className="not-prose mt-16 p-8 border-t border-white/10">
                <h4 className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">Compare Before You Buy</h4>
                <p className="text-sm text-zinc-400 mb-4">Wondering exactly how much more you save with DeepSeek?</p>
                <Link href="/tools/cost" className="inline-flex items-center gap-2 text-blue-400 hover:text-white font-bold transition-all">
                    <DollarSign className="w-4 h-4" /> Open Cost Simulator
                </Link>
            </div>
        </>
    );
}
