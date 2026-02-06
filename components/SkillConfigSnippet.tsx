'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy, FileJson } from 'lucide-react';

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
    };

    return (
        <Card className="bg-zinc-900/30 border-white/10">
            <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                    <FileJson className="w-4 h-4" /> Add to Configuration
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-xs text-zinc-400">
                    Paste this into your <code>clawhub.json</code> to enable this plugin.
                </p>
                <div className="relative group">
                    <pre className="bg-[#0d1117] border border-white/10 rounded-lg p-3 text-xs font-mono text-green-400 overflow-x-auto">
                        {configSnippet}
                    </pre>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 h-6 w-6 text-zinc-500 hover:text-white hover:bg-white/10"
                        onClick={handleCopy}
                    >
                        {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
