'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
    const pathname = usePathname();

    // Split path and filter out empty strings
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 0) return null;

    return (
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 font-medium overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
            <Link
                href="/"
                className="flex items-center gap-1 hover:text-white transition-colors"
            >
                <Home className="w-3 h-3" />
                <span>Home</span>
            </Link>

            {segments.map((segment, index) => {
                const href = `/${segments.slice(0, index + 1).join('/')}`;
                const isLast = index === segments.length - 1;

                // Capitalize and format segment name
                const label = segment
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                return (
                    <div key={href} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3 text-zinc-700" />
                        {isLast ? (
                            <span className="text-white font-bold">{label}</span>
                        ) : (
                            <Link
                                href={href}
                                className="hover:text-white transition-colors capitalize"
                            >
                                {label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
