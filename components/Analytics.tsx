'use client';

import Script from 'next/script';

export default function Analytics() {
    return (
        <>
            {/* Google Analytics 4 */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-XXXXXXXXXX');
        `}
            </Script>

            {/* Umami Analytics (Privacy Focused) */}
            {/* 假设你在 Coolify 部署了 Umami，替换下面的 src 和 website-id */}
            <Script
                async
                defer
                src="https://your-umami.getclawkit.com/script.js"
                data-website-id="your-website-uuid"
                strategy="lazyOnload"
            />
        </>
    );
}