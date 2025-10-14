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

### Ubuntu Latest (updated 2025-10-14)

| Tool     | Time (mean ± σ)           | JS      | CSS       | Sourcemaps |
| -------- | ------------------------: | ------- | --------- | ---------- |
| rspack   |    4263.51 ms ±  30.93 ms | 5.18 MB | not found | 12.34 MB   |
| rolldown |    1559.23 ms ±  24.53 ms | 5.28 MB | 37 B      | 13.00 MB   |
| vite     |    1956.20 ms ±  47.11 ms | 5.28 MB | 1 B       | not found  |
| rsbuild  |    4235.99 ms ±  37.99 ms | 5.78 MB | not found | 12.59 MB   |
| esbuild  |    1531.96 ms ±  32.36 ms | 5.90 MB | 38 B      | 14.35 MB   |


### macOS Latest (updated 2025-10-14)

| Tool     | Time (mean ± σ)           | JS      | CSS       | Sourcemaps |
| -------- | ------------------------: | ------- | --------- | ---------- |
| rspack   |   8252.72 ms ± 1329.09 ms | 5.18 MB | not found | 12.34 MB   |
| rolldown |    2193.41 ms ± 446.49 ms | 5.28 MB | 37 B      | 13.00 MB   |
| vite     |    2503.83 ms ± 246.69 ms | 5.28 MB | 1 B       | not found  |
| rsbuild  |    7911.85 ms ± 961.56 ms | 5.78 MB | not found | 12.59 MB   |
| esbuild  |    1723.67 ms ± 193.15 ms | 5.90 MB | 38 B      | 14.35 MB   |


### Windows Latest (updated 2025-10-14)

| Tool     | Time (mean ± σ)           | JS      | CSS       | Sourcemaps |
| -------- | ------------------------: | ------- | --------- | ---------- |
| rspack   |    6575.28 ms ± 361.24 ms | 5.18 MB | not found | 12.76 MB   |
| rolldown |    2586.61 ms ± 191.38 ms | 5.28 MB | 37 B      | 13.42 MB   |
| vite     |    3528.47 ms ±  32.49 ms | 5.28 MB | 1 B       | not found  |
| rsbuild  |    6396.46 ms ± 249.30 ms | 5.78 MB | not found | 13.01 MB   |
| esbuild  |    3034.16 ms ± 456.88 ms | 5.90 MB | 38 B      | 14.77 MB   |


<!-- BENCHMARK_END -->
