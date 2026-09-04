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

### Ubuntu Latest (updated 2026-09-04)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.1   |        699.58 ±  12.98 ms | 1.0x       | 4.92 MB | not found | 12.24 MB   |
| rolldown | 1.2.7   |       1252.72 ±  10.93 ms | 1.8x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1457.61 ±  17.09 ms | 2.1x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       1893.43 ±  11.62 ms | 2.7x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.2.2   |       2978.79 ±  26.88 ms | 4.3x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.2.2   |       3399.89 ±  18.58 ms | 4.9x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.63.1  |      53441.93 ± 379.82 ms | 76.4x      | 5.08 MB | not found | 12.30 MB   |


### macOS Latest (updated 2026-09-04)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.1   |        977.14 ± 184.81 ms | 1.0x       | 4.92 MB | not found | 12.24 MB   |
| rolldown | 1.2.7   |       1681.14 ± 226.28 ms | 1.7x       | 4.97 MB | not found | 12.90 MB   |
| vite     | 8.2.2   |       1803.08 ± 464.47 ms | 1.8x       | 4.95 MB | 1 B       | 12.73 MB   |
| esbuild  | 0.28.2  |       2679.74 ± 342.82 ms | 2.7x       | 5.65 MB | 38 B      | 14.10 MB   |
| rsbuild  | 2.2.2   |       4145.56 ± 770.45 ms | 4.2x       | 4.93 MB | not found | 11.92 MB   |
| rspack   | 2.2.2   |       4334.26 ± 486.91 ms | 4.4x       | 4.93 MB | not found | 12.09 MB   |
| rollup   | 4.63.1  |     54691.14 ± 4277.86 ms | 56.0x      | 5.08 MB | not found | 12.30 MB   |


### Windows Latest (updated 2026-09-04)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.1   |       1886.01 ± 113.82 ms | 1.0x       | 4.92 MB | not found | 12.66 MB   |
| rolldown | 1.2.7   |       2635.12 ± 110.55 ms | 1.4x       | 4.97 MB | not found | 13.33 MB   |
| esbuild  | 0.28.2  |       2952.91 ±  49.83 ms | 1.6x       | 5.65 MB | 38 B      | 14.52 MB   |
| vite     | 8.2.2   |       3106.83 ±  38.12 ms | 1.6x       | 4.95 MB | 1 B       | 13.15 MB   |
| rspack   | 2.2.2   |       5010.25 ±  84.90 ms | 2.7x       | 4.93 MB | not found | 12.51 MB   |
| rsbuild  | 2.2.2   |       5455.17 ±  95.19 ms | 2.9x       | 4.93 MB | not found | 12.34 MB   |
| rollup   | 4.63.1  |   119688.87 ± 11661.78 ms | 63.5x      | 5.08 MB | not found | 12.67 MB   |


<!-- BENCHMARK_END -->
