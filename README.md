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

### Ubuntu Latest (updated 2026-06-16)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        776.86 ±  34.09 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.1  |       1445.36 ±  18.75 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.1.1   |       1452.35 ±  19.45 ms | 1.9x       | 5.22 MB | not found | 13.10 MB   |
| vite     | 8.0.16  |       2092.08 ±  26.06 ms | 2.7x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.8   |       3369.77 ±  78.76 ms | 4.3x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.13  |       3785.49 ±  52.65 ms | 4.9x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.0  |      54411.45 ± 658.46 ms | 70.0x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-06-16)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        398.93 ±  22.86 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.1  |        894.21 ±  75.18 ms | 2.2x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.1.1   |        897.93 ± 123.42 ms | 2.3x       | 5.22 MB | not found | 13.10 MB   |
| vite     | 8.0.16  |       1365.37 ± 217.53 ms | 3.4x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.8   |       3134.27 ± 685.05 ms | 7.9x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.13  |      3687.51 ± 1029.00 ms | 9.2x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.0  |      24142.81 ± 766.75 ms | 60.5x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-06-16)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| esbuild  | 0.28.1  |       2469.05 ±  31.37 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.1.1   |       2810.37 ± 581.94 ms | 1.1x       | 5.22 MB | not found | 13.52 MB   |
| bun      | 1.3.14  |       3155.75 ±  20.48 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.16  |       3660.58 ± 421.60 ms | 1.5x       | 5.20 MB | 1 B       | 13.21 MB   |
| rsbuild  | 2.0.13  |       5915.02 ± 129.09 ms | 2.4x       | 5.17 MB | not found | 12.59 MB   |
| rspack   | 2.0.8   |       5938.61 ± 392.92 ms | 2.4x       | 5.17 MB | not found | 12.76 MB   |
| rollup   | 4.62.0  |   125584.39 ± 10356.67 ms | 50.9x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
