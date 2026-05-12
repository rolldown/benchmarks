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

### Ubuntu Latest (updated 2026-05-12)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.13  |        789.80 ±  42.95 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0   |       1366.14 ±  12.50 ms | 1.7x       | 5.22 MB | not found | 12.90 MB   |
| esbuild  | 0.28.0  |       1408.33 ±  11.93 ms | 1.8x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.12  |       2111.29 ±  27.55 ms | 2.7x       | 5.20 MB | 1 B       | 12.73 MB   |
| rspack   | 2.0.3   |       3528.00 ±  74.73 ms | 4.5x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.5   |       3976.22 ± 111.94 ms | 5.0x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.3  |      52944.52 ± 413.63 ms | 67.0x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-05-12)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.13  |        466.72 ±  43.84 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.0  |       1108.80 ± 217.22 ms | 2.4x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.12  |       1597.00 ± 311.48 ms | 3.4x       | 5.20 MB | 1 B       | 12.73 MB   |
| rolldown | 1.0.0   |       1776.28 ± 389.39 ms | 3.8x       | 5.22 MB | not found | 12.90 MB   |
| rspack   | 2.0.3   |      4165.02 ± 1364.30 ms | 8.9x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.5   |      4756.61 ± 1536.10 ms | 10.2x      | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.3  |     39993.45 ± 4260.84 ms | 85.7x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-05-12)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| esbuild  | 0.28.0  |       2505.61 ±  95.62 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.0   |       2541.59 ± 122.22 ms | 1.0x       | 5.22 MB | not found | 13.33 MB   |
| bun      | 1.3.13  |       3262.62 ± 122.11 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.12  |       3634.36 ±  27.78 ms | 1.5x       | 5.20 MB | 1 B       | 13.15 MB   |
| rsbuild  | 2.0.5   |       5653.82 ± 116.05 ms | 2.3x       | 5.17 MB | not found | 12.59 MB   |
| rspack   | 2.0.3   |       5679.26 ± 380.29 ms | 2.3x       | 5.17 MB | not found | 12.76 MB   |
| rollup   | 4.60.3  |    134538.58 ± 3794.07 ms | 53.7x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
