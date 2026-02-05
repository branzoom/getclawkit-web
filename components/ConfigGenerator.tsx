'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy, Check, RefreshCw, Terminal, Monitor, AlertCircle } from 'lucide-react';

// 类型定义，保证代码健壮性
type ConfigState = {
    llm: {
        provider: string;
        model: string;
        baseUrl: string;
        apiKey: string;
    };
    system: {
        logLevel: string;
        dataPath: string;
    };
};

const DEFAULT_CONFIG: ConfigState = {
    llm: {
        provider: 'openai',
        model: 'gpt-4o',
        baseUrl: 'https://api.openai.com/v1',
        apiKey: '',
    },
    system: {
        logLevel: 'info',
        dataPath: '~/.openclaw/data',
    }
};

export default function ConfigGenerator() {
    const [os, setOs] = useState<'unix' | 'windows'>('unix');
    const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);
    const [jsonOutput, setJsonOutput] = useState('');
    const [copied, setCopied] = useState(false);

    // 核心逻辑：自动处理路径和 JSON 生成
    useEffect(() => {
        const finalConfig = JSON.parse(JSON.stringify(config));

        // Windows 路径智能修正
        if (os === 'windows') {
            if (finalConfig.system.dataPath.startsWith('~')) {
                finalConfig.system.dataPath = '%USERPROFILE%\\.openclaw\\data';
            }
            finalConfig.system.dataPath = finalConfig.system.dataPath.replace(/\//g, '\\');
        } else {
            if (finalConfig.system.dataPath.includes('%USERPROFILE%')) {
                finalConfig.system.dataPath = '~/.openclaw/data';
            }
        }

        setJsonOutput(JSON.stringify(finalConfig, null, 2));
    }, [config, os]);

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const updateConfig = (section: keyof ConfigState, key: string, value: string) => {
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* 左侧：配置表单 */}
            <div className="space-y-6">
                <Tabs defaultValue="unix" value={os} onValueChange={(v) => setOs(v as 'unix' | 'windows')} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="unix" className="flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> macOS / Linux
                        </TabsTrigger>
                        <TabsTrigger value="windows" className="flex items-center gap-2">
                            <Monitor className="w-4 h-4" /> Windows
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <Card>
                    <CardHeader>
                        <CardTitle>LLM Settings</CardTitle>
                        <CardDescription>Configure your model provider and API access.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="provider">Provider</Label>
                                <Select
                                    value={config.llm.provider}
                                    onValueChange={(val) => updateConfig('llm', 'provider', val)}
                                >
                                    <SelectTrigger id="provider">
                                        <SelectValue placeholder="Select provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="openai">OpenAI</SelectItem>
                                        <SelectItem value="anthropic">Anthropic</SelectItem>
                                        <SelectItem value="deepseek">DeepSeek</SelectItem>
                                        <SelectItem value="ollama">Ollama (Local)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="model">Model Name</Label>
                                <Input
                                    id="model"
                                    value={config.llm.model}
                                    onChange={(e) => updateConfig('llm', 'model', e.target.value)}
                                    placeholder="e.g. gpt-4o"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="baseUrl">Base URL</Label>
                            <Input
                                id="baseUrl"
                                value={config.llm.baseUrl}
                                onChange={(e) => updateConfig('llm', 'baseUrl', e.target.value)}
                                className="font-mono text-xs"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="apiKey">API Key</Label>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Stored Locally</span>
                            </div>
                            <Input
                                id="apiKey"
                                type="password"
                                value={config.llm.apiKey}
                                onChange={(e) => updateConfig('llm', 'apiKey', e.target.value)}
                                placeholder="sk-..."
                                className="font-mono"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>System Paths</CardTitle>
                        <CardDescription>Where should the agent store its memory?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="dataPath">Data Storage Path</Label>
                            <Input
                                id="dataPath"
                                value={config.system.dataPath}
                                onChange={(e) => updateConfig('system', 'dataPath', e.target.value)}
                                className="font-mono text-xs"
                            />
                            {os === 'windows' && (
                                <Alert variant="default" className="bg-blue-500/10 text-blue-400 border-blue-500/20 mt-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle className="text-xs font-bold">Windows Mode Active</AlertTitle>
                                    <AlertDescription className="text-xs">
                                        Backslashes are automatically escaped for JSON compatibility.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 右侧：JSON 预览 */}
            <div className="sticky top-24 space-y-4">
                <Card className="bg-[#0d1117] border-zinc-800 overflow-hidden shadow-2xl">
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                        <div className="text-xs text-zinc-500 font-mono">clawhub.json</div>
                    </div>
                    <CardContent className="p-0">
                        <pre className="p-6 text-sm font-mono leading-relaxed text-green-400 overflow-x-auto">
                            {jsonOutput}
                        </pre>
                    </CardContent>
                    <CardFooter className="bg-white/5 border-t border-white/5 p-4 flex gap-3">
                        <Button
                            onClick={handleCopy}
                            className={`flex-1 font-bold transition-all ${copied ? 'bg-green-600 hover:bg-green-700' : ''}`}
                            size="lg"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 mr-2" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4 mr-2" /> Copy JSON
                                </>
                            )}
                        </Button>
                        <Button variant="outline" size="icon" className="h-11 w-11" onClick={() => setConfig(DEFAULT_CONFIG)}>
                            <RefreshCw className="w-4 h-4" />
                        </Button>
                    </CardFooter>
                </Card>

                <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                        Paste this into the root of your project as <code>clawhub.json</code>.
                    </p>
                </div>
            </div>
        </div>
    );
}