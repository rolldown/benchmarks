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

### Ubuntu Latest (updated 2026-07-19)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        773.95 ±  18.47 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.0   |       1356.32 ±  10.99 ms | 1.8x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1427.14 ±  12.42 ms | 1.8x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.5   |       2001.63 ±  38.93 ms | 2.6x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.4   |       3537.34 ±  83.77 ms | 4.6x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.6   |       3985.58 ±  76.82 ms | 5.1x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |      49580.02 ± 504.55 ms | 64.1x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-07-19)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        454.24 ±  42.08 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.1  |        991.51 ± 113.03 ms | 2.2x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.2.0   |       1015.72 ± 349.59 ms | 2.2x       | 5.22 MB | not found | 13.15 MB   |
| vite     | 8.1.5   |       1603.16 ± 148.07 ms | 3.5x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.4   |       2452.47 ± 920.08 ms | 5.4x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.6   |       2749.55 ± 208.40 ms | 6.1x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |     29308.23 ± 2896.24 ms | 64.5x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-07-19)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.2.0   |       2396.93 ±  72.18 ms | 1.0x       | 5.22 MB | not found | 13.57 MB   |
| esbuild  | 0.28.1  |       2548.86 ±  28.26 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.14  |       3339.17 ± 124.74 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.1.5   |       3412.19 ± 229.63 ms | 1.4x       | 5.20 MB | 1 B       | 13.36 MB   |
| rspack   | 2.1.4   |       5327.68 ± 658.81 ms | 2.2x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.6   |       6975.01 ± 908.80 ms | 2.9x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.2  |   130001.98 ± 11551.78 ms | 54.2x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
