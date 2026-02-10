'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ArrowRight, Star, ChevronDown } from 'lucide-react';

export interface SkillIndexItem {
    id: string;
    name: string;
    shortDesc: string;
    tags: string[];
    author: string;
    stars: number;
    source_repo: string;
}

const PAGE_SIZE = 30;

export default function SkillRegistry({ skills }: { skills: SkillIndexItem[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    // Build Fuse index once from props
    const fuse = useMemo(
        () => new Fuse(skills, {
            keys: ['name', 'shortDesc', 'tags'],
            threshold: 0.4,
            includeScore: true,
        }),
        [skills]
    );

    // 300ms debounce for search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Reset pagination when search changes
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [debouncedTerm]);

    // Fuzzy search
    const filteredSkills = useMemo(() => {
        if (!debouncedTerm.trim()) return skills;
        return fuse.search(debouncedTerm).map(result => result.item);
    }, [debouncedTerm, skills, fuse]);

    // Paginated slice
    const visibleSkills = useMemo(
        () => filteredSkills.slice(0, visibleCount),
        [filteredSkills, visibleCount]
    );

    const hasMore = visibleCount < filteredSkills.length;
    const remaining = filteredSkills.length - visibleCount;

    const loadMore = useCallback(() => {
        setVisibleCount(prev => prev + PAGE_SIZE);
    }, []);

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
                {/* Result count */}
                {debouncedTerm && (
                    <div className="text-center mt-3 text-sm text-muted-foreground">
                        {filteredSkills.length} result{filteredSkills.length !== 1 ? 's' : ''} for &quot;{debouncedTerm}&quot;
                    </div>
                )}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleSkills.map((skill) => (
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
                        className="gap-2 text-muted-foreground hover:text-foreground border-border hover:border-border px-8"
                    >
                        <ChevronDown className="w-4 h-4" />
                        Load More ({remaining > PAGE_SIZE ? PAGE_SIZE : remaining} of {remaining.toLocaleString()} remaining)
                    </Button>
                </div>
            )}

            {/* Total count footer */}
            {!debouncedTerm && (
                <div className="text-center text-sm text-muted-foreground/70">
                    Showing {visibleSkills.length.toLocaleString()} of {filteredSkills.length.toLocaleString()} skills
                </div>
            )}

            {/* Empty State */}
            {filteredSkills.length === 0 && (
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
