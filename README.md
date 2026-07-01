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

### Ubuntu Latest (updated 2026-07-01)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        550.65 ±  10.40 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.1.4   |        989.83 ±  35.85 ms | 1.8x       | 5.22 MB | not found | 13.10 MB   |
| esbuild  | 0.28.1  |       1031.71 ±  21.92 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.1.0   |       1257.94 ±  10.98 ms | 2.3x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.1   |       2525.75 ±  45.59 ms | 4.6x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.1   |       2718.65 ±  35.74 ms | 4.9x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |      33148.52 ± 265.54 ms | 60.2x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-07-01)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        668.63 ± 131.10 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.1  |       1553.78 ± 168.63 ms | 2.3x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.1.4   |       1829.02 ± 488.29 ms | 2.7x       | 5.22 MB | not found | 13.10 MB   |
| vite     | 8.1.0   |       2185.27 ± 629.91 ms | 3.3x       | 5.20 MB | 1 B       | 12.93 MB   |
| rspack   | 2.1.1   |       3356.09 ± 484.46 ms | 5.0x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.1.1   |      4673.70 ± 1679.57 ms | 7.0x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.62.2  |     44581.96 ± 4901.72 ms | 66.7x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-07-01)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rolldown | 1.1.4   |       2129.29 ±  19.04 ms | 1.0x       | 5.22 MB | not found | 13.52 MB   |
| esbuild  | 0.28.1  |       2305.38 ±  47.93 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| bun      | 1.3.14  |       3036.83 ± 116.56 ms | 1.4x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.1.0   |       3528.53 ± 621.26 ms | 1.7x       | 5.20 MB | 1 B       | 13.35 MB   |
| rspack   | 2.1.1   |       4769.27 ± 118.73 ms | 2.2x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.1.1   |       5162.31 ± 268.10 ms | 2.4x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.62.2  |   133292.35 ± 10927.42 ms | 62.6x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
