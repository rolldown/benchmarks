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

### Ubuntu Latest (updated 2026-09-25)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        974.06 ±   8.95 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.11  |       1836.18 ±   8.39 ms | 1.9x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       2094.46 ±  20.38 ms | 2.2x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.0   |       2468.92 ±  16.63 ms | 2.5x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.6   |       3536.37 ±  39.67 ms | 3.6x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.8   |       3937.97 ±  29.30 ms | 4.0x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.63.4  |    553985.77 ± 5003.10 ms | 568.7x     | 5.11 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-09-25)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        516.62 ±  39.45 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.11  |       1345.36 ± 361.96 ms | 2.6x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       1587.41 ± 106.63 ms | 3.1x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.0   |       2270.61 ± 547.89 ms | 4.4x       | 4.98 MB | 1 B       | 13.64 MB   |
| rsbuild  | 2.2.8   |      5602.36 ± 2152.90 ms | 10.8x      | 4.95 MB | not found | 12.08 MB   |
| rspack   | 2.2.6   |      7811.57 ± 3001.43 ms | 15.1x      | 4.95 MB | not found | 12.24 MB   |
| rollup   | 4.63.4  |  486452.85 ± 185836.57 ms | 941.6x     | 5.11 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-09-25)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1825.08 ±  72.99 ms | 1.0x       | 4.95 MB | not found | 12.81 MB   |
| esbuild  | 0.28.2  |       3710.92 ± 295.51 ms | 2.0x       | 5.68 MB | 38 B      | 14.68 MB   |
| vite     | 8.3.0   |       3783.31 ±  39.21 ms | 2.1x       | 4.98 MB | 1 B       | 14.06 MB   |
| rolldown | 1.2.11  |      4666.10 ± 4345.18 ms | 2.6x       | 5.00 MB | not found | 14.01 MB   |
| rspack   | 2.2.6   |       5287.01 ±  36.85 ms | 2.9x       | 4.95 MB | not found | 12.66 MB   |
| rsbuild  | 2.2.8   |       5791.24 ±  66.97 ms | 3.2x       | 4.95 MB | not found | 12.50 MB   |
| rollup   | 4.63.4  |  799769.15 ± 144259.16 ms | 438.2x     | 5.11 MB | not found | 12.83 MB   |


<!-- BENCHMARK_END -->
