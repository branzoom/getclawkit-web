import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
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

// 动态生成 Metadata，根据语言变化
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'zh' ? 'OpenClaw Nexus - 配置与诊断工具' : 'OpenClaw Nexus - Unofficial Companion Tool';
  const description = locale === 'zh'
    ? '一键生成 OpenClaw 配置，诊断环境问题，计算 Token 成本。'
    : 'Generate verified configs, diagnose connection issues, and estimate token costs for your AI Agents.';

  return {
    title: {
      template: '%s | GetClawKit',
      default: title,
    },
    description: description,
    metadataBase: new URL('https://getclawkit.com'), // 你的域名
    openGraph: {
      title: title,
      description: description,
      url: `https://getclawkit.com/${locale}`,
      siteName: 'ClawKit',
      images: [
        {
          url: '/og-image.png', // 确保你在 public 放入了这个图片
          width: 1200,
          height: 630,
          alt: 'ClawKit Preview',
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ['/og-image.png'],
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Next.js 15 需要 await params
  const { locale } = await params;

  // 获取翻译内容
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning> {/* 强制 dark class */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-black text-white selection:bg-blue-500/30`}>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main className="flex-1 w-full">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}