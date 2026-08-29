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

### Ubuntu Latest (updated 2026-08-29)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        539.58 ±  37.35 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.6   |       1021.42 ±  22.47 ms | 1.9x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1120.44 ±  28.11 ms | 2.1x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       1420.88 ±  16.30 ms | 2.6x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.2.0   |       2161.84 ±  48.95 ms | 4.0x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.2.0   |       2427.88 ±  30.36 ms | 4.5x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.63.0  |      37775.13 ± 213.49 ms | 70.0x      | 5.08 MB | not found | 12.30 MB   |


### macOS Latest (updated 2026-08-29)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        944.71 ± 140.11 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.6   |       2065.85 ± 497.17 ms | 2.2x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       2081.04 ± 321.27 ms | 2.2x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       2442.54 ± 350.47 ms | 2.6x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.2.0   |       4176.26 ± 664.61 ms | 4.4x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.2.0   |      5527.30 ± 1339.48 ms | 5.9x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.63.0  |     42391.30 ± 4769.77 ms | 44.9x      | 5.08 MB | not found | 12.30 MB   |


### Windows Latest (updated 2026-08-29)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |       1496.52 ±  40.33 ms | 1.0x       | 5.09 MB | not found | 12.73 MB   |
| rolldown | 1.2.6   |       2237.30 ±  14.64 ms | 1.5x       | 4.97 MB | not found | 13.33 MB   |
| esbuild  | 0.28.2  |       2461.05 ±  28.79 ms | 1.6x       | 5.65 MB | 38 B      | 14.52 MB   |
| vite     | 8.2.2   |       3413.38 ± 300.26 ms | 2.3x       | 4.95 MB | 1 B       | 13.15 MB   |
| rsbuild  | 2.2.0   |       5348.21 ± 283.88 ms | 3.6x       | 4.93 MB | not found | 12.34 MB   |
| rspack   | 2.2.0   |       5482.24 ± 308.20 ms | 3.7x       | 4.93 MB | not found | 12.51 MB   |
| rollup   | 4.63.0  |   126215.16 ± 15375.61 ms | 84.3x      | 5.08 MB | not found | 12.67 MB   |


<!-- BENCHMARK_END -->
