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

### Ubuntu Latest (updated 2026-10-14)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.3   |        821.65 ±  18.94 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.14  |       1597.24 ±  22.39 ms | 1.9x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       1758.53 ±  33.37 ms | 2.1x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.4   |       2083.86 ±  36.55 ms | 2.5x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.8   |       3078.81 ±  58.17 ms | 3.7x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.12  |       3492.74 ±  90.09 ms | 4.3x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.64.5  |    451184.20 ± 3701.10 ms | 549.1x     | 5.11 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-10-14)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.3   |        634.23 ±  46.70 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| esbuild  | 0.28.2  |       1781.63 ± 120.71 ms | 2.8x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.4   |       2085.97 ± 151.92 ms | 3.3x       | 4.98 MB | 1 B       | 13.64 MB   |
| rolldown | 1.2.14  |      2358.26 ± 2663.83 ms | 3.7x       | 5.00 MB | not found | 13.59 MB   |
| rsbuild  | 2.2.12  |      4734.63 ± 1505.22 ms | 7.5x       | 4.95 MB | not found | 12.08 MB   |
| rspack   | 2.2.8   |      4808.33 ± 1237.71 ms | 7.6x       | 4.95 MB | not found | 12.24 MB   |
| rollup   | 4.64.5  |  532749.10 ± 288691.36 ms | 840.0x     | 5.11 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-10-14)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.3   |       1880.80 ±  61.26 ms | 1.0x       | 4.95 MB | not found | 12.81 MB   |
| rolldown | 1.2.14  |       3103.63 ± 296.90 ms | 1.7x       | 5.00 MB | not found | 14.01 MB   |
| esbuild  | 0.28.2  |       3319.28 ±  41.61 ms | 1.8x       | 5.68 MB | 38 B      | 14.68 MB   |
| vite     | 8.3.4   |       3803.89 ±  28.94 ms | 2.0x       | 4.98 MB | 1 B       | 14.07 MB   |
| rspack   | 2.2.8   |       5440.28 ±  92.01 ms | 2.9x       | 4.95 MB | not found | 12.66 MB   |
| rsbuild  | 2.2.12  |       5896.61 ± 154.17 ms | 3.1x       | 4.95 MB | not found | 12.50 MB   |
| rollup   | 4.64.5  |   775980.19 ± 56741.28 ms | 412.6x     | 5.11 MB | not found | 12.83 MB   |


<!-- BENCHMARK_END -->
