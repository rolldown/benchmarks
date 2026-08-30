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

### Ubuntu Latest (updated 2026-08-30)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        705.47 ±  13.75 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.6   |       1287.56 ±  10.97 ms | 1.8x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1465.23 ±   9.35 ms | 2.1x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       1958.62 ±  17.43 ms | 2.8x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.2.1   |       3054.14 ±  39.90 ms | 4.3x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.2.0   |       3501.29 ±  27.79 ms | 5.0x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.63.0  |      53955.17 ± 603.26 ms | 76.5x      | 5.08 MB | not found | 12.30 MB   |


### macOS Latest (updated 2026-08-30)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        444.47 ±  42.18 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.6   |        872.60 ±  81.59 ms | 2.0x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1012.35 ± 152.16 ms | 2.3x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       1303.50 ±  49.63 ms | 2.9x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.2.1   |       2373.64 ± 354.48 ms | 5.3x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.2.0   |       3054.83 ± 741.30 ms | 6.9x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.63.0  |     26976.24 ± 1435.48 ms | 60.7x      | 5.08 MB | not found | 12.30 MB   |


### Windows Latest (updated 2026-08-30)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |       1370.74 ±  69.83 ms | 1.0x       | 5.09 MB | not found | 12.73 MB   |
| rolldown | 1.2.6   |       2024.11 ±  20.98 ms | 1.5x       | 4.97 MB | not found | 13.33 MB   |
| esbuild  | 0.28.2  |       2107.29 ±  35.99 ms | 1.5x       | 5.65 MB | 38 B      | 14.52 MB   |
| vite     | 8.2.2   |       2718.16 ± 142.02 ms | 2.0x       | 4.95 MB | 1 B       | 13.15 MB   |
| rspack   | 2.2.1   |       4322.05 ±  52.41 ms | 3.2x       | 4.93 MB | not found | 12.51 MB   |
| rsbuild  | 2.2.0   |       5039.86 ± 510.13 ms | 3.7x       | 4.93 MB | not found | 12.34 MB   |
| rollup   | 4.63.0  |     85922.71 ± 2786.18 ms | 62.7x      | 5.08 MB | not found | 12.67 MB   |


<!-- BENCHMARK_END -->
