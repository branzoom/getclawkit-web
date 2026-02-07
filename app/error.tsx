'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
                    <p className="text-zinc-400 text-sm">
                        An unexpected error occurred. This has been logged automatically.
                    </p>
                </div>
                <Button onClick={reset} className="gap-2">
                    <RefreshCw className="w-4 h-4" /> Try Again
                </Button>
            </div>
        </div>
    );
}
