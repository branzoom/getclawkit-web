'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button'; // 假设你装了 shadcn/ui，如果没有，用普通 <button>

type Service = {
    id: string;
    name: string;
    status: 'operational' | 'degraded' | 'down';
    latency: number;
};

export default function StatusWidget() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    const fetchStatus = async () => {
        setLoading(true);
        try {
            // 请求我们刚才写的 API
            const res = await fetch('/api/status');
            const data = await res.json();
            setServices(data.services);
            setLastUpdated(new Date(data.updatedAt).toLocaleTimeString());
        } catch (err) {
            console.error('Failed to fetch status', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatus();
    }, []);

    const handleShare = () => {
        // 简单的分享文案
        const text = "OpenClaw Ecosystem Status: All Systems Operational! ✅ Checked via GetClawKit.com";
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    System Status
                </h2>
                <span className="text-xs text-gray-500">
                    Updated: {lastUpdated}
                </span>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="animate-pulse space-y-3">
                        <div className="h-10 bg-gray-100 rounded w-full"></div>
                        <div className="h-10 bg-gray-100 rounded w-full"></div>
                        <div className="h-10 bg-gray-100 rounded w-full"></div>
                    </div>
                ) : (
                    services.map((service) => (
                        <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 text-sm rounded-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                                {service.status === 'operational' ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                )}
                                <span className="font-medium text-gray-700">{service.name}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${service.status === 'operational' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {service.latency}ms
                            </span>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 flex gap-3">
                <button
                    onClick={fetchStatus}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
                <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <Share2 className="w-4 h-4" />
                    Share Status
                </button>
            </div>
        </div>
    );
}