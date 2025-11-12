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

### Ubuntu Latest (updated 2025-11-12)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rspack        | 1.6.1         |    4060.73 ms ±  62.82 ms | 5.3x       | 5.18 MB | not found | 12.34 MB   |
| rolldown      | 1.0.0-beta.48 |    1598.71 ms ±  26.01 ms | 2.1x       | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.2.2         |    2128.04 ms ±  28.25 ms | 2.8x       | 5.28 MB | 1 B       | 12.79 MB   |
| bun           | unknown       |     770.07 ms ±  51.25 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rsbuild       | 1.6.3         |    4187.91 ms ±  48.37 ms | 5.4x       | 5.78 MB | not found | 12.46 MB   |
| esbuild       | 0.27.0        |    1727.82 ms ±  26.39 ms | 2.2x       | 5.90 MB | 38 B      | 14.35 MB   |


### macOS Latest (updated 2025-11-12)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rspack        | 1.6.1         |   6149.30 ms ± 2918.33 ms | 7.9x       | 5.18 MB | not found | 12.34 MB   |
| rolldown      | 1.0.0-beta.48 |    2506.25 ms ± 317.12 ms | 3.2x       | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.2.2         |   2972.16 ms ± 1134.39 ms | 3.8x       | 5.28 MB | 1 B       | 12.79 MB   |
| bun           | unknown       |     777.39 ms ± 193.88 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rsbuild       | 1.6.3         |   6564.04 ms ± 3163.26 ms | 8.4x       | 5.78 MB | not found | 12.46 MB   |
| esbuild       | 0.27.0        |    2552.57 ms ± 672.69 ms | 3.3x       | 5.90 MB | 38 B      | 14.35 MB   |


### Windows Latest (updated 2025-11-12)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| rspack        | 1.6.1         |    5679.93 ms ±  49.02 ms | 2.5x       | 5.18 MB | not found | 12.76 MB   |
| rolldown      | 1.0.0-beta.48 |    2329.47 ms ±  25.12 ms | 1.0x       | 5.28 MB | 37 B      | 13.42 MB   |
| rolldown-vite | 7.2.2         |    3276.25 ms ±  28.63 ms | 1.5x       | 5.28 MB | 1 B       | 13.21 MB   |
| bun           | unknown       |    2235.02 ms ±  97.27 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| rsbuild       | 1.6.3         |    5861.14 ms ±  67.24 ms | 2.6x       | 5.78 MB | not found | 12.88 MB   |
| esbuild       | 0.27.0        |    2285.57 ms ±  41.19 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |


<!-- BENCHMARK_END -->
