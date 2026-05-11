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

### Ubuntu Latest (updated 2026-05-11)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.13  |        785.86 ±  31.36 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0   |       1334.58 ±  21.87 ms | 1.7x       | 5.22 MB | not found | 12.90 MB   |
| esbuild  | 0.28.0  |       1370.56 ±  57.74 ms | 1.7x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.11  |       1987.71 ±  53.24 ms | 2.5x       | 5.20 MB | 1 B       | 12.73 MB   |
| rspack   | 2.0.2   |       3434.79 ±  37.29 ms | 4.4x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.5   |       3745.92 ±  28.50 ms | 4.8x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.3  |      47238.89 ± 371.14 ms | 60.1x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-05-11)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.13  |       1296.17 ± 149.17 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| vite     | 8.0.11  |       1749.92 ± 203.78 ms | 1.4x       | 5.20 MB | 1 B       | 12.73 MB   |
| esbuild  | 0.28.0  |       2413.13 ± 258.73 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.0   |       2636.24 ± 347.53 ms | 2.0x       | 5.22 MB | not found | 12.90 MB   |
| rspack   | 2.0.2   |       3095.82 ± 612.88 ms | 2.4x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.5   |       3253.14 ± 372.46 ms | 2.5x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.3  |     37654.82 ± 2390.73 ms | 29.1x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-05-11)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| esbuild  | 0.28.0  |       2025.49 ±  50.62 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.0   |       2154.99 ±  78.63 ms | 1.1x       | 5.22 MB | not found | 13.33 MB   |
| bun      | 1.3.13  |       2721.72 ± 120.52 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.11  |       2886.50 ±  59.53 ms | 1.4x       | 5.20 MB | 1 B       | 13.15 MB   |
| rspack   | 2.0.2   |       4516.59 ± 282.79 ms | 2.2x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.5   |       4731.00 ±  93.66 ms | 2.3x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.60.3  |     85814.48 ± 3615.32 ms | 42.4x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
