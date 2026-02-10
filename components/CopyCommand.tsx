'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CopyCommand({ command }: { command: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-8 mx-auto max-w-xl p-4 bg-card rounded-xl border border-border font-mono text-sm flex items-center gap-3 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500">
            <span className="text-green-400 shrink-0">$</span>
            <code className="text-foreground/80 overflow-x-auto flex-1">{command}</code>
            <button
                onClick={handleCopy}
                className="shrink-0 p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Copy command"
            >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
        </div>
    );
}
