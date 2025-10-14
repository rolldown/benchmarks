#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { existsSync, readdirSync, statSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
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

// Determine hyperfine binary name based on platform
const hyperfineBin = process.platform === 'win32' ? 'hyperfine.exe' : 'hyperfine';

// Check if hyperfine is installed
try {
  execSync(`${hyperfineBin} --version`, { stdio: 'ignore' });
} catch (error) {
  console.error('Error: hyperfine is not installed.');
  console.error('Please install it from: https://github.com/sharkdp/hyperfine');
  console.error('  macOS: brew install hyperfine');
  console.error('  Linux: apt install hyperfine / pacman -S hyperfine');
  console.error('  Windows: choco install hyperfine');
  process.exit(1);
}

// Check if app directory exists
if (!existsSync(app)) {
  console.error(`Error: App directory '${app}' does not exist`);
  process.exit(1);
}

// Helper function to escape shell arguments cross-platform
function escapeShellArg(arg) {
  if (process.platform === 'win32') {
    // Windows: wrap in double quotes and escape inner double quotes
    return `"${arg.replace(/"/g, '\\"')}"`;
  } else {
    // Unix: wrap in single quotes and escape single quotes
    return `'${arg.replace(/'/g, "'\\''")}'`;
  }
}

// Run benchmark for all tools
const tools = ['vite', 'rsbuild', 'rspack', 'rolldown', 'esbuild' /*, 'bun' */];
const tempJsonFile = '.bench-temp.json';

// Build hyperfine command with proper quoting
let cmd = `${hyperfineBin} --export-json ${escapeShellArg(tempJsonFile)}`;
for (const tool of tools) {
  cmd += ` -n ${escapeShellArg(tool)} ${escapeShellArg(`node --run build:${tool}`)}`;
}

console.log(`Running benchmarks for: ${tools.join(', ')}`);
console.log(`App: ${app}`);
console.log('');

execSync(cmd, { stdio: 'inherit', shell: true, cwd: app });

// Parse benchmark results
const benchmarkJson = JSON.parse(readFileSync(join(app, tempJsonFile), 'utf-8'));

// Get file sizes
const fileSizes = getFileSizes(app, tools);

// Combine results
const results = benchmarkJson.results.map((result) => {
  const toolName = result.command.match(/'node --run build:(\w+)'/)?.[1] || result.command;
  const sizeData = fileSizes.find(s => s.tool === toolName);

  return {
    tool: toolName,
    mean: result.mean,
    stddev: result.stddev,
    jsSize: sizeData?.jsSize || 0,
    cssSize: sizeData?.cssSize || 0,
    mapSize: sizeData?.mapSize || 0,
    totalSize: (sizeData?.jsSize || 0) + (sizeData?.cssSize || 0),
  };
});

// Sort by total output size (JS + CSS)
results.sort((a, b) => a.totalSize - b.totalSize);

// Display combined results
console.log('');
console.log('Benchmark Results (sorted by output size):');
displayResults(results);

// Clean up temp file
unlinkSync(join(app, tempJsonFile));

// Save to user's JSON file if specified
if (jsonOutput) {
  const output = {
    results: results.map(r => ({
      tool: r.tool,
      time_ms: (r.mean * 1000).toFixed(2),
      stddev_ms: (r.stddev * 1000).toFixed(2),
      js_size: formatSize(r.jsSize),
      css_size: formatSize(r.cssSize),
      sourcemaps_size: formatSize(r.mapSize),
    })),
  };
  writeFileSync(jsonOutput, JSON.stringify(output, null, 2));
}

function walkDirectory(dir) {
  const files = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      files.push(...walkDirectory(fullPath));
    } else if (stats.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function getFileSizes(appDir, tools) {
  const results = [];

  for (const tool of tools) {
    const distDir = join(appDir, `dist-${tool}`);

    if (!existsSync(distDir)) {
      results.push({ tool, jsSize: 0, cssSize: 0, mapSize: 0 });
      continue;
    }

    let jsSize = 0;
    let cssSize = 0;
    let mapSize = 0;

    try {
      const files = walkDirectory(distDir);
      for (const filePath of files) {
        const stats = statSync(filePath);

        if (filePath.endsWith('.js.map') || filePath.endsWith('.css.map')) {
          mapSize += stats.size;
        } else if (filePath.endsWith('.js')) {
          jsSize += stats.size;
        } else if (filePath.endsWith('.css')) {
          cssSize += stats.size;
        }
      }

      results.push({ tool, jsSize, cssSize, mapSize });
    } catch (error) {
      results.push({ tool, jsSize: 0, cssSize: 0, mapSize: 0 });
    }
  }

  return results;
}

function displayResults(results) {
  // Calculate column widths
  const data = results.map(result => {
    const meanMs = (result.mean * 1000).toFixed(2);
    const stddevMs = (result.stddev * 1000).toFixed(2);
    // Pad to format: "XXXX.XX ms ± XXX.XX ms"
    const meanPadded = meanMs.padStart(7);   // Max: "9999.99"
    const stddevPadded = stddevMs.padStart(6); // Max: "999.99"
    return {
      tool: result.tool,
      time: `${meanPadded} ms ± ${stddevPadded} ms`,
      js: result.jsSize > 0 ? formatSize(result.jsSize) : 'not found',
      css: result.cssSize > 0 ? formatSize(result.cssSize) : 'not found',
      maps: result.mapSize > 0 ? formatSize(result.mapSize) : 'not found',
    };
  });

  const colWidths = {
    tool: Math.max(4, ...data.map(d => d.tool.length)),
    time: 25,
    js: Math.max(2, ...data.map(d => d.js.length)),
    css: Math.max(3, ...data.map(d => d.css.length)),
    maps: Math.max(10, ...data.map(d => d.maps.length)),
  };

  // Print markdown table header
  console.log(
    '| ' + 'Tool'.padEnd(colWidths.tool) +
    ' | ' + 'Time (mean ± σ)'.padEnd(colWidths.time) +
    ' | ' + 'JS'.padEnd(colWidths.js) +
    ' | ' + 'CSS'.padEnd(colWidths.css) +
    ' | ' + 'Sourcemaps'.padEnd(colWidths.maps) +
    ' |'
  );

  console.log(
    '| ' + '-'.repeat(colWidths.tool) +
    ' | ' + '-'.repeat(colWidths.time - 1) + ':' +
    ' | ' + '-'.repeat(colWidths.js) +
    ' | ' + '-'.repeat(colWidths.css) +
    ' | ' + '-'.repeat(colWidths.maps) +
    ' |'
  );

  // Print rows
  for (const row of data) {
    console.log(
      '| ' + row.tool.padEnd(colWidths.tool) +
      ' | ' + row.time.padStart(colWidths.time) +
      ' | ' + row.js.padEnd(colWidths.js) +
      ' | ' + row.css.padEnd(colWidths.css) +
      ' | ' + row.maps.padEnd(colWidths.maps) +
      ' |'
    );
  }
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
