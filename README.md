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

### Ubuntu Latest (updated 2026-08-01)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        729.28 ±  14.52 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.1   |       1295.33 ±  12.15 ms | 1.8x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1386.42 ±   6.53 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.5   |       1929.52 ±  17.56 ms | 2.6x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.7   |       3021.79 ±  21.28 ms | 4.1x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.9   |       3523.87 ±  82.92 ms | 4.8x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.3  |      52816.17 ± 436.05 ms | 72.4x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-08-01)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        711.56 ±  37.36 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.1   |       1225.53 ± 162.67 ms | 1.7x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1424.55 ± 313.27 ms | 2.0x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.5   |       1748.88 ± 587.14 ms | 2.5x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.7   |       2265.63 ± 168.73 ms | 3.2x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.9   |       2637.81 ± 296.78 ms | 3.7x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.3  |     38125.50 ± 4207.68 ms | 53.6x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-08-01)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.2.1   |       2347.25 ±  81.90 ms | 1.0x       | 5.22 MB | not found | 13.57 MB   |
| esbuild  | 0.28.1  |       2469.27 ±  41.32 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| vite     | 8.1.5   |       3199.35 ±  38.41 ms | 1.4x       | 5.20 MB | 1 B       | 13.36 MB   |
| bun      | 1.3.14  |       3341.90 ± 129.96 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| rspack   | 2.1.7   |       5272.40 ± 331.04 ms | 2.2x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.9   |       6063.18 ± 318.45 ms | 2.6x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.3  |   131326.39 ± 14018.40 ms | 55.9x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
