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

### Ubuntu Latest (updated 2026-02-20)

| Tool     | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.9         |        751.68 ±  40.90 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.0-rc.5    |       1630.49 ±  27.54 ms | 2.2x       | 5.22 MB | 37 B      | 12.64 MB   |
| esbuild  | 0.27.3        |       1699.97 ±  34.70 ms | 2.3x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.0-beta.15 |       2176.53 ±  14.97 ms | 2.9x       | 5.20 MB | 1 B       | 12.74 MB   |
| rspack   | 1.7.6         |       3811.34 ±  19.52 ms | 5.1x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 1.7.3         |       3944.59 ±  55.35 ms | 5.2x       | 5.70 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-02-20)

| Tool     | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.9         |       1271.13 ±  99.44 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.27.3        |       2931.13 ± 313.81 ms | 2.3x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.0-rc.5    |       3668.56 ± 394.85 ms | 2.9x       | 5.22 MB | 37 B      | 12.64 MB   |
| vite     | 8.0.0-beta.15 |      4560.86 ± 1022.74 ms | 3.6x       | 5.20 MB | 1 B       | 12.74 MB   |
| rsbuild  | 1.7.3         |      9479.93 ± 1673.80 ms | 7.5x       | 5.70 MB | not found | 12.46 MB   |
| rspack   | 1.7.6         |     10051.87 ± 1957.58 ms | 7.9x       | 5.18 MB | not found | 12.34 MB   |


### Windows Latest (updated 2026-02-20)

| Tool     | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.9         |       2269.12 ±  82.97 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| esbuild  | 0.27.3        |       2512.01 ±  50.43 ms | 1.1x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.0-rc.5    |       2696.13 ±  32.09 ms | 1.2x       | 5.22 MB | 37 B      | 13.07 MB   |
| vite     | 8.0.0-beta.15 |       3835.28 ±  56.31 ms | 1.7x       | 5.20 MB | 1 B       | 13.16 MB   |
| rsbuild  | 1.7.3         |       5682.37 ±  58.20 ms | 2.5x       | 5.70 MB | not found | 12.88 MB   |
| rspack   | 1.7.6         |       5683.33 ±  34.37 ms | 2.5x       | 5.18 MB | not found | 12.76 MB   |


<!-- BENCHMARK_END -->
