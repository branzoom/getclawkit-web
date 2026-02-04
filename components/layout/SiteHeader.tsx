'use client';

import { Link } from '@/i18n/navigation'
import { usePathname } from 'next/navigation';
import { Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image'; // 引入 Image 组件

export function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: 'Status', href: '/status' },
        { name: 'Config', href: '/tools/config' },
        { name: 'Doctor', href: '/tools/doctor' },
        { name: 'Skills', href: '/skills' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white hover:opacity-80 transition-opacity">
                    {/* <span className="text-2xl">🦞</span> */}
                    <Image
                        src="/logo.png"  // 确保图片在 public/logo.png
                        alt="GetClawKit Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-md" //如果你想加点圆角
                    />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        GetClawKit
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition-colors hover:text-white ${pathname.includes(item.href) ? 'text-white font-bold' : 'text-zinc-400'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com/your-repo/openclaw-nexus"
                        target="_blank"
                        className="text-zinc-400 hover:text-white transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                    <button className="md:hidden text-zinc-400" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-white/10 bg-black absolute w-full left-0 top-16 h-screen animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col p-6 gap-6 text-lg">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-white"
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