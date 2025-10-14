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
    set: {
      type: 'string',
      default: 'all',
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
  --set SET        Benchmark set to run (default: all)
                   Available: set1 (vite, rsbuild), set2 (rspack, rolldown, esbuild, bun), all
  --json FILE      Export results to JSON file
  -h, --help       Show this help message

Example:
  node bench.mjs --app apps/5000 --set set1
  node bench.mjs --set set2 --json results.json`);
  process.exit(0);
}

const app = values.app;
const set = values.set;
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

// Run benchmark for a set of tools
function runBenchmark(tools) {
  const setSuffix = tools[0];
  let cmd = 'hyperfine --warmup 1 --runs 3';

  // Add JSON export if specified
  if (jsonOutput) {
    const jsonFile = jsonOutput.replace(/\.json$/, '') + `_${setSuffix}.json`;
    cmd += ` --export-json '${jsonFile}'`;
  }

  // Add tool commands
  for (const tool of tools) {
    cmd += ` 'cd ${app} && node --run build:${tool}'`;
  }

  console.log(`Running benchmarks for: ${tools.join(' ')}`);
  console.log(`App: ${app}`);
  console.log('');

  execSync(cmd, { stdio: 'inherit', shell: true });
  console.log('');
}

// Run benchmarks based on selected set
switch (set) {
  case 'set1':
    runBenchmark(['vite', 'rsbuild']);
    break;
  case 'set2':
    runBenchmark(['rspack', 'rolldown', 'esbuild', 'bun']);
    break;
  case 'all':
    console.log('=== Benchmark Set 1: vite vs rsbuild ===');
    console.log('');
    runBenchmark(['vite', 'rsbuild']);

    console.log('=== Benchmark Set 2: rspack vs rolldown vs esbuild vs bun ===');
    console.log('');
    runBenchmark(['rspack', 'rolldown', 'esbuild', 'bun']);
    break;
  default:
    console.error(`Error: Unknown set '${set}'`);
    console.error('Available sets: set1, set2, all');
    process.exit(1);
}
