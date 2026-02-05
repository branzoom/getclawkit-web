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
    default: 'ClawKit - The Unofficial OpenClaw Setup Companion',
  },
  description: 'NOT a mechanical kit. The essential software toolkit for OpenClaw AI agents. Generate verified JSON configs, fix connection refused errors, and manage skills.',
  metadataBase: new URL('https://getclawkit.com'),
  openGraph: {
    title: 'ClawKit - The Unofficial OpenClaw Setup Companion',
    description: 'NOT a mechanical kit. The essential software toolkit for OpenClaw AI agents.',
    url: 'https://getclawkit.com',
    siteName: 'ClawKit',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ClawKit Software Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
      "priceCurrency": "USD"
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