'use client';

import Link from 'next/link';
import { FileJson, ShieldCheck, Calculator, Package, ArrowRight, Github, Clock, Zap, CheckCircle2, Rocket, Terminal, ChevronRight, XCircle, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import CopyCommand from '@/components/CopyCommand';
import { trackEvent } from '@/lib/umami';

interface MarqueeSkill {
    id: string;
    name: string;
    shortDesc: string;
    author: string;
}

interface HomePageClientProps {
    skills: MarqueeSkill[];
    skillCount: number;
}

// --- FAQ Data ---
const FAQ_ITEMS = [
  { q: 'What is ClawKit?', a: 'ClawKit is a free, unofficial toolkit that helps you set up, configure, and troubleshoot OpenClaw AI agents. It is not affiliated with the OpenClaw core team.' },
  { q: 'How do I deploy OpenClaw from scratch?', a: 'Use our Quick Start Guide: 1) Generate a config with Config Wizard, 2) Run "npm install -g openclaw", 3) Start with "openclaw start --config clawhub.json". The whole process takes under 5 minutes.' },
  { q: 'How do I fix "ECONNREFUSED" errors in OpenClaw?', a: 'This is the #1 most common error. Usually your agent is not running or Node.js is forcing IPv6. Try using 127.0.0.1 instead of localhost, or run our Local Doctor tool for instant diagnosis.' },
  { q: 'Is my API key safe when using ClawKit?', a: 'Yes. All ClawKit tools run entirely in your browser. Your API keys are never sent to our servers — they only exist in the config file you download.' },
  { q: 'Can I use DeepSeek instead of OpenAI with OpenClaw?', a: 'Yes. DeepSeek V3.2 is fully supported and costs up to 90% less than GPT-4.1 for similar performance. Our Config Wizard has a one-click preset for DeepSeek.' },
  { q: 'Does OpenClaw work on Windows?', a: 'Yes. Windows users often face "JSON Parse Error" due to backslash paths (e.g. C:\\Users). Our Config Wizard automatically detects and escapes these paths for you.' },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": { "@type": "Answer", "text": item.a },
  })),
};

// --- Marquee Card ---
const MarqueeCard = ({ skill }: { skill: MarqueeSkill }) => (
  <Link
    href={`/skills/${skill.id}`}
    data-umami-event="homepage-skill-marquee"
    className="block w-64 p-4 rounded-xl border border-border bg-card/50 hover:bg-accent hover:border-blue-500/30 transition-all duration-300 group cursor-pointer flex-shrink-0 mx-3"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
        <Puzzle className="w-4 h-4" />
      </div>
      <div className="font-bold text-foreground text-sm truncate flex-1">{skill.name}</div>
    </div>
    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed h-8">
      {skill.shortDesc || `Enhance your agent with ${skill.name} capabilities.`}
    </p>
    <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground/70 border-t border-border pt-2">
      <span className="truncate max-w-[100px]">by {skill.author || 'Community'}</span>
      <span className="group-hover:text-blue-400 transition-colors">Install &rarr;</span>
    </div>
  </Link>
);

export default function HomePageClient({ skills, skillCount }: HomePageClientProps) {
  // Split into two rows for marquee
  const row1 = skills.slice(0, 15);
  const row2 = skills.slice(15, 30);

  const tools = [
    {
      title: 'Config Wizard',
      desc: 'Generate strict JSON configs. Auto-fixes Windows paths & validates syntax.',
      href: '/tools/config',
      icon: <FileJson className="w-5 h-5 text-blue-400" />,
      color: 'blue',
    },
    {
      title: 'Local Doctor',
      desc: 'Diagnose ECONNREFUSED, permissions, and Node.js issues instantly.',
      href: '/tools/doctor',
      icon: <ShieldCheck className="w-5 h-5 text-green-400" />,
      color: 'green',
    },
    {
      title: 'Cost Estimator',
      desc: 'Compare token costs across DeepSeek, Claude, and GPT-4 models.',
      href: '/tools/cost',
      icon: <Calculator className="w-5 h-5 text-purple-400" />,
      color: 'purple',
    },
    {
      title: 'Skill Registry',
      desc: `Browse ${skillCount.toLocaleString()}+ verified plugins. Memory, crypto, browser control.`,
      href: '/skills',
      icon: <Package className="w-5 h-5 text-orange-400" />,
      color: 'orange',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background">
      <style jsx global>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* --- Hero Section --- */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-[100%] blur-[100px] -z-10 opacity-40 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-purple-600/10 rounded-[100%] blur-[100px] -z-10 opacity-30 pointer-events-none" />

        <div className="container mx-auto px-4 text-center z-10 relative max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border text-sm text-foreground/80 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="flex h-2 w-2 relative justify-center items-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            Unofficial Toolkit for OpenClaw Agents
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            Deploy OpenClaw<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600">in 5 Minutes.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Stop wrestling with YAML errors and connection issues.
            <br className="hidden md:inline" />
            The developer toolkit to auto-configure, troubleshoot, and optimize your agent.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <Button asChild size="lg" className="text-base font-bold bg-foreground text-background hover:bg-foreground/90 rounded-full h-14 px-10 shadow-xl shadow-foreground/10">
              <Link href="/tools/config" data-umami-event="hero-cta-config">
                Start Config Wizard <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base font-medium border-border bg-transparent hover:bg-muted rounded-full h-14 px-10">
              <Link href="/tools/doctor" data-umami-event="hero-cta-doctor">
                Run Diagnostics
              </Link>
            </Button>
          </div>

          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl text-left font-mono text-sm leading-relaxed">
              <div className="flex items-center px-4 py-2 bg-card border-b border-border">
                <div className="flex gap-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="text-muted-foreground text-xs flex-1 text-center">Terminal</div>
                <div className="w-10"></div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-blue-400">$</span>
                  <span>npx create-openclaw@latest my-agent</span>
                </div>
                <div className="mt-2 text-muted-foreground select-none">
                  <span className="text-green-400">✔</span> Detected environment...<br />
                  <span className="text-green-400">✔</span> Downloading templates...<br />
                  <span className="text-blue-400/70"> Ready to configure!</span>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 z-10 cursor-pointer">
                <CopyCommand command="npx create-openclaw@latest my-agent" eventName="hero-copy-command" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Click to copy the one-liner deployment command.
            </p>
          </div>
        </div>
      </section>

      {/* --- Section 2: 3-Step Process --- */}
      <section className="container mx-auto px-4 py-24 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">From Zero to Running Agent</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">No more guesswork. A streamlined path to get your OpenClaw instance live.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-green-500/30 -z-10" />

            <div className="relative flex flex-col items-center text-center group">
              <div className="w-28 h-28 rounded-full bg-card border-4 border-background shadow-xl flex items-center justify-center mb-6 relative z-10 group-hover:border-blue-500/30 transition-colors duration-300">
                <div className="absolute inset-2 rounded-full bg-blue-600/10 animate-pulse-slow"></div>
                <FileJson className="w-10 h-10 text-blue-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold border-2 border-background">1</div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Generate Config</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">Use the Wizard to create a strict, validated JSON file in 30 seconds.</p>
              <Link href="/tools/config" className="text-blue-400 text-sm font-medium inline-flex items-center hover:underline">
                Open Wizard <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="relative flex flex-col items-center text-center group">
              <div className="w-28 h-28 rounded-full bg-card border-4 border-background shadow-xl flex items-center justify-center mb-6 relative z-10 group-hover:border-purple-500/30 transition-colors duration-300">
                <div className="absolute inset-2 rounded-full bg-purple-600/10 animate-pulse-slow delay-300"></div>
                <Terminal className="w-10 h-10 text-purple-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold border-2 border-background">2</div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Install &amp; Start</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">Run two simple terminal commands. Your agent boots up locally.</p>
              <Link href="/docs/getting-started/quick-start" className="text-purple-400 text-sm font-medium inline-flex items-center hover:underline">
                View Guide <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="relative flex flex-col items-center text-center group">
              <div className="w-28 h-28 rounded-full bg-card border-4 border-background shadow-xl flex items-center justify-center mb-6 relative z-10 group-hover:border-green-500/30 transition-colors duration-300">
                <div className="absolute inset-2 rounded-full bg-green-600/10 animate-pulse-slow delay-700"></div>
                <ShieldCheck className="w-10 h-10 text-green-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold border-2 border-background">3</div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Verify Connection</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">Use Local Doctor to instantly confirm your agent is reachable.</p>
              <Link href="/tools/doctor" className="text-green-400 text-sm font-medium inline-flex items-center hover:underline">
                Run Doctor <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3: VS Comparison --- */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-card/50 transform -skew-y-2 z-0 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Developers Choose ClawKit</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The difference between a frustrating afternoon and a 5-minute deployment.</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 rounded-3xl bg-card border border-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <XCircle className="w-32 h-32 text-red-500" />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-500"><Clock className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-foreground/80">The Manual Way</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Writing 100+ lines of error-prone YAML</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Manually debugging "ECONNREFUSED" errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Fixing Windows backslash path issues</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-border flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Typical Time:</span>
                <span className="text-xl font-bold text-red-400">2-4 Hours</span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-b from-card to-card/80 border border-blue-500/30 relative overflow-hidden shadow-[0_0_50px_-12px_rgb(59,130,246,0.3)] md:scale-105 z-10">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <CheckCircle2 className="w-32 h-32 text-blue-500" />
              </div>
              <div className="absolute top-5 right-5 bg-blue-600 py-1 px-3 text-xs font-bold text-white rounded-full uppercase tracking-wider">
                Free Forever
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400"><Zap className="w-6 h-6" /></div>
                <h3 className="text-2xl font-bold text-foreground">The ClawKit Way</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-foreground/80">Visual Config Wizard (30 seconds)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-foreground/80">Auto-validates syntax & fixes paths</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-foreground/80">Instant diagnostics with Local Doctor CLI</span>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-blue-500/20 flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Typical Time:</span>
                <span className="text-xl font-bold text-blue-400">&lt; 5 Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 4: Tools Grid --- */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">The Toolkit</h2>
          <p className="text-muted-foreground">Everything you need, running right in your browser.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 max-w-5xl mx-auto">
          {tools.map((tool) => (
            <Link key={tool.title} href={tool.href} className="group block text-center" onClick={() => trackEvent('homepage-tool-click', { tool: tool.title })}>
              <div className={`inline-flex p-4 rounded-2xl mb-4 bg-${tool.color}-500/10 text-${tool.color}-400 group-hover:scale-110 group-hover:bg-${tool.color}-500/20 transition-all duration-300 shadow-lg shadow-${tool.color}-900/20`}>
                {tool.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed px-2">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* --- Section 5: Scrolling Skills Marquee --- */}
      <section className="py-24 border-t border-border bg-card/50 overflow-hidden">
        <div className="container mx-auto px-4 mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Explore {skillCount.toLocaleString()}+ Community Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Extend your agent capabilities with one-click plugins.
          </p>
        </div>

        {/* Row 1: Scrolling Left */}
        <div className="relative w-full mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-scroll-left hover:[animation-play-state:paused] pause-on-hover">
            {[...row1, ...row1, ...row1].map((skill, i) => (
              <MarqueeCard key={`${skill.id}-r1-${i}`} skill={skill} />
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right (Reverse) */}
        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-scroll-right hover:[animation-play-state:paused] pause-on-hover">
            {[...row2, ...row2, ...row2].map((skill, i) => (
              <MarqueeCard key={`${skill.id}-r2-${i}`} skill={skill} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/skills" data-umami-event="homepage-browse-all-skills" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium border-b border-transparent hover:border-foreground transition-colors pb-0.5">
            Browse All {skillCount.toLocaleString()} Skills <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* --- FAQ & Footer --- */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">FAQ</h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.slice(0, 4).map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                  <AccordionTrigger className="text-foreground/80 hover:text-blue-400 text-left text-sm py-3" onClick={() => trackEvent('faq-expand', { question: item.q })}>
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Link href="/docs" className="text-blue-400 text-sm mt-4 inline-block hover:underline">View all FAQs in Docs &rarr;</Link>
          </div>

          <div className="flex flex-col justify-between p-8 rounded-3xl bg-card/50 border border-border text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Open Source</h3>
              <p className="text-muted-foreground text-sm mb-6">ClawKit is community-driven and free forever. Not affiliated with OpenClaw.</p>
            </div>
            <Button asChild variant="outline" className="gap-2 border-border hover:bg-muted hover:text-foreground w-full md:w-auto self-start">
              <Link href="https://github.com/branzoom/getclawkit-web" target="_blank" data-umami-event="homepage-github-star">
                <Github className="w-4 h-4" />
                Star on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
