import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { skills } from '@/data/skills';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Star, Calendar, ShieldCheck, Terminal, ArrowLeft, Github, AlertTriangle, FileDown, Sparkles, User, Tag, Scale } from 'lucide-react';
import CopyButton from '@/components/CopyButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SkillConfigSnippet from '@/components/SkillConfigSnippet';

interface Props {
    params: Promise<{ skillId: string }>;
}

// 1. [SEO] 核心升级：优先使用 DeepSeek 生成的 SEO 标题和描述
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { skillId } = await params;
    const skill = skills.find(s => s.id === skillId);

    if (!skill) return { title: 'Skill Not Found' };

    const seoTitle = skill.seo_content?.seo_title || `${skill.name} - OpenClaw Plugin | ClawKit`;
    const seoDesc = skill.seo_content?.seo_description || `Install ${skill.name} for OpenClaw. ${skill.shortDesc}`;

    return {
        title: seoTitle,
        description: seoDesc,
        alternates: { canonical: `https://getclawkit.com/skills/${skillId}` },
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

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": skill.name,
        "description": skill.seo_content?.seo_description || skill.shortDesc,
        "operatingSystem": "OpenClaw OS",
        "applicationCategory": "Plugin",
        "author": {
            "@type": "Person",
            "name": skill.author
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

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
                                {skill.category || 'Official'}
                            </Badge>
                            <Badge variant="default" className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/20 gap-1">
                                <ShieldCheck className="w-3 h-3" /> Verified Safe
                            </Badge>
                            <Badge variant="secondary" className="bg-white/10 text-zinc-300">
                                v{skill.version || '1.0.0'}
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{skill.name}</h1>
                        <p className="text-xl text-zinc-400 leading-relaxed mb-6">{skill.shortDesc}</p>

                        {/* Why use this skill? */}
                        {skill.seo_content?.seo_description && (
                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <Sparkles className="w-24 h-24 text-blue-400" />
                                </div>
                                <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-2 text-sm uppercase tracking-wider">
                                    <Sparkles className="w-4 h-4" /> Why use this skill?
                                </h3>
                                <p className="text-zinc-300 leading-relaxed text-sm md:text-base relative z-10">
                                    {skill.seo_content.seo_description}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action Card */}
                    <Card className="bg-[#0d1117] border-zinc-800">
                        <CardContent className="p-6 space-y-5">
                            <div>
                                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-purple-400" /> Install via CLI (Recommended)
                                </h3>
                                <div className="flex gap-2">
                                    <code className="flex-1 bg-black border border-zinc-800 rounded p-3 text-green-400 font-mono text-sm overflow-x-auto">
                                        {skill.command}
                                    </code>
                                    <CopyButton text={skill.command} />
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0d1117] px-2 text-zinc-500">Or</span></div>
                            </div>
                            <div>
                                <Button asChild className="w-full bg-white text-black hover:bg-zinc-200 font-bold" size="lg">
                                    <Link href={skill.downloadUrl || skill.authorUrl || '#'} target="_blank">
                                        <FileDown className="w-4 h-4 mr-2" />
                                        Download Source Code (.zip)
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Markdown Content */}
                    <div className="prose prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10 prose-headings:text-white prose-a:text-blue-400">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                a: ({ node, ...props }) => <a {...props} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" />,
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

                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                        <Button variant="outline" className="gap-2 text-zinc-400 hover:text-white border-zinc-700 hover:border-zinc-500" asChild>
                            <Link href={skill.downloadUrl || skill.authorUrl || '#'} target="_blank">
                                <Github className="w-4 h-4" />
                                Read Full Documentation on GitHub
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Sidebar (Right) - 升级版 */}
                <div className="space-y-6">
                    <Card className="bg-zinc-900/30 border-white/10">
                        <CardContent className="p-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-zinc-500 mb-4">Metadata</h3>
                                <div className="space-y-4">
                                    {/* Author (新增) */}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2"><User className="w-4 h-4" /> Author</span>
                                        <Link
                                            href={skill.authorUrl || '#'}
                                            target="_blank"
                                            className="text-blue-400 hover:text-blue-300 font-mono underline-offset-4 hover:underline"
                                        >
                                            @{skill.author}
                                        </Link>
                                    </div>
                                    {/* <Separator className="bg-white/5" />

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2"><Download className="w-4 h-4" /> Downloads</span>
                                        <span className="text-white font-mono">{(skill.downloads || 0).toLocaleString()}</span>
                                    </div> */}
                                    <Separator className="bg-white/5" />

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2"><Star className="w-4 h-4" /> Stars</span>
                                        <span className="text-white font-mono">{skill.stars}</span>
                                    </div>
                                    <Separator className="bg-white/5" />

                                    {/* License (恢复) */}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2"><Scale className="w-4 h-4" /> License</span>
                                        <span className="text-white font-mono">{skill.license || 'MIT'}</span>
                                    </div>
                                    <Separator className="bg-white/5" />

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2"><Calendar className="w-4 h-4" /> Updated</span>
                                        <span className="text-white font-mono">{skill.lastUpdated}</span>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full gap-2" variant="outline" asChild>
                                <Link href={skill.authorUrl || '#'} target="_blank">
                                    <Github className="w-4 h-4" /> View Author Profile
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Config Generator Snippet (New) */}
                    <SkillConfigSnippet skillId={skill.id} skillName={skill.name} />

                    {/* Tags Section (新增) */}
                    {skill.tags && skill.tags.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-zinc-500 px-1 flex items-center gap-2">
                                <Tag className="w-3 h-3" /> Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skill.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="bg-white/5 hover:bg-white/10 text-zinc-400 border-white/5">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Safety Disclaimer */}
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                        <div className="text-xs text-yellow-200/80">
                            <strong className="block text-yellow-500 mb-1">Safety Note</strong>
                            ClawKit audits metadata but not runtime behavior. Use with caution.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}