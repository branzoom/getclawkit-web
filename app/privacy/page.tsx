import type { Metadata } from 'next';
import { Shield, Lock, EyeOff, ServerOff } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy Policy - ClawKit',
    description: 'We do not store your data. Learn how ClawKit protects your privacy with a local-first architecture.',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                <p className="text-zinc-400">Last Updated: February 2026</p>
            </div>

            {/* TL;DR Summary Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
                <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <Shield className="w-8 h-8 text-green-500 mb-4" />
                    <h3 className="font-bold text-white mb-2">Zero Data Collection</h3>
                    <p className="text-sm text-zinc-400">We do not have a database. We do not track your IP, email, or usage patterns.</p>
                </div>
                <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <Lock className="w-8 h-8 text-blue-500 mb-4" />
                    <h3 className="font-bold text-white mb-2">Local Storage Only</h3>
                    <p className="text-sm text-zinc-400">Your API Keys and Configs are stored in your browser's LocalStorage and never leave your device.</p>
                </div>
            </div>

            {/* Legal Content */}
            <div className="prose prose-invert max-w-none space-y-12 text-zinc-300">
                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <ServerOff className="w-5 h-5" /> 1. No Server-Side Storage
                    </h2>
                    <p>
                        ClawKit is a <strong>Client-Side Application</strong>. When you use our Config Wizard or Cost Estimator, all calculations happen instantly in your web browser (via JavaScript). We do not send your inputs to any backend server.
                    </p>
                    <p>
                        When you click "Generate JSON", the file is created locally using <code>URL.createObjectURL</code>. No file is ever uploaded to us.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <EyeOff className="w-5 h-5" /> 2. API Keys Handling
                    </h2>
                    <p>
                        If you choose to enter an API Key (e.g., for OpenAI or Anthropic) to test a connection:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>The key is stored in your browser's <code>localStorage</code>.</li>
                        <li>The key is used ONLY to make a direct request from your browser to the LLM provider (e.g., api.openai.com).</li>
                        <li>ClawKit servers never see, touch, or log your keys.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">3. Third-Party Services</h2>
                    <p>
                        We use the following third-party services to ensure the tool functions correctly:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Vercel Analytics:</strong> Collects anonymous usage data (e.g., "100 visitors viewed the homepage") to help us improve performance. No personal identifiable information (PII) is collected.</li>
                        <li><strong>GitHub API:</strong> Used by the "Status Page" to fetch the latest release versions of OpenClaw.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
                    <p>
                        If you have any questions about this policy, please contact us at <a href="mailto:privacy@getclawkit.com" className="text-blue-400 hover:underline">privacy@getclawkit.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}