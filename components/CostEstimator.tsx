'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { AlertTriangle, TrendingUp, Settings2, Edit3, HelpCircle, RotateCcw, Flame, Share2, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Tooltip as UiTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { COST_ESTIMATOR_MODELS, PRICING_LAST_UPDATED } from '@/data/models';
import Link from 'next/link';

export default function CostEstimator() {
    // 状态管理
    const [models, setModels] = useState(COST_ESTIMATOR_MODELS);
    const [runsPerDay, setRunsPerDay] = useState([50]);
    const [stepsPerRun, setStepsPerRun] = useState([10]);
    const [avgTokens, setAvgTokens] = useState([2000]);
    const [contextGrowth, setContextGrowth] = useState([10]);
    const [cacheHitRate, setCacheHitRate] = useState([50]);

    // 修改模型价格
    const handlePriceChange = (id: string, field: 'inputPrice' | 'outputPrice', value: string) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return;

        setModels(prev => prev.map(m => {
            if (m.id === id) {
                return { ...m, [field]: numValue };
            }
            return m;
        }));
    };

    // 重置数据
    const resetModels = () => setModels(COST_ESTIMATOR_MODELS);

    // 核心算法：生成图表数据 (指数增长)
    const chartData = useMemo(() => {
        const data = [];
        const dailyRuns = runsPerDay[0];
        const steps = stepsPerRun[0];
        const baseTokens = avgTokens[0];
        const growthRate = contextGrowth[0] / 100;
        const cacheRate = cacheHitRate[0] / 100;

        for (let step = 1; step <= steps; step++) {
            const point: any = { step: `Step ${step}` };

            models.forEach(model => {
                // [算法升级] 使用 Math.pow 实现指数级上下文累积
                const currentInputTokens = baseTokens * Math.pow(1 + growthRate, step);

                const cachedTokens = currentInputTokens * cacheRate;
                const freshTokens = currentInputTokens * (1 - cacheRate);

                const inputCost = (cachedTokens * model.cachePrice + freshTokens * model.inputPrice) / 1000000;
                // Output 保持相对稳定 (通常 Agent 的回答长度不会随历史变长而变长)
                const outputCost = (baseTokens * 0.3 * model.outputPrice) / 1000000;

                // 计算这一步在 30 天内产生的总消耗
                const monthlyTotal = (inputCost + outputCost) * dailyRuns * 30;
                point[model.id] = monthlyTotal;
            });
            data.push(point);
        }
        return data;
    }, [runsPerDay, stepsPerRun, avgTokens, contextGrowth, cacheHitRate, models]);

    // 计算最终月度总价 (指数增长) — 修复: 移除冗余外层循环
    const finalMonthlyCosts = useMemo(() => {
        const costs: Record<string, number> = {};
        models.forEach(model => costs[model.id] = 0);

        const dailyRuns = runsPerDay[0];
        const steps = stepsPerRun[0];
        const baseTokens = avgTokens[0];
        const growthRate = contextGrowth[0] / 100;
        const cacheRate = cacheHitRate[0] / 100;

        for (let step = 1; step <= steps; step++) {
            const currentInput = baseTokens * Math.pow(1 + growthRate, step);
            const cached = currentInput * cacheRate;
            const fresh = currentInput * (1 - cacheRate);

            models.forEach(model => {
                const stepInputCost = (cached * model.cachePrice + fresh * model.inputPrice) / 1000000;
                const stepOutputCost = (baseTokens * 0.3 * model.outputPrice) / 1000000;
                costs[model.id] += (stepInputCost + stepOutputCost) * dailyRuns * 30;
            });
        }
        return costs;
    }, [runsPerDay, stepsPerRun, avgTokens, contextGrowth, cacheHitRate, models]);

    // Share Functionality
    const handleShare = () => {
        const gptCost = finalMonthlyCosts['gpt4']?.toFixed(0) ?? '0';
        const dsCost = finalMonthlyCosts['deepseek']?.toFixed(0) ?? '0';
        const text = `My AI agent cost simulation on ClawKit:\n📉 GPT-4.1: $${gptCost}/mo\n🚀 DeepSeek V3.2: $${dsCost}/mo\n\nScale your agents without going bankrupt! 💸\nCheck it out: https://getclawkit.com/tools/cost`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            <Tabs defaultValue="simulator" className="w-full">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <TabsList className="bg-card border border-border">
                        <TabsTrigger value="simulator" className="flex items-center gap-2">
                            <Flame className="w-4 h-4 text-red-500" /> Explosion Simulator {/* 图标换成火，名字改得更刺激 */}
                        </TabsTrigger>
                        <TabsTrigger value="pricing" className="flex items-center gap-2">
                            <Edit3 className="w-4 h-4" /> Price Config
                        </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex text-xs text-muted-foreground items-center gap-2 bg-card/50 px-3 py-1 rounded-full border border-border">
                            <HelpCircle className="w-3 h-3" />
                            <span>Scenario: 30-Day simulation</span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleShare}
                            className="bg-blue-600 hover:bg-blue-700 border-none text-white gap-2"
                        >
                            <Share2 className="w-3 h-3" /> Share Result
                        </Button>
                    </div>
                </div>

                {/* Tab 1: Simulator (可视化部分) */}
                <TabsContent value="simulator" className="space-y-6">
                    {/* Top Controls Grid */}
                    <Card className="bg-card border-border">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Settings2 className="w-5 h-5 text-blue-400" />
                                Workload Parameters
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Basic Params */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label>Daily Agent Runs</Label>
                                        <span className="text-blue-400 font-mono font-bold">{runsPerDay}</span>
                                    </div>
                                    <Slider value={runsPerDay} onValueChange={setRunsPerDay} max={500} step={10} />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label>Steps per Run</Label>
                                        <span className="text-blue-400 font-mono font-bold">{stepsPerRun}</span>
                                    </div>
                                    <Slider value={stepsPerRun} onValueChange={setStepsPerRun} max={30} step={1} />
                                </div>
                            </div>

                            {/* Token Params */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <Label>Avg. Tokens (Base)</Label>
                                        <span className="text-blue-400 font-mono font-bold">{avgTokens}</span>
                                    </div>
                                    <Slider value={avgTokens} onValueChange={setAvgTokens} max={5000} step={100} />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <TooltipProvider>
                                            <UiTooltip>
                                                <TooltipTrigger asChild>
                                                    <Label className="text-orange-400 cursor-help border-b border-dashed border-orange-500/30">History Growth %</Label>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-card border-border text-foreground/80">
                                                    Exponential growth! Context accumulates with every step.
                                                </TooltipContent>
                                            </UiTooltip>
                                        </TooltipProvider>
                                        <span className="text-orange-400 font-mono font-bold">+{contextGrowth}%</span>
                                    </div>
                                    <Slider value={contextGrowth} onValueChange={setContextGrowth} max={50} step={5} className="bg-orange-500/10" />
                                </div>
                            </div>

                            {/* Advanced Params */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <TooltipProvider>
                                            <UiTooltip>
                                                <TooltipTrigger asChild>
                                                    <Label className="text-green-400 cursor-help border-b border-dashed border-green-500/30">Cache Hit Rate %</Label>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-card border-border text-foreground/80">
                                                    How much of your prompt is cached? (DeepSeek/Anthropic feature)
                                                </TooltipContent>
                                            </UiTooltip>
                                        </TooltipProvider>
                                        <span className="text-green-400 font-mono font-bold">{cacheHitRate}%</span>
                                    </div>
                                    <Slider value={cacheHitRate} onValueChange={setCacheHitRate} max={100} step={10} />
                                    <p className="text-[10px] text-muted-foreground pt-1">
                                        Higher cache rate = Lower costs for supported models.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chart & Results */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Chart */}
                        <Card className="lg:col-span-2 bg-card border-border flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-foreground">Monthly Cost Projection</CardTitle>
                                <CardDescription>Estimated cost based on exponential context growth.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 min-h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                        <XAxis dataKey="step" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#71717a" fontSize={12} tickFormatter={(val) => `$${val}`} tickLine={false} axisLine={false} />
                                        <ChartTooltip
                                            contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }}
                                            itemStyle={{ fontSize: '12px' }}
                                            formatter={(value: number | undefined) => [`$${(value || 0).toFixed(2)}`, 'Cost']}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                        {models.map(model => (
                                            <Line
                                                key={model.id}
                                                type="monotone"
                                                dataKey={model.id}
                                                name={model.name}
                                                stroke={model.stroke}
                                                strokeWidth={3}
                                                dot={false}
                                                activeDot={{ r: 6 }}
                                            />
                                        ))}
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Summary Cards */}
                        <div className="space-y-4">
                            {models.map(model => (
                                <div key={model.id} className="relative group overflow-hidden rounded-xl border bg-card p-4 transition-all hover:border-border" style={{ borderColor: `${model.color}30` }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity" style={{ backgroundColor: model.color }} />
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-bold text-foreground text-sm">{model.name}</div>
                                            <div className="text-[10px] text-muted-foreground">{model.provider}</div>
                                        </div>
                                        <Badge variant="secondary" className="text-[10px] bg-background/40 border-0" style={{ color: model.color }}>
                                            {model.badge}
                                        </Badge>
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="text-2xl font-mono font-bold text-foreground">
                                            ${finalMonthlyCosts[model.id].toFixed(2)}
                                        </span>
                                        <span className="text-xs text-muted-foreground mb-1">/mo</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 2: Pricing Table (Editable) */}
                <TabsContent value="pricing" className="mt-6">
                    <Card className="bg-card border-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Model Price Configuration</CardTitle>
                                <CardDescription>Prices change often. Edit these values to match current API pricing.</CardDescription>
                            </div>
                            <button onClick={resetModels} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                                <RotateCcw className="w-3 h-3" /> Reset Defaults
                            </button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-border hover:bg-transparent">
                                        <TableHead className="text-muted-foreground">Model Name</TableHead>
                                        <TableHead className="text-muted-foreground">Input Price <span className="text-[10px] opacity-50">($/1M)</span></TableHead>
                                        <TableHead className="text-muted-foreground">Output Price <span className="text-[10px] opacity-50">($/1M)</span></TableHead>
                                        <TableHead className="text-muted-foreground">Cache Read <span className="text-[10px] opacity-50">($/1M)</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {models.map((model) => (
                                        <TableRow key={model.id} className="border-border hover:bg-muted group">
                                            <TableCell className="font-medium text-foreground flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: model.color }} />
                                                {model.name}
                                                {model.id === 'custom' && <Badge variant="outline" className="text-[10px] border-border ml-2">Editable</Badge>}
                                            </TableCell>
                                            <TableCell>
                                                {model.isEditable ? (
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        className="h-8 w-24 bg-background border-border font-mono text-xs"
                                                        value={model.inputPrice}
                                                        onChange={(e) => handlePriceChange(model.id, 'inputPrice', e.target.value)}
                                                    />
                                                ) : (
                                                    <span className="font-mono text-muted-foreground text-sm">$0.00</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {model.isEditable ? (
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        className="h-8 w-24 bg-background border-border font-mono text-xs"
                                                        value={model.outputPrice}
                                                        onChange={(e) => handlePriceChange(model.id, 'outputPrice', e.target.value)}
                                                    />
                                                ) : (
                                                    <span className="font-mono text-muted-foreground text-sm">$0.00</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground font-mono text-sm">
                                                ${model.cachePrice}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="bg-yellow-500/5 border-t border-yellow-500/10 p-4">
                            <div className="flex gap-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                                <div className="text-xs text-yellow-200/80 leading-relaxed">
                                    <strong>Disclaimer:</strong> This tool provides estimates based on public API pricing as of {PRICING_LAST_UPDATED}.
                                    Real-world costs may vary due to tokenization differences, network retries, and provider-specific calculation methods.
                                    We are not responsible for any financial discrepancies.
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Cross-link to compare page (SEO-06) */}
            <div className="text-center pt-2">
                <Link href="/compare/deepseek-vs-gpt4o" className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Deep dive: DeepSeek V3.2 vs GPT-4.1 cost analysis <ArrowRight className="w-3 h-3" />
                </Link>
            </div>
        </div>
    );
}