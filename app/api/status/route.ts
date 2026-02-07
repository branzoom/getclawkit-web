import { NextResponse } from 'next/server';

// 定义检查项的类型
type ServiceStatus = {
    name: string;
    status: 'operational' | 'degraded' | 'down';
    latency: number;
    message?: string;
};

// 强制设置 ISR (增量静态再生)：每 60 秒更新一次缓存
// 这就是我们避免触发 GitHub Rate Limit 的秘密武器
export const revalidate = 60;

export async function GET() {
    const startTime = Date.now();

    // 定义我们要监控的目标 (根据 PRD v2.1)
    const targets = [
        {
            id: 'core',
            name: 'OpenClaw Core',
            url: 'https://api.github.com/repos/openclaw/openclaw/releases/latest',
            type: 'github'
        },
        {
            id: 'registry',
            name: 'ClawHub Registry',
            url: 'https://moltbook.ai',
            type: 'http'
        },
        {
            id: 'community',
            name: 'Discord / Community',
            url: 'https://docs.openclaw.ai',
            type: 'http'
        }
    ];

    try {
        // Promise.all 并行请求，速度最快
        const results = await Promise.all(
            targets.map(async (target) => {
                const targetStart = Date.now();
                try {
                    const response = await fetch(target.url, {
                        method: target.type === 'github' ? 'GET' : 'HEAD',
                        headers: {
                            'User-Agent': 'OpenClaw-Nexus-Monitor/1.0',
                        },
                        // 单独设置 fetch 的超时，防止一个挂了拖死所有
                        signal: AbortSignal.timeout(5000)
                    });

                    const latency = Date.now() - targetStart;

                    const isHealthy = response.ok;

                    return {
                        id: target.id,
                        name: target.name,
                        status: isHealthy ? 'operational' : (response.status === 403 ? 'degraded' : 'down'),
                        latency,
                    };
                } catch (error: any) {
                    console.error(`Check failed for ${target.name}:`, error);
                    // Timeout = degraded (service may be slow), other errors = down
                    const isTimeout = error?.name === 'TimeoutError' || error?.name === 'AbortError';
                    return {
                        id: target.id,
                        name: target.name,
                        status: isTimeout ? 'degraded' : 'down',
                        latency: 0,
                    };
                }
            })
        );

        // 计算总耗时
        const totalLatency = Date.now() - startTime;

        return NextResponse.json({
            updatedAt: new Date().toISOString(),
            services: results,
            meta: {
                totalLatency,
                cached: false // Vercel/Next.js 会自动处理这里的逻辑
            }
        }, {
            status: 200,
            headers: {
                // 允许浏览器缓存 60秒
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
            }
        });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}