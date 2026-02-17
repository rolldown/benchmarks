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

### Ubuntu Latest (updated 2026-02-17)

| Tool     | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.9         |        702.56 ±   4.45 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.27.3        |       1424.20 ±  19.05 ms | 2.0x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.0-rc.4    |       1594.07 ±  29.73 ms | 2.3x       | 5.22 MB | 37 B      | 12.89 MB   |
| vite     | 8.0.0-beta.14 |       2178.91 ±  27.04 ms | 3.1x       | 5.20 MB | 1 B       | 12.69 MB   |
| rspack   | 1.7.6         |       3761.62 ±  71.83 ms | 5.4x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 1.7.3         |       3863.01 ±  20.33 ms | 5.5x       | 5.70 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-02-17)

| Tool     | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.9         |       1218.19 ± 227.47 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.27.3        |       2373.15 ± 392.55 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.0-rc.4    |       3394.39 ± 672.35 ms | 2.8x       | 5.22 MB | 37 B      | 12.89 MB   |
| vite     | 8.0.0-beta.14 |       4434.91 ± 546.89 ms | 3.6x       | 5.20 MB | 1 B       | 12.69 MB   |
| rsbuild  | 1.7.3         |     10189.87 ± 1984.30 ms | 8.4x       | 5.70 MB | not found | 12.46 MB   |
| rspack   | 1.7.6         |     10865.78 ± 1262.02 ms | 8.9x       | 5.18 MB | not found | 12.34 MB   |


### Windows Latest (updated 2026-02-17)

| Tool     | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.9         |       2171.66 ±  78.74 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| esbuild  | 0.27.3        |       2312.10 ±  16.22 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.0-rc.4    |       2593.62 ±  28.50 ms | 1.2x       | 5.22 MB | 37 B      | 13.31 MB   |
| vite     | 8.0.0-beta.14 |       3532.98 ±  51.29 ms | 1.6x       | 5.20 MB | 1 B       | 13.11 MB   |
| rspack   | 1.7.6         |       5712.16 ±  58.31 ms | 2.6x       | 5.18 MB | not found | 12.76 MB   |
| rsbuild  | 1.7.3         |       5929.27 ± 425.06 ms | 2.7x       | 5.70 MB | not found | 12.88 MB   |


<!-- BENCHMARK_END -->
