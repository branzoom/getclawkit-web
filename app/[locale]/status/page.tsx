import StatusWidget from '@/components/StatusWidget';

export default function StatusPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-xl flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-white mb-2">System Status</h1>
                <p className="text-zinc-400">Live health check of the OpenClaw ecosystem.</p>
            </div>

            <StatusWidget />

            <p className="mt-12 text-xs text-zinc-600">
                Updates every 60 seconds. Powered by ClawKit Edge Network.
            </p>
        </div>
    );
}