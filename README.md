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

### Ubuntu Latest (updated 2026-09-13)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        625.80 ±  34.00 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.8   |       1141.28 ±  40.39 ms | 1.8x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       1257.27 ±  32.77 ms | 2.0x       | 5.68 MB | 38 B      | 14.23 MB   |
| vite     | 8.3.0   |       1604.67 ±  23.17 ms | 2.6x       | 4.98 MB | 1 B       | 12.86 MB   |
| rspack   | 2.2.3   |       2657.90 ±  43.58 ms | 4.2x       | 4.95 MB | not found | 12.22 MB   |
| rsbuild  | 2.2.5   |       3085.34 ±  30.06 ms | 4.9x       | 4.95 MB | not found | 12.05 MB   |
| rollup   | 4.63.1  |      38432.81 ± 141.53 ms | 61.4x      | 5.11 MB | not found | 12.44 MB   |


### macOS Latest (updated 2026-09-13)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |        560.38 ±  88.10 ms | 1.0x       | 4.95 MB | not found | 12.37 MB   |
| rolldown | 1.2.8   |       1092.83 ± 195.69 ms | 2.0x       | 5.00 MB | not found | 13.03 MB   |
| esbuild  | 0.28.2  |       1330.85 ± 183.24 ms | 2.4x       | 5.68 MB | 38 B      | 14.23 MB   |
| vite     | 8.3.0   |       2557.35 ± 276.23 ms | 4.6x       | 4.98 MB | 1 B       | 12.86 MB   |
| rsbuild  | 2.2.5   |       4730.80 ± 539.34 ms | 8.4x       | 4.95 MB | not found | 12.05 MB   |
| rspack   | 2.2.3   |      4912.67 ± 1173.41 ms | 8.8x       | 4.95 MB | not found | 12.22 MB   |
| rollup   | 4.63.1  |     45273.01 ± 7111.74 ms | 80.8x      | 5.11 MB | not found | 12.44 MB   |


### Windows Latest (updated 2026-09-13)

| Tool     | Version | Time (mean ± σ)           | Comparison | JS      | CSS       | Sourcemaps |
| -------- | ------- | ------------------------: | ---------- | ------- | --------- | ---------- |
| bun      | 1.4.2   |       2001.61 ±  33.64 ms | 1.0x       | 4.95 MB | not found | 12.79 MB   |
| rolldown | 1.2.8   |       2530.23 ± 133.80 ms | 1.3x       | 5.00 MB | not found | 13.45 MB   |
| esbuild  | 0.28.2  |       3311.04 ±  81.61 ms | 1.7x       | 5.68 MB | 38 B      | 14.66 MB   |
| vite     | 8.3.0   |       3439.45 ±  93.87 ms | 1.7x       | 4.98 MB | 1 B       | 13.28 MB   |
| rspack   | 2.2.3   |       5245.02 ±  47.90 ms | 2.6x       | 4.95 MB | not found | 12.64 MB   |
| rsbuild  | 2.2.5   |       5708.40 ±  35.83 ms | 2.9x       | 4.95 MB | not found | 12.47 MB   |
| rollup   | 4.63.1  |   146327.38 ± 10239.75 ms | 73.1x      | 5.11 MB | not found | 12.81 MB   |


<!-- BENCHMARK_END -->
