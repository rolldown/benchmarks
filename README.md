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

### Ubuntu Latest (updated 2026-04-05)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.11      |        788.68 ±  24.73 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.13 |       1380.46 ±  14.21 ms | 1.8x       | 5.22 MB | not found | 12.91 MB   |
| esbuild  | 0.28.0      |       1416.46 ±  33.41 ms | 1.8x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.3       |       2055.63 ±  22.82 ms | 2.6x       | 5.20 MB | 1 B       | 12.74 MB   |
| rspack   | 2.0.0-rc.0  |       3654.41 ±  40.51 ms | 4.6x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.0-rc.0  |       4009.16 ±  67.60 ms | 5.1x       | 5.18 MB | not found | 12.17 MB   |


### macOS Latest (updated 2026-04-05)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.11      |        556.45 ±  65.03 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.13 |       1048.42 ± 185.30 ms | 1.9x       | 5.22 MB | not found | 12.91 MB   |
| esbuild  | 0.28.0      |       1098.28 ± 149.37 ms | 2.0x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.3       |       2397.17 ± 505.77 ms | 4.3x       | 5.20 MB | 1 B       | 12.74 MB   |
| rspack   | 2.0.0-rc.0  |      3596.96 ± 1601.47 ms | 6.5x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.0-rc.0  |      5764.31 ± 1290.90 ms | 10.4x      | 5.18 MB | not found | 12.17 MB   |


### Windows Latest (updated 2026-04-05)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.0.0-rc.13 |       2570.70 ±  56.48 ms | 1.0x       | 5.22 MB | not found | 13.33 MB   |
| esbuild  | 0.28.0      |       2685.60 ± 179.52 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.11      |       3392.99 ± 182.10 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.3       |       4630.56 ± 779.28 ms | 1.8x       | 5.20 MB | 1 B       | 13.16 MB   |
| rspack   | 2.0.0-rc.0  |       5667.56 ± 148.30 ms | 2.2x       | 5.18 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.0-rc.0  |       6904.71 ± 716.29 ms | 2.7x       | 5.18 MB | not found | 12.59 MB   |


<!-- BENCHMARK_END -->
