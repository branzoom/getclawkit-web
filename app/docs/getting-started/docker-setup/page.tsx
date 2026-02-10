import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Terminal, Download } from 'lucide-react';

export const metadata: Metadata = {
    title: 'OpenClaw Docker Setup Guide (2026) | ClawKit',
    description: 'Complete Docker setup guide for OpenClaw. Deploy your AI agent with Docker Compose in 5 minutes. Includes troubleshooting and best practices.',
    keywords: ['openclaw docker', 'openclaw docker setup', 'openclaw docker-compose', 'deploy openclaw docker'],
};

export default function DockerSetupPage() {
    return (
        <>
            <h1>Complete OpenClaw Docker Setup Guide (2026)</h1>

            <h2>Why Use Docker?</h2>
            <ul>
                <li><strong>Dependency Isolation</strong> - No conflicts with system Python/Node</li>
                <li><strong>Easy Deployment</strong> - Same setup on dev, staging, production</li>
                <li><strong>Resource Control</strong> - Limit CPU/memory usage</li>
                <li><strong>Quick Rollbacks</strong> - Revert to previous versions instantly</li>
            </ul>

            <h2>Prerequisites</h2>
            <p>
                Before starting, generate your config file using our <Link href="/tools/config" className="text-blue-400 hover:text-blue-300">Config Wizard</Link> (takes 30 seconds).
            </p>

            <div className="not-prose bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 my-4">
                <p className="text-sm text-foreground/80">
                    <strong>Required:</strong> Docker Desktop installed (<a href="https://www.docker.com/get-started" target="_blank" rel="noopener" className="text-blue-400 hover:text-blue-300">Download here</a>)
                </p>
            </div>

            <h2>Step 1: Create docker-compose.yml</h2>
            <p>
                Create this file in your project directory:
            </p>

            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <pre className="text-sm text-foreground/80 overflow-x-auto"><code>{`version: '3.8'

services:
  openclaw:
    image: openclaw/openclaw:latest
    container_name: openclaw-agent
    ports:
      - "3000:3000"
    volumes:
      - ./clawhub.json:/app/clawhub.json
      - ./data:/app/data
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    mem_limit: 2g
    cpus: 1.0`}</code></pre>
            </div>

            <h2>Step 2: Place Your Config File</h2>
            <p>
                Put your <code>clawhub.json</code> in the same directory as <code>docker-compose.yml</code>.
            </p>

            <div className="not-prose bg-green-500/10 border border-green-500/20 rounded-lg p-4 my-4">
                <p className="text-sm text-foreground/80">
                    <strong>Don't have a config yet?</strong> Use our <Link href="/tools/config" className="text-green-400 hover:text-green-300">Config Wizard</Link> to generate one in 30 seconds.
                </p>
            </div>

            <h2>Step 3: Start the Container</h2>
            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Terminal</span>
                </div>
                <pre className="text-sm text-foreground/80"><code>docker-compose up -d</code></pre>
            </div>

            <p>
                You should see:
            </p>
            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <pre className="text-sm text-green-400"><code>✓ Container openclaw-agent  Started</code></pre>
            </div>

            <h2>Step 4: Verify It's Running</h2>
            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <pre className="text-sm text-foreground/80"><code>docker ps</code></pre>
            </div>

            <p>
                You should see <code>openclaw-agent</code> in the list.
            </p>

            <h2>Useful Docker Commands</h2>
            <div className="not-prose space-y-3 my-6">
                <div className="p-3 bg-card border border-border rounded-lg">
                    <code className="text-sm text-foreground/80">docker-compose logs -f</code>
                    <p className="text-xs text-muted-foreground mt-1">View live logs</p>
                </div>
                <div className="p-3 bg-card border border-border rounded-lg">
                    <code className="text-sm text-foreground/80">docker-compose restart</code>
                    <p className="text-xs text-muted-foreground mt-1">Restart the agent</p>
                </div>
                <div className="p-3 bg-card border border-border rounded-lg">
                    <code className="text-sm text-foreground/80">docker-compose down</code>
                    <p className="text-xs text-muted-foreground mt-1">Stop and remove container</p>
                </div>
            </div>

            <h2>Troubleshooting</h2>
            <p>
                If you see errors, run our <Link href="/tools/doctor" className="text-blue-400 hover:text-blue-300">Local Doctor</Link>:
            </p>

            <div className="not-prose bg-card border border-border rounded-lg p-4 my-4">
                <pre className="text-sm text-foreground/80"><code>npx clawkit-doctor@latest</code></pre>
            </div>

            <p>
                Common issues:
            </p>
            <ul>
                <li><strong>Port 3000 already in use</strong> - Change port in docker-compose.yml to <code>3001:3000</code></li>
                <li><strong>Config file not found</strong> - Ensure clawhub.json is in the same directory</li>
                <li><strong>Permission denied</strong> - Run <code>sudo docker-compose up -d</code> (Linux)</li>
            </ul>

            <h2>Production Best Practices</h2>
            <div className="not-prose space-y-3 my-6">
                {[
                    { title: 'Use .env for secrets', desc: 'Never hardcode API keys in docker-compose.yml' },
                    { title: 'Set resource limits', desc: 'Prevent runaway memory usage with mem_limit' },
                    { title: 'Enable auto-restart', desc: 'Use restart: unless-stopped for reliability' },
                    { title: 'Monitor logs', desc: 'Set up log rotation to prevent disk fill-up' },
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-foreground font-semibold text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <h2>Next Steps</h2>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                <Link href="/skills" className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg hover:bg-orange-500/20 transition-colors">
                    <h3 className="text-foreground font-semibold mb-2">Install Plugins</h3>
                    <p className="text-sm text-muted-foreground">Add browser control, memory, and more</p>
                </Link>
                <Link href="/docs/guides/cost-optimization" className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition-colors">
                    <h3 className="text-foreground font-semibold mb-2">Cost Optimization</h3>
                    <p className="text-sm text-muted-foreground">Reduce API costs with caching and model routing</p>
                </Link>
            </div>

            <hr className="my-8 border-border" />

            <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> February 6, 2026 |
                <strong> Setup Time:</strong> 5 minutes
            </p>
        </>
    );
}
