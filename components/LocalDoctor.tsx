'use client';

import { useState } from 'react';
import { Terminal, Copy, Check, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function LocalDoctor() {
    const [activeTab, setActiveTab] = useState<'unix' | 'windows'>('unix');
    const [copied, setCopied] = useState(false);

    // 1. Unix/Mac 诊断脚本
    // 检查 Node 版本，检查配置文件夹权限，检查 API Key 是否配置
    const unixScript = `# 🦞 OpenClaw Doctor (Unix/Mac)
echo "🔍 Starting Diagnosis..."

# 1. Check Node.js
if command -v node >/dev/null; then
    echo "✅ Node.js $(node -v) found"
else
    echo "❌ Node.js NOT found. Please install Node v18+"
fi

# 2. Check Config Directory
if [ -d "$HOME/.openclaw" ]; then
    echo "✅ Config directory exists at ~/.openclaw"
    if [ -w "$HOME/.openclaw" ]; then
        echo "✅ Write permission OK"
    else
        echo "🔴 NO WRITE PERMISSION on ~/.openclaw"
    fi
else
    echo "⚠️ Config directory missing. Run the Config Wizard above!"
fi

echo "🦞 Diagnosis Complete."
`;

    // 2. Windows PowerShell 诊断脚本
    const winScript = `# 🦞 OpenClaw Doctor (Windows PowerShell)
Write-Host "🔍 Starting Diagnosis..." -ForegroundColor Cyan

# 1. Check Node.js
try {
    $ver = node -v
    Write-Host "✅ Node.js $ver found" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js NOT found. Please install Node v18+" -ForegroundColor Red
}

# 2. Check Config Directory
$configPath = "$env:USERPROFILE\.openclaw"
if (Test-Path $configPath) {
    Write-Host "✅ Config directory exists at $configPath" -ForegroundColor Green
} else {
    Write-Host "⚠️ Config directory missing. Run the Config Wizard above!" -ForegroundColor Yellow
}

Write-Host "🦞 Diagnosis Complete." -ForegroundColor Cyan
`;

    const currentScript = activeTab === 'unix' ? unixScript : winScript;

    const handleCopy = () => {
        navigator.clipboard.writeText(currentScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-16 mb-16">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <ShieldCheck className="w-6 h-6 text-green-600" />
                            Local Doctor
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Run this safe script to check if your computer is ready for OpenClaw.
                        </p>
                    </div>

                    {/* OS Switcher */}
                    <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg self-start">
                        <button
                            onClick={() => setActiveTab('unix')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'unix' ? 'bg-white shadow text-black' : 'text-gray-500'
                                }`}
                        >
                            macOS / Linux
                        </button>
                        <button
                            onClick={() => setActiveTab('windows')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'windows' ? 'bg-white shadow text-blue-600' : 'text-gray-500'
                                }`}
                        >
                            Windows
                        </button>
                    </div>
                </div>

                {/* Code Area */}
                <div className="relative group">
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${copied ? 'bg-green-600 text-white' : 'bg-gray-800 text-white hover:bg-black'
                                }`}
                        >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? 'Copied!' : 'Copy Script'}
                        </button>
                    </div>

                    <pre className="bg-[#1e1e1e] p-6 overflow-x-auto text-sm font-mono text-gray-300 min-h-[200px]">
                        <code className="language-bash">
                            {currentScript}
                        </code>
                    </pre>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 text-xs text-yellow-700 dark:text-yellow-400 flex items-center gap-2 border-t border-yellow-100 dark:border-yellow-900/50">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Safety Note: This script is read-only. It simply checks file paths and versions. It does not upload any data.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}