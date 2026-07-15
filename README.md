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

### Ubuntu Latest (updated 2026-07-15)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        742.33 ±  16.68 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.0   |       1292.25 ±  19.14 ms | 1.7x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1417.06 ±  29.82 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.4   |       1912.64 ±  20.53 ms | 2.6x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.3   |       3028.90 ±  60.78 ms | 4.1x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.5   |       3448.26 ±  74.73 ms | 4.6x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |      52834.84 ± 307.44 ms | 71.2x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-07-15)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        719.97 ± 123.56 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.0   |       1658.87 ± 415.58 ms | 2.3x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1879.82 ± 264.28 ms | 2.6x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.4   |       1967.21 ± 152.27 ms | 2.7x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.3   |       3081.62 ± 370.69 ms | 4.3x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.5   |       3895.23 ± 582.95 ms | 5.4x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |     41428.29 ± 4340.94 ms | 57.5x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-07-15)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.2.0   |       2691.34 ± 188.66 ms | 1.0x       | 5.22 MB | not found | 13.57 MB   |
| esbuild  | 0.28.1  |       2842.74 ± 109.96 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| vite     | 8.1.4   |       3316.59 ±  43.67 ms | 1.2x       | 5.20 MB | 1 B       | 13.36 MB   |
| bun      | 1.3.14  |       3399.10 ± 100.34 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| rspack   | 2.1.3   |       5155.07 ± 109.87 ms | 1.9x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.5   |       5788.43 ± 187.59 ms | 2.2x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.2  |    137205.06 ± 7962.30 ms | 51.0x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
