'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Copy, Check, RefreshCw, Terminal, Monitor, AlertCircle, Play, CheckCircle2, XCircle } from 'lucide-react';
import { z } from 'zod';


// --- Zod Schema Definitions ---
const configSchema = z.object({
    llm: z.object({
        provider: z.string().min(1, "Provider is required"),
        model: z.string().min(1, "Model name is required"),
        baseUrl: z.string().url("Must be a valid URL (start with http/https)"),
        apiKey: z.string().min(1, "API Key is required"), // We can relax this for Ollama if needed, but keeping strict for now
    }),
    system: z.object({
        logLevel: z.string(),
        dataPath: z.string(),
    }),
});

type ConfigState = z.infer<typeof configSchema>;
type ValidationErrors = Record<string, string>;

// --- Presets ---
const PRESETS = {
    openai: {
        id: 'openai',
        name: "OpenAI Standard",
        description: "Official OpenAI API",
        config: {
            provider: 'openai',
            model: 'gpt-4o',
            baseUrl: 'https://api.openai.com/v1',
            apiKey: '',
        }
    },
    deepseek: {
        id: 'deepseek',
        name: "DeepSeek",
        description: "DeepSeek V3/R1",
        config: {
            provider: 'deepseek',
            model: 'deepseek-chat',
            baseUrl: 'https://api.deepseek.com',
            apiKey: '',
        }
    },
    anthropic: {
        id: 'anthropic',
        name: "Anthropic",
        description: "Claude 3.5 Sonnet",
        config: {
            provider: 'anthropic',
            model: 'claude-3-5-sonnet-20240620',
            baseUrl: 'https://api.anthropic.com',
            apiKey: '',
        }
    },
    ollama: {
        id: 'ollama',
        name: "Ollama (Local)",
        description: "Local Inference",
        config: {
            provider: 'ollama',
            model: 'llama3',
            baseUrl: 'http://localhost:11434/v1',
            apiKey: 'ollama', // Placeholder for validation
        }
    }
};

const DEFAULT_CONFIG: ConfigState = {
    llm: PRESETS.openai.config,
    system: {
        logLevel: 'info',
        dataPath: '~/.openclaw/data',
    }
};

export default function ConfigGenerator() {
    const [os, setOs] = useState<'unix' | 'windows'>('unix');
    const [config, setConfig] = useState<ConfigState>(DEFAULT_CONFIG);
    const [copied, setCopied] = useState(false);

    // Connection State
    const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
    const [connectionMsg, setConnectionMsg] = useState('');

    // Derived State: Validation Errors
    // Calculate errors on every render (fast enough) or useMemo
    const errors: ValidationErrors = (() => {
        const result = configSchema.safeParse(config);
        if (!result.success) {
            const fieldErrors: ValidationErrors = {};
            result.error.issues.forEach(err => {
                const key = err.path.join('.');
                fieldErrors[key] = err.message;
            });
            return fieldErrors;
        }
        return {};
    })();

    // Derived State: JSON Output
    const jsonOutput = (() => {
        const finalConfig = JSON.parse(JSON.stringify(config));

        // Windows Path Correction
        if (os === 'windows') {
            if (finalConfig.system.dataPath.startsWith('~')) {
                finalConfig.system.dataPath = '%USERPROFILE%\\.openclaw\\data';
            }
            // Replace all forward slashes with double backslashes for JSON string
            finalConfig.system.dataPath = finalConfig.system.dataPath.replace(/\//g, '\\');
        } else {
            if (finalConfig.system.dataPath.includes('%USERPROFILE%')) {
                finalConfig.system.dataPath = '~/.openclaw/data';
            }
        }

        return JSON.stringify(finalConfig, null, 2);
    })();

    const handleCopy = () => {
        navigator.clipboard.writeText(jsonOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const updateConfig = (section: keyof ConfigState, key: string, value: string) => {
        setConnectionStatus('idle'); // Reset connection status on change
        setConfig(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const applyPreset = (presetKey: keyof typeof PRESETS) => {
        setConfig(prev => ({
            ...prev,
            llm: { ...PRESETS[presetKey].config }
        }));
    };

    const validateConnection = async () => {
        setConnectionStatus('testing');
        setConnectionMsg('');

        try {
            // Attempt a lightweight fetch. 
            // Note: Most providers (OpenAI, etc) block browser requests via CORS.
            // We expect this. If we get a Network Error (CORS), we warn the user but don't fail hard.
            // If we get 401, that's a defined failure.

            // Using /models usually works for OpenAI-compatible APIs
            const url = `${config.llm.baseUrl.replace(/\/+$/, '')}/models`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.llm.apiKey}`,
                    'Content-Type': 'application/json'
                },
                signal: controller.signal
            }).catch(e => {
                throw new Error(e.name === 'AbortError' ? 'Timeout' : 'Network/CORS Error');
            });

            clearTimeout(timeoutId);

            if (res.ok) {
                setConnectionStatus('success');
                setConnectionMsg("Connection Verified! API responded with 200 OK.");
            } else {
                setConnectionStatus('error');
                if (res.status === 401) {
                    setConnectionMsg("Authentication Failed (401). Check API Key.");
                } else if (res.status === 404) {
                    setConnectionMsg("Endpoint Not Found (404). Check Base URL.");
                } else {
                    setConnectionMsg(`API Error: ${res.status} ${res.statusText}`);
                }
            }
        } catch (err: unknown) {
            let errorMsg = 'Unknown Error';
            if (err instanceof Error) {
                if (err.message === 'Network/CORS Error') {
                    setConnectionStatus('error');
                    setConnectionMsg("Browser Check Blocked (CORS). Verify URL manually, or trust that CLI might work.");
                    return;
                }
                errorMsg = err.message;
            }

            setConnectionStatus('error');
            setConnectionMsg(`Connection Failed: ${errorMsg}`);
        }
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
                    <CardHeader className="pb-3">
                        <CardTitle>Presets</CardTitle>
                        <CardDescription>Quickly fill settings for popular providers.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2">
                        {Object.entries(PRESETS).map(([key, preset]) => (
                            <Button
                                key={key}
                                variant="outline"
                                className="justify-start h-auto py-3 px-4 hover:border-blue-500 hover:bg-blue-500/5 transition-all text-left block"
                                onClick={() => applyPreset(key as keyof typeof PRESETS)}
                            >
                                <div className="font-semibold text-sm">{preset.name}</div>
                                <div className="text-[10px] text-muted-foreground mt-0.5 font-normal">{preset.description}</div>
                            </Button>
                        ))}
                    </CardContent>
                </Card>

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
                                    <SelectTrigger id="provider" className={errors['llm.provider'] ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select provider" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="openai">OpenAI</SelectItem>
                                        <SelectItem value="anthropic">Anthropic</SelectItem>
                                        <SelectItem value="deepseek">DeepSeek</SelectItem>
                                        <SelectItem value="ollama">Ollama (Local)</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors['llm.provider'] && <p className="text-[10px] text-red-500">{errors['llm.provider']}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="model">Model Name</Label>
                                <Input
                                    id="model"
                                    value={config.llm.model}
                                    onChange={(e) => updateConfig('llm', 'model', e.target.value)}
                                    placeholder="e.g. gpt-4o"
                                    className={errors['llm.model'] ? "border-red-500" : ""}
                                />
                                {errors['llm.model'] && <p className="text-[10px] text-red-500">{errors['llm.model']}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="baseUrl">Base URL</Label>
                            <Input
                                id="baseUrl"
                                value={config.llm.baseUrl}
                                onChange={(e) => updateConfig('llm', 'baseUrl', e.target.value)}
                                className={`font-mono text-xs ${errors['llm.baseUrl'] ? "border-red-500" : ""}`}
                            />
                            {errors['llm.baseUrl'] && <p className="text-[10px] text-red-500">{errors['llm.baseUrl']}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="apiKey">API Key</Label>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-5 text-[10px] text-blue-400 hover:text-blue-300 px-2"
                                        onClick={validateConnection}
                                        disabled={connectionStatus === 'testing' || !config.llm.baseUrl}
                                    >
                                        {connectionStatus === 'testing' ? (
                                            <>
                                                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                                                Testing...
                                            </>
                                        ) : (
                                            <>
                                                <Play className="w-3 h-3 mr-1" />
                                                Test Connection
                                            </>
                                        )}
                                    </Button>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Stored Locally</span>
                                </div>
                            </div>
                            <Input
                                id="apiKey"
                                type="password"
                                value={config.llm.apiKey}
                                onChange={(e) => updateConfig('llm', 'apiKey', e.target.value)}
                                placeholder="sk-..."
                                className={`font-mono ${errors['llm.apiKey'] ? "border-red-500" : ""}`}
                            />
                            {errors['llm.apiKey'] && <p className="text-[10px] text-red-500">{errors['llm.apiKey']}</p>}

                            {/* Connection Status Feedback */}
                            {connectionStatus === 'error' && (
                                <Alert variant="destructive" className="py-2 mt-2 bg-red-900/10 border-red-900/20">
                                    <XCircle className="h-4 w-4" />
                                    <AlertDescription className="text-xs ml-2 text-red-400">
                                        {connectionMsg}
                                    </AlertDescription>
                                </Alert>
                            )}
                            {connectionStatus === 'success' && (
                                <Alert className="py-2 mt-2 bg-green-900/10 border-green-900/20 text-green-400">
                                    <CheckCircle2 className="h-4 w-4 stroke-green-500" />
                                    <AlertDescription className="text-xs ml-2">
                                        {connectionMsg}
                                    </AlertDescription>
                                </Alert>
                            )}
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
                        <div className="flex items-center gap-2">
                            {Object.keys(errors).length > 0 && (
                                <span className="text-[10px] text-red-400 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3 px-0" /> Invalid Config
                                </span>
                            )}
                            <div className="text-xs text-zinc-500 font-mono">clawhub.json</div>
                        </div>
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

                {/* Cross-Link: Recommended Skills */}
                <div className="pt-6 border-t border-white/5 space-y-3">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                        Next Steps: Install Plugins
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        <a href="/skills/browser-use" target="_blank" className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                                <Monitor className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-white group-hover:text-blue-400">Browser Use</div>
                                <div className="text-[10px] text-zinc-500">Let agent control Chrome</div>
                            </div>
                        </a>
                        <a href="/skills/memory-core" target="_blank" className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-bold text-white group-hover:text-blue-400">Memory Core</div>
                                <div className="text-[10px] text-zinc-500">Long-term vector memory</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}