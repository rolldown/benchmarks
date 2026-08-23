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

### Ubuntu Latest (updated 2026-08-23)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        551.59 ±  40.20 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.5   |       1032.11 ±  20.69 ms | 1.9x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1137.59 ±  17.20 ms | 2.1x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       1445.34 ±  14.68 ms | 2.6x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.1.10  |       2241.83 ±  53.44 ms | 4.1x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.1.13  |       2494.98 ±  38.32 ms | 4.5x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.62.5  |      38095.32 ± 308.91 ms | 69.1x      | 5.08 MB | not found | 12.30 MB   |


### macOS Latest (updated 2026-08-23)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        419.99 ±  29.38 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.5   |       1217.41 ± 351.33 ms | 2.9x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1226.66 ± 142.46 ms | 2.9x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       1413.14 ± 160.37 ms | 3.4x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.1.10  |       2038.21 ± 211.84 ms | 4.9x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.1.13  |       2474.39 ± 467.55 ms | 5.9x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.62.5  |     41306.20 ± 5788.14 ms | 98.4x      | 5.08 MB | not found | 12.30 MB   |


### Windows Latest (updated 2026-08-23)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |       1603.62 ±  32.90 ms | 1.0x       | 5.09 MB | not found | 12.73 MB   |
| rolldown | 1.2.5   |       2409.29 ±  16.63 ms | 1.5x       | 4.97 MB | not found | 13.33 MB   |
| esbuild  | 0.28.2  |       2664.49 ± 107.67 ms | 1.7x       | 5.65 MB | 38 B      | 14.52 MB   |
| vite     | 8.2.2   |       3298.98 ±  80.61 ms | 2.1x       | 4.95 MB | 1 B       | 13.15 MB   |
| rspack   | 2.1.10  |       5158.46 ±  66.72 ms | 3.2x       | 4.93 MB | not found | 12.51 MB   |
| rsbuild  | 2.1.13  |       5702.74 ±  60.52 ms | 3.6x       | 4.93 MB | not found | 12.34 MB   |
| rollup   | 4.62.5  |    130731.81 ± 4561.07 ms | 81.5x      | 5.08 MB | not found | 12.67 MB   |


<!-- BENCHMARK_END -->
