'use client';

import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

// 🔴 关键修复：必须引入全局样式，否则 Tailwind 不生效！
import './globals.css';

export default function NotFound() {
    return (
        <html lang="en" className="dark">
            <body className="bg-black text-white min-h-screen flex items-center justify-center font-sans antialiased selection:bg-purple-500/30">
                <div className="text-center space-y-8 px-4 animate-in fade-in zoom-in-95 duration-300">

                    {/* Icon with Glow Effect */}
                    <div className="relative inline-flex">
                        <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 rounded-full"></div>
                        <div className="relative inline-flex p-5 bg-red-500/10 rounded-full ring-1 ring-red-500/20">
                            <AlertTriangle className="w-12 h-12 text-red-500" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
                            404
                        </h1>
                        <h2 className="text-2xl font-medium text-zinc-200">
                            Page Not Found
                        </h2>
                        <p className="text-zinc-500 max-w-sm mx-auto text-sm leading-relaxed">
                            Looks like you've ventured into the void. The page you are looking for is gone or never existed.
                        </p>
                    </div>

                    <div className="pt-4">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold text-sm rounded-full hover:bg-zinc-200 hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            <Home className="w-4 h-4" />
                            Return to GetClawKit
                        </Link>
                    </div>

                    <div className="text-xs text-zinc-700 pt-12">
                        Error Code: 404_NOT_FOUND
                    </div>
                </div>
            </body>
        </html>
    );
}