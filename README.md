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

### Ubuntu Latest (updated 2026-05-11)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.13  |        771.44 ±  10.41 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0   |       1390.70 ±  18.17 ms | 1.8x       | 5.22 MB | not found | 12.90 MB   |
| esbuild  | 0.28.0  |       1442.65 ±  24.43 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.12  |       2074.74 ±  57.77 ms | 2.7x       | 5.20 MB | 1 B       | 12.73 MB   |
| rspack   | 2.0.2   |       3463.02 ±  56.78 ms | 4.5x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.5   |       3792.52 ±  49.61 ms | 4.9x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.3  |      53669.89 ± 647.76 ms | 69.6x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-05-11)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.13  |       1386.90 ±  93.45 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| vite     | 8.0.12  |       1451.70 ± 130.84 ms | 1.0x       | 5.20 MB | 1 B       | 12.73 MB   |
| rspack   | 2.0.2   |       2734.71 ± 283.38 ms | 2.0x       | 5.17 MB | not found | 12.34 MB   |
| esbuild  | 0.28.0  |       2896.96 ± 403.33 ms | 2.1x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.0   |       2935.25 ± 390.50 ms | 2.1x       | 5.22 MB | not found | 12.90 MB   |
| rsbuild  | 2.0.5   |       3499.20 ± 678.90 ms | 2.5x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.3  |     57790.67 ± 9358.42 ms | 41.7x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-05-11)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.0.0   |       2466.31 ±  18.58 ms | 1.0x       | 5.22 MB | not found | 13.33 MB   |
| esbuild  | 0.28.0  |       2484.28 ±  37.78 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.13  |       3240.93 ± 129.06 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.12  |       3642.43 ±  35.72 ms | 1.5x       | 5.20 MB | 1 B       | 13.15 MB   |
| rspack   | 2.0.2   |       5321.53 ± 211.97 ms | 2.2x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.5   |       6101.13 ± 537.01 ms | 2.5x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.60.3  |   142461.75 ± 11669.72 ms | 57.8x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
