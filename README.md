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

### Ubuntu Latest (updated 2026-05-25)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        747.01 ±  12.44 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| rolldown | 1.0.2   |       1454.34 ±  19.96 ms | 1.9x       | 5.22 MB | not found | 12.96 MB   |
| esbuild  | 0.28.0  |       1461.75 ±   5.26 ms | 2.0x       | 5.90 MB | 38 B      | 14.34 MB   |
| vite     | 8.0.14  |       2118.21 ±  21.40 ms | 2.8x       | 5.20 MB | 1 B       | 12.79 MB   |
| rspack   | 2.0.4   |       3408.02 ±  87.17 ms | 4.6x       | 5.17 MB | not found | 12.34 MB   |
| rsbuild  | 2.0.7   |       3938.68 ±  65.33 ms | 5.3x       | 5.17 MB | not found | 12.17 MB   |
| rollup   | 4.60.4  |      54317.54 ± 603.54 ms | 72.7x      | 5.33 MB | not found | 12.55 MB   |


### macOS Latest (updated 2026-05-25)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.3.14  |        425.95 ±  75.00 ms | 1.0x       | 5.34 MB | not found | 12.56 MB   |
| esbuild  | 0.28.0  |        902.94 ±  64.80 ms | 2.1x       | 5.90 MB | 38 B      | 14.34 MB   |
| rolldown | 1.0.2   |        921.80 ± 211.76 ms | 2.2x       | 5.22 MB | not found | 12.96 MB   |
| vite     | 8.0.14  |       1331.04 ± 206.16 ms | 3.1x       | 5.20 MB | 1 B       | 12.79 MB   |
| rsbuild  | 2.0.7   |       3377.80 ± 558.51 ms | 7.9x       | 5.17 MB | not found | 12.17 MB   |
| rspack   | 2.0.4   |       3636.25 ± 684.98 ms | 8.5x       | 5.17 MB | not found | 12.34 MB   |
| rollup   | 4.60.4  |     28756.90 ± 3882.10 ms | 67.5x      | 5.33 MB | not found | 12.55 MB   |


### Windows Latest (updated 2026-05-25)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| esbuild  | 0.28.0  |       2468.21 ±  41.87 ms | 1.0x       | 5.90 MB | 38 B      | 14.77 MB   |
| rolldown | 1.0.2   |       2545.44 ±  21.43 ms | 1.0x       | 5.22 MB | not found | 13.38 MB   |
| bun      | 1.3.14  |       3224.38 ± 128.12 ms | 1.3x       | 5.34 MB | not found | 13.11 MB   |
| vite     | 8.0.14  |       3564.53 ± 218.37 ms | 1.4x       | 5.20 MB | 1 B       | 13.21 MB   |
| rspack   | 2.0.4   |       5472.59 ± 523.48 ms | 2.2x       | 5.17 MB | not found | 12.76 MB   |
| rsbuild  | 2.0.7   |       6027.78 ± 494.25 ms | 2.4x       | 5.17 MB | not found | 12.59 MB   |
| rollup   | 4.60.4  |   140466.66 ± 15463.70 ms | 56.9x      | 5.33 MB | not found | 12.92 MB   |


<!-- BENCHMARK_END -->
