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

### Ubuntu Latest (updated 2026-03-15)

| Tool     | Version    | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ---------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.10     |        797.80 ±  46.48 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.9 |       1467.33 ±  14.82 ms | 1.8x       | 5.22 MB | not found | 12.64 MB   |
| esbuild  | 0.27.4     |       1494.94 ±   9.44 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.0      |       2050.98 ±  15.61 ms | 2.6x       | 5.20 MB | 1 B       | 12.47 MB   |
| rsbuild  | 1.7.3      |       4190.51 ±  42.08 ms | 5.3x       | 5.70 MB | not found | 12.46 MB   |
| rspack   | 1.7.8      |       4191.63 ±  42.53 ms | 5.3x       | 5.18 MB | not found | 12.34 MB   |


### macOS Latest (updated 2026-03-15)

| Tool     | Version    | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ---------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.10     |        768.41 ±  63.02 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.27.4     |       1397.75 ± 259.99 ms | 1.8x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.0-rc.9 |       1505.03 ± 290.60 ms | 2.0x       | 5.22 MB | not found | 12.64 MB   |
| vite     | 8.0.0      |       1611.43 ± 253.59 ms | 2.1x       | 5.20 MB | 1 B       | 12.47 MB   |
| rspack   | 1.7.8      |       3639.43 ± 933.35 ms | 4.7x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 1.7.3      |       5541.74 ± 871.76 ms | 7.2x       | 5.70 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-03-15)

| Tool     | Version    | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ---------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.10     |       2311.39 ±  67.50 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| rolldown | 1.0.0-rc.9 |       2450.77 ±  25.13 ms | 1.1x       | 5.22 MB | not found | 13.07 MB   |
| esbuild  | 0.27.4     |       2503.80 ±  55.73 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| vite     | 8.0.0      |       3625.64 ±  38.37 ms | 1.6x       | 5.20 MB | 1 B       | 12.89 MB   |
| rspack   | 1.7.8      |       5705.01 ±  40.02 ms | 2.5x       | 5.18 MB | not found | 12.76 MB   |
| rsbuild  | 1.7.3      |       5813.80 ±  55.11 ms | 2.5x       | 5.70 MB | not found | 12.88 MB   |


<!-- BENCHMARK_END -->
