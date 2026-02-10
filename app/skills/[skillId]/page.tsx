import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSkillById } from '@/lib/db/skills';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, Calendar, ShieldCheck, Terminal, ArrowLeft, Github, FileDown, Sparkles, User, Tag, AlertTriangle } from 'lucide-react';
import CopyButton from '@/components/CopyButton';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SkillConfigSnippet from '@/components/SkillConfigSnippet';

interface Props {
    params: Promise<{ skillId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { skillId } = await params;
    const skill = await getSkillById(skillId);

    if (!skill) return { title: 'Skill Not Found' };

    const name = String(skill.name || '');
    const shortDesc = String(skill.shortDesc || '');
    const seoTitle = skill.seoTitle || `${name} - OpenClaw Plugin | ClawKit`;
    const seoDesc = skill.seoDesc || `Install ${name} for OpenClaw. ${shortDesc}`;

    return {
        title: seoTitle,
        description: seoDesc,
        alternates: { canonical: `https://getclawkit.com/skills/${skillId}` },
    };
}

export default async function SkillDetailPage({ params }: Props) {
    const { skillId } = await params;
    const skill = await getSkillById(skillId);

    if (!skill) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": skill.name,
        "description": skill.seoDesc || skill.shortDesc,
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

            <Link href="/skills" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Registry
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                                {skill.sourceRepo === 'openclaw/skills' ? 'Official' : 'Community'}
                            </Badge>
                            <Badge variant="default" className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/20 gap-1">
                                <ShieldCheck className="w-3 h-3" /> Verified
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{String(skill.name || '')}</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-6">{String(skill.shortDesc || '')}</p>

                        {/* Why use this skill? */}
                        {skill.seoDesc && (
                            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                    <Sparkles className="w-24 h-24 text-blue-400" />
                                </div>
                                <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-2 text-sm uppercase tracking-wider">
                                    <Sparkles className="w-4 h-4" /> Why use this skill?
                                </h3>
                                <p className="text-foreground/80 leading-relaxed text-sm md:text-base relative z-10">
                                    {skill.seoDesc}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Action Card */}
                    <Card className="bg-[#0d1117] border-border">
                        <CardContent className="p-6 space-y-5">
                            <div>
                                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                    <Terminal className="w-4 h-4 text-purple-400" /> Install via CLI (Recommended)
                                </h3>
                                <div className="flex gap-2">
                                    <code className="flex-1 bg-card border border-border rounded p-3 text-green-400 font-mono text-sm overflow-x-auto">
                                        {skill.command}
                                    </code>
                                    <CopyButton text={skill.command} eventName="skill-copy-install" eventData={{ skillId: skill.id }} />
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div>
                            </div>
                            <div>
                                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold" size="lg">
                                    <Link href={skill.downloadUrl || skill.authorUrl || '#'} target="_blank" data-umami-event="skill-download-source">
                                        <FileDown className="w-4 h-4 mr-2" />
                                        Download Source Code (.zip)
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Markdown Content */}
                    <div className="prose dark:prose-invert max-w-none prose-pre:bg-card prose-pre:border prose-pre:border-border prose-headings:text-foreground prose-a:text-blue-400">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                a: ({ node, ...props }) => <a {...props} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" />,
                                code: ({ node, inline, className, children, ...props }: any) => {
                                    return inline ? (
                                        <code className="bg-muted rounded px-1 py-0.5 text-sm font-mono text-red-300" {...props}>
                                            {children}
                                        </code>
                                    ) : (
                                        <code className="block bg-background/50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-foreground/80" {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {skill.longDesc}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border text-center">
                        <Button variant="outline" className="gap-2 text-muted-foreground hover:text-foreground border-border hover:border-border" asChild>
                            <Link href={skill.downloadUrl || skill.authorUrl || '#'} target="_blank" data-umami-event="skill-view-github">
                                <Github className="w-4 h-4" />
                                Read Full Documentation on GitHub
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Sidebar (Right) */}
                <div className="space-y-6">
                    <Card className="bg-card/30 border-border">
                        <CardContent className="p-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-4">Metadata</h3>
                                <div className="space-y-4">
                                    {/* Author */}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2"><User className="w-4 h-4" /> Author</span>
                                        <Link
                                            href={skill.authorUrl || '#'}
                                            target="_blank"
                                            className="text-blue-400 hover:text-blue-300 font-mono underline-offset-4 hover:underline"
                                        >
                                            @{skill.author}
                                        </Link>
                                    </div>
                                    <Separator className="bg-muted" />

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2"><Star className="w-4 h-4" /> Stars</span>
                                        <span className="text-foreground font-mono">{skill.stars}</span>
                                    </div>
                                    <Separator className="bg-muted" />

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" /> Updated</span>
                                        <span className="text-foreground font-mono">{new Date(skill.lastUpdated).toISOString().split('T')[0]}</span>
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

                    {/* Config Generator Snippet */}
                    <SkillConfigSnippet skillId={skill.id} skillName={skill.name} />

                    {/* Tags Section */}
                    {Array.isArray(skill.tags) && skill.tags.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground px-1 flex items-center gap-2">
                                <Tag className="w-3 h-3" /> Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skill.tags.filter((t: string) => typeof t === 'string').map((tag: string) => (
                                    <Badge key={tag} variant="secondary" className="bg-muted hover:bg-muted text-muted-foreground border-border">
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
