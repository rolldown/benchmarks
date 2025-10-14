#!/bin/bash

# Rolldown Benchmark Runner
# This script runs benchmarks using hyperfine for comparing build tools

set -e

# Default values
APP="apps/10000"
SET="all"
JSON_OUTPUT=""

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --app)
      APP="$2"
      shift 2
      ;;
    --set)
      SET="$2"
      shift 2
      ;;
    --json)
      JSON_OUTPUT="$2"
      shift 2
      ;;
    -h|--help)
      echo "Usage: $0 [OPTIONS]"
      echo ""
      echo "Options:"
      echo "  --app APP        App directory to benchmark (default: apps/10000)"
      echo "                   Available: apps/1000, apps/3000, apps/5000, apps/10000, apps/rome, apps/three10x"
      echo "  --set SET        Benchmark set to run (default: all)"
      echo "                   Available: set1 (vite, rsbuild), set2 (rspack, rolldown, esbuild, bun), all"
      echo "  --json FILE      Export results to JSON file"
      echo "  -h, --help       Show this help message"
      echo ""
      echo "Example:"
      echo "  $0 --app apps/5000 --set set1"
      echo "  $0 --set set2 --json results.json"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use -h or --help for usage information"
      exit 1
      ;;
  esac
done

# Check if hyperfine is installed
if ! command -v hyperfine &> /dev/null; then
    echo "Error: hyperfine is not installed."
    echo "Please install it from: https://github.com/sharkdp/hyperfine"
    echo "  macOS: brew install hyperfine"
    echo "  Linux: apt install hyperfine / pacman -S hyperfine"
    exit 1
fi

# Check if app directory exists
if [ ! -d "$APP" ]; then
    echo "Error: App directory '$APP' does not exist"
    exit 1
fi

# Define benchmark sets
run_benchmark() {
    local tools=("$@")
    local set_suffix="$1"
    local cmd="hyperfine --warmup 1 --runs 3"

    # Add JSON export if specified
    if [ -n "$JSON_OUTPUT" ]; then
        local json_file="${JSON_OUTPUT%.json}_${set_suffix}.json"
        cmd="$cmd --export-json '$json_file'"
    fi

    for tool in "${tools[@]}"; do
        cmd="$cmd 'cd $APP && node --run build:$tool'"
    done

    echo "Running benchmarks for: ${tools[*]}"
    echo "App: $APP"
    echo ""

    eval "$cmd"
    echo ""
}

# Run benchmarks based on selected set
case $SET in
    set1)
        run_benchmark "vite" "rsbuild"
        ;;
    set2)
        run_benchmark "rspack" "rolldown" "esbuild" "bun"
        ;;
    all)
        echo "=== Benchmark Set 1: vite vs rsbuild ==="
        echo ""
        run_benchmark "vite" "rsbuild"

        echo "=== Benchmark Set 2: rspack vs rolldown vs esbuild vs bun ==="
        echo ""
        run_benchmark "rspack" "rolldown" "esbuild" "bun"
        ;;
    *)
        echo "Error: Unknown set '$SET'"
        echo "Available sets: set1, set2, all"
        exit 1
        ;;
esac
