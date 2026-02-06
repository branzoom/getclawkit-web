'use client';

import Link from 'next/link'; // [修复 1] 移除 i18n 依赖，使用原生 Link
import { usePathname } from 'next/navigation';
import { Github, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: 'Status', href: '/status' },
        { name: 'Docs', href: '/docs' },
        { name: 'Wiki', href: '/wiki' },
        { name: 'Config', href: '/tools/config' },
        { name: 'Doctor', href: '/tools/doctor' },
        { name: 'Cost', href: '/tools/cost' }, // [修复 2] 补全 Cost 入口
        { name: 'Skills', href: '/skills' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo (兼具 Home 功能) */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white hover:opacity-80 transition-opacity">
                    <Image
                        src="/logo.png"
                        alt="ClawKit Logo"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-md"
                    />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        ClawKit
                    </span> {/* [修复 3] 品牌名修正为 ClawKit */}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition-colors hover:text-white ${pathname === item.href || pathname.startsWith(item.href + '/')
                                ? 'text-white font-bold'
                                : 'text-zinc-400'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com/branzoom/getclawkit-web" // (或者你的实际仓库地址)
                        target="_blank"
                        rel="noopener noreferrer" // 安全性最佳实践
                        className="text-zinc-400 hover:text-white transition-colors"
                        aria-label="GitHub Repository"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                    <button
                        className="md:hidden text-zinc-400 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden border-t border-white/10 bg-black absolute w-full left-0 top-16 h-screen animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col p-6 gap-6 text-lg">
                        {/* 移动端增加 Home 链接，方便手指点击 */}
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="text-zinc-400 hover:text-white border-b border-white/5 pb-4"
                        >
                            Home
                        </Link>

                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`hover:text-white ${pathname.includes(item.href) ? 'text-white font-bold' : 'text-zinc-400'
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