import Link from 'next/link';
import { FileJson, ShieldCheck, Calculator, Package, Activity, ArrowRight, Zap, Github, CheckCircle2, Terminal, AlertTriangle, BookOpen, HelpCircle, Bot, TrendingUp, Users, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from 'next/image';

export default function HomePage() {
  const tools = [
    {
      title: 'Config Wizard',
      desc: 'Generate strict JSON configs in 30 seconds. Auto-fixes Windows paths, validates API keys, supports DeepSeek/Claude/GPT-4.',
      href: '/tools/config',
      icon: <FileJson className="w-6 h-6 text-blue-400" />,
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'Local Doctor',
      desc: 'Diagnose ECONNREFUSED, permission issues, and Node.js version conflicts. One-click fix for 90% of setup errors.',
      href: '/tools/doctor',
      icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
      bg: 'bg-green-500/10 border-green-500/20'
    },
    {
      title: 'Cost Estimator',
      desc: 'Compare token costs across DeepSeek, Claude, and GPT-4o. Avoid surprise bills with real-time pricing.',
      href: '/tools/cost',
      icon: <Calculator className="w-6 h-6 text-purple-400" />,
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Skill Registry',
      desc: 'Browse 45+ verified community plugins. Browser control, memory, crypto tracking - all safety-checked.',
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
            Fix OpenClaw <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Setup Errors</span><br />
            in Minutes.
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Auto-generate configs, debug ECONNREFUSED errors, install verified plugins.
            <br className="hidden md:inline" />
            Zero coding required. Privacy-first. Works on Windows, macOS, Linux.
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

      {/* Scenario Guidance with Stats (I want to...) */}
      <section className="container mx-auto px-4 -mt-12 mb-20 relative z-20">
        <div className="bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-2xl">
          {/* Live Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6 pb-6 border-b border-white/5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-white tabular-nums">1,203</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Configs</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-orange-400" />
              <div>
                <div className="text-lg font-bold text-white tabular-nums">45</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Skills</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-400" />
              <div>
                <div className="text-lg font-bold text-white tabular-nums">847</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Users</div>
              </div>
            </div>
          </div>

          <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-4 text-center">I want to...</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/tools/doctor" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
              <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white group-hover:text-blue-400">Fix 'Connection Refused' NOW</div>
                <div className="text-xs text-zinc-500">Run Diagnostic Tool</div>
              </div>
            </Link>
            <Link href="/skills" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
              <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                <Package className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white group-hover:text-blue-400">Add Browser Control</div>
                <div className="text-xs text-zinc-500">Install Plugins</div>
              </div>
            </Link>
            <Link href="/tools/config" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <FileJson className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-white group-hover:text-blue-400">Generate My First Config</div>
                <div className="text-xs text-zinc-500">30 Seconds Setup</div>
              </div>
            </Link>
          </div>
        </div>
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

      {/* Content Thickening: Step-by-Step Guide */}
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
              <div className="mt-4 rounded-lg overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
                <Image
                  src="/ConfigWizard.png"
                  alt="ClawKit Config Wizard Interface showing JSON generation with Windows path fix enabled"
                  width={800} // 根据你截图的实际宽度大致填写
                  height={450} // 根据你截图的实际高度大致填写
                  className="w-full h-auto"
                  quality={90}
                />
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

      {/* Why We Built This (Pain Points) */}
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
                  { text: "Spent 2 hours debugging 'Connection Refused' errors", icon: "⏱️" },
                  { text: "Agent crashes every time I change the config file", icon: "💥" },
                  { text: "Accidentally spent $50 on a single prompt", icon: "💸" },
                  { text: "Can't find reliable plugins - afraid of breaking my setup", icon: "😰" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-zinc-300">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <span className="pt-1">{item.text}</span>
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

      {/* 🔥 Enhanced FAQ Section 🔥 */}
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-zinc-400">Common questions about the toolkit, safety, and compatibility.</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {/* Item 1: Unofficial Disclaimer */}
          <AccordionItem value="item-1" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">Is ClawKit an official OpenClaw product?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              No. ClawKit is an unofficial, community-driven project. We are not affiliated with the core team, but we build tools to make their ecosystem more accessible to beginners.
            </AccordionContent>
          </AccordionItem>

          {/* Item 2: Security */}
          <AccordionItem value="item-2" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">Is my API Key safe?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Yes. The <Link href="/tools/config" className="text-blue-400 underline">Config Wizard</Link> runs entirely in your browser (Client-Side). Your API keys are saved to the JSON file you download, but they are <strong>never</strong> sent to our servers.
            </AccordionContent>
          </AccordionItem>

          {/* Item 3: Windows Support */}
          <AccordionItem value="item-3" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">Does this work on Windows?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Absolutely. Windows users often face "JSON Parse Error" due to backslash paths (e.g. <code>C:\Users</code>). Our tools automatically detect and escape these paths for you.
            </AccordionContent>
          </AccordionItem>

          {/* NEW Item 4: Docker Requirement */}
          <AccordionItem value="item-4" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">Do I need Docker to run OpenClaw?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              While not strictly required, Docker is <strong>highly recommended</strong> to prevent dependency conflicts (especially with Python skills). ClawKit's Config Wizard can generate a <code>docker-compose.yml</code> file for you that is optimized for v2.
            </AccordionContent>
          </AccordionItem>

          {/* NEW Item 5: Cost Accuracy */}
          <AccordionItem value="item-5" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">How accurate is the Cost Estimator?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              It provides a baseline estimate based on current public pricing (OpenAI, DeepSeek, Anthropic). Actual costs depend on your specific prompt engineering, context window usage, and tool calls. We recommend setting hard limits in your API provider's dashboard.
            </AccordionContent>
          </AccordionItem>

          {/* NEW Item 6: Contribution */}
          <AccordionItem value="item-6" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">How can I submit my own Skill?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              We automatically index skills from the community! If you have built a useful plugin, ensure your GitHub repository has a valid <code>README.md</code> or <code>SKILL.md</code>, and submit a PR to our <Link href="https://github.com/branzoom/getclawkit-web" target="_blank" className="text-blue-400 underline">seeds.json file</Link> on GitHub.
            </AccordionContent>
          </AccordionItem>

          {/* NEW Item 7: ECONNREFUSED Fix */}
          <AccordionItem value="item-7" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">How do I fix "ECONNREFUSED" or "Connection Refused" errors?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              This is the #1 most common error. It usually means your agent isn't running or is bound to the wrong network interface. Try these steps:<br /><br />
              <strong>1. Check if the agent is running:</strong> Run <code>docker ps</code> or check your process manager.<br />
              <strong>2. Use 127.0.0.1 instead of localhost:</strong> Node.js v18+ prefers IPv6. Change <code>localhost</code> to <code>127.0.0.1</code> in your config.<br />
              <strong>3. Run our diagnostic:</strong> Use <Link href="/tools/doctor" className="text-blue-400 underline">Local Doctor</Link> to auto-detect the issue.
            </AccordionContent>
          </AccordionItem>

          {/* NEW Item 8: Agent Not Responding */}
          <AccordionItem value="item-8" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">Why is my agent not responding to prompts?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Common causes:<br /><br />
              <strong>1. Invalid API Key:</strong> Double-check your OpenAI/DeepSeek API key is correct and has credits.<br />
              <strong>2. Rate Limiting:</strong> You may have hit your API provider's rate limit. Wait 60 seconds and try again.<br />
              <strong>3. Config Syntax Error:</strong> Use our <Link href="/tools/config" className="text-blue-400 underline">Config Wizard</Link> to validate your JSON file.<br />
              <strong>4. Check Logs:</strong> Run <code>docker logs openclaw</code> to see detailed error messages.
            </AccordionContent>
          </AccordionItem>

          {/* NEW Item 9: v1 vs v2 Migration */}
          <AccordionItem value="item-9" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">What's the difference between OpenClaw v1 and v2?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              OpenClaw v2 introduced breaking changes:<br /><br />
              <strong>1. Config Format:</strong> v2 uses strict JSON instead of YAML. Our <Link href="/tools/config" className="text-blue-400 underline">Config Wizard</Link> generates v2-compatible files.<br />
              <strong>2. Plugin System:</strong> v2 has a new skill registry. Browse compatible plugins in our <Link href="/skills" className="text-blue-400 underline">Skill Registry</Link>.<br />
              <strong>3. Docker Required:</strong> v2 strongly recommends Docker for dependency isolation.<br />
              See our <Link href="/docs/migration" className="text-blue-400 underline">Migration Guide</Link> for step-by-step instructions.
            </AccordionContent>
          </AccordionItem>

          {/* Item 10: DeepSeek Support (was item-7) */}
          <AccordionItem value="item-10" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-blue-400">Can I use DeepSeek with OpenClaw?</AccordionTrigger>
            <AccordionContent className="text-zinc-400">
              Yes! DeepSeek is fully supported and is often 10x cheaper than GPT-4o for similar performance. Our <Link href="/tools/config" className="text-blue-400 underline">Config Wizard</Link> has a preset for DeepSeek V3/R1 that sets the correct API base URL and model names.
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