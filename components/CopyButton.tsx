'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/umami';

export default function CopyButton({ text, className, eventName, eventData }: { text: string; className?: string; eventName?: string; eventData?: Record<string, string | number> }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        if (eventName) trackEvent(eventName, eventData);
    };

    return (
        <Button variant="secondary" size="icon" className={`shrink-0 ${className ?? ''}`} onClick={handleCopy}>
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </Button>
    );
}
