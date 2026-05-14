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

### Ubuntu Latest (updated 2026-05-14)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        731.36 ±  17.71 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.1   |       1449.32 ±  33.45 ms | 2.0x       | 5.22 MB | not found | 12.96 MB   |
| esbuild  | 0.28.0  |       1454.47 ±  32.12 ms | 2.0x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.12  |       2111.34 ±  34.15 ms | 2.9x       | 5.20 MB | 1 B       | 12.73 MB   |
| rspack   | 2.0.3   |       3450.14 ±  67.17 ms | 4.7x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.6   |       3809.29 ±  77.58 ms | 5.2x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.3  |      52834.44 ± 402.90 ms | 72.2x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-05-14)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        804.65 ± 138.71 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| vite     | 8.0.12  |       1717.69 ± 196.12 ms | 2.1x       | 5.20 MB | 1 B       | 12.73 MB   |
| esbuild  | 0.28.0  |       2012.78 ± 494.62 ms | 2.5x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.1   |       2778.50 ± 494.46 ms | 3.5x       | 5.22 MB | not found | 12.96 MB   |
| rsbuild  | 2.0.6   |      4230.89 ± 1290.65 ms | 5.3x       | 5.17 MB | not found | 12.17 MB   |
| rspack   | 2.0.3   |      5005.62 ± 1307.02 ms | 6.2x       | 5.17 MB | not found | 12.34 MB   |
| rollup   | 4.60.3  |     49821.89 ± 5225.19 ms | 61.9x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-05-14)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.0.1   |       2514.65 ±  26.84 ms | 1.0x       | 5.22 MB | not found | 13.38 MB   |
| esbuild  | 0.28.0  |       2518.26 ±  32.50 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.14  |       3351.42 ± 161.53 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.12  |       3640.34 ±  45.02 ms | 1.4x       | 5.20 MB | 1 B       | 13.15 MB   |
| rspack   | 2.0.3   |       5170.15 ± 209.80 ms | 2.1x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.6   |       5461.95 ±  64.23 ms | 2.2x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.60.3  |   144177.07 ± 11915.21 ms | 57.3x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
