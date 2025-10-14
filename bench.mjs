#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { parseArgs } from 'node:util';

// Parse command line arguments
const { values } = parseArgs({
  options: {
    app: {
      type: 'string',
      default: 'apps/10000',
    },
    json: {
      type: 'string',
    },
    help: {
      type: 'boolean',
      short: 'h',
    },
  },
});

// Show help
if (values.help) {
  console.log(`Usage: node bench.mjs [OPTIONS]

Options:
  --app APP        App directory to benchmark (default: apps/10000)
                   Available: apps/1000, apps/3000, apps/5000, apps/10000, apps/rome, apps/three10x
  --json FILE      Export results to JSON file
  -h, --help       Show this help message

Example:
  node bench.mjs --app apps/5000
  node bench.mjs --json results.json`);
  process.exit(0);
}

const app = values.app;
const jsonOutput = values.json;

// Check if hyperfine is installed
try {
  execSync('hyperfine --version', { stdio: 'ignore' });
} catch (error) {
  console.error('Error: hyperfine is not installed.');
  console.error('Please install it from: https://github.com/sharkdp/hyperfine');
  console.error('  macOS: brew install hyperfine');
  console.error('  Linux: apt install hyperfine / pacman -S hyperfine');
  process.exit(1);
}

// Check if app directory exists
if (!existsSync(app)) {
  console.error(`Error: App directory '${app}' does not exist`);
  process.exit(1);
}

// Run benchmark for all tools
const tools = ['vite', 'rsbuild', 'rspack', 'rolldown', 'esbuild', 'bun'];
let cmd = 'hyperfine --warmup 1 --runs 3';

// Add JSON export if specified
if (jsonOutput) {
  cmd += ` --export-json '${jsonOutput}'`;
}

// Add tool commands
for (const tool of tools) {
  cmd += ` -n '${tool}' 'node --run build:${tool}'`;
}

console.log(`Running benchmarks for: ${tools.join(', ')}`);
console.log(`App: ${app}`);
console.log('');

execSync(cmd, { stdio: 'inherit', shell: true, cwd: app });
