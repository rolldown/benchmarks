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

### Ubuntu Latest (updated 2026-09-22)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        945.54 ±   7.17 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.9   |       1773.38 ±  11.98 ms | 1.9x       | 5.00 MB | not found | 13.05 MB   |
| esbuild  | 0.28.2  |       2054.95 ±  21.48 ms | 2.2x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.0   |       2399.89 ±  17.21 ms | 2.5x       | 4.98 MB | 1 B       | 12.88 MB   |
| rspack   | 2.2.6   |       3416.51 ±  18.83 ms | 3.6x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.8   |       3811.78 ±  20.17 ms | 4.0x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.63.3  |    551798.06 ± 2991.45 ms | 583.6x     | 5.11 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-09-22)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        556.09 ±  44.88 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.9   |       1411.63 ± 410.41 ms | 2.5x       | 5.00 MB | not found | 13.05 MB   |
| esbuild  | 0.28.2  |       1612.44 ±  88.82 ms | 2.9x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.0   |       2677.85 ± 235.90 ms | 4.8x       | 4.98 MB | 1 B       | 12.88 MB   |
| rspack   | 2.2.6   |      4946.94 ± 1028.85 ms | 8.9x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.8   |       6243.47 ± 815.78 ms | 11.2x      | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.63.3  |  391550.82 ± 254218.27 ms | 704.1x     | 5.11 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-09-22)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1794.85 ±  45.18 ms | 1.0x       | 4.95 MB | not found | 12.81 MB   |
| rolldown | 1.2.9   |       3052.96 ± 164.82 ms | 1.7x       | 5.00 MB | not found | 13.47 MB   |
| esbuild  | 0.28.2  |       3301.27 ±  33.78 ms | 1.8x       | 5.68 MB | 38 B      | 14.68 MB   |
| vite     | 8.3.0   |       3897.87 ± 116.30 ms | 2.2x       | 4.98 MB | 1 B       | 13.30 MB   |
| rspack   | 2.2.6   |       5559.12 ±  84.95 ms | 3.1x       | 4.95 MB | not found | 12.66 MB   |
| rsbuild  | 2.2.8   |       5993.39 ±  37.68 ms | 3.3x       | 4.95 MB | not found | 12.50 MB   |
| rollup   | 4.63.3  |   740210.56 ± 60820.26 ms | 412.4x     | 5.11 MB | not found | 12.83 MB   |


<!-- BENCHMARK_END -->
