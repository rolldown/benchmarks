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

### Ubuntu Latest (updated 2026-08-07)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        805.02 ±  40.38 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.3   |       1395.13 ±  22.79 ms | 1.7x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1476.22 ±  22.06 ms | 1.8x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.2.0   |       2063.66 ±  47.57 ms | 2.6x       | 5.20 MB | 1 B       | 12.98 MB   |
| rspack   | 2.1.8   |       3208.72 ±  67.07 ms | 4.0x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.10  |       3795.01 ±  88.05 ms | 4.7x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.4  |      55018.51 ± 501.35 ms | 68.3x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-08-07)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        472.10 ±  32.42 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.1  |        996.94 ±  89.12 ms | 2.1x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.2.3   |        998.71 ± 193.57 ms | 2.1x       | 5.22 MB | not found | 13.15 MB   |
| vite     | 8.2.0   |       1345.29 ± 102.34 ms | 2.8x       | 5.20 MB | 1 B       | 12.98 MB   |
| rspack   | 2.1.8   |       2096.47 ± 129.46 ms | 4.4x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.10  |       2532.03 ± 373.50 ms | 5.4x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.4  |     29581.01 ± 1480.04 ms | 62.7x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-08-07)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.2.3   |       2033.68 ±  19.94 ms | 1.0x       | 5.22 MB | not found | 13.57 MB   |
| esbuild  | 0.28.1  |       2185.77 ±  27.94 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| vite     | 8.2.0   |       2904.53 ±  25.24 ms | 1.4x       | 5.20 MB | 1 B       | 13.40 MB   |
| bun      | 1.3.14  |       3310.39 ±  74.76 ms | 1.6x       | 5.34 MB | not found | 13.11 MB   |
| rspack   | 2.1.8   |       4733.61 ± 391.93 ms | 2.3x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.10  |       4922.00 ± 185.58 ms | 2.4x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.4  |     91038.98 ± 6348.70 ms | 44.8x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
