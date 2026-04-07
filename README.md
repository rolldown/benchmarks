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

### Ubuntu Latest (updated 2026-04-07)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.11      |        780.21 ±  23.79 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.13 |       1359.62 ±  17.04 ms | 1.7x       | 5.22 MB | not found | 12.91 MB   |
| esbuild  | 0.28.0      |       1392.63 ±  20.39 ms | 1.8x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.7       |       2029.03 ±  22.82 ms | 2.6x       | 5.20 MB | 1 B       | 12.74 MB   |
| rspack   | 2.0.0-rc.0  |       3598.99 ±  21.88 ms | 4.6x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.0-rc.0  |       3933.53 ±  22.60 ms | 5.0x       | 5.18 MB | not found | 12.17 MB   |


### macOS Latest (updated 2026-04-07)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.11      |        457.87 ±  14.13 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.13 |        818.48 ±  51.63 ms | 1.8x       | 5.22 MB | not found | 12.91 MB   |
| esbuild  | 0.28.0      |        886.40 ±  41.21 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.7       |       1735.76 ± 333.54 ms | 3.8x       | 5.20 MB | 1 B       | 12.74 MB   |
| rsbuild  | 2.0.0-rc.0  |       3480.92 ± 635.69 ms | 7.6x       | 5.18 MB | not found | 12.17 MB   |
| rspack   | 2.0.0-rc.0  |      3510.98 ± 1100.83 ms | 7.7x       | 5.18 MB | not found | 12.34 MB   |


### Windows Latest (updated 2026-04-07)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| esbuild  | 0.28.0      |       2567.91 ± 117.45 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.0-rc.13 |       2609.25 ±  81.57 ms | 1.0x       | 5.22 MB | not found | 13.33 MB   |
| bun      | 1.3.11      |       3308.93 ± 275.49 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.7       |       3788.99 ±  30.23 ms | 1.5x       | 5.20 MB | 1 B       | 13.16 MB   |
| rspack   | 2.0.0-rc.0  |       5862.99 ±  42.73 ms | 2.3x       | 5.18 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.0-rc.0  |       6209.19 ±  54.57 ms | 2.4x       | 5.18 MB | not found | 12.59 MB   |


<!-- BENCHMARK_END -->
