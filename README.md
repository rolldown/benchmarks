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

### Ubuntu Latest (updated 2026-11-01)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.4   |        924.65 ±  17.17 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.14  |       1828.02 ±  11.35 ms | 2.0x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       2382.26 ±  28.81 ms | 2.6x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.4   |       2441.73 ±  21.23 ms | 2.6x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.8   |       3941.62 ±  22.36 ms | 4.3x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.12  |       4380.73 ±  38.28 ms | 4.7x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.64.5  |    548205.62 ± 2613.87 ms | 592.9x     | 5.11 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-11-01)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.4   |       1153.62 ± 171.93 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| esbuild  | 0.28.2  |       2549.39 ± 190.56 ms | 2.2x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.4   |       2696.02 ± 327.00 ms | 2.3x       | 4.98 MB | 1 B       | 13.64 MB   |
| rolldown | 1.2.14  |      2927.89 ± 2705.55 ms | 2.5x       | 5.00 MB | not found | 13.59 MB   |
| rsbuild  | 2.2.12  |      4597.61 ± 1798.98 ms | 4.0x       | 4.95 MB | not found | 12.08 MB   |
| rspack   | 2.2.8   |      5776.52 ± 2087.13 ms | 5.0x       | 4.95 MB | not found | 12.24 MB   |
| rollup   | 4.64.5  |  475657.53 ± 249901.33 ms | 412.3x     | 5.11 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-11-01)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.4   |       1892.76 ±  82.11 ms | 1.0x       | 4.95 MB | not found | 12.82 MB   |
| rolldown | 1.2.14  |       3042.63 ±  36.63 ms | 1.6x       | 5.00 MB | not found | 14.01 MB   |
| esbuild  | 0.28.2  |       3318.47 ±  18.58 ms | 1.8x       | 5.68 MB | 38 B      | 14.68 MB   |
| vite     | 8.3.4   |       3936.29 ±  47.73 ms | 2.1x       | 4.98 MB | 1 B       | 14.07 MB   |
| rspack   | 2.2.8   |       5711.54 ±  53.49 ms | 3.0x       | 4.95 MB | not found | 12.66 MB   |
| rsbuild  | 2.2.12  |       6157.29 ±  75.60 ms | 3.3x       | 4.95 MB | not found | 12.50 MB   |
| rollup   | 4.64.5  |   769233.51 ± 27737.87 ms | 406.4x     | 5.11 MB | not found | 12.83 MB   |


<!-- BENCHMARK_END -->
