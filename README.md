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

### Ubuntu Latest (updated 2026-10-07)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        954.58 ±   7.29 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.13  |       1821.61 ±  16.23 ms | 1.9x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       2107.77 ±  18.48 ms | 2.2x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.2   |       2535.99 ± 114.76 ms | 2.7x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.8   |       3613.07 ±  33.92 ms | 3.8x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.11  |       4047.78 ±  36.89 ms | 4.2x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.64.0  |    553330.99 ± 5601.66 ms | 579.7x     | 5.11 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-10-07)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        766.25 ±  50.29 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.13  |       2036.81 ± 307.98 ms | 2.7x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       2276.70 ± 142.80 ms | 3.0x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.2   |       2853.88 ± 463.59 ms | 3.7x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.8   |       3660.55 ± 351.92 ms | 4.8x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.11  |       3834.95 ± 271.08 ms | 5.0x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.64.0  |   610506.69 ± 51949.73 ms | 796.7x     | 5.11 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-10-07)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1776.99 ±  57.14 ms | 1.0x       | 4.95 MB | not found | 12.81 MB   |
| rolldown | 1.2.13  |       3050.69 ± 301.93 ms | 1.7x       | 5.00 MB | not found | 14.01 MB   |
| esbuild  | 0.28.2  |       3286.71 ±  36.90 ms | 1.8x       | 5.68 MB | 38 B      | 14.68 MB   |
| vite     | 8.3.2   |       3857.02 ± 116.27 ms | 2.2x       | 4.98 MB | 1 B       | 14.06 MB   |
| rspack   | 2.2.8   |       5431.96 ±  82.03 ms | 3.1x       | 4.95 MB | not found | 12.66 MB   |
| rsbuild  | 2.2.11  |       5867.85 ±  38.48 ms | 3.3x       | 4.95 MB | not found | 12.50 MB   |
| rollup   | 4.64.0  |   742678.66 ± 61924.78 ms | 417.9x     | 5.11 MB | not found | 12.83 MB   |


<!-- BENCHMARK_END -->
