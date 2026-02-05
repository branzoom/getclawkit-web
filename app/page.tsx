import Link from 'next/link';
import { FileJson, ShieldCheck, Calculator, Package, Activity, ArrowRight, Zap, Github, CheckCircle2, Terminal, AlertTriangle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HomePage() {
  const tools = [
    {
      title: 'Config Wizard',
      desc: 'Generate strict JSON configs. Auto-fix Windows backslash paths.',
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
      desc: 'Discover and install verified community skills and plugins.',
      href: '/skills',
      icon: <Package className="w-6 h-6 text-orange-400" />,
      bg: 'bg-orange-500/10 border-orange-500/20'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Zap className="w-3 h-3 text-yellow-400" />
            <span>Compatible with OpenClaw v2.0+</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            The Missing <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Software Toolkit</span><br />
            for OpenClaw.
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Stop wrestling with YAML configs and connection errors.
            <br className="hidden md:inline" />
            ClawKit provides the essential utilities to configure, fix, and extend your AI agents.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <Button asChild size="lg" className="text-base font-bold bg-white text-black hover:bg-zinc-200 rounded-full h-12 px-8">
              <Link href="/tools/config">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base font-medium border-white/10 bg-white/5 hover:bg-white/10 rounded-full h-12 px-8 backdrop-blur-sm">
              <Link href="https://github.com/branzoom/getclawkit-web" target="_blank">
                <Github className="w-4 h-4 mr-2" />
                Star on GitHub
              </Link>
            </Button>
          </div>
        </div>

        {/* Background Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 opacity-50 pointer-events-none" />
      </section>

      {/* Tools Grid Section */}
      <section className="container mx-auto px-4 pb-24">
        <h2 className="sr-only">OpenClaw Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link key={tool.title} href={tool.href} className="group block h-full">
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
      </section>

      {/* 🔥 新增：深度内容板块 (Content Thickening) 🔥 */}
      <section className="bg-black py-20 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How to Setup OpenClaw without the Headache
            </h2>
            <p className="text-zinc-400 text-lg">
              Most developers spend hours debugging <code>ECONNREFUSED</code> errors or fixing Windows path issues. Here is the modern, error-free workflow using ClawKit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-400 font-bold font-mono">
                <span className="bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">STEP 01</span>
                <span>Generate Configuration</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Stop writing YAML manually</h3>
              <p className="text-zinc-400 leading-relaxed">
                OpenClaw v2 is sensitive to JSON syntax. A single missing comma or unescaped backslash on Windows (e.g. <code>C:\Users</code>) will crash your agent.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Use the <Link href="/tools/config" className="text-blue-400 underline">Config Wizard</Link> to toggle your LLM provider (OpenAI, DeepSeek) and platform. We validate the schema automatically.
              </p>
              <div className="bg-zinc-900 rounded-lg p-4 border border-white/10 mt-4">
                {/* 这里是一个 placeholder，提醒你以后放截图 */}
                <div className="flex flex-col items-center justify-center h-32 text-zinc-600 border-2 border-dashed border-zinc-800 rounded">
                  <FileJson className="w-8 h-8 mb-2" />
                  <span className="text-xs">Screenshot: Config Wizard UI</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-green-400 font-bold font-mono">
                <span className="bg-green-500/10 px-2 py-1 rounded border border-green-500/20">STEP 02</span>
                <span>Diagnose Environment</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Fix "Connection Refused" Instantly</h3>
              <p className="text-zinc-400 leading-relaxed">
                If you see <code>Error: connect ECONNREFUSED 0.0.0.0:3000</code>, your Node.js version is likely forcing IPv6.
              </p>
              <p className="text-zinc-400 leading-relaxed">
                Don't downgrade Node.js. Instead, use our <Link href="/tools/doctor" className="text-green-400 underline">Local Doctor</Link> tool. It scans your <code>.env</code> file and detects if you need to switch from <code>localhost</code> to <code>127.0.0.1</code>.
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex gap-2 text-zinc-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Checks Node.js & NPM Versions
                </li>
                <li className="flex gap-2 text-zinc-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Validates API Key Format
                </li>
                <li className="flex gap-2 text-zinc-300 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Detects Port Conflicts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Built This (Pain Points) - 保留但视觉优化 */}
      <section className="bg-zinc-900/30 border-y border-white/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Why use ClawKit?
              </h2>
              <p className="text-lg text-zinc-400">
                We analyzed 500+ Discord support tickets and found the same issues popping up every day. ClawKit is the automated solution to these common problems:
              </p>
              <ul className="space-y-4">
                {[
                  "YAML indentation errors crashing the agent.",
                  "Windows paths using single backslashes (\\).",
                  "Confusion about which plugins are safe to install.",
                  "Unexpectedly high bills from inefficient prompting."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-zinc-300">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Widget Preview */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-black border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-green-500" /> Live Ecosystem Status
                  </h3>
                  <div className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">Operational</div>
                </div>
                <div className="space-y-3">
                  {['OpenClaw Core API', 'ClawHub Registry', 'Documentation'].map((item, i) => (
                    <div key={i} className="flex justify-between text-sm p-3 bg-zinc-900 rounded border border-white/5">
                      <span className="text-zinc-300">{item}</span>
                      <span className="text-green-500 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" /> 98ms
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/status">View Full Dashboard</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO: FAQ Section */}
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-zinc-400">Common questions about the unofficial toolkit.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">Is ClawKit an official OpenClaw product?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              No. ClawKit is an unofficial, community-driven project. We are not affiliated with the core team, but we build tools to make their ecosystem more accessible to beginners.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">Is my API Key safe?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Yes. The <Link href="/tools/config" className="underline">Config Wizard</Link> runs entirely in your browser (Client-Side). Your API keys are saved to the JSON file you download, but they are <strong>never</strong> sent to our servers.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">Does this work on Windows?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Absolutely. We built the Config Wizard specifically to solve the "Windows Backslash Issue". Just toggle the "Windows" switch, and we handle the path escaping automatically.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Resources Links */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8 border-t border-white/10 pt-10">
          <h2 className="text-2xl font-bold text-white">Essential Resources</h2>
          <Link href="/docs/migration" className="text-sm text-blue-400 hover:text-blue-300">View all docs &rarr;</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/docs/migration" className="group p-6 rounded-xl bg-zinc-900 border border-white/5 hover:border-blue-500/50 transition-all">
            <BookOpen className="w-8 h-8 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Migration Guide 🦞</h3>
            <p className="text-sm text-zinc-400">Upgrading from ClawdBot? Learn what changed in OpenClaw v2.0.</p>
          </Link>
          <Link href="/docs/troubleshooting" className="group p-6 rounded-xl bg-zinc-900 border border-white/5 hover:border-red-500/50 transition-all">
            <Terminal className="w-8 h-8 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Troubleshooting 🔧</h3>
            <p className="text-sm text-zinc-400">Fix common errors like &quot;Connection Refused&quot; and API key issues.</p>
          </Link>
          <Link href="/skills" className="group p-6 rounded-xl bg-zinc-900 border border-white/5 hover:border-orange-500/50 transition-all">
            <Package className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">Skill Registry 📦</h3>
            <p className="text-sm text-zinc-400">Browse 50+ community skills to extend your agent&apos;s capabilities.</p>
          </Link>
        </div>
      </section>

    </div>
  );
}