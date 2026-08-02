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

### Ubuntu Latest (updated 2026-08-02)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        739.18 ±  14.31 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.1   |       1334.64 ±  19.80 ms | 1.8x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1400.41 ±  29.52 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.2.0   |       2081.06 ±  20.68 ms | 2.8x       | 5.20 MB | 1 B       | 12.98 MB   |
| rspack   | 2.1.7   |       3073.12 ±  40.29 ms | 4.2x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.9   |       3516.07 ±  59.75 ms | 4.8x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.3  |      53872.56 ± 344.54 ms | 72.9x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-08-02)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        458.43 ±  49.35 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.1   |       1005.31 ± 286.49 ms | 2.2x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1227.53 ± 276.16 ms | 2.7x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.2.0   |       2318.80 ± 238.24 ms | 5.1x       | 5.20 MB | 1 B       | 12.98 MB   |
| rspack   | 2.1.7   |       4171.13 ± 921.30 ms | 9.1x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.9   |      4368.61 ± 1567.60 ms | 9.5x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.3  |     29161.90 ± 4395.50 ms | 63.6x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-08-02)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.2.1   |       2263.37 ±  16.61 ms | 1.0x       | 5.22 MB | not found | 13.57 MB   |
| esbuild  | 0.28.1  |       2470.03 ±  48.52 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.14  |       3314.83 ± 106.17 ms | 1.5x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.2.0   |       3755.70 ±  44.82 ms | 1.7x       | 5.20 MB | 1 B       | 13.40 MB   |
| rspack   | 2.1.7   |       5642.32 ± 603.39 ms | 2.5x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.9   |       6466.79 ±  53.70 ms | 2.9x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.3  |    128746.59 ± 1418.25 ms | 56.9x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
