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

### Ubuntu Latest (updated 2025-11-06)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rspack        | 1.6.1         |    3911.99 ms ±  24.30 ms | 2.5x       | 5.18 MB | not found | 12.34 MB   |
| rolldown      | 1.0.0-beta.47 |    1565.07 ms ±  28.44 ms | 1.0x       | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.2.1         |    2102.00 ms ±  24.34 ms | 1.4x       | 5.28 MB | 1 B       | 12.79 MB   |
| rsbuild       | 1.6.2         |    4179.52 ms ±  28.87 ms | 2.7x       | 5.78 MB | not found | 12.46 MB   |
| esbuild       | 0.25.12       |    1534.46 ms ±  32.34 ms | 1.0x       | 5.90 MB | 38 B      | 14.35 MB   |


### macOS Latest (updated 2025-11-06)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rspack        | 1.6.1         |   5884.31 ms ± 1307.06 ms | 5.1x       | 5.18 MB | not found | 12.34 MB   |
| rolldown      | 1.0.0-beta.47 |    1473.88 ms ± 536.13 ms | 1.3x       | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.2.1         |    2658.00 ms ± 161.93 ms | 2.3x       | 5.28 MB | 1 B       | 12.79 MB   |
| rsbuild       | 1.6.2         |    6677.75 ms ± 751.10 ms | 5.7x       | 5.78 MB | not found | 12.46 MB   |
| esbuild       | 0.25.12       |    1162.83 ms ± 123.22 ms | 1.0x       | 5.90 MB | 38 B      | 14.35 MB   |


### Windows Latest (updated 2025-11-06)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rspack        | 1.6.1         |    6044.73 ms ± 164.96 ms | 2.3x       | 5.18 MB | not found | 12.76 MB   |
| rolldown      | 1.0.0-beta.47 |    2578.75 ms ± 109.69 ms | 1.0x       | 5.28 MB | 37 B      | 13.42 MB   |
| rolldown-vite | 7.2.1         |    3641.21 ms ±  63.79 ms | 1.4x       | 5.28 MB | 1 B       | 13.21 MB   |
| rsbuild       | 1.6.2         |    6323.62 ms ± 278.05 ms | 2.5x       | 5.78 MB | not found | 12.88 MB   |
| esbuild       | 0.25.12       |    3258.52 ms ± 271.90 ms | 1.3x       | 5.90 MB | 38 B      | 14.77 MB   |


<!-- BENCHMARK_END -->
