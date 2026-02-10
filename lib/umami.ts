export function trackEvent(name: string, data?: Record<string, string | number>) {
    if (typeof window !== 'undefined' && typeof window.umami !== 'undefined') {
        window.umami.track(name, data);
    }
}
