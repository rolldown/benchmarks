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

### Ubuntu Latest (updated 2026-09-27)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        814.55 ±  24.48 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.11  |       1632.94 ±  27.39 ms | 2.0x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       1826.80 ±  24.41 ms | 2.2x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.1   |       2047.18 ±  28.26 ms | 2.5x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.7   |       3027.20 ±  39.62 ms | 3.7x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.9   |       3359.49 ±  85.23 ms | 4.1x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.63.5  |   464366.10 ± 15672.78 ms | 570.1x     | 5.11 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-09-27)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        689.13 ± 100.94 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.11  |       1907.13 ± 475.18 ms | 2.8x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       2141.93 ± 167.49 ms | 3.1x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.1   |       2537.17 ± 332.33 ms | 3.7x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.7   |      4127.66 ± 1270.13 ms | 6.0x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.9   |       4340.20 ± 902.66 ms | 6.3x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.63.5  |  604684.53 ± 200699.32 ms | 877.5x     | 5.11 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-09-27)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1788.07 ±  48.73 ms | 1.0x       | 4.95 MB | not found | 12.81 MB   |
| rolldown | 1.2.11  |       3063.91 ± 274.79 ms | 1.7x       | 5.00 MB | not found | 14.01 MB   |
| esbuild  | 0.28.2  |       3266.33 ±  28.22 ms | 1.8x       | 5.68 MB | 38 B      | 14.68 MB   |
| vite     | 8.3.1   |       3866.39 ± 114.78 ms | 2.2x       | 4.98 MB | 1 B       | 14.06 MB   |
| rspack   | 2.2.7   |       5487.70 ±  69.27 ms | 3.1x       | 4.95 MB | not found | 12.66 MB   |
| rsbuild  | 2.2.9   |       5915.04 ±  47.72 ms | 3.3x       | 4.95 MB | not found | 12.50 MB   |
| rollup   | 4.63.5  |   738192.84 ± 47870.76 ms | 412.8x     | 5.11 MB | not found | 12.83 MB   |


<!-- BENCHMARK_END -->
