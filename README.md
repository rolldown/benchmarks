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

### Ubuntu Latest (updated 2026-08-09)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        741.71 ±  30.05 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.2.3   |       1253.34 ±  13.30 ms | 1.7x       | 5.22 MB | not found | 13.15 MB   |
| esbuild  | 0.28.1  |       1398.21 ±  12.15 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.2.1   |       1927.26 ±  19.47 ms | 2.6x       | 5.20 MB | 1 B       | 12.98 MB   |
| rspack   | 2.1.8   |       3062.55 ±  19.71 ms | 4.1x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.10  |       3410.01 ±  61.78 ms | 4.6x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.4  |      53770.81 ± 746.11 ms | 72.5x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-08-09)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        668.50 ±  74.68 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| vite     | 8.2.1   |       1293.58 ±  59.32 ms | 1.9x       | 5.20 MB | 1 B       | 12.98 MB   |
| esbuild  | 0.28.1  |       1543.52 ±  83.19 ms | 2.3x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.2.3   |       1620.56 ± 473.04 ms | 2.4x       | 5.22 MB | not found | 13.15 MB   |
| rspack   | 2.1.8   |       2287.10 ± 278.70 ms | 3.4x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.10  |       2335.09 ± 185.03 ms | 3.5x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.4  |     35061.08 ± 8308.16 ms | 52.4x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-08-09)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.2.3   |       2291.64 ±  25.44 ms | 1.0x       | 5.22 MB | not found | 13.57 MB   |
| esbuild  | 0.28.1  |       2514.70 ±  27.51 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.14  |       3366.32 ± 175.52 ms | 1.5x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.2.1   |       3851.34 ± 267.82 ms | 1.7x       | 5.20 MB | 1 B       | 13.40 MB   |
| rspack   | 2.1.8   |       5647.72 ± 654.81 ms | 2.5x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.10  |       6065.63 ± 611.39 ms | 2.6x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.4  |   139745.65 ± 14247.45 ms | 61.0x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
