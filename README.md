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

### Ubuntu Latest (updated 2026-09-15)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        754.72 ±  40.17 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.8   |       1321.99 ±  16.96 ms | 1.8x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       1495.72 ±  27.64 ms | 2.0x       | 5.68 MB | 38 B      | 14.23 MB   |
| vite     | 8.3.0   |       1972.83 ±  16.38 ms | 2.6x       | 4.98 MB | 1 B       | 12.86 MB   |
| rspack   | 2.2.3   |       3097.14 ±  32.55 ms | 4.1x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.5   |       3484.48 ±  28.81 ms | 4.6x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.2  |      53425.04 ± 149.77 ms | 70.8x      | 5.11 MB | not found | 12.44 MB   |


### macOS Latest (updated 2026-09-15)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        451.87 ±  35.01 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| esbuild  | 0.28.2  |       1024.28 ± 104.20 ms | 2.3x       | 5.68 MB | 38 B      | 14.23 MB   |
| rolldown | 1.2.8   |       1070.66 ± 333.88 ms | 2.4x       | 5.00 MB | not found | 13.03 MB   |
| vite     | 8.3.0   |       2463.26 ± 719.11 ms | 5.5x       | 4.98 MB | 1 B       | 12.86 MB   |
| rsbuild  | 2.2.5   |      4245.38 ± 1087.18 ms | 9.4x       | 4.95 MB | not found | 12.05 MB   |
| rspack   | 2.2.3   |      4629.76 ± 1629.39 ms | 10.2x      | 4.95 MB | not found | 12.22 MB   |
| rollup   | 4.63.2  |     41456.05 ± 7682.24 ms | 91.7x      | 5.11 MB | not found | 12.44 MB   |


### Windows Latest (updated 2026-09-15)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1497.34 ±  87.87 ms | 1.0x       | 4.95 MB | not found | 12.79 MB   |
| rolldown | 1.2.8   |       2114.65 ±  27.23 ms | 1.4x       | 5.00 MB | not found | 13.45 MB   |
| esbuild  | 0.28.2  |       2283.35 ±  33.76 ms | 1.5x       | 5.68 MB | 38 B      | 14.66 MB   |
| vite     | 8.3.0   |       3200.91 ± 319.32 ms | 2.1x       | 4.98 MB | 1 B       | 13.28 MB   |
| rspack   | 2.2.3   |       4328.70 ± 121.49 ms | 2.9x       | 4.95 MB | not found | 12.64 MB   |
| rsbuild  | 2.2.5   |       4777.03 ± 295.15 ms | 3.2x       | 4.95 MB | not found | 12.47 MB   |
| rollup   | 4.63.2  |   112758.60 ± 12771.64 ms | 75.3x      | 5.11 MB | not found | 12.81 MB   |


<!-- BENCHMARK_END -->
