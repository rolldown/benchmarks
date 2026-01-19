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

### Ubuntu Latest (updated 2026-01-19)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.6         |        701.23 ±  30.95 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild       | 0.27.2        |       1723.00 ±  30.15 ms | 2.5x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown      | 1.0.0-beta.60 |       1817.88 ±  32.22 ms | 2.6x       | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.3.1         |       2121.51 ±  37.76 ms | 3.0x       | 5.28 MB | 1 B       | 12.79 MB   |
| rsbuild       | 1.7.2         |       3943.03 ±  39.00 ms | 5.6x       | 5.70 MB | not found | 12.46 MB   |
| rspack        | 1.7.2         |       4090.31 ± 100.41 ms | 5.8x       | 5.18 MB | not found | 12.34 MB   |


### macOS Latest (updated 2026-01-19)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown      | 1.0.0-beta.60 |       1714.16 ± 419.09 ms | 1.0x       | 5.28 MB | 37 B      | 13.00 MB   |
| bun           | 1.3.6         |       2022.94 ± 434.77 ms | 1.2x       | 5.34 MB | not found | 12.56 MB   |
| rolldown-vite | 7.3.1         |       2147.18 ± 695.69 ms | 1.3x       | 5.28 MB | 1 B       | 12.79 MB   |
| esbuild       | 0.27.2        |       2671.70 ± 700.85 ms | 1.6x       | 5.90 MB | 38 B      | 14.34 MB   |
| rspack        | 1.7.2         |       3593.80 ± 714.65 ms | 2.1x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild       | 1.7.2         |      6679.49 ± 2325.40 ms | 3.9x       | 5.70 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-01-19)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.6         |       2441.09 ± 183.74 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| esbuild       | 0.27.2        |       2653.02 ± 108.52 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown      | 1.0.0-beta.60 |       2903.45 ± 225.06 ms | 1.2x       | 5.28 MB | 37 B      | 13.42 MB   |
| rolldown-vite | 7.3.1         |       3644.05 ± 105.83 ms | 1.5x       | 5.28 MB | 1 B       | 13.21 MB   |
| rsbuild       | 1.7.2         |       6014.46 ± 578.54 ms | 2.5x       | 5.70 MB | not found | 12.88 MB   |
| rspack        | 1.7.2         |       6627.26 ± 798.33 ms | 2.7x       | 5.18 MB | not found | 12.76 MB   |


<!-- BENCHMARK_END -->
