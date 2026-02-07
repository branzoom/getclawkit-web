'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { skills } from '@/data/skills';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ArrowRight, Star } from 'lucide-react';

const fuse = new Fuse(skills, {
    keys: ['name', 'shortDesc', 'tags'],
    threshold: 0.4,
    includeScore: true,
});

export default function SkillRegistry() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');

    // UX-03: 300ms debounce
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedTerm(searchTerm), 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // FUNC-08: Fuse.js fuzzy search
    const filteredSkills = useMemo(() => {
        if (!debouncedTerm.trim()) return skills;
        return fuse.search(debouncedTerm).map(result => result.item);
    }, [debouncedTerm]);

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <Input
                    type="text"
                    placeholder="Search skills (e.g., 'browser', 'crypto', 'adapter')..."
                    className="pl-12 py-6 text-lg bg-zinc-900/50 border-white/10 focus-visible:ring-blue-500 rounded-full text-white placeholder:text-zinc-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill) => (
                    <Card key={skill.id} className="bg-zinc-900/40 border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1 group flex flex-col relative overflow-hidden">
                        {/* 全卡片点击链接 - SEO 友好 */}
                        <Link href={`/skills/${skill.id}`} className="absolute inset-0 z-10" aria-label={`View details for ${skill.name}`} />

                        <CardHeader>
                            <div className="flex justify-between items-start mb-3 relative z-20 pointer-events-none">
                                <Badge variant="outline" className="border-white/10 text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/30">
                                    {skill.source_repo === 'openclaw/skills' ? 'Official' : 'Community'}
                                </Badge>
                                <div className="flex items-center text-xs text-zinc-500">
                                    <Star className="w-3 h-3 mr-1" />
                                    {(skill.stars || 0).toLocaleString()}
                                </div>
                            </div>

                            <CardTitle className="text-xl text-white group-hover:text-blue-400 transition-colors relative z-20 pointer-events-none">
                                {skill.name}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="flex-1 relative z-20 pointer-events-none">
                            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                                {skill.shortDesc}
                            </p>

                            {/* Tags Preview */}
                            <div className="flex flex-wrap gap-2 mt-4 opacity-50">
                                {skill.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="text-[10px] text-zinc-500 bg-white/5 px-2 py-1 rounded">#{tag}</span>
                                ))}
                            </div>
                        </CardContent>

                        <CardFooter className="relative z-20">
                            {/* 视觉上的按钮，实际点击行为由覆盖全卡的 Link 触发 */}
                            <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 group-hover:border-blue-500/30 group-hover:text-blue-200 transition-all">
                                View Details <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredSkills.length === 0 && (
                <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-white/5 border-dashed">
                    <p className="text-zinc-500 text-lg mb-4">No skills found matching &quot;{searchTerm}&quot;.</p>
                    <Button variant="link" className="text-blue-400" onClick={() => setSearchTerm('')}>
                        Clear Search
                    </Button>
                </div>
            )}
        </div>
    );
}
