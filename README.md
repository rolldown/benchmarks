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

### Ubuntu Latest (updated 2026-08-14)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        738.96 ±  29.77 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.4   |       1258.10 ±  20.98 ms | 1.7x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.2  |       1373.23 ±  19.88 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.2.1   |       1868.20 ±  77.82 ms | 2.5x       | 5.20 MB | 1 B       | 12.98 MB   |
| rspack   | 2.1.9   |       3187.88 ±  38.10 ms | 4.3x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.11  |       3432.12 ±  80.05 ms | 4.6x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.4  |      47761.03 ± 218.41 ms | 64.6x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-08-14)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        743.22 ±  73.72 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.2  |       1654.39 ± 192.35 ms | 2.2x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.2.4   |       1747.36 ± 424.00 ms | 2.4x       | 5.22 MB | not found | 13.15 MB   |
| vite     | 8.2.1   |       2780.03 ± 455.42 ms | 3.7x       | 5.20 MB | 1 B       | 12.98 MB   |
| rspack   | 2.1.9   |       3977.25 ± 412.05 ms | 5.4x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.11  |       4283.86 ± 609.73 ms | 5.8x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.4  |     47954.18 ± 2800.98 ms | 64.5x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-08-14)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.2.4   |       2699.43 ±  32.00 ms | 1.0x       | 5.22 MB | not found | 13.57 MB   |
| esbuild  | 0.28.2  |       3072.15 ±  73.51 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| vite     | 8.2.1   |       3220.33 ±  37.55 ms | 1.2x       | 5.20 MB | 1 B       | 13.40 MB   |
| bun      | 1.3.14  |       3874.98 ± 451.94 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| rspack   | 2.1.9   |       4847.13 ±  72.65 ms | 1.8x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.11  |       5629.94 ± 387.29 ms | 2.1x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.4  |   141085.43 ± 11508.01 ms | 52.3x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
