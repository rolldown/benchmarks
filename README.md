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

### Ubuntu Latest (updated 2026-04-16)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.12      |        732.15 ±  10.71 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.16 |       1382.64 ±  10.02 ms | 1.9x       | 5.22 MB | not found | 12.91 MB   |
| esbuild  | 0.28.0      |       1411.21 ±  28.23 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.8       |       2067.26 ±  41.52 ms | 2.8x       | 5.20 MB | 1 B       | 12.74 MB   |
| rspack   | 2.0.0-rc.2  |       3477.47 ±  33.35 ms | 4.7x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.0-rc.3  |       3756.81 ±  21.95 ms | 5.1x       | 5.17 MB | not found | 12.17 MB   |


### macOS Latest (updated 2026-04-16)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.12      |        562.22 ±  64.15 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.0      |       1159.95 ±  50.77 ms | 2.1x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.0-rc.16 |       1430.09 ± 250.81 ms | 2.5x       | 5.22 MB | not found | 12.91 MB   |
| vite     | 8.0.8       |       2020.52 ± 218.64 ms | 3.6x       | 5.20 MB | 1 B       | 12.74 MB   |
| rspack   | 2.0.0-rc.2  |      4561.79 ± 1241.24 ms | 8.1x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.0-rc.3  |      5423.40 ± 1683.59 ms | 9.6x       | 5.17 MB | not found | 12.17 MB   |


### Windows Latest (updated 2026-04-16)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| esbuild  | 0.28.0      |       1957.07 ±  35.88 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.0-rc.16 |       2073.48 ±  15.17 ms | 1.1x       | 5.22 MB | not found | 13.33 MB   |
| bun      | 1.3.12      |       2675.29 ± 199.19 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.8       |       3271.96 ± 240.80 ms | 1.7x       | 5.20 MB | 1 B       | 13.16 MB   |
| rspack   | 2.0.0-rc.2  |       4542.77 ±  84.93 ms | 2.3x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.0-rc.3  |       4812.56 ± 105.79 ms | 2.5x       | 5.17 MB | not found | 12.59 MB   |


<!-- BENCHMARK_END -->
