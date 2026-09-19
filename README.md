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
| bun      | 1.4.2   |        731.97 ±  13.60 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.9   |       1345.78 ±  16.93 ms | 1.8x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       1517.85 ±  15.21 ms | 2.1x       | 5.68 MB | 38 B      | 14.23 MB   |
| vite     | 8.3.0   |       1990.82 ±  20.44 ms | 2.7x       | 4.98 MB | 1 B       | 12.86 MB   |
| rspack   | 2.2.5   |       3219.02 ±  40.47 ms | 4.4x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.7   |       5793.76 ±  69.96 ms | 7.9x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.3  |      54068.81 ± 330.92 ms | 73.9x      | 5.11 MB | not found | 12.44 MB   |


### macOS Latest (updated 2026-09-19)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        817.39 ± 154.38 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.9   |       1658.65 ± 556.28 ms | 2.0x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       2049.04 ± 562.03 ms | 2.5x       | 5.68 MB | 38 B      | 14.23 MB   |
| vite     | 8.3.0   |       3060.29 ± 281.52 ms | 3.7x       | 4.98 MB | 1 B       | 12.86 MB   |
| rspack   | 2.2.5   |       3890.37 ± 509.41 ms | 4.8x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.7   |       6658.45 ± 730.38 ms | 8.1x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.3  |    53012.11 ± 10050.42 ms | 64.9x      | 5.11 MB | not found | 12.44 MB   |


### Windows Latest (updated 2026-09-19)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1560.59 ±  31.85 ms | 1.0x       | 4.95 MB | not found | 12.79 MB   |
| rolldown | 1.2.9   |       2247.36 ±  26.53 ms | 1.4x       | 5.00 MB | not found | 13.45 MB   |
| esbuild  | 0.28.2  |       2501.81 ±  28.39 ms | 1.6x       | 5.68 MB | 38 B      | 14.66 MB   |
| vite     | 8.3.0   |       3204.70 ±  83.73 ms | 2.1x       | 4.98 MB | 1 B       | 13.28 MB   |
| rspack   | 2.2.5   |       4934.11 ±  69.13 ms | 3.2x       | 4.95 MB | not found | 12.64 MB   |
| rsbuild  | 2.2.7   |       7624.46 ±  81.46 ms | 4.9x       | 4.95 MB | not found | 12.47 MB   |
| rollup   | 4.63.3  |     128575.18 ± 927.52 ms | 82.4x      | 5.11 MB | not found | 12.81 MB   |


<!-- BENCHMARK_END -->
