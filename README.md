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

### Ubuntu Latest (updated 2026-09-21)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        707.60 ±   5.41 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.9   |       1296.77 ±  14.45 ms | 1.8x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       1475.90 ±  21.26 ms | 2.1x       | 5.68 MB | 38 B      | 14.23 MB   |
| vite     | 8.3.0   |       1958.86 ±  23.30 ms | 2.8x       | 4.98 MB | 1 B       | 12.86 MB   |
| rspack   | 2.2.6   |       3104.61 ±  27.38 ms | 4.4x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.8   |       3494.76 ±  65.32 ms | 4.9x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.3  |      53280.49 ± 395.79 ms | 75.3x      | 5.11 MB | not found | 12.44 MB   |


### macOS Latest (updated 2026-09-21)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        604.36 ±  42.13 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.9   |       1478.75 ± 431.09 ms | 2.4x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       1565.45 ± 195.42 ms | 2.6x       | 5.68 MB | 38 B      | 14.23 MB   |
| vite     | 8.3.0   |       2977.67 ± 211.67 ms | 4.9x       | 4.98 MB | 1 B       | 12.86 MB   |
| rspack   | 2.2.6   |      4036.31 ± 1101.74 ms | 6.7x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.8   |       4851.61 ± 690.68 ms | 8.0x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.3  |     42049.71 ± 3817.88 ms | 69.6x      | 5.11 MB | not found | 12.44 MB   |


### Windows Latest (updated 2026-09-21)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1881.09 ± 120.27 ms | 1.0x       | 4.95 MB | not found | 12.79 MB   |
| rolldown | 1.2.9   |       2347.68 ±  37.41 ms | 1.2x       | 5.00 MB | not found | 13.45 MB   |
| vite     | 8.3.0   |       3074.30 ±  23.76 ms | 1.6x       | 4.98 MB | 1 B       | 13.28 MB   |
| esbuild  | 0.28.2  |      3886.05 ± 2371.58 ms | 2.1x       | 5.68 MB | 38 B      | 14.66 MB   |
| rspack   | 2.2.6   |       5233.41 ± 302.59 ms | 2.8x       | 4.95 MB | not found | 12.64 MB   |
| rsbuild  | 2.2.8   |       5605.35 ± 374.59 ms | 3.0x       | 4.95 MB | not found | 12.47 MB   |
| rollup   | 4.63.3  |    121791.63 ± 8786.31 ms | 64.7x      | 5.11 MB | not found | 12.81 MB   |


<!-- BENCHMARK_END -->
