import { Puzzle, Box, ChevronRight, Shield, Zap, Code2, FileJson, GitBranch, Terminal } from 'lucide-react';
import Link from 'next/link';

export default function SkillSystemPage() {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                    <Puzzle className="w-8 h-8 text-orange-400" />
                </div>
                <h1 className="!my-0">Skill System Design</h1>
            </div>

            <p className="lead">
                OpenClaw&apos;s power comes from its modular <strong>Skill System</strong>. Every capability — from clicking buttons to reading files — is a self-contained Skill backed by the Model Context Protocol (MCP).
            </p>

            <h2>What is a Skill?</h2>
            <p>
                A Skill is a unit of capability that an agent can invoke. Think of it as a &quot;tool&quot; the LLM can call during its reasoning loop. Each Skill declares:
            </p>
            <ul>
                <li><strong>Name:</strong> A unique identifier (e.g., <code>browser_click</code>, <code>file_read</code>)</li>
                <li><strong>Description:</strong> A natural language explanation for the LLM to understand when to use it</li>
                <li><strong>Input Schema:</strong> A JSON Schema defining what parameters the Skill accepts</li>
                <li><strong>Handler:</strong> The actual implementation that executes the action</li>
            </ul>

            <div className="not-prose grid md:grid-cols-2 gap-6 my-12">
                <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-center gap-2 text-foreground font-bold mb-4">
                        <Box className="w-5 h-5 text-blue-400" /> MCP-Based
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Skills are exposed as <strong>MCP Tools</strong>. This means any MCP-compatible client (Claude Desktop, Cursor, etc.) can use OpenClaw Skills natively.
                    </p>
                </div>
                <div className="p-6 bg-card border border-border rounded-2xl">
                    <div className="flex items-center gap-2 text-foreground font-bold mb-4">
                        <Shield className="w-5 h-5 text-green-400" /> Sandboxed
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Each Skill runs in its own execution context. A misbehaving Skill cannot crash the agent core or leak data to other Skills.
                    </p>
                </div>
            </div>

            <h2>Skill Lifecycle</h2>
            <p>
                When the agent decides to use a Skill, the following pipeline executes:
            </p>
            <ol className="space-y-4">
                <li>
                    <strong>Selection:</strong> The LLM examines available Skills and picks the best match for its current sub-goal.
                </li>
                <li>
                    <strong>Validation:</strong> The input parameters are validated against the Skill&apos;s JSON Schema. Malformed calls are rejected before execution.
                </li>
                <li>
                    <strong>Execution:</strong> The Skill handler runs with the validated parameters. It may interact with the browser, file system, or external APIs.
                </li>
                <li>
                    <strong>Response:</strong> The result is returned to the agent as structured data, which feeds into the next reasoning step.
                </li>
            </ol>

            <h2>Built-in Skill Categories</h2>
            <div className="not-prose grid md:grid-cols-3 gap-4 my-8">
                {[
                    { icon: <Terminal className="w-5 h-5" />, title: 'Browser Actions', items: ['click', 'type', 'scroll', 'screenshot', 'navigate'], color: 'text-blue-400' },
                    { icon: <FileJson className="w-5 h-5" />, title: 'File Operations', items: ['read_file', 'write_file', 'list_dir', 'search_files'], color: 'text-green-400' },
                    { icon: <Code2 className="w-5 h-5" />, title: 'System Tools', items: ['run_command', 'http_request', 'extract_text', 'wait'], color: 'text-purple-400' },
                ].map((cat, idx) => (
                    <div key={idx} className="p-5 bg-card border border-border rounded-xl">
                        <div className={`flex items-center gap-2 ${cat.color} font-bold mb-3`}>
                            {cat.icon} {cat.title}
                        </div>
                        <ul className="space-y-1">
                            {cat.items.map((item, i) => (
                                <li key={i} className="text-xs text-muted-foreground font-mono">{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <h2>Creating Custom Skills</h2>
            <p>
                You can extend OpenClaw by writing your own Skills. A custom Skill is just an MCP tool definition:
            </p>

            <div className="not-prose bg-card border border-border rounded-lg p-4 my-6">
                <pre className="text-sm text-foreground/80 overflow-x-auto"><code>{`{
  "name": "my_custom_skill",
  "description": "Fetches the current weather for a given city",
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "The city name"
      }
    },
    "required": ["city"]
  }
}`}</code></pre>
            </div>

            <p>
                Once registered in your config, the agent will automatically discover and use your custom Skill when relevant.
                Visit the <Link href="/skills" className="text-orange-400 hover:text-orange-300">Skill Registry</Link> to browse community-verified Skills.
            </p>

            <h2>Skill Composition</h2>
            <p>
                Advanced agents compose multiple Skills into sequences. For example, a &quot;fill out a form&quot; task might chain:
            </p>
            <div className="not-prose flex flex-wrap items-center gap-2 my-6 text-sm">
                {['navigate', 'wait', 'click (input)', 'type (value)', 'click (submit)', 'screenshot (verify)'].map((step, i) => (
                    <span key={i} className="flex items-center gap-1">
                        <span className="px-3 py-1 bg-card border border-border rounded-lg text-foreground/80 font-mono text-xs">{step}</span>
                        {i < 5 && <ChevronRight className="w-3 h-3 text-muted-foreground/70" />}
                    </span>
                ))}
            </div>
            <p>
                The LLM decides each step dynamically — it doesn&apos;t follow a pre-programmed sequence. This makes agents resilient to unexpected UI changes.
            </p>

            <div className="not-prose mt-16 p-8 border-t border-border flex items-center justify-between">
                <Link href="/docs/concepts/architecture" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronRight className="w-4 h-4 rotate-180" /> Architecture Overview
                </Link>
                <Link href="/docs/concepts/data-privacy" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:underline">
                    Next: Data Sovereignty <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </>
    );
}
