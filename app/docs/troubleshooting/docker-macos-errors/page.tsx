import type { Metadata } from 'next';
import { Container, ChevronRight, AlertCircle, Terminal, CheckCircle2, FileCode, Network, Monitor } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Fix Docker Permission & Path Errors on macOS — EACCES mkdir /Users | ClawKit',
    description: 'Solve OpenClaw Docker errors on macOS: EACCES permission denied mkdir /Users, token mismatch, Chrome not found in container, and Docker networking issues. Step-by-step fixes.',
    keywords: ['openclaw docker macos error', 'eacces permission denied mkdir users', 'openclaw docker chrome not found', 'openclaw docker setup macos', 'openclaw headless chrome docker'],
};

export default function DockerMacosErrorsPage() {
    return (
        <>
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-500/20 rounded-xl">
                    <Container className="w-8 h-8 text-red-400" />
                </div>
                <h1 className="!my-0">Fix Docker Errors on macOS</h1>
            </div>

            <div className="not-prose bg-red-500/10 border border-red-500/20 rounded-xl p-6 my-8">
                <div className="flex items-start gap-3 text-red-400">
                    <AlertCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-lg font-bold mb-2">Common Error</h3>
                        <code className="text-sm text-foreground/90 block bg-black/20 rounded-lg p-3 font-mono">
                            Error: Failed handling inbound web message: Error: EACCES: permission denied, mkdir &apos;/Users&apos;
                        </code>
                    </div>
                </div>
            </div>

            <p className="lead">
                Running OpenClaw in Docker on macOS can trigger path and permission errors because the container (Linux) doesn&apos;t have your macOS filesystem. This guide walks through every common failure and its fix.
            </p>

            <h2>Why This Happens</h2>
            <p>
                When OpenClaw runs inside a Docker container, it&apos;s running on a minimal Linux environment — not macOS. If your config references macOS paths like <code>/Users/yourname/...</code>, the container tries to create those directories inside Linux and fails with <code>EACCES</code>. This is the #1 Docker issue on macOS.
            </p>

            <div className="not-prose grid md:grid-cols-2 gap-4 my-8">
                <div className="p-5 bg-card border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Monitor className="w-4 h-4 text-blue-400" />
                        <h4 className="text-foreground font-bold text-sm">macOS Host</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Paths start with <code className="text-blue-300">/Users/name/</code>. Chrome is installed at <code className="text-blue-300">/Applications/</code>. Networking uses <code className="text-blue-300">localhost</code>.</p>
                </div>
                <div className="p-5 bg-card border border-border rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <Container className="w-4 h-4 text-green-400" />
                        <h4 className="text-foreground font-bold text-sm">Docker Container</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Paths are Linux-style <code className="text-green-300">/app/</code> or <code className="text-green-300">/home/</code>. No Chrome pre-installed. <code className="text-green-300">localhost</code> points to the container itself.</p>
                </div>
            </div>

            <h2>Error 1: EACCES Permission Denied</h2>

            <div className="not-prose bg-card rounded-lg p-4 my-4 font-mono text-xs text-red-400 border border-border">
                Error: EACCES: permission denied, mkdir &apos;/Users&apos;
            </div>

            <h3>Cause</h3>
            <p>
                Your <code>clawhub.json</code> or environment variables contain macOS-specific paths (like <code>/Users/yourname/project</code>). The container can&apos;t create these paths because <code>/Users</code> doesn&apos;t exist in Linux and requires root permissions to create at the filesystem root.
            </p>

            <h3>Fix</h3>
            <p>
                Use relative paths or container-appropriate paths in your config. If you need to share files between host and container, use Docker volumes:
            </p>

            <div className="not-prose bg-card rounded-lg p-4 my-4 font-mono text-xs text-foreground/80 border border-border overflow-x-auto">
                <div className="text-muted-foreground mb-2"># docker-compose.yml</div>
                <pre>{`services:
  openclaw:
    volumes:
      - ./workspace:/app/workspace    # Map host folder into container
    environment:
      - WORKSPACE_DIR=/app/workspace  # Use container path in config`}</pre>
            </div>

            <div className="not-prose bg-green-500/10 border border-green-500/20 rounded-xl p-4 my-6">
                <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">
                        <strong>Key rule:</strong> Inside your <code className="text-green-300">clawhub.json</code>, all paths must be valid <em>inside the container</em>, not on your Mac.
                    </p>
                </div>
            </div>

            <h2>Error 2: Token Mismatch / Connection Refused</h2>

            <div className="not-prose bg-card rounded-lg p-4 my-4 font-mono text-xs text-red-400 border border-border">
                Error: Token mismatch — expected connection from 127.0.0.1
            </div>

            <h3>Cause</h3>
            <p>
                Docker containers have their own network namespace. When the OpenClaw server inside Docker listens on <code>127.0.0.1</code>, it&apos;s listening on the <em>container&apos;s</em> localhost — not your Mac&apos;s. If you&apos;re using Docker Compose with multiple services, they need to reference each other by <strong>service name</strong>, not <code>localhost</code>.
            </p>

            <h3>Fix</h3>
            <div className="not-prose bg-card rounded-lg p-4 my-4 font-mono text-xs text-foreground/80 border border-border overflow-x-auto">
                <div className="text-muted-foreground mb-2"># docker-compose.yml — use service names for inter-container communication</div>
                <pre>{`services:
  openclaw:
    environment:
      - HOST=0.0.0.0           # Listen on all interfaces inside container
      - BROWSER_WS=ws://browser:3000  # Reference other service by name

  browser:
    image: browserless/chrome
    ports:
      - "3000:3000"`}</pre>
            </div>

            <div className="not-prose space-y-3 my-6">
                {[
                    { wrong: 'ws://127.0.0.1:3000', right: 'ws://browser:3000', desc: 'Use Docker service name instead of localhost' },
                    { wrong: 'http://localhost:8080', right: 'http://openclaw:8080', desc: 'Reference services by their compose name' },
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs">
                        <code className="bg-red-500/10 text-red-400 px-2 py-1 rounded line-through">{item.wrong}</code>
                        <ChevronRight className="w-3 h-3 text-muted-foreground" />
                        <code className="bg-green-500/10 text-green-400 px-2 py-1 rounded">{item.right}</code>
                        <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                ))}
            </div>

            <h2>Error 3: Chrome / Browser Not Found</h2>

            <div className="not-prose bg-card rounded-lg p-4 my-4 font-mono text-xs text-red-400 border border-border">
                Error: Could not find Chrome installation. Is Chrome installed?
            </div>

            <h3>Cause</h3>
            <p>
                The base Docker image doesn&apos;t include Chrome or Chromium. On macOS, OpenClaw uses your locally installed Chrome, but inside Docker there&apos;s no browser available.
            </p>

            <h3>Option A: Use a Separate Browser Service</h3>
            <p>
                Run a headless browser as a separate Docker service (recommended for production):
            </p>

            <div className="not-prose bg-card rounded-lg p-4 my-4 font-mono text-xs text-foreground/80 border border-border overflow-x-auto">
                <pre>{`services:
  openclaw:
    environment:
      - BROWSER_WS=ws://browser:3000

  browser:
    image: browserless/chrome
    environment:
      - CONNECTION_TIMEOUT=600000`}</pre>
            </div>

            <h3>Option B: Install Chromium in the OpenClaw Image</h3>
            <p>
                Build a custom Dockerfile that includes Chromium (simpler for development):
            </p>

            <div className="not-prose bg-card rounded-lg p-4 my-4 font-mono text-xs text-foreground/80 border border-border overflow-x-auto">
                <pre>{`FROM openclaw/openclaw:latest

# Install Chromium and dependencies
RUN apt-get update && apt-get install -y \\
    chromium \\
    fonts-liberation \\
    libnss3 \\
    libatk-bridge2.0-0 \\
    libdrm2 \\
    libxcomposite1 \\
    libxrandr2 \\
    libgbm1 \\
    libasound2 \\
    --no-install-recommends \\
    && rm -rf /var/lib/apt/lists/*

ENV CHROME_PATH=/usr/bin/chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium`}</pre>
            </div>

            <p>
                Then build and run:
            </p>

            <div className="not-prose bg-card rounded-lg p-4 my-4 font-mono text-xs text-foreground/80 border border-border">
                <pre>{`docker build -t openclaw-with-chrome .
docker run -it openclaw-with-chrome`}</pre>
            </div>

            <h2>Error 4: No-Extension Mode Issues</h2>
            <p>
                If you want to run OpenClaw without the browser extension (headless mode), ensure your config explicitly disables the extension requirement:
            </p>

            <div className="not-prose bg-card rounded-lg p-4 my-4 font-mono text-xs text-foreground/80 border border-border overflow-x-auto">
                <pre>{`// clawhub.json
{
  "browser": {
    "mode": "headless",           // Don't wait for extension
    "executablePath": "/usr/bin/chromium",  // Container path
    "args": [
      "--no-sandbox",             // Required in Docker
      "--disable-gpu",
      "--disable-dev-shm-usage"   // Prevent shared memory issues
    ]
  }
}`}</pre>
            </div>

            <div className="not-prose bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 my-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">
                        <strong>--no-sandbox</strong> is required when running Chrome as root in Docker. This is safe inside a container but should never be used on a host machine.
                    </p>
                </div>
            </div>

            <h2>Complete Working Example</h2>
            <p>
                Here&apos;s a full <code>docker-compose.yml</code> that avoids all the errors above:
            </p>

            <div className="not-prose bg-card rounded-lg p-4 my-6 font-mono text-xs text-foreground/80 border border-border overflow-x-auto">
                <div className="text-muted-foreground mb-2"># docker-compose.yml — tested on macOS with Docker Desktop</div>
                <pre>{`version: "3.8"

services:
  openclaw:
    image: openclaw/openclaw:latest
    ports:
      - "8080:8080"
    volumes:
      - ./workspace:/app/workspace
      - ./clawhub.json:/app/clawhub.json
    environment:
      - HOST=0.0.0.0
      - BROWSER_WS=ws://browser:3000
      - WORKSPACE_DIR=/app/workspace
    depends_on:
      - browser

  browser:
    image: browserless/chrome
    ports:
      - "3000:3000"
    environment:
      - CONNECTION_TIMEOUT=600000
      - MAX_CONCURRENT_SESSIONS=5`}</pre>
            </div>

            <h2>Quick Checklist</h2>

            <div className="not-prose space-y-3 my-8">
                {[
                    'All paths in clawhub.json are container paths (not /Users/...)',
                    'Docker services reference each other by service name, not localhost',
                    'Browser is either a separate service or installed in the image',
                    'HOST is set to 0.0.0.0 (not 127.0.0.1) for container networking',
                    '--no-sandbox flag is set for Chrome inside Docker',
                    '--disable-dev-shm-usage is set to avoid shared memory crashes',
                ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground/80">{item}</p>
                    </div>
                ))}
            </div>

            <h2>Still Stuck?</h2>
            <p>
                Run our diagnostic tool to catch configuration issues automatically:
            </p>
            <code className="block bg-card p-4 rounded-lg border border-border text-green-400 mb-8">
                npx clawkit-doctor@latest
            </code>

            <div className="not-prose mt-16 p-8 border-t border-border">
                <h4 className="text-muted-foreground font-bold uppercase tracking-widest text-xs mb-4">Related Guides</h4>
                <div className="flex flex-wrap gap-4">
                    <Link href="/docs/getting-started/docker-setup" className="text-sm text-blue-400 hover:text-foreground transition-colors">Docker Setup Guide</Link>
                    <Link href="/docs/troubleshooting/connection-errors" className="text-sm text-blue-400 hover:text-foreground transition-colors">Connection Errors</Link>
                    <Link href="/docs/troubleshooting/api-key-problems" className="text-sm text-blue-400 hover:text-foreground transition-colors">API Key Problems</Link>
                </div>
            </div>
        </>
    );
}
