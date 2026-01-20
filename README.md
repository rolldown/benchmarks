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

### Ubuntu Latest (updated 2026-01-20)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.6         |        690.21 ±   6.50 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild       | 0.27.2        |       1720.01 ±  34.93 ms | 2.5x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown      | 1.0.0-beta.60 |       1759.24 ±  26.22 ms | 2.5x       | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.3.1         |       2131.13 ±  30.60 ms | 3.1x       | 5.28 MB | 1 B       | 12.79 MB   |
| rspack        | 1.7.3         |       3939.58 ±  61.55 ms | 5.7x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild       | 1.7.2         |       4018.97 ±  38.17 ms | 5.8x       | 5.70 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-01-20)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.6         |        869.97 ±  57.25 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild       | 0.27.2        |       1621.41 ± 243.39 ms | 1.9x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown      | 1.0.0-beta.60 |       2762.98 ± 308.71 ms | 3.2x       | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.3.1         |       3900.00 ± 514.44 ms | 4.5x       | 5.28 MB | 1 B       | 12.79 MB   |
| rspack        | 1.7.3         |      8272.21 ± 1280.07 ms | 9.5x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild       | 1.7.2         |      8736.50 ± 1795.36 ms | 10.0x      | 5.70 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-01-20)

| Tool          | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun           | 1.3.6         |       2283.82 ±  92.37 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| esbuild       | 0.27.2        |       2518.04 ±  50.68 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown      | 1.0.0-beta.60 |       2744.17 ±  54.17 ms | 1.2x       | 5.28 MB | 37 B      | 13.42 MB   |
| rolldown-vite | 7.3.1         |       3729.02 ± 283.86 ms | 1.6x       | 5.28 MB | 1 B       | 13.21 MB   |
| rspack        | 1.7.3         |       5714.17 ±  64.44 ms | 2.5x       | 5.18 MB | not found | 12.76 MB   |
| rsbuild       | 1.7.2         |       5769.78 ± 288.28 ms | 2.5x       | 5.70 MB | not found | 12.88 MB   |


<!-- BENCHMARK_END -->
