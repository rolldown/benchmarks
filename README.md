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

### Ubuntu Latest (updated 2026-09-26)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        937.94 ±  17.09 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.11  |       1876.99 ±  29.99 ms | 2.0x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       2075.20 ±  15.74 ms | 2.2x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.0   |       2471.16 ±  23.35 ms | 2.6x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.7   |       3703.45 ±  41.24 ms | 3.9x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.8   |       4165.51 ±  70.17 ms | 4.4x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.63.4  |   596665.18 ± 14487.49 ms | 636.1x     | 5.11 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-09-26)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        952.90 ± 230.99 ms | 1.0x       | 4.95 MB | not found | 12.39 MB   |
| rolldown | 1.2.11  |       1161.91 ± 159.05 ms | 1.2x       | 5.00 MB | not found | 13.59 MB   |
| esbuild  | 0.28.2  |       1722.73 ± 346.01 ms | 1.8x       | 5.68 MB | 38 B      | 14.26 MB   |
| vite     | 8.3.0   |       2141.61 ± 334.17 ms | 2.2x       | 4.98 MB | 1 B       | 13.64 MB   |
| rspack   | 2.2.7   |       2729.46 ± 384.31 ms | 2.9x       | 4.95 MB | not found | 12.24 MB   |
| rsbuild  | 2.2.8   |       3005.28 ± 389.17 ms | 3.2x       | 4.95 MB | not found | 12.08 MB   |
| rollup   | 4.63.4  |  404458.47 ± 245209.10 ms | 424.5x     | 5.11 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-09-26)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       1551.19 ±  48.53 ms | 1.0x       | 4.95 MB | not found | 12.81 MB   |
| rolldown | 1.2.11  |       2763.69 ± 135.58 ms | 1.8x       | 5.00 MB | not found | 14.01 MB   |
| esbuild  | 0.28.2  |       2810.49 ±  39.63 ms | 1.8x       | 5.68 MB | 38 B      | 14.68 MB   |
| vite     | 8.3.0   |       3680.93 ± 273.23 ms | 2.4x       | 4.98 MB | 1 B       | 14.06 MB   |
| rspack   | 2.2.7   |       4417.01 ±  26.55 ms | 2.8x       | 4.95 MB | not found | 12.66 MB   |
| rsbuild  | 2.2.8   |       4792.72 ±  69.86 ms | 3.1x       | 4.95 MB | not found | 12.50 MB   |
| rollup   | 4.63.4  |   624424.50 ± 48793.17 ms | 402.5x     | 5.11 MB | not found | 12.83 MB   |


<!-- BENCHMARK_END -->
