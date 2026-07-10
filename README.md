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

### Ubuntu Latest (updated 2026-07-10)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        709.95 ±  13.89 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.1.5   |       1259.14 ±  15.71 ms | 1.8x       | 5.22 MB | not found | 13.10 MB   |
| esbuild  | 0.28.1  |       1362.84 ±  22.38 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.3   |       1857.91 ±  18.47 ms | 2.6x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.3   |       3107.95 ±  61.63 ms | 4.4x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.5   |       3431.95 ±  29.33 ms | 4.8x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |      47792.28 ± 310.86 ms | 67.3x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-07-10)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        513.00 ±  28.43 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.1  |       1111.28 ± 123.75 ms | 2.2x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.3   |       1233.56 ± 105.58 ms | 2.4x       | 5.20 MB | 1 B       | 12.93 MB   |
| rolldown | 1.1.5   |       1495.69 ± 292.05 ms | 2.9x       | 5.22 MB | not found | 13.10 MB   |
| rsbuild  | 2.1.5   |       2563.77 ± 224.39 ms | 5.0x       | 5.17 MB | not found | 12.17 MB   |
| rspack   | 2.1.3   |       3365.41 ± 561.55 ms | 6.6x       | 5.17 MB | not found | 12.34 MB   |
| rollup   | 4.62.2  |     36138.52 ± 5717.25 ms | 70.4x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-07-10)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.1.5   |       1830.62 ±  47.19 ms | 1.0x       | 5.22 MB | not found | 13.53 MB   |
| esbuild  | 0.28.1  |       2021.75 ± 175.64 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| vite     | 8.1.3   |       2528.77 ±  68.70 ms | 1.4x       | 5.20 MB | 1 B       | 13.36 MB   |
| bun      | 1.3.14  |       2939.51 ±  87.26 ms | 1.6x       | 5.34 MB | not found | 13.11 MB   |
| rspack   | 2.1.3   |       3672.86 ±  64.00 ms | 2.0x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.5   |       4068.95 ±  58.15 ms | 2.2x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.2  |     81356.86 ± 2913.85 ms | 44.4x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
