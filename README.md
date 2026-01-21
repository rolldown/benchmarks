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

### Ubuntu Latest (updated 2026-01-21)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.6         |        700.27 ±  12.68 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown      | 1.0.0-beta.60 |       1728.66 ±  36.16 ms | 2.5x       | 5.28 MB | 37 B      | 13.00 MB   |
| esbuild       | 0.27.2        |       1741.86 ±  34.58 ms | 2.5x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown-vite | 7.3.1         |       2176.86 ±  38.62 ms | 3.1x       | 5.28 MB | 1 B       | 12.79 MB   |
| rsbuild       | 1.7.2         |       4083.32 ± 114.27 ms | 5.8x       | 5.70 MB | not found | 12.46 MB   |
| rspack        | 1.7.3         |       4084.04 ± 112.69 ms | 5.8x       | 5.18 MB | not found | 12.34 MB   |


### macOS Latest (updated 2026-01-21)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.6         |        569.72 ±  37.88 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild       | 0.27.2        |       1147.52 ± 196.90 ms | 2.0x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown      | 1.0.0-beta.60 |       1627.01 ± 197.23 ms | 2.9x       | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.3.1         |       2263.31 ± 329.60 ms | 4.0x       | 5.28 MB | 1 B       | 12.79 MB   |
| rsbuild       | 1.7.2         |       4070.10 ± 653.71 ms | 7.1x       | 5.70 MB | not found | 12.46 MB   |
| rspack        | 1.7.3         |      4999.79 ± 1439.51 ms | 8.8x       | 5.18 MB | not found | 12.34 MB   |


### Windows Latest (updated 2026-01-21)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.6         |       2191.34 ±  31.09 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| esbuild       | 0.27.2        |       2296.36 ±  49.02 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown      | 1.0.0-beta.60 |       2539.20 ±  27.67 ms | 1.2x       | 5.28 MB | 37 B      | 13.42 MB   |
| rolldown-vite | 7.3.1         |       3370.03 ± 112.35 ms | 1.5x       | 5.28 MB | 1 B       | 13.21 MB   |
| rspack        | 1.7.3         |       5422.68 ± 158.81 ms | 2.5x       | 5.18 MB | not found | 12.76 MB   |
| rsbuild       | 1.7.2         |       5483.31 ±  57.14 ms | 2.5x       | 5.70 MB | not found | 12.88 MB   |


<!-- BENCHMARK_END -->
