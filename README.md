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

| Tool          | Version       | Time (mean ± σ)           | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ------- | --------- | ---------- |
| rspack        | 1.5.8         |    4444.62 ms ± 104.88 ms | 5.18 MB | not found | 12.34 MB   |
| rolldown      | 1.0.0-beta.43 |    1614.31 ms ±  17.55 ms | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.1.16        |    2029.24 ms ±  24.44 ms | 5.28 MB | 1 B       | 12.79 MB   |
| rsbuild       | 1.5.17        |    4258.14 ms ±  38.17 ms | 5.78 MB | not found | 12.59 MB   |
| esbuild       | 0.25.10       |    1578.98 ms ±  25.93 ms | 5.90 MB | 38 B      | 14.35 MB   |


### macOS Latest (updated 2025-10-14)

| Tool          | Version       | Time (mean ± σ)           | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ------- | --------- | ---------- |
| rspack        | 1.5.8         |   8361.08 ms ± 1316.61 ms | 5.18 MB | not found | 12.34 MB   |
| rolldown      | 1.0.0-beta.43 |    2290.39 ms ± 330.40 ms | 5.28 MB | 37 B      | 13.00 MB   |
| rolldown-vite | 7.1.16        |    2509.23 ms ± 260.93 ms | 5.28 MB | 1 B       | 12.79 MB   |
| rsbuild       | 1.5.17        |    7277.84 ms ± 808.83 ms | 5.78 MB | not found | 12.59 MB   |
| esbuild       | 0.25.10       |    1796.70 ms ± 249.36 ms | 5.90 MB | 38 B      | 14.35 MB   |


### Windows Latest (updated 2025-10-14)

| Tool          | Version       | Time (mean ± σ)           | JS      | CSS       | Sourcemaps |
| ------------- | ------------- | ------------------------: | ------- | --------- | ---------- |
| rspack        | 1.5.8         |    7029.30 ms ± 353.83 ms | 5.18 MB | not found | 12.76 MB   |
| rolldown      | 1.0.0-beta.43 |    2631.47 ms ± 192.47 ms | 5.28 MB | 37 B      | 13.42 MB   |
| rolldown-vite | 7.1.16        |    3694.41 ms ±  39.78 ms | 5.28 MB | 1 B       | 13.21 MB   |
| rsbuild       | 1.5.17        |    6550.40 ms ± 450.19 ms | 5.78 MB | not found | 13.01 MB   |
| esbuild       | 0.25.10       |    2957.60 ms ± 225.89 ms | 5.90 MB | 38 B      | 14.77 MB   |


<!-- BENCHMARK_END -->
