# Build without minify & sourcemap
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

# apps/three10x
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

# apps/html2canvas
```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):      93.5 ms ±   1.6 ms    [User: 138.3 ms, System: 65.3 ms]
  Range (min … max):    92.2 ms …  95.3 ms    3 runs
 
Benchmark 2: node --run build:rollup
  Time (mean ± σ):      1.835 s ±  0.011 s    [User: 4.100 s, System: 0.294 s]
  Range (min … max):    1.823 s …  1.844 s    3 runs
 
Summary
  'node --run build:rolldown' ran
   19.63 ± 0.35 times faster than 'node --run build:rollup'

```
