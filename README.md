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

### Ubuntu Latest (updated 2026-11-08)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.4   |        996.77 ±  21.19 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.14  |       1978.39 ±  61.80 ms | 2.0x       | 5.00 MB | not found | 13.59 MB   |
| vite     | 8.3.4   |       2551.27 ±  35.71 ms | 2.6x       | 4.98 MB | 1 B       | 13.64 MB   |
| esbuild  | 0.28.2  |       2579.24 ±  11.59 ms | 2.6x       | 5.68 MB | 38 B      | 14.26 MB   |
| rspack   | 2.2.8   |       4267.92 ± 157.08 ms | 4.3x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.12  |       4672.19 ±  54.33 ms | 4.7x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.64.5  |    572839.32 ± 9773.37 ms | 574.7x     | 5.11 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-11-08)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.4   |       1073.93 ± 175.77 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| vite     | 8.3.4   |       1940.30 ± 258.77 ms | 1.8x       | 4.98 MB | 1 B       | 13.64 MB   |
| esbuild  | 0.28.2  |       2833.19 ± 503.98 ms | 2.6x       | 5.68 MB | 38 B      | 14.26 MB   |
| rolldown | 1.2.14  |      3953.68 ± 2598.60 ms | 3.7x       | 5.00 MB | not found | 13.59 MB   |
| rspack   | 2.2.8   |      5053.84 ± 1523.86 ms | 4.7x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.12  |      5178.17 ± 1600.49 ms | 4.8x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.64.5  |  202517.24 ± 171901.00 ms | 188.6x     | 5.11 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-11-08)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.4   |       2018.79 ± 242.41 ms | 1.0x       | 4.95 MB | not found | 12.82 MB   |
| rolldown | 1.2.14  |       3185.02 ± 176.91 ms | 1.6x       | 5.00 MB | not found | 14.01 MB   |
| vite     | 8.3.4   |       3813.76 ±  22.97 ms | 1.9x       | 4.98 MB | 1 B       | 14.07 MB   |
| esbuild  | 0.28.2  |      4714.45 ± 1030.88 ms | 2.3x       | 5.68 MB | 38 B      | 14.68 MB   |
| rspack   | 2.2.8   |       5127.36 ±  51.92 ms | 2.5x       | 4.95 MB | not found | 12.66 MB   |
| rsbuild  | 2.2.12  |       5552.22 ±  34.78 ms | 2.8x       | 4.95 MB | not found | 12.50 MB   |
| rollup   | 4.64.5  |   685201.25 ± 13294.71 ms | 339.4x     | 5.11 MB | not found | 12.83 MB   |


<!-- BENCHMARK_END -->
