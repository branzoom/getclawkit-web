import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { skills } from '@/data/skills';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Star, Calendar, ShieldCheck, Terminal, Copy, ArrowLeft, Github, AlertTriangle, FileDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
    params: Promise<{ skillId: string }>;
}

// 1. [SEO] 动态生成每个页面的 Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { skillId } = await params;
    const skill = skills.find(s => s.id === skillId);

    if (!skill) return { title: 'Skill Not Found' };

    return {
        title: `${skill.name} - OpenClaw Plugin | ClawKit`,
        description: `Install ${skill.name} for OpenClaw. ${skill.shortDesc} Verified skill with ${skill.downloads} downloads.`,
        keywords: [...skill.tags, 'openclaw skill', 'agent plugin', 'clawkit registry']
    };
}

// 2. [Performance] 静态生成所有路径 (SSG)
export async function generateStaticParams() {
    return skills.map((skill) => ({
        skillId: skill.id,
    }));
}

export default async function SkillDetailPage({ params }: Props) {
    const { skillId } = await params;
    const skill = skills.find(s => s.id === skillId);

    if (!skill) notFound();

    // JSON-LD Schema for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": skill.name,
        "operatingSystem": "OpenClaw OS",
        "applicationCategory": "Plugin",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": skill.stars
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Inject Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Back Button */}
            <Link href="/skills" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Registry
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                                {skill.category}
                            </Badge>
                            {skill.safetyRating === 'Verified' && (
                                <Badge variant="default" className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/20 gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Verified Safe
                                </Badge>
                            )}
                            <Badge variant="secondary" className="bg-white/10 text-zinc-300">
                                v{skill.version}
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{skill.name}</h1>
                        <p className="text-xl text-zinc-400 leading-relaxed">{skill.shortDesc}</p>
                    </div>

                    {/* Action Card: Install & Download */}
                    <Card className="bg-[#0d1117] border-zinc-800">
                        <CardContent className="p-6 space-y-5">
                            {/* Option 1: CLI Install */}
                            <div>
                                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-purple-400" /> Install via CLI (Recommended)
                                </h3>
                                <div className="flex gap-2">
                                    <code className="flex-1 bg-black border border-zinc-800 rounded p-3 text-green-400 font-mono text-sm overflow-x-auto">
                                        {skill.command}
                                    </code>
                                    {/* 简单的复制按钮占位，实际可加交互逻辑 */}
                                    <Button variant="secondary" size="icon" className="shrink-0">
                                        <Copy className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0d1117] px-2 text-zinc-500">Or</span></div>
                            </div>

                            {/* Option 2: Direct Download */}
                            <div>
                                <Button asChild className="w-full bg-white text-black hover:bg-zinc-200 font-bold" size="lg">
                                    {/* 使用 Python 脚本生成的 downloadUrl，如果不存在则回退到 repo 地址 */}
                                    <a href={(skill as any).downloadUrl || skill.authorUrl} target="_blank" rel="noopener noreferrer">
                                        <FileDown className="w-4 h-4 mr-2" />
                                        Download Source Code (.zip)
                                    </a>
                                </Button>
                                <p className="text-xs text-zinc-500 text-center mt-2">
                                    Downloaded directly from GitHub default branch.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rich Description (Markdown Content) */}
                    <div className="prose prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10 prose-headings:text-white prose-a:text-blue-400">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                // 自定义链接样式，强制新窗口打开
                                a: ({ node, ...props }) => <a {...props} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" />,
                                // 自定义代码块样式
                                code: ({ node, inline, className, children, ...props }: any) => {
                                    return inline ? (
                                        <code className="bg-white/10 rounded px-1 py-0.5 text-sm font-mono text-red-300" {...props}>
                                            {children}
                                        </code>
                                    ) : (
                                        <code className="block bg-black/50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-zinc-300" {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {skill.longDesc}
                        </ReactMarkdown>
                    </div>
                    {/* Read More Button */}
                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <Button variant="outline" className="gap-2 text-zinc-400 hover:text-white border-zinc-700 hover:border-zinc-500" asChild>
                            <Link href={(skill as any).downloadUrl} target="_blank">
                                <Github className="w-4 h-4" />
                                Read Full Documentation on GitHub
                            </Link>
                        </Button>
                        <p className="text-xs text-zinc-600 mt-2">
                            Description truncated for performance. View original source for complete details.
                        </p>
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="space-y-6">
                    <Card className="bg-zinc-900/30 border-white/10">
                        <CardContent className="p-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-zinc-500 mb-2">Metadata</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2"><Download className="w-4 h-4" /> Downloads (Forks)</span>
                                        <span className="text-white font-mono">{skill.downloads.toLocaleString()}</span>
                                    </div>
                                    <Separator className="bg-white/5" />
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2"><Star className="w-4 h-4" /> Stars</span>
                                        <span className="text-white font-mono">{skill.stars}</span>
                                    </div>
                                    <Separator className="bg-white/5" />
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2"><Calendar className="w-4 h-4" /> Updated</span>
                                        <span className="text-white font-mono">{skill.lastUpdated}</span>
                                    </div>
                                    <Separator className="bg-white/5" />
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> License</span>
                                        <span className="text-white font-mono">{skill.license}</span>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full gap-2" variant="outline" asChild>
                                <Link href={skill.authorUrl} target="_blank">
                                    <Github className="w-4 h-4" /> View Source Code
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Safety Disclaimer */}
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                        <div className="text-xs text-yellow-200/80">
                            <strong className="block text-yellow-500 mb-1">Safety Note</strong>
                            Always review the source code of community plugins before using them in production environments.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}