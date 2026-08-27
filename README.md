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

### Ubuntu Latest (updated 2026-08-27)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        718.71 ±  36.96 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.6   |       1314.18 ±  12.58 ms | 1.8x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1493.21 ±  27.79 ms | 2.1x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       1995.14 ±  16.96 ms | 2.8x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.1.10  |       3169.21 ±  75.71 ms | 4.4x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.1.13  |       3546.44 ±  74.05 ms | 4.9x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.62.5  |      53838.56 ± 324.30 ms | 74.9x      | 5.08 MB | not found | 12.30 MB   |


### macOS Latest (updated 2026-08-27)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        445.73 ±  19.65 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.6   |        941.67 ± 213.53 ms | 2.1x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1142.82 ± 178.26 ms | 2.6x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       1999.08 ± 307.23 ms | 4.5x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.1.10  |       2556.04 ± 398.53 ms | 5.7x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.1.13  |       3138.27 ± 336.51 ms | 7.0x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.62.5  |     31417.61 ± 4798.66 ms | 70.5x      | 5.08 MB | not found | 12.30 MB   |


### Windows Latest (updated 2026-08-27)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |       1628.16 ± 101.28 ms | 1.0x       | 5.09 MB | not found | 12.73 MB   |
| rolldown | 1.2.6   |       2321.60 ±  39.86 ms | 1.4x       | 4.97 MB | not found | 13.33 MB   |
| esbuild  | 0.28.2  |       2560.41 ±  31.00 ms | 1.6x       | 5.65 MB | 38 B      | 14.52 MB   |
| vite     | 8.2.2   |       3602.90 ± 238.32 ms | 2.2x       | 4.95 MB | 1 B       | 13.15 MB   |
| rspack   | 2.1.10  |       5437.02 ± 622.44 ms | 3.3x       | 4.93 MB | not found | 12.51 MB   |
| rsbuild  | 2.1.13  |       6157.34 ± 568.30 ms | 3.8x       | 4.93 MB | not found | 12.34 MB   |
| rollup   | 4.62.5  |   136657.58 ± 15439.48 ms | 83.9x      | 5.08 MB | not found | 12.67 MB   |


<!-- BENCHMARK_END -->
