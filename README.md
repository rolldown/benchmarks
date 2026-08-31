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

### Ubuntu Latest (updated 2026-08-31)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        627.79 ±  35.15 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.6   |       1141.76 ±  77.50 ms | 1.8x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1229.48 ±  25.42 ms | 2.0x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       1518.99 ±  52.01 ms | 2.4x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.2.1   |       2650.62 ±  66.61 ms | 4.2x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.2.1   |       2812.83 ±  27.48 ms | 4.5x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.63.1  |      38837.10 ± 326.81 ms | 61.9x      | 5.08 MB | not found | 12.30 MB   |


### macOS Latest (updated 2026-08-31)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        654.68 ±  86.65 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.6   |       1688.93 ± 353.14 ms | 2.6x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1707.33 ± 256.50 ms | 2.6x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       2162.16 ± 196.16 ms | 3.3x       | 4.95 MB | 1 B       | 12.73 MB   |
| rsbuild  | 2.2.1   |       3513.89 ± 332.12 ms | 5.4x       | 4.93 MB | not found | 11.92 MB   |
| rspack   | 2.2.1   |       3545.67 ± 298.81 ms | 5.4x       | 4.93 MB | not found | 12.09 MB   |
| rollup   | 4.63.1  |     41858.58 ± 4520.58 ms | 63.9x      | 5.08 MB | not found | 12.30 MB   |


### Windows Latest (updated 2026-08-31)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |       1930.44 ±  34.15 ms | 1.0x       | 5.09 MB | not found | 12.73 MB   |
| rolldown | 1.2.6   |       2755.41 ±  49.16 ms | 1.4x       | 4.97 MB | not found | 13.33 MB   |
| vite     | 8.2.2   |       3175.00 ±  73.03 ms | 1.6x       | 4.95 MB | 1 B       | 13.15 MB   |
| esbuild  | 0.28.2  |       3183.46 ±  42.02 ms | 1.6x       | 5.65 MB | 38 B      | 14.52 MB   |
| rspack   | 2.2.1   |       4768.29 ±  64.54 ms | 2.5x       | 4.93 MB | not found | 12.51 MB   |
| rsbuild  | 2.2.1   |       5248.15 ±  62.39 ms | 2.7x       | 4.93 MB | not found | 12.34 MB   |
| rollup   | 4.63.1  |    138972.99 ± 9320.60 ms | 72.0x      | 5.08 MB | not found | 12.67 MB   |


<!-- BENCHMARK_END -->
