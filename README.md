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

### Ubuntu Latest (updated 2025-12-19)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.5         |        682.47 ±   4.96 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown      | 1.0.0-beta.55 |       1535.50 ±  28.71 ms | 2.2x       | 5.28 MB | 37 B      | 13.00 MB   |
| esbuild       | 0.27.2        |       1658.72 ±  21.21 ms | 2.4x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown-vite | 7.3.0         |       2079.85 ±  31.35 ms | 3.0x       | 5.28 MB | 1 B       | 12.79 MB   |
| rspack        | 1.6.8         |       3822.81 ±  38.26 ms | 5.6x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild       | 1.6.15        |       4057.51 ±  28.75 ms | 5.9x       | 5.70 MB | not found | 12.46 MB   |


### macOS Latest (updated 2025-12-19)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.5         |        499.95 ±  33.67 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown      | 1.0.0-beta.55 |       1154.55 ± 124.25 ms | 2.3x       | 5.28 MB | 37 B      | 13.00 MB   |
| esbuild       | 0.27.2        |       1171.18 ± 133.21 ms | 2.3x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown-vite | 7.3.0         |       2335.58 ± 175.02 ms | 4.7x       | 5.28 MB | 1 B       | 12.79 MB   |
| rspack        | 1.6.8         |      4258.57 ± 1691.80 ms | 8.5x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild       | 1.6.15        |       5686.88 ± 926.86 ms | 11.4x      | 5.70 MB | not found | 12.46 MB   |


### Windows Latest (updated 2025-12-19)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.5         |       2510.26 ± 196.85 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| rolldown      | 1.0.0-beta.55 |       2557.48 ±  17.19 ms | 1.0x       | 5.28 MB | 37 B      | 13.42 MB   |
| esbuild       | 0.27.2        |       2592.26 ± 143.72 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown-vite | 7.3.0         |       3925.19 ± 345.54 ms | 1.6x       | 5.28 MB | 1 B       | 13.21 MB   |
| rspack        | 1.6.8         |       5613.05 ±  59.97 ms | 2.2x       | 5.18 MB | not found | 12.76 MB   |
| rsbuild       | 1.6.15        |       5830.80 ±  39.56 ms | 2.3x       | 5.70 MB | not found | 12.88 MB   |


<!-- BENCHMARK_END -->
