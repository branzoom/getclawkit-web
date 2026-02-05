'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { AlertTriangle, TrendingUp, Settings2, Edit3, HelpCircle, RotateCcw, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from 'recharts';
import { Tooltip as UiTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// 初始数据 (2026 参考价)
const INITIAL_MODELS = [
    {
        id: 'local',
        name: 'Local Llama 3',
        provider: 'Ollama',
        inputPrice: 0,
        outputPrice: 0,
        cachePrice: 0,
        color: '#4ade80',
        stroke: '#22c55e',
        badge: 'Free',
        isEditable: false
    },
    {
        id: 'deepseek',
        name: 'DeepSeek V3',
        provider: 'DeepSeek',
        inputPrice: 0.14,
        outputPrice: 0.28,
        cachePrice: 0.014,
        color: '#60a5fa',
        stroke: '#3b82f6',
        badge: 'Budget King',
        isEditable: true
    },
    {
        id: 'gemini',
        name: 'Gemini 1.5 Flash',
        provider: 'Google',
        inputPrice: 0.075, // 极低价
        outputPrice: 0.30,
        cachePrice: 0.02,
        color: '#f472b6', // pink-400
        stroke: '#db2777',
        badge: 'Google Fast',
        isEditable: true
    },
    {
        id: 'gpt4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        inputPrice: 2.50,
        outputPrice: 10.00,
        cachePrice: 1.25,
        color: '#c084fc',
        stroke: '#a855f7',
        badge: 'Standard',
        isEditable: true
    },
    {
        id: 'custom',
        name: 'Custom / Other',
        provider: 'User Defined',
        inputPrice: 1.00,
        outputPrice: 2.00,
        cachePrice: 0.10,
        color: '#94a3b8',
        stroke: '#64748b',
        badge: 'Custom',
        isEditable: true
    }
];

export default function CostEstimator() {
    // 状态管理
    const [models, setModels] = useState(INITIAL_MODELS);
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
    const resetModels = () => setModels(INITIAL_MODELS);

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

    // 计算最终月度总价 (指数增长)
    const finalMonthlyCosts = useMemo(() => {
        const costs: Record<string, number> = {};
        models.forEach(model => costs[model.id] = 0);

        const dailyRuns = runsPerDay[0];
        const steps = stepsPerRun[0];
        const baseTokens = avgTokens[0];
        const growthRate = contextGrowth[0] / 100;
        const cacheRate = cacheHitRate[0] / 100;

        for (let i = 0; i < dailyRuns * 30; i++) {
            for (let step = 1; step <= steps; step++) {
                // [算法升级] 同步指数增长
                const currentInput = baseTokens * Math.pow(1 + growthRate, step);

                const cached = currentInput * cacheRate;
                const fresh = currentInput * (1 - cacheRate);

                models.forEach(model => {
                    const stepInputCost = (cached * model.cachePrice + fresh * model.inputPrice) / 1000000;
                    const stepOutputCost = (baseTokens * 0.3 * model.outputPrice) / 1000000;
                    if (i === 0) {
                        // 简化计算：只算一次完整的 30 天循环
                        costs[model.id] += (stepInputCost + stepOutputCost) * dailyRuns * 30;
                    }
                });
            }
        }
        return costs;
    }, [runsPerDay, stepsPerRun, avgTokens, contextGrowth, cacheHitRate, models]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            <Tabs defaultValue="simulator" className="w-full">
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <TabsList className="bg-zinc-900 border border-white/10">
                        <TabsTrigger value="simulator" className="flex items-center gap-2">
                            <Flame className="w-4 h-4 text-red-500" /> Explosion Simulator {/* 图标换成火，名字改得更刺激 */}
                        </TabsTrigger>
                        <TabsTrigger value="pricing" className="flex items-center gap-2">
                            <Edit3 className="w-4 h-4" /> Price Config
                        </TabsTrigger>
                    </TabsList>

                    <div className="text-xs text-zinc-500 flex items-center gap-2 bg-zinc-900/50 px-3 py-1 rounded-full border border-white/5">
                        <HelpCircle className="w-3 h-3" />
                        <span>Scenario: 30-Day continuous operation simulation</span>
                    </div>
                </div>

                {/* Tab 1: Simulator (可视化部分) */}
                <TabsContent value="simulator" className="space-y-6">
                    {/* Top Controls Grid */}
                    <Card className="bg-zinc-900 border-white/10">
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
                                                <TooltipContent className="bg-zinc-900 border-white/10 text-zinc-300">
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
                                                <TooltipContent className="bg-zinc-900 border-white/10 text-zinc-300">
                                                    How much of your prompt is cached? (DeepSeek/Anthropic feature)
                                                </TooltipContent>
                                            </UiTooltip>
                                        </TooltipProvider>
                                        <span className="text-green-400 font-mono font-bold">{cacheHitRate}%</span>
                                    </div>
                                    <Slider value={cacheHitRate} onValueChange={setCacheHitRate} max={100} step={10} />
                                    <p className="text-[10px] text-zinc-500 pt-1">
                                        Higher cache rate = Lower costs for supported models.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chart & Results */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Chart */}
                        <Card className="lg:col-span-2 bg-[#0d1117] border-zinc-800 flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-white">Monthly Cost Projection</CardTitle>
                                <CardDescription>Estimated cost based on exponential context growth.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 min-h-[300px]">
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
                                <div key={model.id} className="relative group overflow-hidden rounded-xl border bg-zinc-900 p-4 transition-all hover:border-white/20" style={{ borderColor: `${model.color}30` }}>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity" style={{ backgroundColor: model.color }} />
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-bold text-white text-sm">{model.name}</div>
                                            <div className="text-[10px] text-zinc-500">{model.provider}</div>
                                        </div>
                                        <Badge variant="secondary" className="text-[10px] bg-black/40 border-0" style={{ color: model.color }}>
                                            {model.badge}
                                        </Badge>
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <span className="text-2xl font-mono font-bold text-white">
                                            ${finalMonthlyCosts[model.id].toFixed(2)}
                                        </span>
                                        <span className="text-xs text-zinc-500 mb-1">/mo</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 2: Pricing Table (Editable) */}
                <TabsContent value="pricing" className="mt-6">
                    <Card className="bg-zinc-900 border-white/10">
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
                                    <TableRow className="border-white/10 hover:bg-transparent">
                                        <TableHead className="text-zinc-400">Model Name</TableHead>
                                        <TableHead className="text-zinc-400">Input Price <span className="text-[10px] opacity-50">($/1M)</span></TableHead>
                                        <TableHead className="text-zinc-400">Output Price <span className="text-[10px] opacity-50">($/1M)</span></TableHead>
                                        <TableHead className="text-zinc-400">Cache Read <span className="text-[10px] opacity-50">($/1M)</span></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {models.map((model) => (
                                        <TableRow key={model.id} className="border-white/5 hover:bg-white/5 group">
                                            <TableCell className="font-medium text-white flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: model.color }} />
                                                {model.name}
                                                {model.id === 'custom' && <Badge variant="outline" className="text-[10px] border-white/10 ml-2">Editable</Badge>}
                                            </TableCell>
                                            <TableCell>
                                                {model.isEditable ? (
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        className="h-8 w-24 bg-black border-white/10 font-mono text-xs"
                                                        value={model.inputPrice}
                                                        onChange={(e) => handlePriceChange(model.id, 'inputPrice', e.target.value)}
                                                    />
                                                ) : (
                                                    <span className="font-mono text-zinc-400 text-sm">$0.00</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {model.isEditable ? (
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        className="h-8 w-24 bg-black border-white/10 font-mono text-xs"
                                                        value={model.outputPrice}
                                                        onChange={(e) => handlePriceChange(model.id, 'outputPrice', e.target.value)}
                                                    />
                                                ) : (
                                                    <span className="font-mono text-zinc-400 text-sm">$0.00</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-zinc-500 font-mono text-sm">
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
                                    <strong>Disclaimer:</strong> This tool provides estimates based on public API pricing as of Feb 2026.
                                    Real-world costs may vary due to tokenization differences, network retries, and provider-specific calculation methods.
                                    We are not responsible for any financial discrepancies.
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}