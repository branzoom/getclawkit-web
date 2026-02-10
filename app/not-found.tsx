import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center space-y-8">
            {/* Icon & Glitch Effect */}
            <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="relative p-6 bg-card border border-border rounded-2xl shadow-2xl transform rotate-3">
                    <FileQuestion className="w-16 h-16 text-blue-400" />
                </div>
            </div>

            {/* Text Content */}
            <div className="space-y-4 max-w-lg">
                <h1 className="text-6xl font-bold tracking-tighter text-foreground">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-foreground/80">
                    Signal Lost
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                    The page you are looking for might have been moved, deleted, or is just hiding in the OpenClaw matrix.
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="gap-2 font-bold">
                    <Link href="/">
                        <Home className="w-4 h-4" />
                        Return to Base
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 border-border hover:bg-muted text-muted-foreground hover:text-foreground">
                    <Link href="/status">
                        <ArrowLeft className="w-4 h-4" />
                        Check System Status
                    </Link>
                </Button>
            </div>

            {/* Footer Hint */}
            <p className="text-xs text-muted-foreground/70 pt-8 font-mono">
                Error Code: ERR_PAGE_NOT_FOUND // CLAWKIT_V2
            </p>
        </div>
    );
}