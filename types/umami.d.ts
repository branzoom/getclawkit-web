interface UmamiTracker {
    track(name: string, data?: Record<string, string | number>): void;
}

interface Window {
    umami?: UmamiTracker;
}
