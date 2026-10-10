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

### Ubuntu Latest (updated 2026-10-10)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1034.85 ±  25.33 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.13  |       1924.79 ±  23.05 ms | 1.9x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       2201.29 ±  21.33 ms | 2.1x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.3   |       2664.80 ±  18.39 ms | 2.6x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.8   |       3969.90 ±  33.32 ms | 3.8x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.12  |       4375.15 ±  80.11 ms | 4.2x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.64.0  |   594289.66 ± 12157.57 ms | 574.3x     | 5.11 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-10-10)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        472.57 ±  27.90 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.13  |       1098.82 ± 112.83 ms | 2.3x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       1412.22 ±  75.66 ms | 3.0x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.3   |       2388.61 ± 386.65 ms | 5.1x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.8   |       2549.67 ± 377.79 ms | 5.4x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.12  |       3127.86 ± 650.19 ms | 6.6x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.64.0  |  415645.18 ± 136323.04 ms | 879.5x     | 5.11 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-10-10)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1554.42 ± 179.74 ms | 1.0x       | 4.95 MB | not found | 12.81 MB   |
| rolldown | 1.2.13  |       2665.79 ± 168.50 ms | 1.7x       | 5.00 MB | not found | 14.01 MB   |
| esbuild  | 0.28.2  |       2768.32 ±  37.68 ms | 1.8x       | 5.68 MB | 38 B      | 14.68 MB   |
| vite     | 8.3.3   |       3320.39 ±  39.53 ms | 2.1x       | 4.98 MB | 1 B       | 14.06 MB   |
| rspack   | 2.2.8   |       5015.74 ± 337.43 ms | 3.2x       | 4.95 MB | not found | 12.66 MB   |
| rsbuild  | 2.2.12  |       5197.81 ± 170.37 ms | 3.3x       | 4.95 MB | not found | 12.50 MB   |
| rollup   | 4.64.0  |   651387.35 ± 74864.51 ms | 419.1x     | 5.11 MB | not found | 12.83 MB   |


<!-- BENCHMARK_END -->
