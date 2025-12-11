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

### Ubuntu Latest (updated 2025-12-11)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.4         |        712.92 ±  37.44 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown      | 1.0.0-beta.54 |       1593.76 ±  25.08 ms | 2.2x       | 5.28 MB | 37 B      | 13.00 MB   |
| esbuild       | 0.27.1        |       1696.02 ±  34.20 ms | 2.4x       | 5.90 MB | 38 B      | 14.35 MB   |
| rolldown-vite | 7.2.10        |       2110.87 ±  25.22 ms | 3.0x       | 5.28 MB | 1 B       | 12.79 MB   |
| rspack        | 1.6.7         |       3929.60 ±  26.22 ms | 5.5x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild       | 1.6.14        |       4082.31 ±  21.99 ms | 5.7x       | 5.70 MB | not found | 12.46 MB   |


### macOS Latest (updated 2025-12-11)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.4         |        513.55 ±  15.21 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild       | 0.27.1        |       1169.95 ± 151.02 ms | 2.3x       | 5.90 MB | 38 B      | 14.35 MB   |
| rolldown      | 1.0.0-beta.54 |       1559.65 ± 356.08 ms | 3.0x       | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.2.10        |       2377.73 ± 430.59 ms | 4.6x       | 5.28 MB | 1 B       | 12.79 MB   |
| rspack        | 1.6.7         |       3426.93 ± 486.94 ms | 6.7x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild       | 1.6.14        |      4830.51 ± 2231.69 ms | 9.4x       | 5.70 MB | not found | 12.46 MB   |


### Windows Latest (updated 2025-12-11)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.4         |       2235.90 ±  75.93 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| esbuild       | 0.27.1        |       2584.65 ± 161.47 ms | 1.2x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown      | 1.0.0-beta.54 |       2827.24 ± 194.99 ms | 1.3x       | 5.28 MB | 37 B      | 13.42 MB   |
| rolldown-vite | 7.2.10        |       3664.06 ±  29.70 ms | 1.6x       | 5.28 MB | 1 B       | 13.21 MB   |
| rsbuild       | 1.6.14        |      7007.35 ± 1167.57 ms | 3.1x       | 5.70 MB | not found | 12.88 MB   |
| rspack        | 1.6.7         |       7172.12 ± 842.77 ms | 3.2x       | 5.18 MB | not found | 12.76 MB   |


<!-- BENCHMARK_END -->
