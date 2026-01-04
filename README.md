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

### Ubuntu Latest (updated 2026-01-04)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.5         |        690.75 ±   9.78 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown      | 1.0.0-beta.58 |       1531.24 ±  37.57 ms | 2.2x       | 5.28 MB | 37 B      | 13.00 MB   |
| esbuild       | 0.27.2        |       1665.51 ±  15.97 ms | 2.4x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown-vite | 7.3.0         |       2088.80 ±  59.85 ms | 3.0x       | 5.28 MB | 1 B       | 12.79 MB   |
| rspack        | 1.7.0         |       3814.14 ±  36.51 ms | 5.5x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild       | 1.7.1         |       3926.38 ±  25.58 ms | 5.7x       | 5.70 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-01-04)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.5         |        471.40 ±  15.51 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild       | 0.27.2        |       1150.28 ± 118.24 ms | 2.4x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown      | 1.0.0-beta.58 |       1152.66 ±  93.33 ms | 2.4x       | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.3.0         |       2513.77 ± 305.73 ms | 5.3x       | 5.28 MB | 1 B       | 12.79 MB   |
| rspack        | 1.7.0         |      4799.75 ± 1817.30 ms | 10.2x      | 5.18 MB | not found | 12.34 MB   |
| rsbuild       | 1.7.1         |       5584.73 ± 922.56 ms | 11.8x      | 5.70 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-01-04)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.5         |       2253.84 ±  78.19 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| esbuild       | 0.27.2        |       2469.52 ±  38.29 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown      | 1.0.0-beta.58 |       2531.74 ±  25.90 ms | 1.1x       | 5.28 MB | 37 B      | 13.42 MB   |
| rolldown-vite | 7.3.0         |       3685.38 ±  30.18 ms | 1.6x       | 5.28 MB | 1 B       | 13.21 MB   |
| rspack        | 1.7.0         |       5655.26 ±  76.68 ms | 2.5x       | 5.18 MB | not found | 12.76 MB   |
| rsbuild       | 1.7.1         |       5735.29 ±  64.59 ms | 2.5x       | 5.70 MB | not found | 12.88 MB   |


<!-- BENCHMARK_END -->
