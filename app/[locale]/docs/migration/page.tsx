import DocLayout from '@/components/DocLayout';

export default function MigrationPage() {
    return (
        <DocLayout title="OpenClaw Migration Guide">
            <h3>From ClawdBot to OpenClaw</h3>
            <p>
                If you are coming from the legacy <strong>ClawdBot</strong> or <strong>MoltBot</strong> era,
                you might notice significant changes in the configuration structure.
                OpenClaw v2.0 introduces a strict JSON Schema over the loose YAML format.
            </p>

            <h4>Key Changes</h4>
            <ul>
                <li><strong>Config Format:</strong> <code>config.yaml</code> is now <code>config.json</code>.</li>
                <li><strong>Plugin System:</strong> "Tools" are now called "Skills" and managed via ClawHub.</li>
                <li><strong>Port:</strong> Default port changed from 3000 to 8080 to avoid conflicts with React apps.</li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500 my-6">
                <strong>Pro Tip:</strong> Use our <a href="/#config-wizard" className="underline font-bold">Config Wizard</a> on the homepage to automatically convert your old YAML to the new JSON format.
            </div>
        </DocLayout>
    );
}