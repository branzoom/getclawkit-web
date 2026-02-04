import DocLayout from '@/components/DocLayout';

export default function TroubleshootingPage() {
    return (
        <DocLayout title="Troubleshooting Connection Issues">
            <h3>Common Errors</h3>

            <h4>Error: "Connection Refused (ECONNREFUSED)"</h4>
            <p>
                This usually happens when the Agent cannot reach the LLM provider.
            </p>
            <ul>
                <li><strong>Check DNS:</strong> Can you ping <code>api.anthropic.com</code>?</li>
                <li><strong>Check Proxy:</strong> If you are in a restricted region, ensure <code>HTTPS_PROXY</code> is set.</li>
            </ul>

            <h4>Error: "Invalid API Key"</h4>
            <p>
                Double check that you didn't paste extra spaces. Our <a href="/#config-wizard" className="underline">Config Wizard</a> automatically trims whitespace for you.
            </p>

            <h4>Windows Path Issues</h4>
            <p>
                If you see errors like <code>ENOENT: no such file or directory</code>, it's likely a backslash issue.
                Windows requires double backslashes (<code>\\</code>) in JSON.
            </p>
        </DocLayout>
    );
}