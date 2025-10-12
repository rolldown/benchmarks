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

All tools are configured to use a minimal configuration that enables minification and sourcemaps (or "production mode" if available) to simulate production usage.

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

### Results for `apps/10000` on 2025 13-inch MacBook Air M4, Node.js v24.4

```
$ hyperfine --warmup 1 --runs 3 \
    'node --run build:rolldown' \
    'node --run build:esbuild' \
    'node --run build:rspack'

Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     527.9 ms ±   3.0 ms    [User: 1236.1 ms, System: 782.1 ms]
  Range (min … max):   525.2 ms … 531.2 ms    3 runs

Benchmark 2: node --run build:esbuild
  Time (mean ± σ):     603.7 ms ±   8.5 ms    [User: 1565.9 ms, System: 891.5 ms]
  Range (min … max):   595.9 ms … 612.8 ms    3 runs

Benchmark 3: node --run build:rspack
  Time (mean ± σ):      1.648 s ±  0.029 s    [User: 4.274 s, System: 1.332 s]
  Range (min … max):    1.619 s …  1.676 s    3 runs

Summary
  node --run build:rolldown ran
    1.14 ± 0.02 times faster than node --run build:esbuild
    3.12 ± 0.06 times faster than node --run build:rspack
```
