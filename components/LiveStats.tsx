'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Package, Users } from 'lucide-react';
import { skills } from '@/data/skills';

export default function LiveStats() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const stats = [
        {
            icon: <TrendingUp className="w-5 h-5" />,
            value: '1,203',
            label: 'Configs Generated',
            color: 'text-blue-400'
        },
        {
            icon: <Package className="w-5 h-5" />,
            value: skills.length.toString(),
            label: 'Skills Available',
            color: 'text-orange-400'
        },
        {
            icon: <Users className="w-5 h-5" />,
            value: '847',
            label: 'Active Users',
            color: 'text-green-400'
        }
    ];

    if (!mounted) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 group"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className={`${stat.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                                {stat.value}
                            </div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
