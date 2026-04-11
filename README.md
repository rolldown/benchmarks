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

### Ubuntu Latest (updated 2026-04-11)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.12      |        753.51 ±  11.28 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.15 |       1415.69 ±  15.26 ms | 1.9x       | 5.22 MB | not found | 12.91 MB   |
| esbuild  | 0.28.0      |       1430.57 ±  21.09 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.8       |       2111.30 ±  31.02 ms | 2.8x       | 5.20 MB | 1 B       | 12.74 MB   |
| rspack   | 2.0.0-rc.1  |       3737.02 ±  46.42 ms | 5.0x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.0-rc.2  |       3996.97 ±  29.65 ms | 5.3x       | 5.18 MB | not found | 12.17 MB   |


### macOS Latest (updated 2026-04-11)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.12      |        407.79 ±  32.96 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.15 |        809.93 ±  25.17 ms | 2.0x       | 5.22 MB | not found | 12.91 MB   |
| esbuild  | 0.28.0      |        870.89 ±  23.10 ms | 2.1x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.8       |       1695.17 ± 266.33 ms | 4.2x       | 5.20 MB | 1 B       | 12.74 MB   |
| rsbuild  | 2.0.0-rc.2  |       3370.37 ± 689.32 ms | 8.3x       | 5.18 MB | not found | 12.17 MB   |
| rspack   | 2.0.0-rc.1  |      3727.02 ± 1018.69 ms | 9.1x       | 5.18 MB | not found | 12.34 MB   |


### Windows Latest (updated 2026-04-11)

| Tool     | Version     | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ----------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| esbuild  | 0.28.0      |       2202.18 ±  48.60 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.0-rc.15 |       2212.86 ±  28.19 ms | 1.0x       | 5.22 MB | not found | 13.33 MB   |
| bun      | 1.3.12      |       3164.32 ±  99.81 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.8       |       3237.13 ±  31.06 ms | 1.5x       | 5.20 MB | 1 B       | 13.16 MB   |
| rspack   | 2.0.0-rc.1  |       4855.13 ±  37.60 ms | 2.2x       | 5.18 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.0-rc.2  |       5160.47 ±  50.31 ms | 2.3x       | 5.18 MB | not found | 12.59 MB   |


<!-- BENCHMARK_END -->
