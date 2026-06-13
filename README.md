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

### Ubuntu Latest (updated 2026-06-13)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        701.80 ±  14.50 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.1.0   |       1390.49 ±  17.94 ms | 2.0x       | 5.22 MB | not found | 13.10 MB   |
| esbuild  | 0.28.1  |       1394.51 ±  25.23 ms | 2.0x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.16  |       2111.45 ±  22.79 ms | 3.0x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.6   |       3311.32 ±  36.96 ms | 4.7x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.11  |       3813.29 ±  32.25 ms | 5.4x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.61.1  |      53162.77 ± 233.01 ms | 75.8x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-06-13)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        939.84 ±  86.30 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.1  |       1585.89 ± 183.08 ms | 1.7x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.1.0   |       1936.87 ± 299.14 ms | 2.1x       | 5.22 MB | not found | 13.10 MB   |
| vite     | 8.0.16  |       2170.48 ± 258.47 ms | 2.3x       | 5.20 MB | 1 B       | 12.79 MB   |
| rsbuild  | 2.0.11  |       3619.67 ± 580.89 ms | 3.9x       | 5.17 MB | not found | 12.17 MB   |
| rspack   | 2.0.6   |       3660.26 ± 267.28 ms | 3.9x       | 5.17 MB | not found | 12.34 MB   |
| rollup   | 4.61.1  |     42452.92 ± 4327.78 ms | 45.2x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-06-13)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.1.0   |       2391.42 ±  74.44 ms | 1.0x       | 5.22 MB | not found | 13.52 MB   |
| esbuild  | 0.28.1  |       2419.36 ±  31.25 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.14  |       3229.26 ±  67.80 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.16  |       3406.16 ±  50.18 ms | 1.4x       | 5.20 MB | 1 B       | 13.21 MB   |
| rspack   | 2.0.6   |       5219.48 ±  50.40 ms | 2.2x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.11  |       5800.70 ±  90.85 ms | 2.4x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.61.1  |   143861.61 ± 13023.17 ms | 60.2x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
