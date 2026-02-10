'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ThemeToggle } from '@/components/ThemeToggle';

export function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // UX-02: Auto-close mobile menu on route change
    useEffect(() => { setIsOpen(false); }, [pathname]);

    const navItems = [
        { name: 'Docs', href: '/docs' },
        { name: 'Config', href: '/tools/config' },
        { name: 'Doctor', href: '/tools/doctor' },
        { name: 'Cost', href: '/tools/cost' },
        // { name: 'Status', href: '/status' },
        { name: 'Skills', href: '/skills' },
        // { name: 'Wiki', href: '/wiki' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo (兼具 Home 功能) */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-foreground hover:opacity-80 transition-opacity">
                    <Image
                        src="/logo.png"
                        alt="ClawKit Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-md"
                    />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        ClawKit
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            data-umami-event="nav-click"
                            data-umami-event-item={item.name}
                            className={`transition-colors hover:text-foreground ${pathname === item.href || pathname.startsWith(item.href + '/')
                                ? 'text-foreground font-bold'
                                : 'text-muted-foreground'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Link
                        href="https://github.com/branzoom/getclawkit-web"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="GitHub Repository"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                    <button
                        className="md:hidden text-muted-foreground hover:text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-border bg-background absolute w-full left-0 top-16 h-screen overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col p-6 gap-6 text-lg">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="text-muted-foreground hover:text-foreground border-b border-border pb-4"
                        >
                            Home
                        </Link>

                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`hover:text-foreground ${pathname.includes(item.href) ? 'text-foreground font-bold' : 'text-muted-foreground'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
