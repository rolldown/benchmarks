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

### Ubuntu Latest (updated 2026-06-21)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        744.63 ±  15.82 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.1.2   |       1365.48 ±   8.61 ms | 1.8x       | 5.22 MB | not found | 13.10 MB   |
| esbuild  | 0.28.1  |       1453.39 ±  28.73 ms | 2.0x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.16  |       2097.52 ±  14.97 ms | 2.8x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.8   |       3357.23 ±  34.01 ms | 4.5x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.15  |       3718.76 ±  18.53 ms | 5.0x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.0  |      53854.77 ± 405.64 ms | 72.3x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-06-21)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        433.95 ±  52.89 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.1.2   |        887.20 ± 162.20 ms | 2.0x       | 5.22 MB | not found | 13.10 MB   |
| esbuild  | 0.28.1  |        901.25 ±  73.18 ms | 2.1x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.16  |       1638.99 ± 300.94 ms | 3.8x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.8   |       3227.53 ± 779.72 ms | 7.4x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.15  |       3454.64 ± 987.67 ms | 8.0x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.0  |     24779.53 ± 1188.17 ms | 57.1x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-06-21)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.1.2   |       2489.03 ±  16.00 ms | 1.0x       | 5.22 MB | not found | 13.52 MB   |
| esbuild  | 0.28.1  |       2577.45 ±  53.64 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.14  |       3219.31 ±  28.58 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.16  |       3504.41 ±  27.77 ms | 1.4x       | 5.20 MB | 1 B       | 13.21 MB   |
| rspack   | 2.0.8   |       5520.90 ± 107.83 ms | 2.2x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.15  |       5896.03 ±  77.95 ms | 2.4x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.0  |     116959.13 ± 728.97 ms | 47.0x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
