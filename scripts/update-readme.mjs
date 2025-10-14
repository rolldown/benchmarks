#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Read benchmark results
const ubuntuResults = readFileSync('./results/benchmark-ubuntu-latest/benchmark-output.txt', 'utf-8');
const macosResults = readFileSync('./results/benchmark-macos-latest/benchmark-output.txt', 'utf-8');
const windowsResults = readFileSync('./results/benchmark-windows-latest/benchmark-output.txt', 'utf-8');

// Extract just the table from each result (skip the "Running benchmarks..." lines)
function extractTable(output) {
  const lines = output.split('\n');
  const tableStart = lines.findIndex(line => line.startsWith('| Tool'));
  if (tableStart === -1) return output;
  return lines.slice(tableStart).join('\n');
}

const ubuntuTable = extractTable(ubuntuResults);
const macosTable = extractTable(macosResults);
const windowsTable = extractTable(windowsResults);

// Get current date
const date = new Date().toISOString().split('T')[0];

// Build the new benchmark section
const benchmarkSection = `<!-- BENCHMARK_START -->

### Ubuntu Latest (updated ${date})

${ubuntuTable}

### macOS Latest (updated ${date})

${macosTable}

### Windows Latest (updated ${date})

${windowsTable}

<!-- BENCHMARK_END -->`;

// Read README
const readmePath = './README.md';
const readme = readFileSync(readmePath, 'utf-8');

// Replace content between markers
const startMarker = '<!-- BENCHMARK_START -->';
const endMarker = '<!-- BENCHMARK_END -->';

let updatedReadme;
if (readme.includes(startMarker) && readme.includes(endMarker)) {
  // Replace existing section
  const startIndex = readme.indexOf(startMarker);
  const endIndex = readme.indexOf(endMarker) + endMarker.length;
  updatedReadme = readme.substring(0, startIndex) + benchmarkSection + readme.substring(endIndex);
} else {
  // Append to end if markers don't exist
  console.warn('Markers not found in README.md, appending to end');
  updatedReadme = readme + '\n\n' + benchmarkSection;
}

// Write updated README
writeFileSync(readmePath, updatedReadme);

console.log('README.md updated successfully');
