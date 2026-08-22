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

### Ubuntu Latest (updated 2026-08-22)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        627.94 ±  42.35 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.5   |       1143.44 ±  23.40 ms | 1.8x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.2  |       1217.11 ±  29.31 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.2.1   |       1543.37 ±  30.58 ms | 2.5x       | 5.20 MB | 1 B       | 12.98 MB   |
| rspack   | 2.1.10  |       2647.82 ±  80.32 ms | 4.2x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.13  |       2959.91 ±  29.44 ms | 4.7x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.4  |      38314.26 ± 140.54 ms | 61.0x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-08-22)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        540.99 ±  80.81 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.5   |       1118.87 ± 335.18 ms | 2.1x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.2  |       1240.76 ± 246.12 ms | 2.3x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.2.1   |       1279.19 ±  87.24 ms | 2.4x       | 5.20 MB | 1 B       | 12.98 MB   |
| rsbuild  | 2.1.13  |       2485.46 ± 366.13 ms | 4.6x       | 5.17 MB | not found | 12.17 MB   |
| rspack   | 2.1.10  |       2957.71 ± 532.95 ms | 5.5x       | 5.17 MB | not found | 12.34 MB   |
| rollup   | 4.62.4  |     42147.42 ± 6200.96 ms | 77.9x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-08-22)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |       1342.03 ±  57.39 ms | 1.0x       | 5.34 MB | not found | 12.98 MB   |
| rolldown | 1.2.5   |       1990.08 ±  18.03 ms | 1.5x       | 5.22 MB | not found | 13.57 MB   |
| esbuild  | 0.28.2  |       2065.58 ±  32.66 ms | 1.5x       | 5.90 MB | 38 B      | 14.77 MB   |
| vite     | 8.2.1   |       2902.73 ±  35.29 ms | 2.2x       | 5.20 MB | 1 B       | 13.40 MB   |
| rspack   | 2.1.10  |       4136.54 ± 375.52 ms | 3.1x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.13  |       5224.84 ±  58.00 ms | 3.9x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.4  |     89220.66 ± 9997.23 ms | 66.5x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
