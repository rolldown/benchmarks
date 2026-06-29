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

### Ubuntu Latest (updated 2026-06-29)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        737.55 ±  13.83 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.1.3   |       1354.77 ±  15.85 ms | 1.8x       | 5.22 MB | not found | 13.10 MB   |
| esbuild  | 0.28.1  |       1430.49 ±  20.34 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.0   |       1963.93 ±  23.36 ms | 2.7x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.0   |       3069.05 ±  31.38 ms | 4.2x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.0   |       3440.42 ±  55.12 ms | 4.7x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |      53116.97 ± 335.54 ms | 72.0x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-06-29)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        503.50 ± 162.89 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.1.3   |        874.07 ± 244.44 ms | 1.7x       | 5.22 MB | not found | 13.10 MB   |
| esbuild  | 0.28.1  |       1196.50 ± 337.19 ms | 2.4x       | 5.90 MB | 38 B      | 14.34 MB   |
| rspack   | 2.1.0   |      4254.38 ± 2097.17 ms | 8.4x       | 5.17 MB | not found | 12.34 MB   |
| vite     | 8.1.0   |       5174.53 ± 953.32 ms | 10.3x      | 5.20 MB | 1 B       | 12.93 MB   |
| rsbuild  | 2.1.0   |      9476.22 ± 1896.48 ms | 18.8x      | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |     33373.34 ± 8247.98 ms | 66.3x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-06-29)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.1.3   |       2693.82 ±  23.27 ms | 1.0x       | 5.22 MB | not found | 13.52 MB   |
| esbuild  | 0.28.1  |       2850.87 ±  43.77 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| vite     | 8.1.0   |       3169.69 ± 108.70 ms | 1.2x       | 5.20 MB | 1 B       | 13.35 MB   |
| bun      | 1.3.14  |       3823.96 ± 132.27 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| rspack   | 2.1.0   |       5183.77 ± 289.44 ms | 1.9x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.0   |       5367.75 ± 240.79 ms | 2.0x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.2  |    119221.75 ± 8678.77 ms | 44.3x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
