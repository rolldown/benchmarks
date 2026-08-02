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

### Ubuntu Latest (updated 2026-08-02)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        740.73 ±  33.23 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.1   |       1298.91 ±   8.25 ms | 1.8x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1392.21 ±  17.42 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.2.0   |       1990.51 ±  23.03 ms | 2.7x       | 5.20 MB | 1 B       | 12.98 MB   |
| rspack   | 2.1.7   |       3033.35 ±  23.74 ms | 4.1x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.9   |       3519.76 ±  77.84 ms | 4.8x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.3  |      53631.58 ± 304.89 ms | 72.4x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-08-02)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        566.38 ±  86.84 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.1   |       1165.72 ± 301.98 ms | 2.1x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1200.21 ± 169.42 ms | 2.1x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.2.0   |       1590.55 ± 367.32 ms | 2.8x       | 5.20 MB | 1 B       | 12.98 MB   |
| rspack   | 2.1.7   |       3114.09 ± 320.11 ms | 5.5x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.9   |      3619.13 ± 1011.14 ms | 6.4x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.3  |     30722.38 ± 3077.95 ms | 54.2x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-08-02)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.2.1   |       2352.03 ±  30.49 ms | 1.0x       | 5.22 MB | not found | 13.57 MB   |
| esbuild  | 0.28.1  |       2504.44 ±  32.99 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| vite     | 8.2.0   |       3275.81 ±  47.05 ms | 1.4x       | 5.20 MB | 1 B       | 13.40 MB   |
| bun      | 1.3.14  |       3308.05 ± 145.30 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| rspack   | 2.1.7   |       4884.23 ±  60.76 ms | 2.1x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.9   |       5428.46 ±  53.81 ms | 2.3x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.3  |   142715.46 ± 11823.24 ms | 60.7x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
