#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const ora = require('ora');
const http = require('http');

console.clear();
console.log(chalk.cyan.bold('\n🦞 ClawKit Doctor starting...\n'));

const steps = [
    checkNodeVersion,
    checkConfigDir,
    checkConfigFile,
    checkPermissions,
    checkAgentConnection,
];

async function run() {
    for (const step of steps) {
        await step();
    }
    console.log(chalk.cyan.bold('\n✅ Diagnosis Complete. Screenshot this if you need help!\n'));
    console.log(chalk.gray('For more help, visit: https://getclawkit.com/docs\n'));
}

run().catch(err => {
    console.error(chalk.red('\n❌ Unexpected Error:'), err);
    process.exit(1);
});

// --- Checks ---

async function checkNodeVersion() {
    const spinner = ora('Checking Node.js version...').start();
    const version = process.version;
    const major = parseInt(version.substring(1).split('.')[0], 10);

    if (major >= 18) {
        spinner.succeed(chalk.green(`Node.js found: ${version}`));
    } else {
        spinner.fail(chalk.red(`Node.js ${version} is too old. Please install Node.js v18+.`));
    }
}

async function checkConfigDir() {
    const spinner = ora('Checking Config Directory...').start();
    const homeDir = os.homedir();
    const configPath = path.join(homeDir, '.openclaw');

    try {
        await fs.promises.access(configPath);
        spinner.succeed(chalk.green(`Config directory exists at: ${configPath}`));
    } catch (error) {
        spinner.fail(chalk.red(`Config directory missing at ${configPath}. Run 'clawhub init' first.`));
    }
}

async function checkConfigFile() {
    const spinner = ora('Checking Config File...').start();
    const homeDir = os.homedir();
    const configFilePath = path.join(homeDir, '.openclaw', 'clawhub.json');

    try {
        await fs.promises.access(configFilePath);
        spinner.succeed(chalk.green('Config file found (clawhub.json).'));
    } catch (error) {
        spinner.fail(chalk.yellow('Config file missing (clawhub.json). Use Config Generator to create one.'));
    }
}

async function checkPermissions() {
    const spinner = ora('Checking Directory Permissions...').start();
    const homeDir = os.homedir();
    const configPath = path.join(homeDir, '.openclaw');

    try {
        // Only check if dir exists
        if (fs.existsSync(configPath)) {
            await fs.promises.access(configPath, fs.constants.W_OK);
            spinner.succeed(chalk.green('Write permission OK for ~/.openclaw'));
        } else {
            spinner.info(chalk.gray('Skipping permission check (directory missing).'));
        }

    } catch (error) {
        spinner.fail(chalk.red('No write permission for ~/.openclaw. Fix ownership with: sudo chown -R $(whoami) ~/.openclaw'));
    }
}

async function checkAgentConnection() {
    const spinner = ora('Checking Local Agent (Port 3000)...').start();

    return new Promise((resolve) => {
        const req = http.get('http://localhost:3000', (res) => {
            spinner.succeed(chalk.green('Local Agent Port (3000) is OPEN.'));
            resolve();
        });

        req.on('error', (e) => {
            if (e.code === 'ECONNREFUSED') {
                spinner.info(chalk.gray('Port 3000 is free (Agent not running).'));
            } else {
                spinner.info(chalk.gray(`Network check skipped: ${e.message}`));
            }
            resolve();
        });

        req.setTimeout(2000, () => {
            message = 'Connection timed out';
            req.destroy();
            spinner.info(chalk.gray('Network check timed out.'));
            resolve();
        });
    });
}
