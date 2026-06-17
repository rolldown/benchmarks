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

### Ubuntu Latest (updated 2026-06-17)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        741.88 ±  19.50 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.1  |       1441.31 ±  20.28 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.1.1   |       1483.54 ±  20.86 ms | 2.0x       | 5.22 MB | not found | 13.10 MB   |
| vite     | 8.0.16  |       2104.57 ±  55.47 ms | 2.8x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.8   |       3430.68 ±  46.90 ms | 4.6x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.14  |       3871.93 ±  58.69 ms | 5.2x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.0  |      54226.07 ± 295.59 ms | 73.1x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-06-17)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        771.77 ± 219.90 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| vite     | 8.0.16  |       1521.16 ± 175.61 ms | 2.0x       | 5.20 MB | 1 B       | 12.79 MB   |
| rolldown | 1.1.1   |       1575.59 ± 375.65 ms | 2.0x       | 5.22 MB | not found | 13.10 MB   |
| esbuild  | 0.28.1  |       1600.10 ± 127.55 ms | 2.1x       | 5.90 MB | 38 B      | 14.34 MB   |
| rsbuild  | 2.0.14  |       3451.20 ± 550.97 ms | 4.5x       | 5.17 MB | not found | 12.17 MB   |
| rspack   | 2.0.8   |      4473.47 ± 1990.61 ms | 5.8x       | 5.17 MB | not found | 12.34 MB   |
| rollup   | 4.62.0  |     34369.69 ± 4162.49 ms | 44.5x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-06-17)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.1.1   |       2429.92 ±  64.62 ms | 1.0x       | 5.22 MB | not found | 13.52 MB   |
| esbuild  | 0.28.1  |       2464.16 ±  62.35 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.14  |       3310.20 ± 165.55 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.16  |       3325.10 ±  48.57 ms | 1.4x       | 5.20 MB | 1 B       | 13.21 MB   |
| rspack   | 2.0.8   |       4976.81 ± 108.71 ms | 2.0x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.14  |       5458.00 ±  77.54 ms | 2.2x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.0  |     116045.66 ± 773.64 ms | 47.8x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
