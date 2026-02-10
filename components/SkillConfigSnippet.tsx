'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy, FileJson } from 'lucide-react';
import { trackEvent } from '@/lib/umami';

interface SkillConfigSnippetProps {
    skillId: string;
    skillName: string;
}

export default function SkillConfigSnippet({ skillId, skillName }: SkillConfigSnippetProps) {
    const [copied, setCopied] = useState(false);

    // Generate a default config snippet
    // In a real app, this could be fetched from the backend or stored in skills.json
    const configSnippet = JSON.stringify({
        "plugins": {
            [skillId]: {
                "enabled": true,
                "auto_update": true
            }
        }
    }, null, 2);

    const handleCopy = () => {
        navigator.clipboard.writeText(configSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        trackEvent('skill-copy-config', { skillId });
    };

    return (
        <Card className="bg-card/30 border-border">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FileJson className="w-4 h-4" /> Add to Configuration
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground">
                    Paste this into your <code>clawhub.json</code> to enable this plugin.
                </p>
                <div className="relative group">
                    <pre className="bg-card border border-border rounded-lg p-3 text-xs font-mono text-green-400 overflow-x-auto">
                        {configSnippet}
                    </pre>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-muted"
                        onClick={handleCopy}
                    >
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
