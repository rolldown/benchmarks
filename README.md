# Rolldown Benchmark

## Source apps

- Apps containing a mix of React JSX components and plain JS from `node_modules`, with total modules ranging from 2.4k to 19k:
  - `apps/1000`: 2413 modules(1000 JSX components + 1413 JS modules in node_modules)
  - `apps/3000`: 5714 modules(3000 JSX components + 2714 JS modules in node_modules)
  - `apps/5000`: 9014 modules(5000 JSX components + 4014 JS modules in node_modules)
  - `apps/10000`: 19014 modules(10000 JSX components + 9014 JS modules in node_modules)
- The original esbuild `three10x` benchmark
- `rome` based on https://github.com/rome/tools/tree/archived-js, total 1195 typescript file

## Configuration

All tools are configured to use a minimal configuration that:
* enables production mode
    * enables minification
    * enables sourcemaps
* disables gzip

## How to run

1. Install deps with `pnpm install` in workspace root
2. `cd` to the apps you want to benchmark, e.g. `apps/10000`
3. An individual tool's benchmark can be run via its corresponding npm script in that app.
4. We recommend running the benchmarks with `node --run` or `bun run` to minimize package manager script runner overhead, and use [hyperfine](https://github.com/sharkdp/hyperfine) for comparing across tools:

  ```
  hyperfine --warmup 1 --runs 3 \
    'node --run build:rolldown' \
    'node --run build:esbuild' \
    'node --run build:rspack'
  ```

### Result Variance

Due to different native languages and architectural differences, the results may have heavy variance depending on what operating system and hardware you are using the run the benchmarks. This is why we recommend you run the benchmark on your own system to determine the number's relevance to your daily work.

## Reference Results

### Notes

- The following results are run on specific system / hardware and may not match results on different systems. They are for reference only. We strongly recommend you run it on systems close to your work environment.

- Included tools are publishing new versions with improvements constantly. While we try our best to update them periodically, numbers published here are not guaranteed to be always up-to-date.

- Results are automatically updated via GitHub Actions CI running on Ubuntu, macOS, and Windows runners whenever a tool is updated.

### Benchmark Results for `apps/10000`

<!-- BENCHMARK_START -->

### Ubuntu Latest (updated 2026-06-30)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        755.61 ±  40.82 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.1.3   |       1312.69 ±  10.63 ms | 1.7x       | 5.22 MB | not found | 13.10 MB   |
| esbuild  | 0.28.1  |       1406.63 ±  28.99 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.0   |       2005.30 ±  17.83 ms | 2.7x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.1   |       3106.09 ±  48.46 ms | 4.1x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.1   |       3558.91 ±  75.20 ms | 4.7x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |      53338.92 ± 335.02 ms | 70.6x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-06-30)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        588.45 ±  49.77 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.1  |       1200.76 ± 136.26 ms | 2.0x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.0   |       1490.88 ± 133.00 ms | 2.5x       | 5.20 MB | 1 B       | 12.93 MB   |
| rolldown | 1.1.3   |       1640.28 ± 258.39 ms | 2.8x       | 5.22 MB | not found | 13.10 MB   |
| rspack   | 2.1.1   |       2721.74 ± 205.79 ms | 4.6x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.1   |       3257.43 ± 475.32 ms | 5.5x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |     35923.28 ± 5481.51 ms | 61.0x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-06-30)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.1.3   |       2268.99 ±  35.47 ms | 1.0x       | 5.22 MB | not found | 13.52 MB   |
| esbuild  | 0.28.1  |       2320.04 ±  51.92 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| vite     | 8.1.0   |       3060.83 ±  73.37 ms | 1.3x       | 5.20 MB | 1 B       | 13.35 MB   |
| bun      | 1.3.14  |       3134.38 ±  87.00 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| rspack   | 2.1.1   |       4812.84 ±  98.78 ms | 2.1x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.1   |       5214.83 ±  69.16 ms | 2.3x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.2  |     101101.31 ± 787.53 ms | 44.6x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
