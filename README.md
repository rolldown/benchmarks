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

### Ubuntu Latest (updated 2026-08-28)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        709.20 ±  20.11 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.6   |       1308.98 ±  17.40 ms | 1.8x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1481.06 ±  17.37 ms | 2.1x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       2082.31 ±  18.59 ms | 2.9x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.1.10  |       3427.96 ±  62.38 ms | 4.8x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.1.13  |       3837.68 ±  38.94 ms | 5.4x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.63.0  |      54713.96 ± 896.50 ms | 77.1x      | 5.08 MB | not found | 12.30 MB   |


### macOS Latest (updated 2026-08-28)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |        516.60 ±  38.17 ms | 1.0x       | 5.09 MB | not found | 12.31 MB   |
| rolldown | 1.2.6   |       1032.97 ± 223.94 ms | 2.0x       | 4.97 MB | not found | 12.90 MB   |
| esbuild  | 0.28.2  |       1228.20 ± 127.32 ms | 2.4x       | 5.65 MB | 38 B      | 14.10 MB   |
| vite     | 8.2.2   |       3144.47 ± 827.52 ms | 6.1x       | 4.95 MB | 1 B       | 12.73 MB   |
| rspack   | 2.1.10  |       3739.61 ± 737.72 ms | 7.2x       | 4.93 MB | not found | 12.09 MB   |
| rsbuild  | 2.1.13  |      4852.37 ± 1290.73 ms | 9.4x       | 4.93 MB | not found | 11.92 MB   |
| rollup   | 4.63.0  |     42908.29 ± 4657.51 ms | 83.1x      | 5.08 MB | not found | 12.30 MB   |


### Windows Latest (updated 2026-08-28)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.0   |       1955.31 ± 154.57 ms | 1.0x       | 5.09 MB | not found | 12.73 MB   |
| rolldown | 1.2.6   |       2627.15 ±  44.89 ms | 1.3x       | 4.97 MB | not found | 13.33 MB   |
| esbuild  | 0.28.2  |       3012.04 ±  47.24 ms | 1.5x       | 5.65 MB | 38 B      | 14.52 MB   |
| vite     | 8.2.2   |       3081.66 ±  23.14 ms | 1.6x       | 4.95 MB | 1 B       | 13.15 MB   |
| rspack   | 2.1.10  |       4795.26 ±  33.10 ms | 2.5x       | 4.93 MB | not found | 12.51 MB   |
| rsbuild  | 2.1.13  |       5306.37 ±  38.28 ms | 2.7x       | 4.93 MB | not found | 12.34 MB   |
| rollup   | 4.63.0  |   130680.35 ± 10260.08 ms | 66.8x      | 5.08 MB | not found | 12.67 MB   |


<!-- BENCHMARK_END -->
