# ClawKit Doctor

> Instant environment diagnostic tool for OpenClaw.

## Usage

Simply run:

```bash
npx clawkit-doctor@latest
```

No installation required.

## What it checks

1.  **Node.js Version**: Ensures you are running Node.js v18+.
2.  **Config Directory**: Checks if `~/.openclaw` exists.
3.  **Config File**: Checks if `clawhub.json` is present.
4.  **Permissions**: Verifies write access to the config directory.
5.  **Connectivity**: Checks if the local agent is running on port 3000.

## Publishing (For Maintainers)

To publish a new version:

1.  Update the version in `package.json`.
2.  Run `npm publish --access public`.
