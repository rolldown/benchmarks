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

### Ubuntu Latest (updated 2026-04-02)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.11      |        763.52 ±   4.96 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.13 |       1351.32 ±  10.21 ms | 1.8x       | 5.22 MB | not found | 12.91 MB   |
| esbuild  | 0.27.5      |       1400.02 ±  19.05 ms | 1.8x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.3       |       2032.56 ±  22.67 ms | 2.7x       | 5.20 MB | 1 B       | 12.74 MB   |
| rspack   | 2.0.0-rc.0  |       3563.14 ±  34.56 ms | 4.7x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.0-rc.0  |       3862.13 ±  14.38 ms | 5.1x       | 5.18 MB | not found | 12.17 MB   |


### macOS Latest (updated 2026-04-02)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.11      |        529.74 ±  27.16 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.13 |       1008.26 ±  98.94 ms | 1.9x       | 5.22 MB | not found | 12.91 MB   |
| esbuild  | 0.27.5      |       1186.06 ± 247.68 ms | 2.2x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.3       |       1282.96 ±  89.38 ms | 2.4x       | 5.20 MB | 1 B       | 12.74 MB   |
| rspack   | 2.0.0-rc.0  |       2640.73 ± 323.40 ms | 5.0x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.0-rc.0  |       2694.17 ± 197.08 ms | 5.1x       | 5.18 MB | not found | 12.17 MB   |


### Windows Latest (updated 2026-04-02)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.0.0-rc.13 |       2469.56 ±  52.97 ms | 1.0x       | 5.22 MB | not found | 13.33 MB   |
| esbuild  | 0.27.5      |       2492.88 ±  33.96 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.11      |       3134.48 ± 153.73 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.3       |       3637.75 ±  51.43 ms | 1.5x       | 5.20 MB | 1 B       | 13.16 MB   |
| rsbuild  | 2.0.0-rc.0  |       5667.03 ±  91.10 ms | 2.3x       | 5.18 MB | not found | 12.59 MB   |
| rspack   | 2.0.0-rc.0  |       5689.79 ± 592.98 ms | 2.3x       | 5.18 MB | not found | 12.76 MB   |


<!-- BENCHMARK_END -->
