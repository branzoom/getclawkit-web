'use client';

import { useState, useEffect } from 'react';
import { Copy, Terminal, Check, FileJson, Upload } from 'lucide-react';
import yaml from 'js-yaml'; // 用于 YAML 转 JSON

type OSType = 'unix' | 'windows';

export default function ConfigGenerator() {
    // 核心状态
    const [os, setOs] = useState<OSType>('unix');
    const [apiKey, setApiKey] = useState('');
    const [model, setModel] = useState('claude-3-5-sonnet-20241022');
    const [baseUrl, setBaseUrl] = useState('https://api.anthropic.com/v1');

    // 生成的 JSON 结果
    const [generatedJson, setGeneratedJson] = useState('');
    const [copied, setCopied] = useState(false);

    // YAML 导入状态
    const [showImport, setShowImport] = useState(false);
    const [yamlInput, setYamlInput] = useState('');

    // 监听输入变化，实时生成 JSON
    useEffect(() => {
        // 基础配置对象
        const config = {
            llm: {
                provider: "anthropic", // 简化处理，默认 anthropic，可扩展
                config: {
                    model: model,
                    api_key: apiKey || "YOUR_API_KEY_HERE",
                    base_url: baseUrl
                }
            },
            agent: {
                // Windows 用户的痛点：路径分隔符
                workspace: os === 'windows'
                    ? "C:\\Users\\YourName\\.openclaw\\workspace"
                    : "~/openclaw/workspace",
                log_level: "info"
            }
        };

        setGeneratedJson(JSON.stringify(config, null, 2));
    }, [os, apiKey, model, baseUrl]);

    // 核心功能：YAML 转 JSON
    const handleYamlImport = () => {
        try {
            const parsed = yaml.load(yamlInput) as any;
            if (parsed) {
                // 尝试提取字段，兼容旧版 ClawdBot 格式
                if (parsed.llm?.config?.api_key) setApiKey(parsed.llm.config.api_key);
                if (parsed.llm?.config?.model) setModel(parsed.llm.config.model);
                if (parsed.llm?.config?.base_url) setBaseUrl(parsed.llm.config.base_url);
                setShowImport(false);
                alert("Imported successfully! Converted to strict JSON.");
            }
        } catch (e) {
            alert("Invalid YAML format. Please check your input.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedJson);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        // 这里可以触发埋点：umami.track('config_copy', { os })
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <div className="p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-blue-600" />
                    Config Wizard
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Generate strict JSON configs. No more YAML errors.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-0">
                {/* 左侧：控制面板 */}
                <div className="p-6 space-y-6 border-r border-gray-100 dark:border-gray-800">

                    {/* OS Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Operating System</label>
                        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <button
                                onClick={() => setOs('unix')}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${os === 'unix' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                macOS / Linux
                            </button>
                            <button
                                onClick={() => setOs('windows')}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${os === 'windows' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Windows
                            </button>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Model Name</label>
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Base URL</label>
                            <input
                                type="text"
                                value={baseUrl}
                                onChange={(e) => setBaseUrl(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                                API Key <span className="text-blue-600 text-[10px] ml-1">(Stored in browser only)</span>
                            </label>
                            <input
                                type="password"
                                value={apiKey}
                                placeholder="sk-..."
                                onChange={(e) => setApiKey(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Import YAML Button */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                        <button
                            onClick={() => setShowImport(!showImport)}
                            className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
                        >
                            <Upload className="w-4 h-4" />
                            Import from legacy YAML?
                        </button>

                        {showImport && (
                            <div className="mt-2 space-y-2">
                                <textarea
                                    value={yamlInput}
                                    onChange={(e) => setYamlInput(e.target.value)}
                                    placeholder="Paste your old config.yaml here..."
                                    className="w-full h-24 p-2 text-xs font-mono border border-gray-300 rounded-md"
                                />
                                <button
                                    onClick={handleYamlImport}
                                    className="px-3 py-1 bg-gray-800 text-white text-xs rounded hover:bg-black"
                                >
                                    Convert
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 右侧：代码预览 */}
                <div className="bg-[#1e1e1e] p-6 text-gray-300 font-mono text-sm relative group overflow-hidden">
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={copyToClipboard}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${copied ? 'bg-green-600 text-white' : 'bg-white/10 hover:bg-white/20 text-white'
                                }`}
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied!' : 'Copy JSON'}
                        </button>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

                    <h3 className="text-gray-500 text-xs mb-4 flex items-center gap-2">
                        <FileJson className="w-4 h-4" />
                        config.json
                    </h3>

                    <pre className="overflow-x-auto h-[400px] custom-scrollbar">
                        <code className="language-json text-blue-300">
                            {generatedJson}
                        </code>
                    </pre>

                    {os === 'windows' && (
                        <div className="absolute bottom-0 left-0 w-full bg-[#2d2d2d] p-3 text-[10px] text-yellow-500 text-center border-t border-gray-700">
                            ⚠️ Windows Path Auto-Fix Applied: Double backslashes (\\) injected.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}