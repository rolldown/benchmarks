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

### Ubuntu Latest (updated 2026-06-22)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        756.19 ±  50.72 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.1.2   |       1319.64 ±   6.05 ms | 1.7x       | 5.22 MB | not found | 13.10 MB   |
| esbuild  | 0.28.1  |       1400.79 ±  17.69 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.16  |       2053.42 ±  29.10 ms | 2.7x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.8   |       3177.09 ±  24.81 ms | 4.2x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.15  |       3553.59 ±  33.67 ms | 4.7x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |      53059.53 ± 210.77 ms | 70.2x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-06-22)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        418.61 ±  26.43 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.1  |        990.15 ± 127.41 ms | 2.4x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.1.2   |       1014.45 ± 252.63 ms | 2.4x       | 5.22 MB | not found | 13.10 MB   |
| vite     | 8.0.16  |       1750.94 ± 312.63 ms | 4.2x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.8   |       1937.45 ±  57.53 ms | 4.6x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.15  |       2209.78 ± 108.03 ms | 5.3x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |     26632.92 ± 1918.68 ms | 63.6x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-06-22)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.1.2   |       2287.61 ±  27.97 ms | 1.0x       | 5.22 MB | not found | 13.52 MB   |
| esbuild  | 0.28.1  |       2424.66 ±  40.49 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.14  |       3246.82 ± 122.07 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.16  |       3407.98 ± 252.73 ms | 1.5x       | 5.20 MB | 1 B       | 13.21 MB   |
| rspack   | 2.0.8   |       5440.41 ± 386.07 ms | 2.4x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.15  |       5892.78 ± 416.07 ms | 2.6x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.2  |   138699.13 ± 16443.36 ms | 60.6x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
