> [!note]
> **Environment (unless otherwise noted)**  
> - OS: Linux Ubuntu 22.04 LTS  
> - CPU: (32) x64 AMD Ryzen 9 5950X 16-Core Processor  
> - Memory: 64 GB  

# Build without minify & sourcemap

> [!note]
> command
>```
> hyperfine --warmup 1 --runs 3 'node --run build:rolldown' 'node --run build:rspack' 'node --run build:esbuild' 'node --run build:rollup'
>```

## apps/1000
```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     181.5 ms ±  15.4 ms    [User: 433.9 ms, System: 234.5 ms]
  Range (min … max):   163.9 ms … 192.1 ms    3 runs
 
Benchmark 2: node --run build:rspack
  Time (mean ± σ):     594.3 ms ±  11.4 ms    [User: 1656.7 ms, System: 715.0 ms]
  Range (min … max):   585.2 ms … 607.0 ms    3 runs
 
Benchmark 3: node --run build:esbuild
  Time (mean ± σ):     274.8 ms ±   7.5 ms    [User: 35.8 ms, System: 14.6 ms]
  Range (min … max):   269.2 ms … 283.4 ms    3 runs
 
Benchmark 4: node --run build:rollup
  Time (mean ± σ):      3.680 s ±  0.078 s    [User: 5.685 s, System: 2.326 s]
  Range (min … max):    3.598 s …  3.753 s    3 runs
 
Summary
  'node --run build:rolldown' ran
    1.51 ± 0.13 times faster than 'node --run build:esbuild'
    3.27 ± 0.28 times faster than 'node --run build:rspack'
   20.27 ± 1.77 times faster than 'node --run build:rollup'
```

Result on 2024 Mac Mini, M4 / 16GB (4 perf cores)

```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     176.5 ms ±   3.9 ms    [User: 214.2 ms, System: 173.7 ms]
  Range (min … max):   173.6 ms … 181.0 ms    3 runs

Benchmark 2: node --run build:rspack
  Time (mean ± σ):     396.7 ms ±   4.1 ms    [User: 676.6 ms, System: 407.1 ms]
  Range (min … max):   392.1 ms … 399.8 ms    3 runs

Benchmark 3: node --run build:esbuild
  Time (mean ± σ):     190.2 ms ±   3.0 ms    [User: 53.9 ms, System: 20.0 ms]
  Range (min … max):   187.2 ms … 193.3 ms    3 runs

Benchmark 4: node --run build:rollup
  Time (mean ± σ):      2.176 s ±  0.034 s    [User: 3.082 s, System: 1.809 s]
  Range (min … max):    2.152 s …  2.214 s    3 runs

Summary
  node --run build:rolldown ran
    1.08 ± 0.03 times faster than node --run build:esbuild
    2.25 ± 0.05 times faster than node --run build:rspack
   12.32 ± 0.33 times faster than node --run build:rollup
```

Result on 2023 Macbook Pro, M2 Pro / 32GB (8 perf cores)

```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     209.5 ms ±   2.0 ms    [User: 264.9 ms, System: 330.0 ms]
  Range (min … max):   207.7 ms … 211.6 ms    3 runs

Benchmark 2: node --run build:rspack
  Time (mean ± σ):     514.4 ms ±  88.6 ms    [User: 818.6 ms, System: 1126.7 ms]
  Range (min … max):   455.2 ms … 616.3 ms    3 runs

Benchmark 3: node --run build:esbuild
  Time (mean ± σ):     229.6 ms ±   4.3 ms    [User: 75.2 ms, System: 12.8 ms]
  Range (min … max):   225.1 ms … 233.7 ms    3 runs

Benchmark 4: node --run build:rollup
  Time (mean ± σ):      2.749 s ±  0.057 s    [User: 3.787 s, System: 2.384 s]
  Range (min … max):    2.708 s …  2.814 s    3 runs

Summary
  node --run build:rolldown ran
    1.10 ± 0.02 times faster than node --run build:esbuild
    2.46 ± 0.42 times faster than node --run build:rspack
   13.12 ± 0.30 times faster than node --run build:rollup
```

## apps/3000

```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     263.8 ms ±   7.7 ms    [User: 731.7 ms, System: 375.0 ms]
  Range (min … max):   255.1 ms … 269.6 ms    3 runs
 
Benchmark 2: node --run build:rspack
  Time (mean ± σ):      1.023 s ±  0.029 s    [User: 3.237 s, System: 1.277 s]
  Range (min … max):    0.999 s …  1.055 s    3 runs
 
Benchmark 3: node --run build:esbuild
  Time (mean ± σ):     465.8 ms ±  31.6 ms    [User: 34.5 ms, System: 15.5 ms]
  Range (min … max):   443.4 ms … 501.9 ms    3 runs
 
Benchmark 4: node --run build:rollup
  Time (mean ± σ):      6.830 s ±  0.049 s    [User: 10.481 s, System: 4.737 s]
  Range (min … max):    6.780 s …  6.878 s    3 runs
 
Summary
  'node --run build:rolldown' ran
    1.77 ± 0.13 times faster than 'node --run build:esbuild'
    3.88 ± 0.16 times faster than 'node --run build:rspack'
   25.89 ± 0.78 times faster than 'node --run build:rollup'
```

## apps/5000

```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     388.3 ms ±  12.0 ms    [User: 1156.6 ms, System: 604.9 ms]
  Range (min … max):   381.0 ms … 402.1 ms    3 runs
 
  Warning: The first benchmarking run for this command was significantly slower than the rest (402.1 ms). This could be caused by (filesystem) caches that were not filled until after the firs
t run. You should consider using the '--warmup' option to fill those caches before the actual benchmark. Alternatively, use the '--prepare' option to clear the caches before each timing run.
 
Benchmark 2: node --run build:rspack
  Time (mean ± σ):      1.559 s ±  0.043 s    [User: 5.282 s, System: 2.086 s]
  Range (min … max):    1.513 s …  1.599 s    3 runs
 
Benchmark 3: node --run build:esbuild
  Time (mean ± σ):     763.0 ms ±  16.1 ms    [User: 34.6 ms, System: 15.9 ms]
  Range (min … max):   748.2 ms … 780.1 ms    3 runs
 
Benchmark 4: node --run build:rollup
  Time (mean ± σ):     11.263 s ±  0.199 s    [User: 16.222 s, System: 7.561 s]
  Range (min … max):   11.078 s … 11.474 s    3 runs
 
Summary
  'node --run build:rolldown' ran
    1.96 ± 0.07 times faster than 'node --run build:esbuild'
    4.01 ± 0.17 times faster than 'node --run build:rspack'
   29.01 ± 1.03 times faster than 'node --run build:rollup'
```


## apps/10000
```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     746.9 ms ±  16.7 ms    [User: 2261.5 ms, System: 1111.9 ms]
  Range (min … max):   727.8 ms … 758.1 ms    3 runs
 
Benchmark 2: node --run build:rspack
  Time (mean ± σ):      3.075 s ±  0.057 s    [User: 10.166 s, System: 3.917 s]
  Range (min … max):    3.021 s …  3.135 s    3 runs
 
Benchmark 3: node --run build:esbuild
  Time (mean ± σ):      1.325 s ±  0.071 s    [User: 0.035 s, System: 0.017 s]
  Range (min … max):    1.244 s …  1.377 s    3 runs
 
Benchmark 4: node --run build:rollup
  Time (mean ± σ):     26.228 s ±  0.180 s    [User: 33.918 s, System: 16.764 s]
  Range (min … max):   26.020 s … 26.332 s    3 runs
 
  Warning: Statistical outliers were detected. Consider re-running this benchmark on a quiet PC without any interferences from other programs. It might help to use the '--warmup' or '--prepar
e' options.
 
Summary
  'node --run build:rolldown' ran
    1.77 ± 0.10 times faster than 'node --run build:esbuild'
    4.12 ± 0.12 times faster than 'node --run build:rspack'
   35.11 ± 0.82 times faster than 'node --run build:rollup'
```

## apps/three10x
```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     320.0 ms ±   9.9 ms    [User: 1350.4 ms, System: 437.0 ms]
  Range (min … max):   311.0 ms … 330.6 ms    3 runs
 
Benchmark 2: node --run build:rspack
  Time (mean ± σ):      1.470 s ±  0.012 s    [User: 3.954 s, System: 0.906 s]
  Range (min … max):    1.460 s …  1.483 s    3 runs
 
Benchmark 3: node --run build:esbuild
  Time (mean ± σ):     276.1 ms ±   9.4 ms    [User: 36.6 ms, System: 13.6 ms]
  Range (min … max):   266.5 ms … 285.2 ms    3 runs
 
Benchmark 4: node --run build:rollup
  Time (mean ± σ):      8.340 s ±  0.179 s    [User: 12.755 s, System: 3.493 s]
  Range (min … max):    8.139 s …  8.479 s    3 runs
 
Summary
  'node --run build:esbuild' ran
    1.16 ± 0.05 times faster than 'node --run build:rolldown'
    5.33 ± 0.19 times faster than 'node --run build:rspack'
   30.21 ± 1.21 times faster than 'node --run build:rollup'
```

Result on 2024 Mac Mini, M4 / 16GB (4 perf cores)

```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     261.1 ms ±   1.9 ms    [User: 611.9 ms, System: 217.4 ms]
  Range (min … max):   259.0 ms … 262.6 ms    3 runs

Benchmark 2: node --run build:rspack
  Time (mean ± σ):     835.1 ms ±   9.6 ms    [User: 1878.5 ms, System: 383.9 ms]
  Range (min … max):   827.8 ms … 846.1 ms    3 runs

Benchmark 3: node --run build:esbuild
  Time (mean ± σ):     268.8 ms ±   4.1 ms    [User: 54.2 ms, System: 16.4 ms]
  Range (min … max):   264.3 ms … 272.4 ms    3 runs

Benchmark 4: node --run build:rollup
  Time (mean ± σ):      4.387 s ±  0.015 s    [User: 6.156 s, System: 2.340 s]
  Range (min … max):    4.374 s …  4.403 s    3 runs

Summary
  node --run build:rolldown ran
    1.03 ± 0.02 times faster than node --run build:esbuild
    3.20 ± 0.04 times faster than node --run build:rspack
   16.80 ± 0.13 times faster than node --run build:rollup
```

Result on 2023 Macbook Pro, M2 Pro / 32GB (8 perf cores)

```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     293.6 ms ±   2.2 ms    [User: 679.8 ms, System: 346.3 ms]
  Range (min … max):   292.2 ms … 296.2 ms    3 runs

Benchmark 2: node --run build:rspack
  Time (mean ± σ):     984.5 ms ±  18.5 ms    [User: 2157.8 ms, System: 534.0 ms]
  Range (min … max):   964.8 ms … 1001.5 ms    3 runs

Benchmark 3: node --run build:esbuild
  Time (mean ± σ):     305.3 ms ±   3.7 ms    [User: 75.4 ms, System: 13.8 ms]
  Range (min … max):   303.0 ms … 309.6 ms    3 runs

Benchmark 4: node --run build:rollup
  Time (mean ± σ):      5.460 s ±  0.011 s    [User: 7.594 s, System: 3.111 s]
  Range (min … max):    5.452 s …  5.472 s    3 runs

Summary
  node --run build:rolldown ran
    1.04 ± 0.01 times faster than node --run build:esbuild
    3.35 ± 0.07 times faster than node --run build:rspack
   18.59 ± 0.15 times faster than node --run build:rollup
```

# Build with swc minify & sourcemap

> [!note]
> command
>```
> hyperfine --warmup 1 --runs 3 'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown' 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack' 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'
> ```
## apps/1000
```bash

Benchmark 1: MINIFY=1 SOURCE_MAP=1 node --run build:rolldown
  Time (mean ± σ):     558.1 ms ±   6.8 ms    [User: 1196.6 ms, System: 388.1 ms]
  Range (min … max):   551.3 ms … 564.8 ms    3 runs
 
Benchmark 2: MINIFY=1 SOURCE_MAP=1 node --run build:rspack
  Time (mean ± σ):     739.8 ms ±  16.4 ms    [User: 2054.5 ms, System: 773.7 ms]
  Range (min … max):   728.7 ms … 758.6 ms    3 runs
 
Benchmark 3: MINIFY=1 SOURCE_MAP=1 node --run build:rollup
  Time (mean ± σ):      4.686 s ±  0.086 s    [User: 7.314 s, System: 2.694 s]
  Range (min … max):    4.597 s …  4.768 s    3 runs
 
Summary
  'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown' ran
    1.33 ± 0.03 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack'
    8.40 ± 0.18 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'

```
## apps/3000

```bash
Benchmark 1: MINIFY=1 SOURCE_MAP=1 node --run build:rolldown
  Time (mean ± σ):      1.034 s ±  0.024 s    [User: 2.110 s, System: 0.617 s]
  Range (min … max):    1.007 s …  1.052 s    3 runs
 
Benchmark 2: MINIFY=1 SOURCE_MAP=1 node --run build:rspack
  Time (mean ± σ):      1.394 s ±  0.018 s    [User: 4.082 s, System: 1.414 s]
  Range (min … max):    1.374 s …  1.410 s    3 runs
 
Benchmark 3: MINIFY=1 SOURCE_MAP=1 node --run build:rollup
  Time (mean ± σ):     11.534 s ±  0.210 s    [User: 15.466 s, System: 5.015 s]
  Range (min … max):   11.378 s … 11.773 s    3 runs
 
Summary
  'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown' ran
    1.35 ± 0.04 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack'
   11.16 ± 0.33 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'
```

## apps/5000

```bash

Benchmark 1: MINIFY=1 SOURCE_MAP=1 node --run build:rolldown
  Time (mean ± σ):      1.804 s ±  0.027 s    [User: 3.402 s, System: 0.980 s]
  Range (min … max):    1.778 s …  1.831 s    3 runs
 
Benchmark 2: MINIFY=1 SOURCE_MAP=1 node --run build:rspack
  Time (mean ± σ):      2.236 s ±  0.009 s    [User: 6.590 s, System: 2.297 s]
  Range (min … max):    2.230 s …  2.246 s    3 runs
 
Benchmark 3: MINIFY=1 SOURCE_MAP=1 node --run build:rollup
  Time (mean ± σ):     21.052 s ±  0.332 s    [User: 26.977 s, System: 8.959 s]
  Range (min … max):   20.719 s … 21.384 s    3 runs
 
Summary
  'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown' ran
    1.24 ± 0.02 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack'
   11.67 ± 0.25 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'
```



## apps/10000
```bash
Benchmark 1: MINIFY=1 SOURCE_MAP=1 node --run build:rolldown
  Time (mean ± σ):      4.643 s ±  0.058 s    [User: 7.779 s, System: 1.740 s]
  Range (min … max):    4.585 s …  4.702 s    3 runs
 
Benchmark 2: MINIFY=1 SOURCE_MAP=1 node --run build:rspack
  Time (mean ± σ):      4.961 s ±  0.111 s    [User: 13.638 s, System: 4.227 s]
  Range (min … max):    4.836 s …  5.049 s    3 runs
 
Benchmark 3: MINIFY=1 SOURCE_MAP=1 node --run build:rollup
  Time (mean ± σ):     83.273 s ±  0.901 s    [User: 96.080 s, System: 16.811 s]
  Range (min … max):   82.478 s … 84.252 s    3 runs
 
Summary
  'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown' ran
    1.07 ± 0.03 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack'
   17.93 ± 0.30 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'
```

## apps/three10x
```bash
Benchmark 1: MINIFY=1 SOURCE_MAP=1 node --run build:rolldown
  Time (mean ± σ):      3.314 s ±  0.002 s    [User: 7.262 s, System: 1.000 s]
  Range (min … max):    3.311 s …  3.315 s    3 runs
 
Benchmark 2: MINIFY=1 SOURCE_MAP=1 node --run build:rspack
  Time (mean ± σ):      3.928 s ±  0.033 s    [User: 8.034 s, System: 1.314 s]
  Range (min … max):    3.894 s …  3.961 s    3 runs
 
Benchmark 3: MINIFY=1 SOURCE_MAP=1 node --run build:rollup
  Time (mean ± σ):     11.238 s ±  0.172 s    [User: 17.966 s, System: 3.811 s]
  Range (min … max):   11.042 s … 11.362 s    3 runs
 
Summary
  'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown' ran
    1.19 ± 0.01 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack'
    3.39 ± 0.05 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'
```

*output size(bytes)*

| CaseName     | RSPack  | Rollup  | Rolldown |
|----------|---------|---------|----------|
| 1000     | 756.22  | 832.98  | 776.86   |
| 3000     | 1687.70 | 1849.40 | 1734.71  |
| 5000     | 2528.33 | 2786.24 | 2611.44  |
| 10000    | 5360.06 | 5901.10 | 5521.27  |
| three10x | 5742.20 | 5862.98 | 5885.65  |


# Build with esbuild minify & sourcemap

> [!note]
> command
>```
> hyperfine --warmup 1 --runs 3 'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown' 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack' 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup' 'MINIFY=1 SOURCE_MAP=1 node --run build:esbuild' 
> ```

## apps/1000
```bash
Benchmark 1: MINIFY=1 SOURCE_MAP=1 node --run build:rolldown
  Time (mean ± σ):     455.1 ms ±   3.8 ms    [User: 621.9 ms, System: 368.4 ms]
  Range (min … max):   452.0 ms … 459.4 ms    3 runs
 
Benchmark 2: MINIFY=1 SOURCE_MAP=1 node --run build:rspack
  Time (mean ± σ):     974.2 ms ±  11.3 ms    [User: 2105.6 ms, System: 858.1 ms]
  Range (min … max):   962.1 ms … 984.6 ms    3 runs
 
Benchmark 3: MINIFY=1 SOURCE_MAP=1 node --run build:rollup
  Time (mean ± σ):      4.015 s ±  0.091 s    [User: 6.371 s, System: 2.715 s]
  Range (min … max):    3.956 s …  4.119 s    3 runs
 
Benchmark 4: MINIFY=1 SOURCE_MAP=1 node --run build:esbuild
  Time (mean ± σ):     298.4 ms ±  16.8 ms    [User: 34.3 ms, System: 14.7 ms]
  Range (min … max):   287.5 ms … 317.7 ms    3 runs
 
Summary
  'MINIFY=1 SOURCE_MAP=1 node --run build:esbuild' ran
    1.53 ± 0.09 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown'
    3.26 ± 0.19 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack'
   13.46 ± 0.82 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'

```


## apps/3000
```bash

Benchmark 1: MINIFY=1 SOURCE_MAP=1 node --run build:rolldown
  Time (mean ± σ):     763.8 ms ±  24.6 ms    [User: 1027.3 ms, System: 621.2 ms]
  Range (min … max):   741.6 ms … 790.3 ms    3 runs
 
Benchmark 2: MINIFY=1 SOURCE_MAP=1 node --run build:rspack
  Time (mean ± σ):      1.707 s ±  0.030 s    [User: 4.057 s, System: 1.589 s]
  Range (min … max):    1.675 s …  1.734 s    3 runs
 
Benchmark 3: MINIFY=1 SOURCE_MAP=1 node --run build:rollup
  Time (mean ± σ):      7.258 s ±  0.102 s    [User: 10.914 s, System: 4.936 s]
  Range (min … max):    7.146 s …  7.345 s    3 runs
 
Benchmark 4: MINIFY=1 SOURCE_MAP=1 node --run build:esbuild
  Time (mean ± σ):     508.5 ms ±  10.8 ms    [User: 35.2 ms, System: 14.3 ms]
  Range (min … max):   496.4 ms … 517.4 ms    3 runs
 
Summary
  'MINIFY=1 SOURCE_MAP=1 node --run build:esbuild' ran
    1.50 ± 0.06 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown'
    3.36 ± 0.09 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack'
   14.27 ± 0.36 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'
```

## apps/5000

```bash
Benchmark 1: MINIFY=1 SOURCE_MAP=1 node --run build:rolldown
  Time (mean ± σ):      1.058 s ±  0.041 s    [User: 1.512 s, System: 0.911 s]
  Range (min … max):    1.016 s …  1.099 s    3 runs
 
Benchmark 2: MINIFY=1 SOURCE_MAP=1 node --run build:rspack
  Time (mean ± σ):      2.502 s ±  0.046 s    [User: 6.567 s, System: 2.535 s]
  Range (min … max):    2.453 s …  2.544 s    3 runs
 
Benchmark 3: MINIFY=1 SOURCE_MAP=1 node --run build:rollup
  Time (mean ± σ):     12.341 s ±  0.538 s    [User: 17.654 s, System: 9.012 s]
  Range (min … max):   11.777 s … 12.848 s    3 runs
 
Benchmark 4: MINIFY=1 SOURCE_MAP=1 node --run build:esbuild
  Time (mean ± σ):     821.7 ms ±  23.6 ms    [User: 35.6 ms, System: 13.9 ms]
  Range (min … max):   795.6 ms … 841.3 ms    3 runs
 
Summary
  'MINIFY=1 SOURCE_MAP=1 node --run build:esbuild' ran
    1.29 ± 0.06 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown'
    3.04 ± 0.10 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack'
   15.02 ± 0.78 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'
```


## apps/10000
```bash
Benchmark 1: MINIFY=1 SOURCE_MAP=1 node --run build:rolldown
  Time (mean ± σ):      2.025 s ±  0.155 s    [User: 2.875 s, System: 1.726 s]
  Range (min … max):    1.930 s …  2.203 s    3 runs
 
  Warning: Statistical outliers were detected. Consider re-running this benchmark on a quiet PC without any interferences from other programs. It might help to use the '--warmup' or '--prepar
e' options.
 
Benchmark 2: MINIFY=1 SOURCE_MAP=1 node --run build:rspack
  Time (mean ± σ):      4.965 s ±  0.061 s    [User: 12.835 s, System: 4.773 s]
  Range (min … max):    4.925 s …  5.035 s    3 runs
 
Benchmark 3: MINIFY=1 SOURCE_MAP=1 node --run build:rollup
  Time (mean ± σ):     26.713 s ±  1.045 s    [User: 33.959 s, System: 16.491 s]
  Range (min … max):   25.524 s … 27.486 s    3 runs
 
Benchmark 4: MINIFY=1 SOURCE_MAP=1 node --run build:esbuild
  Time (mean ± σ):      1.437 s ±  0.008 s    [User: 0.038 s, System: 0.013 s]
  Range (min … max):    1.431 s …  1.446 s    3 runs
 
Summary
  'MINIFY=1 SOURCE_MAP=1 node --run build:esbuild' ran
    1.41 ± 0.11 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown'
    3.45 ± 0.05 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack'
   18.59 ± 0.73 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'
```

## apps/three10x
```bash
Benchmark 1: MINIFY=1 SOURCE_MAP=1 node --run build:rolldown
  Time (mean ± σ):      1.622 s ±  0.008 s    [User: 2.097 s, System: 0.949 s]
  Range (min … max):    1.617 s …  1.632 s    3 runs
 
Benchmark 2: MINIFY=1 SOURCE_MAP=1 node --run build:rspack
  Time (mean ± σ):      4.433 s ±  0.066 s    [User: 6.099 s, System: 1.885 s]
  Range (min … max):    4.364 s …  4.496 s    3 runs
 
Benchmark 3: MINIFY=1 SOURCE_MAP=1 node --run build:rollup
  Time (mean ± σ):     10.093 s ±  0.256 s    [User: 13.889 s, System: 3.848 s]
  Range (min … max):    9.841 s … 10.352 s    3 runs
 
Benchmark 4: MINIFY=1 SOURCE_MAP=1 node --run build:esbuild
  Time (mean ± σ):     366.0 ms ±   4.3 ms    [User: 36.8 ms, System: 12.3 ms]
  Range (min … max):   362.5 ms … 370.9 ms    3 runs
 
Summary
  'MINIFY=1 SOURCE_MAP=1 node --run build:esbuild' ran
    4.43 ± 0.06 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rolldown'
   12.11 ± 0.23 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rspack'
   27.57 ± 0.77 times faster than 'MINIFY=1 SOURCE_MAP=1 node --run build:rollup'
```

*output size(bytes)*

| CaseName     | RSPack  | Rollup  | Rolldown | Esbuild  |
|----------|---------|---------|----------|----------|
| 1000     | 777.36  | 822.89  | 811.59   | 844.72   |
| 3000     | 1729.98 | 1828.02 | 1814.24  | 1877.85  |
| 5000     | 2596.04 | 2751.42 | 2734.05  | 2834.99  |
| 10000    | 5491.19 | 5822.29 | 5780.59  | 5993.76  |
| three10x | 5824.16 | 5916.20 | 5936.23  | 5940.83  |

