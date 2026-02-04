import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation'
import { FileJson, ShieldCheck, Calculator, Package, Activity, ArrowRight, Zap } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('HomePage');

  const tools = [
    {
      title: 'Config Wizard',
      desc: 'Generate strict JSON configs. Auto-fix Windows paths.',
      href: '/tools/config',
      icon: <FileJson className="w-6 h-6 text-blue-400" />,
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Local Doctor',
      desc: 'Diagnose environment issues (Node.js, Permissions) safely.',
      href: '/tools/doctor',
      icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
      bg: 'bg-green-500/10 border-green-500/20'
    },
    {
      title: 'Cost Estimator',
      desc: 'Compare token costs: DeepSeek vs Claude vs GPT-4o.',
      href: '/tools/cost',
      icon: <Calculator className="w-6 h-6 text-purple-400" />,
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Skill Registry',
      desc: 'Discover and install verified community skills.',
      href: '/skills',
      icon: <Package className="w-6 h-6 text-orange-400" />,
      bg: 'bg-orange-500/10 border-orange-500/20'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 mb-4 animate-fade-in-up">
          <Zap className="w-3 h-3 text-yellow-400" /> V2.1 Updated for OpenClaw Core
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Missing Toolkit</span> <br />
          for OpenClaw.
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed">
          The unofficial companion to help you configure, fix, and optimize your AI agents.
          Stop wrestling with YAML, start building.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/tools/config" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors">
            Get Started
          </Link>
          <Link href="/status" className="px-8 py-3 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">
            Check Status
          </Link>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Link key={tool.title} href={tool.href} className="group relative">
            <div className={`h-full p-6 rounded-2xl border ${tool.bg} hover:border-opacity-50 transition-all duration-300 hover:-translate-y-1 bg-zinc-900/40 backdrop-blur-sm`}>
              <div className="mb-4 p-3 bg-zinc-900 rounded-xl inline-block border border-white/5 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                {tool.title}
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {tool.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* // 在 Tools Grid 下方添加： */}
      <div className="mt-24 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Essential Resources</h2>
          <Link href="/docs/migration" className="text-sm text-blue-400 hover:text-blue-300">View all docs &rarr;</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/docs/migration" className="group p-6 rounded-xl bg-zinc-900 border border-white/5 hover:border-blue-500/50 transition-all">
            <h3 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Migration Guide 🦞</h3>
            <p className="text-sm text-zinc-400">Upgrading from ClawdBot? Learn what changed in OpenClaw v2.0.</p>
          </Link>

          <Link href="/docs/troubleshooting" className="group p-6 rounded-xl bg-zinc-900 border border-white/5 hover:border-red-500/50 transition-all">
            <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Troubleshooting 🔧</h3>
            <p className="text-sm text-zinc-400">Fix common errors like "Connection Refused" and API key issues.</p>
          </Link>

          <Link href="/skills" className="group p-6 rounded-xl bg-zinc-900 border border-white/5 hover:border-orange-500/50 transition-all">
            <h3 className="font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">Skill Registry 📦</h3>
            <p className="text-sm text-zinc-400">Browse 50+ community skills to extend your agent's capabilities.</p>
          </Link>
        </div>
      </div>

      {/* Quick Status Bar */}
      <div className="mt-24 p-6 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-zinc-800 rounded-full">
            <Activity className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h3 className="font-bold text-white">System Monitor</h3>
            <p className="text-sm text-zinc-400">Real-time status of GitHub API, Registry, and Docs.</p>
          </div>
        </div>
        <Link href="/status" className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium rounded-lg transition-colors border border-white/10">
          View Full Dashboard
        </Link>
      </div>
    </div>
  );
}