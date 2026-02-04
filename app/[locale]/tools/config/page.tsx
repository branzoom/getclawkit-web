import ConfigGenerator from '@/components/ConfigGenerator';
import { Link } from '@/i18n/navigation'; // 使用我们封装的 Link
import { FileJson, HelpCircle, ArrowRight, BookOpen, AlertTriangle } from 'lucide-react';

export default function ConfigToolPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* 1. Tool Section (Top) */}
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">OpenClaw Configuration Generator</h1>
                <p className="text-lg text-zinc-400 max-w-3xl mb-8">
                    The safest way to generate your <code>config.json</code>. We automatically handle
                    <strong> Windows path escaping</strong>, <strong>JSON syntax validation</strong>, and
                    <strong>API key formatting</strong> so you don't have to debug startup errors.
                </p>
                <ConfigGenerator />
            </div>

            {/* 2. Guide Section (Middle - SEO Content) */}
            <div className="grid md:grid-cols-3 gap-12 border-t border-white/10 pt-16">

                {/* Main Content */}
                <div className="md:col-span-2 prose prose-invert max-w-none">
                    <h2 className="text-2xl font-bold text-white mb-4">How to configure OpenClaw correctly</h2>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-4">Step 1: Choose your OS</h3>
                    <p className="text-zinc-400">
                        Operating systems handle file paths differently. Windows uses backslashes (<code>\</code>) while macOS/Linux use forward slashes (<code>/</code>).
                        Selecting the wrong OS in your config is the #1 reason for "Path not found" errors. Our tool fixes this automatically.
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-4">Step 2: Get your API Key</h3>
                    <p className="text-zinc-400">
                        You need a valid API key from your LLM provider.
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>For <strong>Claude</strong>: Go to <a href="https://console.anthropic.com/" target="_blank" className="text-blue-400 underline">Anthropic Console</a>.</li>
                            <li>For <strong>DeepSeek</strong>: Go to <a href="https://platform.deepseek.com/" target="_blank" className="text-blue-400 underline">DeepSeek Platform</a>.</li>
                        </ul>
                    </p>

                    <h3 className="text-xl font-semibold text-white mt-8 mb-4">Why JSON instead of YAML?</h3>
                    <p className="text-zinc-400">
                        In previous versions (ClawdBot), YAML was the default. However, YAML is prone to indentation errors.
                        OpenClaw v2.0 enforces <strong>Strict JSON</strong> to ensure stability.
                        <Link href="/docs/migration" className="text-blue-400 underline ml-1">
                            Read our Migration Guide
                        </Link> to learn more about the differences.
                    </p>
                </div>

                {/* Sidebar / Inner Links */}
                <div className="space-y-8">

                    {/* Internal Linking Strategy: Doctor */}
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded-xl">
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500" /> Next Step
                        </h4>
                        <p className="text-sm text-zinc-400 mb-4">
                            Config file looks good? Now check if your computer has the right Node.js version installed.
                        </p>
                        <Link href="/tools/doctor" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300">
                            Run Local Doctor <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Internal Linking Strategy: Cost */}
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded-xl">
                        <h4 className="font-bold text-white mb-2">Save Money?</h4>
                        <p className="text-sm text-zinc-400 mb-4">
                            See how much you can save by switching your config to DeepSeek-V3.
                        </p>
                        <Link href="/tools/cost" className="flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300">
                            Check Pricing <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Featured Wiki */}
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        <h4 className="font-bold text-white text-sm uppercase tracking-wider">Related Guides</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/docs/troubleshooting" className="text-sm text-zinc-400 hover:text-white flex items-center gap-2">
                                    <BookOpen className="w-3 h-3" /> Connection Refused?
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs/migration" className="text-sm text-zinc-400 hover:text-white flex items-center gap-2">
                                    <BookOpen className="w-3 h-3" /> YAML to JSON Guide
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* 3. FAQ Section (Bottom) */}
            <div className="mt-20 pt-12 border-t border-white/10">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* ... 这里填入你之前写的 FAQ 内容，还可以再扩充 ... */}
                    <div className="bg-zinc-900/30 p-6 rounded-xl">
                        <h4 className="font-bold text-white mb-2">Where do I save the file?</h4>
                        <p className="text-sm text-zinc-400">
                            Save the generated JSON as <code>config.json</code> inside your <code>.openclaw</code> directory.
                            On Windows, this is usually <code>C:\Users\YourName\.openclaw\</code>.
                        </p>
                    </div>
                    {/* ... more items ... */}
                </div>
            </div>

        </div>
    );
}