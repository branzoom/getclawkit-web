import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | ClawKit',
    default: 'ClawKit - Free OpenClaw Setup Tool & Skill Registry', // 优化：加入 Free 和 Skill Registry 关键词
  },
  description: 'The essential unofficial toolkit for OpenClaw agents. Generate verified JSON configs, fix connection refused errors, and discover community skills.',
  metadataBase: new URL('https://getclawkit.com'),

  // ✅ 新增：Canonical URL 防重复
  alternates: {
    canonical: './',
  },

  openGraph: {
    title: 'ClawKit - Free OpenClaw Setup Tool',
    description: 'Stop wrestling with YAML. Generate strict JSON configs and fix Windows path errors instantly.',
    url: 'https://getclawkit.com',
    siteName: 'ClawKit',
    images: [
      {
        url: '/og-image.png', // 记得去 public 文件夹放一张 1200x630 的图
        width: 1200,
        height: 630,
        alt: 'ClawKit Dashboard Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // ✅ 新增：Twitter Card 专门优化 (审计报告重点)
  twitter: {
    card: 'summary_large_image',
    title: 'ClawKit - OpenClaw Configuration Solved',
    description: 'Fix ECONNREFUSED and Windows path errors in seconds. The missing GUI for OpenClaw agents.',
    creator: '@your_twitter_handle', // 替换为你的推特账号
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // [SEO] Software Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ClawKit",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Windows, macOS, Linux",
    "description": "Configuration generator and diagnostic tool for OpenClaw AI ecosystem.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "category": "Free" // 强调免费
    },
    // ✅ 新增：EEAT 增强，声明作者
    "author": {
      "@type": "Person",
      "name": "ClawKit Community",
      "url": "https://github.com/branzoom" // 替换为你的 GitHub 链接
    }
  };

  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-black text-white selection:bg-blue-500/30`}>
        {/* Inject Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <SiteHeader />
        <main className="flex-1 w-full">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}