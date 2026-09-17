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

### Ubuntu Latest (updated 2026-09-17)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        657.42 ±  52.43 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.9   |       1130.35 ±  22.52 ms | 1.7x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       1241.40 ±  25.67 ms | 1.9x       | 5.68 MB | 38 B      | 14.23 MB   |
| vite     | 8.3.0   |       1506.47 ±  75.03 ms | 2.3x       | 4.98 MB | 1 B       | 12.86 MB   |
| rspack   | 2.2.4   |       2605.82 ±  44.59 ms | 4.0x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.6   |       4424.39 ±  38.67 ms | 6.7x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.3  |      38998.60 ± 474.03 ms | 59.3x      | 5.11 MB | not found | 12.44 MB   |


### macOS Latest (updated 2026-09-17)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        728.23 ± 104.89 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| esbuild  | 0.28.2  |       1831.14 ± 285.54 ms | 2.5x       | 5.68 MB | 38 B      | 14.23 MB   |
| rolldown | 1.2.9   |       2020.75 ± 501.63 ms | 2.8x       | 5.00 MB | not found | 13.03 MB   |
| vite     | 8.3.0   |       2701.24 ± 628.35 ms | 3.7x       | 4.98 MB | 1 B       | 12.86 MB   |
| rspack   | 2.2.4   |       3842.69 ± 600.54 ms | 5.3x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.6   |      5465.79 ± 2148.43 ms | 7.5x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.3  |     48325.13 ± 6604.70 ms | 66.4x      | 5.11 MB | not found | 12.44 MB   |


### Windows Latest (updated 2026-09-17)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1984.96 ± 134.23 ms | 1.0x       | 4.95 MB | not found | 12.79 MB   |
| rolldown | 1.2.9   |       2660.77 ±  24.39 ms | 1.3x       | 5.00 MB | not found | 13.45 MB   |
| esbuild  | 0.28.2  |       3011.58 ±  40.75 ms | 1.5x       | 5.68 MB | 38 B      | 14.66 MB   |
| vite     | 8.3.0   |       3127.06 ±  36.46 ms | 1.6x       | 4.98 MB | 1 B       | 13.28 MB   |
| rspack   | 2.2.4   |       4912.88 ± 325.28 ms | 2.5x       | 4.95 MB | not found | 12.64 MB   |
| rsbuild  | 2.2.6   |       8970.63 ± 713.38 ms | 4.5x       | 4.95 MB | not found | 12.47 MB   |
| rollup   | 4.63.3  |   147822.18 ± 13747.56 ms | 74.5x      | 5.11 MB | not found | 12.81 MB   |


<!-- BENCHMARK_END -->
