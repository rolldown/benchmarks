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

### Ubuntu Latest (updated 2026-09-16)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        718.78 ±  34.62 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.9   |       1304.40 ±  15.48 ms | 1.8x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       1488.52 ±  19.67 ms | 2.1x       | 5.68 MB | 38 B      | 14.23 MB   |
| vite     | 8.3.0   |       2060.26 ±  22.17 ms | 2.9x       | 4.98 MB | 1 B       | 12.86 MB   |
| rspack   | 2.2.3   |       3263.12 ±  35.57 ms | 4.5x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.5   |       3716.06 ±  40.32 ms | 5.2x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.2  |      54024.54 ± 468.33 ms | 75.2x      | 5.11 MB | not found | 12.44 MB   |


### macOS Latest (updated 2026-09-16)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        686.87 ± 127.84 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.9   |       1367.39 ± 434.30 ms | 2.0x       | 5.00 MB | not found | 13.03 MB   |
| vite     | 8.3.0   |       1599.86 ± 155.93 ms | 2.3x       | 4.98 MB | 1 B       | 12.86 MB   |
| esbuild  | 0.28.2  |       1821.09 ± 447.97 ms | 2.7x       | 5.68 MB | 38 B      | 14.23 MB   |
| rspack   | 2.2.3   |       1988.10 ± 125.68 ms | 2.9x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.5   |       2592.26 ± 444.19 ms | 3.8x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.2  |     31324.14 ± 5578.74 ms | 45.6x      | 5.11 MB | not found | 12.44 MB   |


### Windows Latest (updated 2026-09-16)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1587.06 ±  24.51 ms | 1.0x       | 4.95 MB | not found | 12.79 MB   |
| rolldown | 1.2.9   |       2359.14 ±  25.26 ms | 1.5x       | 5.00 MB | not found | 13.45 MB   |
| esbuild  | 0.28.2  |       2580.18 ±  46.48 ms | 1.6x       | 5.68 MB | 38 B      | 14.66 MB   |
| vite     | 8.3.0   |       3188.76 ±  88.33 ms | 2.0x       | 4.98 MB | 1 B       | 13.28 MB   |
| rspack   | 2.2.3   |       4740.50 ±  38.68 ms | 3.0x       | 4.95 MB | not found | 12.64 MB   |
| rsbuild  | 2.2.5   |       5281.37 ± 118.24 ms | 3.3x       | 4.95 MB | not found | 12.47 MB   |
| rollup   | 4.63.2  |   144212.69 ± 12709.04 ms | 90.9x      | 5.11 MB | not found | 12.81 MB   |


<!-- BENCHMARK_END -->
