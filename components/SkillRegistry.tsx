'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search, Terminal, Download, ExternalLink, Command, Package } from 'lucide-react';
import { INITIAL_SKILLS, Skill } from '@/data/skills';

export default function SkillRegistry() {
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState<string | null>(null); // 控制哪个卡片展开显示安装命令

    // 配置 Fuse 模糊搜索
    const fuse = useMemo(() => new Fuse(INITIAL_SKILLS, {
        keys: ['name', 'description', 'author'],
        threshold: 0.3, // 模糊程度
    }), []);

    const results = query
        ? fuse.search(query).map(result => result.item)
        : INITIAL_SKILLS;

    return (
        <div className="w-full max-w-4xl mx-auto my-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                    <Package className="w-8 h-8 text-purple-600" />
                    Skill Registry
                </h2>
                <p className="text-gray-500 mt-2">Discover verified skills to extend your agent.</p>
            </div>

            {/* 搜索框 */}
            <div className="relative mb-8 max-w-xl mx-auto">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search skills (e.g. 'twitter', 'search', 'file')..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 outline-none shadow-sm transition-all"
                />
            </div>

            {/* 列表区域 */}
            <div className="grid gap-4">
                {results.map((skill) => (
                    <div key={skill.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                            {/* 信息 */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100">{skill.name}</h3>
                                    <span className={`px-2 py-0.5 text-[10px] uppercase rounded-full font-medium
                    ${skill.category === 'tool' ? 'bg-blue-100 text-blue-700' :
                                            skill.category === 'adapter' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
                  `}>
                                        {skill.category}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                                <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                    By @{skill.author}
                                </div>
                            </div>

                            {/* 动作按钮 */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => setActiveTab(activeTab === skill.id ? null : skill.id)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all flex items-center gap-2
                    ${activeTab === skill.id
                                            ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black'
                                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-black dark:text-gray-300 dark:border-gray-700'}`}
                                >
                                    <Download className="w-4 h-4" />
                                    Install
                                </button>
                            </div>
                        </div>

                        {/* 展开的安装面板 (Dual Mode) */}
                        {activeTab === skill.id && (
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 -mx-4 -mb-4 px-4 pb-4 rounded-b-xl animate-in slide-in-from-top-2 duration-200">
                                <div className="flex gap-4 mb-3">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                        <Command className="w-3 h-3" /> Recommended
                                    </span>
                                </div>

                                <div className="relative group">
                                    <div className="bg-gray-900 text-gray-300 font-mono text-sm p-3 rounded-lg flex justify-between items-center">
                                        <span>{skill.installCmd}</span>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(skill.installCmd)}
                                            className="text-gray-500 hover:text-white"
                                        >
                                            <Terminal className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500 flex justify-between">
                                        <span>Or download manually from GitHub</span>
                                        <a href={skill.repoUrl} target="_blank" className="flex items-center gap-1 hover:text-purple-600">
                                            View Source <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {results.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        No skills found matching "{query}".
                    </div>
                )}
            </div>
        </div>
    );
}