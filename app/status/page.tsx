import type { Metadata } from 'next';
import StatusWidget from '@/components/StatusWidget';
import { Activity } from 'lucide-react';

export const metadata: Metadata = {
    title: 'System Status - OpenClaw Ecosystem Monitor',
    description: 'Real-time status check for OpenClaw Core API, Registry, and Community services. View uptime history and incident reports.',
};

export default function StatusPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            {/* Header */}
            <div className="text-center mb-16 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider animate-pulse">
                    <Activity className="w-3 h-3" /> Live Monitor
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                    Is OpenClaw Down?
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Check the real-time health of the entire ecosystem.
                    We monitor the GitHub API, Registry availability, and Documentation servers every 60 seconds.
                </p>
            </div>

            {/* The Dashboard */}
            <StatusWidget />

            {/* Disclaimer */}
            <div className="mt-24 text-center border-t border-white/10 pt-8">
                <p className="text-xs text-zinc-600">
                    This status page is an unofficial community project powered by <strong>ClawKit</strong>.
                    Not affiliated with the OpenClaw official team.
                </p>
            </div>
        </div>
    );
}