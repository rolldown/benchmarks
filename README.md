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

### Ubuntu Latest (updated 2026-05-27)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        737.92 ±  36.38 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.3   |       1368.71 ±  22.93 ms | 1.9x       | 5.22 MB | not found | 12.96 MB   |
| esbuild  | 0.28.0  |       1373.15 ±  21.73 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.14  |       2012.26 ±  33.55 ms | 2.7x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.4   |       3468.19 ±  49.89 ms | 4.7x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.7   |       3797.70 ±  42.75 ms | 5.1x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.4  |      47950.26 ± 312.93 ms | 65.0x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-05-27)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        419.11 ±  37.85 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.3   |        901.04 ± 234.11 ms | 2.1x       | 5.22 MB | not found | 12.96 MB   |
| esbuild  | 0.28.0  |        910.37 ±  61.27 ms | 2.2x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.14  |       2408.74 ± 266.93 ms | 5.7x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.4   |      6172.18 ± 1905.27 ms | 14.7x      | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.7   |       7795.69 ± 999.49 ms | 18.6x      | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.4  |     30721.46 ± 5952.99 ms | 73.3x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-05-27)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| esbuild  | 0.28.0  |       2506.39 ± 168.54 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.3   |       2809.85 ±  14.60 ms | 1.1x       | 5.22 MB | not found | 13.38 MB   |
| bun      | 1.3.14  |       3383.64 ± 214.85 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.14  |       3471.48 ±  30.16 ms | 1.4x       | 5.20 MB | 1 B       | 13.21 MB   |
| rspack   | 2.0.4   |       5230.37 ±  53.55 ms | 2.1x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.7   |       5646.16 ±  82.01 ms | 2.3x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.60.4  |   145555.59 ± 12160.76 ms | 58.1x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
