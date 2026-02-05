import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: 'Troubleshooting OpenClaw - Fix Connection Refused & Config Errors',
    description: 'Definitive guide to fixing common OpenClaw errors: ECONNREFUSED 0.0.0.0, YAML indentation, Python dependency missing, and API key issues.',
};

export default function TroubleshootingPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            {/* Header */}
            <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
                    <AlertTriangle className="w-3 h-3" /> Debugging Guide
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Fixing Common <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">OpenClaw Errors</span>
                </h1>
                <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                    Don't panic. 90% of OpenClaw issues are caused by incorrect IP binding or Windows path formatting. Here is how to fix them.
                </p>
            </div>

            {/* Top Solution: The Doctor */}
            <Card className="bg-zinc-900 border-green-500/30 mb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400">
                        <Terminal className="w-5 h-5" /> The "Lazy" Fix
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-zinc-300">
                            Instead of reading logs manually, use our <strong>Local Doctor</strong> script. It automatically checks your Node.js version, permissions, and config syntax.
                        </p>
                        <Button asChild className="bg-green-500 text-black hover:bg-green-400 font-bold whitespace-nowrap">
                            <Link href="/tools/doctor">
                                Run Auto-Diagnosis <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Error Log Library (SEO Goldmine) */}
            <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                    Error Library
                </h2>

                <Accordion type="single" collapsible className="w-full">
                    {/* Error 1: 0.0.0.0 */}
                    <AccordionItem value="item-1" className="border-white/10">
                        <AccordionTrigger className="text-lg text-white font-mono hover:text-red-400 text-left">
                            Error: connect ECONNREFUSED 0.0.0.0:3000
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400 space-y-4 pt-4">
                            <p>
                                <strong>Why this happens:</strong> In Node.js v17+, <code>0.0.0.0</code> is no longer allowed as a target address for `fetch` or `axios` on some systems (especially macOS and Windows) due to IP version ordering.
                            </p>
                            <div className="bg-black p-4 rounded-lg border border-red-900/50">
                                <p className="text-green-400 font-mono text-sm">
                                    <span className="text-zinc-500"># Solution: Change host to 127.0.0.1</span><br />
                                    HOST=127.0.0.1
                                </p>
                            </div>
                            <p>
                                Or use our <Link href="/tools/config" className="text-blue-400 underline">Config Wizard</Link> which sets this correctly by default.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Error 2: Windows Path */}
                    <AccordionItem value="item-2" className="border-white/10">
                        <AccordionTrigger className="text-lg text-white font-mono hover:text-red-400 text-left">
                            SyntaxError: Unexpected token \ in JSON
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400 space-y-4 pt-4">
                            <p>
                                <strong>Why this happens:</strong> You are using Windows paths like <code>C:\Users\Name</code> in a JSON string. JSON treats single backslashes as escape characters.
                            </p>
                            <div className="bg-black p-4 rounded-lg border border-red-900/50">
                                <p className="text-red-400 font-mono text-sm line-through">"path": "C:\Users\Data"</p>
                                <p className="text-green-400 font-mono text-sm mt-2">"path": "C:\\Users\\Data"</p>
                            </div>
                            <p>
                                <Link href="/tools/config" className="text-blue-400 underline">Generate a Windows-compatible config</Link> automatically.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Error 3: YAML */}
                    <AccordionItem value="item-3" className="border-white/10">
                        <AccordionTrigger className="text-lg text-white font-mono hover:text-red-400 text-left">
                            YAMLException: bad indentation of a mapping entry
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400 space-y-4 pt-4">
                            <p>
                                <strong>Why this happens:</strong> OpenClaw v1 used YAML, which is extremely sensitive to spaces vs tabs. OpenClaw v2 supports (and prefers) JSON.
                            </p>
                            <p>
                                We highly recommend migrating to JSON to avoid whitespace errors completely.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Error 4: Python */}
                    <AccordionItem value="item-4" className="border-white/10">
                        <AccordionTrigger className="text-lg text-white font-mono hover:text-red-400 text-left">
                            Error: 'python3' is not recognized as an internal command
                        </AccordionTrigger>
                        <AccordionContent className="text-zinc-400 space-y-4 pt-4">
                            <p>
                                <strong>Why this happens:</strong> Some Skills (like the Data Analysis skill) rely on a local Python environment.
                            </p>
                            <p>
                                1. Install Python 3.10+ from python.org.<br />
                                2. Ensure "Add Python to PATH" is checked during installation.<br />
                                3. Restart your terminal.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="mt-12 p-6 bg-blue-900/20 border border-blue-500/20 rounded-xl text-center">
                <h3 className="text-white font-bold mb-2">Still stuck?</h3>
                <p className="text-zinc-400 text-sm mb-4">
                    The error might be specific to your OS version.
                </p>
                <Button asChild variant="secondary">
                    <Link href="https://github.com/openclaw/openclaw/issues" target="_blank">
                        Search GitHub Issues
                    </Link>
                </Button>
            </div>
        </div>
    );
}