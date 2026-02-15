import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, FileJson, Stethoscope, Flame, Puzzle } from 'lucide-react';

const tools = {
    config: {
        href: '/tools/config',
        title: 'Config Wizard',
        desc: 'Generate a production-ready clawhub.json in 30 seconds.',
        icon: FileJson,
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'group-hover:border-blue-500/30',
    },
    doctor: {
        href: '/tools/doctor',
        title: 'Local Doctor',
        desc: 'Diagnose Node.js, permissions, and config issues instantly.',
        icon: Stethoscope,
        color: 'text-green-400',
        bg: 'bg-green-500/10',
        border: 'group-hover:border-green-500/30',
    },
    cost: {
        href: '/tools/cost',
        title: 'Cost Simulator',
        desc: 'Calculate your agent burn rate before you get surprised.',
        icon: Flame,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'group-hover:border-orange-500/30',
    },
    skills: {
        href: '/skills',
        title: 'Skill Registry',
        desc: 'Browse 9,000+ verified plugins for your OpenClaw agent.',
        icon: Puzzle,
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'group-hover:border-purple-500/30',
    },
} as const;

type ToolKey = keyof typeof tools;

interface ToolCrossSellProps {
    current: ToolKey;
    heading?: string;
}

export default function ToolCrossSell({ current, heading = "What's Next?" }: ToolCrossSellProps) {
    const recommendations = (Object.keys(tools) as ToolKey[]).filter((key) => key !== current);

    return (
        <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">{heading}</h2>
            <div className="grid sm:grid-cols-3 gap-4">
                {recommendations.map((key) => {
                    const tool = tools[key];
                    const Icon = tool.icon;
                    return (
                        <Link
                            key={key}
                            href={tool.href}
                            className="group block"
                            data-umami-event="cross-tool-click"
                            data-umami-event-from={current}
                            data-umami-event-to={key}
                        >
                            <Card className={`bg-card/30 border-border h-full transition-colors ${tool.border}`}>
                                <CardContent className="p-5 space-y-3">
                                    <div className={`w-10 h-10 rounded-lg ${tool.bg} flex items-center justify-center`}>
                                        <Icon className={`w-5 h-5 ${tool.color}`} />
                                    </div>
                                    <h3 className="font-semibold text-foreground group-hover:text-blue-400 transition-colors flex items-center gap-2">
                                        {tool.title}
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {tool.desc}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
