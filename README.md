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

### Ubuntu Latest (updated 2026-02-18)

| Tool     | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.9         |        758.00 ±   4.62 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.27.3        |       1510.80 ±  24.88 ms | 2.0x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.0-rc.5    |       1707.44 ±  28.54 ms | 2.3x       | 5.22 MB | 37 B      | 12.91 MB   |
| vite     | 8.0.0-beta.14 |       2332.64 ±  19.34 ms | 3.1x       | 5.20 MB | 1 B       | 12.69 MB   |
| rspack   | 1.7.6         |       4163.87 ±  44.48 ms | 5.5x       | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 1.7.3         |       4274.43 ±  47.49 ms | 5.6x       | 5.70 MB | not found | 12.46 MB   |


### macOS Latest (updated 2026-02-18)

| Tool     | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.9         |        543.35 ±  52.14 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.27.3        |       1394.15 ± 249.29 ms | 2.6x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.0-rc.5    |       1669.82 ± 222.96 ms | 3.1x       | 5.22 MB | 37 B      | 12.91 MB   |
| vite     | 8.0.0-beta.14 |       2918.85 ± 146.96 ms | 5.4x       | 5.20 MB | 1 B       | 12.69 MB   |
| rspack   | 1.7.6         |      5778.05 ± 2142.56 ms | 10.6x      | 5.18 MB | not found | 12.34 MB   |
| rsbuild  | 1.7.3         |       7306.69 ± 858.42 ms | 13.4x      | 5.70 MB | not found | 12.46 MB   |


### Windows Latest (updated 2026-02-18)

| Tool     | Version       | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.9         |       2244.12 ±  88.28 ms | 1.0x       | 5.34 MB | not found | 13.11 MB   |
| esbuild  | 0.27.3        |       2337.52 ±  70.57 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.0-rc.5    |       2523.28 ±  41.52 ms | 1.1x       | 5.22 MB | 37 B      | 13.33 MB   |
| vite     | 8.0.0-beta.14 |       3406.19 ±  49.08 ms | 1.5x       | 5.20 MB | 1 B       | 13.11 MB   |
| rsbuild  | 1.7.3         |       5478.79 ± 373.99 ms | 2.4x       | 5.70 MB | not found | 12.88 MB   |
| rspack   | 1.7.6         |       5847.83 ± 353.54 ms | 2.6x       | 5.18 MB | not found | 12.76 MB   |


<!-- BENCHMARK_END -->
