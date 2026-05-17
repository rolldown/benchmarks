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

### Ubuntu Latest (updated 2026-05-17)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        732.86 ±  33.24 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.0  |       1361.42 ±   8.74 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.1   |       1369.11 ±   8.35 ms | 1.9x       | 5.22 MB | not found | 12.96 MB   |
| vite     | 8.0.13  |       2009.80 ±  38.79 ms | 2.7x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.3   |       3397.31 ±  54.64 ms | 4.6x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.6   |       3704.87 ±  35.01 ms | 5.1x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.4  |      47705.31 ± 332.46 ms | 65.1x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-05-17)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |       1466.60 ± 133.40 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.1   |      2006.75 ± 1127.38 ms | 1.4x       | 5.22 MB | not found | 12.96 MB   |
| vite     | 8.0.13  |       2385.10 ± 791.89 ms | 1.6x       | 5.20 MB | 1 B       | 12.79 MB   |
| esbuild  | 0.28.0  |       2416.58 ± 465.67 ms | 1.6x       | 5.90 MB | 38 B      | 14.34 MB   |
| rsbuild  | 2.0.6   |       5644.59 ± 967.41 ms | 3.8x       | 5.17 MB | not found | 12.17 MB   |
| rspack   | 2.0.3   |       7586.02 ± 904.13 ms | 5.2x       | 5.17 MB | not found | 12.34 MB   |
| rollup   | 4.60.4  |     62676.84 ± 6592.20 ms | 42.7x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-05-17)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| esbuild  | 0.28.0  |       2511.86 ±  33.81 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.1   |       2514.43 ±  28.67 ms | 1.0x       | 5.22 MB | not found | 13.38 MB   |
| bun      | 1.3.14  |       3320.84 ± 129.21 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.13  |       3869.51 ± 304.72 ms | 1.5x       | 5.20 MB | 1 B       | 13.21 MB   |
| rspack   | 2.0.3   |       5531.80 ± 775.24 ms | 2.2x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.6   |       5782.24 ± 278.90 ms | 2.3x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.60.4  |   142030.13 ± 13835.49 ms | 56.5x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
