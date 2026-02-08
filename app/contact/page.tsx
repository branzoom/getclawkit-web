import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Github, Twitter, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Contact Us - ClawKit',
    description: 'Get support, report bugs, or suggest features for ClawKit.',
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-bold text-white">Get in Touch</h1>
                <p className="text-zinc-400 max-w-xl mx-auto">
                    We are building in public. Whether you found a bug or just want to say hi, we'd love to hear from you.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* 1. GitHub Support */}
                <Card className="bg-zinc-900 border-white/10 hover:border-white/20 transition-colors">
                    <CardHeader>
                        <Github className="w-8 h-8 text-white mb-2" />
                        <CardTitle>Bug Reports</CardTitle>
                        <CardDescription>Found a glitch? Open an issue on GitHub.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-zinc-400 mb-6 min-h-[40px]">
                            The fastest way to get technical help or report broken scripts.
                        </p>
                        <Button asChild className="w-full bg-white text-black hover:bg-zinc-200">
                            <Link href="https://github.com/branzoom/getclawkit-web/issues" target="_blank">
                                Open GitHub Issue
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* 2. Twitter/X */}
                <Card className="bg-zinc-900 border-white/10 hover:border-blue-500/20 transition-colors">
                    <CardHeader>
                        <Twitter className="w-8 h-8 text-blue-400 mb-2" />
                        <CardTitle>Quick Chat</CardTitle>
                        <CardDescription>Follow us for updates & tips.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-zinc-400 mb-6 min-h-[40px]">
                            Ideal for quick questions, feature requests, or just sharing your setup.
                        </p>
                        <Button asChild variant="outline" className="w-full border-blue-500/20 text-blue-400 hover:bg-blue-500/10">
                            <Link href="https://x.com/Xbrave_R" target="_blank">
                                DM on X
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* 3. Email */}
                <Card className="bg-zinc-900 border-white/10 hover:border-green-500/20 transition-colors">
                    <CardHeader>
                        <Mail className="w-8 h-8 text-green-400 mb-2" />
                        <CardTitle>Email Us</CardTitle>
                        <CardDescription>For partnerships or private inquiries.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-zinc-400 mb-6 min-h-[40px]">
                            We usually respond within 24-48 hours.
                        </p>
                        <Button asChild variant="outline" className="w-full border-green-500/20 text-green-400 hover:bg-green-500/10">
                            <Link href="mailto:hello@getclawkit.com">
                                Send Email
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* FAQ Section */}
            <div className="mt-24 border-t border-white/10 pt-16 text-center">
                <h2 className="text-2xl font-bold text-white mb-6">Common Questions</h2>
                <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
                    <div>
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-zinc-500" /> I need help installing OpenClaw.
                        </h3>
                        <p className="text-sm text-zinc-400">
                            Please check our <Link href="/tools/doctor" className="text-blue-400 hover:underline">Local Doctor</Link> tool first. It fixes 90% of installation issues automatically.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-zinc-500" /> Can I contribute code?
                        </h3>
                        <p className="text-sm text-zinc-400">
                            Yes! We are open source. Fork our repo and submit a PR. We merge community fixes weekly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}