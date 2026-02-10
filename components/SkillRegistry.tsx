'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ArrowRight, Star, ChevronDown, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/umami';

export interface SkillIndexItem {
    id: string;
    name: string;
    shortDesc: string;
    tags: string[];
    author: string;
    stars: number;
    source_repo: string;
}

interface PaginatedResponse {
    skills: Array<{
        id: string;
        name: string;
        shortDesc: string;
        tags: string[];
        author: string;
        stars: number;
        sourceRepo: string | null;
    }>;
    total: number;
    page: number;
    pageSize: number;
}

const PAGE_SIZE = 30;

function mapSkill(s: PaginatedResponse['skills'][number]): SkillIndexItem {
    return {
        id: s.id,
        name: String(s.name || ''),
        shortDesc: String(s.shortDesc || ''),
        tags: Array.isArray(s.tags) ? s.tags.filter((t): t is string => typeof t === 'string') : [],
        author: s.author || '',
        stars: s.stars || 0,
        source_repo: s.sourceRepo || '',
    };
}

export default function SkillRegistry({
    initialSkills,
    initialTotal,
}: {
    initialSkills: SkillIndexItem[];
    initialTotal: number;
}) {
    const [skills, setSkills] = useState<SkillIndexItem[]>(initialSkills);
    const [total, setTotal] = useState(initialTotal);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [isPending, startTransition] = useTransition();
    const [loading, setLoading] = useState(false);

    // Debounce search input 300ms
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch when search term changes — reset to page 1
    useEffect(() => {
        let cancelled = false;
        setLoading(true);

        const params = new URLSearchParams({
            page: '1',
            pageSize: String(PAGE_SIZE),
        });
        if (debouncedTerm.trim()) {
            params.set('search', debouncedTerm.trim());
            trackEvent('skill-search', { query: debouncedTerm.trim() });
        }

        fetch(`/api/skills?${params}`)
            .then(r => r.json())
            .then((data: PaginatedResponse) => {
                if (cancelled) return;
                setSkills(data.skills.map(mapSkill));
                setTotal(data.total);
                setPage(1);
                setLoading(false);
            })
            .catch(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [debouncedTerm]);

    // Load more
    const loadMore = useCallback(() => {
        const nextPage = page + 1;
        setLoading(true);

        const params = new URLSearchParams({
            page: String(nextPage),
            pageSize: String(PAGE_SIZE),
        });
        if (debouncedTerm.trim()) params.set('search', debouncedTerm.trim());

        startTransition(() => {
            fetch(`/api/skills?${params}`)
                .then(r => r.json())
                .then((data: PaginatedResponse) => {
                    setSkills(prev => [...prev, ...data.skills.map(mapSkill)]);
                    setTotal(data.total);
                    setPage(nextPage);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        });
    }, [page, debouncedTerm, startTransition]);

    const hasMore = skills.length < total;
    const remaining = total - skills.length;

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search skills (e.g., 'browser', 'crypto', 'slack')..."
                    className="pl-12 py-6 text-lg bg-card/50 border-border focus-visible:ring-blue-500 rounded-full text-foreground placeholder:text-muted-foreground"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {debouncedTerm && (
                    <div className="text-center mt-3 text-sm text-muted-foreground">
                        {loading ? (
                            <span className="inline-flex items-center gap-1.5">
                                <Loader2 className="w-3 h-3 animate-spin" /> Searching...
                            </span>
                        ) : (
                            <>
                                {total} result{total !== 1 ? 's' : ''} for &quot;{debouncedTerm}&quot;
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                    <Card key={skill.id} className="bg-card/40 border-border hover:border-blue-500/30 transition-all hover:-translate-y-1 group flex flex-col relative overflow-hidden">
                        <Link href={`/skills/${skill.id}`} className="absolute inset-0 z-10" aria-label={`View details for ${skill.name}`} />

                        <CardHeader>
                            <div className="flex justify-between items-start mb-3 relative z-20 pointer-events-none">
                                <Badge variant="outline" className="border-border text-muted-foreground group-hover:text-blue-400 group-hover:border-blue-500/30">
                                    {skill.source_repo === 'openclaw/skills' ? 'Official' : 'Community'}
                                </Badge>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    <Star className="w-3 h-3 mr-1" />
                                    {(skill.stars || 0).toLocaleString()}
                                </div>
                            </div>

                            <CardTitle className="text-xl text-foreground group-hover:text-blue-400 transition-colors relative z-20 pointer-events-none">
                                {skill.name}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="flex-1 relative z-20 pointer-events-none">
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {skill.shortDesc}
                            </p>

                            {skill.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4 opacity-50">
                                    {skill.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded">#{tag}</span>
                                    ))}
                                </div>
                            )}
                        </CardContent>

                        <CardFooter className="relative z-20">
                            <Button className="w-full bg-muted hover:bg-muted text-foreground border border-border group-hover:border-blue-500/30 group-hover:text-blue-200 transition-all">
                                View Details <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Load More */}
            {hasMore && (
                <div className="text-center pt-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={loadMore}
                        disabled={loading}
                        data-umami-event="skill-load-more"
                        className="gap-2 text-muted-foreground hover:text-foreground border-border hover:border-border px-8"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                        Load More ({remaining > PAGE_SIZE ? PAGE_SIZE : remaining} of {remaining.toLocaleString()} remaining)
                    </Button>
                </div>
            )}

            {/* Total count footer */}
            {!debouncedTerm && (
                <div className="text-center text-sm text-muted-foreground/70">
                    Showing {skills.length.toLocaleString()} of {total.toLocaleString()} skills
                </div>
            )}

            {/* Empty State */}
            {!loading && skills.length === 0 && (
                <div className="text-center py-20 bg-card/30 rounded-2xl border border-border border-dashed">
                    <p className="text-muted-foreground text-lg mb-4">No skills found matching &quot;{searchTerm}&quot;.</p>
                    <Button variant="link" className="text-blue-400" onClick={() => setSearchTerm('')}>
                        Clear Search
                    </Button>
                </div>
            )}
        </div>
    );
}
