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

### Ubuntu Latest (updated 2026-09-19)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        734.27 ±  41.03 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.9   |       1295.38 ±  14.46 ms | 1.8x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       1479.20 ±  17.98 ms | 2.0x       | 5.68 MB | 38 B      | 14.23 MB   |
| vite     | 8.3.0   |       1960.08 ±  26.73 ms | 2.7x       | 4.98 MB | 1 B       | 12.86 MB   |
| rspack   | 2.2.5   |       3071.23 ±  48.72 ms | 4.2x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.6   |       5684.69 ± 113.87 ms | 7.7x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.3  |      53103.68 ± 591.47 ms | 72.3x      | 5.11 MB | not found | 12.44 MB   |


### macOS Latest (updated 2026-09-19)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        581.02 ±  65.48 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.9   |       1281.38 ± 381.32 ms | 2.2x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       1487.57 ± 134.89 ms | 2.6x       | 5.68 MB | 38 B      | 14.23 MB   |
| rspack   | 2.2.5   |       2951.30 ± 450.89 ms | 5.1x       | 4.95 MB | not found | 12.22 MB   |
| vite     | 8.3.0   |       3000.06 ± 489.23 ms | 5.2x       | 4.98 MB | 1 B       | 12.86 MB   |
| rsbuild  | 2.2.6   |       4972.48 ± 503.16 ms | 8.6x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.3  |     34618.32 ± 3779.69 ms | 59.6x      | 5.11 MB | not found | 12.44 MB   |


### Windows Latest (updated 2026-09-19)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1571.11 ±  30.57 ms | 1.0x       | 4.95 MB | not found | 12.79 MB   |
| rolldown | 1.2.9   |       2276.17 ±  36.46 ms | 1.4x       | 5.00 MB | not found | 13.45 MB   |
| esbuild  | 0.28.2  |       2524.39 ±  31.11 ms | 1.6x       | 5.68 MB | 38 B      | 14.66 MB   |
| vite     | 8.3.0   |       3124.66 ±  91.31 ms | 2.0x       | 4.98 MB | 1 B       | 13.28 MB   |
| rspack   | 2.2.5   |       4891.89 ±  47.62 ms | 3.1x       | 4.95 MB | not found | 12.64 MB   |
| rsbuild  | 2.2.6   |       7454.09 ±  96.85 ms | 4.7x       | 4.95 MB | not found | 12.47 MB   |
| rollup   | 4.63.3  |   140594.86 ± 10722.32 ms | 89.5x      | 5.11 MB | not found | 12.81 MB   |


<!-- BENCHMARK_END -->
