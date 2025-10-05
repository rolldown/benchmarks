# Benchmark
## 1000
```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     302.3 ms ±   8.5 ms    [User: 617.4 ms, System: 250.0 ms]
  Range (min … max):   293.5 ms … 316.0 ms    5 runs
 
Benchmark 2: PLUGIN=0 node --run build:rolldown
  Time (mean ± σ):     730.7 ms ±  17.8 ms    [User: 1512.8 ms, System: 345.4 ms]
  Range (min … max):   711.6 ms … 749.7 ms    5 runs
 
Benchmark 3: PLUGIN=1 node --run build:rolldown
  Time (mean ± σ):     497.6 ms ±  17.0 ms    [User: 942.8 ms, System: 328.4 ms]
  Range (min … max):   476.4 ms … 522.8 ms    5 runs
 
Benchmark 4: PLUGIN=2 node --run build:rolldown
  Time (mean ± σ):     431.1 ms ±  17.2 ms    [User: 868.6 ms, System: 296.6 ms]
  Range (min … max):   412.9 ms … 451.1 ms    5 runs
 
Benchmark 5: PLUGIN=3 node --run build:rolldown
  Time (mean ± σ):     325.6 ms ±  12.9 ms    [User: 636.4 ms, System: 274.4 ms]
  Range (min … max):   310.8 ms … 345.4 ms    5 runs
 
Summary
  'node --run build:rolldown' ran
    1.08 ± 0.05 times faster than 'PLUGIN=3 node --run build:rolldown'
    1.43 ± 0.07 times faster than 'PLUGIN=2 node --run build:rolldown'
    1.65 ± 0.07 times faster than 'PLUGIN=1 node --run build:rolldown'
    2.42 ± 0.09 times faster than 'PLUGIN=0 node --run build:rolldown'
```
## 5000
```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     499.4 ms ±   6.1 ms    [User: 1490.3 ms, System: 599.9 ms]
  Range (min … max):   491.4 ms … 506.2 ms    5 runs
 
Benchmark 2: PLUGIN=0 node --run build:rolldown
  Time (mean ± σ):      1.747 s ±  0.037 s    [User: 3.846 s, System: 0.955 s]
  Range (min … max):    1.712 s …  1.811 s    5 runs
 
Benchmark 3: PLUGIN=1 node --run build:rolldown
  Time (mean ± σ):      1.100 s ±  0.030 s    [User: 2.630 s, System: 0.840 s]
  Range (min … max):    1.067 s …  1.134 s    5 runs
 
Benchmark 4: PLUGIN=2 node --run build:rolldown
  Time (mean ± σ):     894.5 ms ±  28.5 ms    [User: 2324.1 ms, System: 812.5 ms]
  Range (min … max):   865.4 ms … 934.8 ms    5 runs
 
Benchmark 5: PLUGIN=3 node --run build:rolldown
  Time (mean ± σ):     644.6 ms ±  14.1 ms    [User: 1660.9 ms, System: 675.6 ms]
  Range (min … max):   621.2 ms … 658.6 ms    5 runs
 
Summary
  'node --run build:rolldown' ran
    1.29 ± 0.03 times faster than 'PLUGIN=3 node --run build:rolldown'
    1.79 ± 0.06 times faster than 'PLUGIN=2 node --run build:rolldown'
    2.20 ± 0.07 times faster than 'PLUGIN=1 node --run build:rolldown'
    3.50 ± 0.09 times faster than 'PLUGIN=0 node --run build:rolldown'

```

## 10000
```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     818.7 ms ±  19.3 ms    [User: 2728.9 ms, System: 1025.6 ms]
  Range (min … max):   794.2 ms … 843.6 ms    5 runs
 
Benchmark 2: PLUGIN=0 node --run build:rolldown
  Time (mean ± σ):      2.992 s ±  0.071 s    [User: 6.835 s, System: 1.444 s]
  Range (min … max):    2.882 s …  3.071 s    5 runs
 
Benchmark 3: PLUGIN=1 node --run build:rolldown
  Time (mean ± σ):      1.814 s ±  0.062 s    [User: 4.563 s, System: 1.369 s]
  Range (min … max):    1.746 s …  1.914 s    5 runs
 
Benchmark 4: PLUGIN=2 node --run build:rolldown
  Time (mean ± σ):      1.368 s ±  0.040 s    [User: 3.876 s, System: 1.284 s]
  Range (min … max):    1.331 s …  1.414 s    5 runs
 
Benchmark 5: PLUGIN=3 node --run build:rolldown
  Time (mean ± σ):      1.015 s ±  0.027 s    [User: 3.139 s, System: 1.137 s]
  Range (min … max):    0.985 s …  1.059 s    5 runs
 
Summary
  'node --run build:rolldown' ran
    1.24 ± 0.04 times faster than 'PLUGIN=3 node --run build:rolldown'
    1.67 ± 0.06 times faster than 'PLUGIN=2 node --run build:rolldown'
    2.22 ± 0.09 times faster than 'PLUGIN=1 node --run build:rolldown'
    3.65 ± 0.12 times faster than 'PLUGIN=0 node --run build:rolldown'

```


> [!note]
> PLUGIN=3 uses a plugin with only a `noop` transform hook; this serves as a baseline benchmark when plugin is used.

> [!note]
> Env
> - OS: Linux Ubuntu 22.04 LTS
> - CPU: (32) x64 AMD Ryzen 9 5950X 16-Core Processor
> - Memory: 64 GB

# Summary

| Benchmark Scenario | 1000 Runs (Mean Time ±σ) | 5000 Runs (Mean Time ±σ) | 10000 Runs (Mean Time ±σ) |
|-------------------|--------------------------|--------------------------|---------------------------|
| **No Plugin (Baseline)** | **302.3 ms ± 8.5 ms** | **499.4 ms ± 6.1 ms** | **818.7 ms ± 19.3 ms** |
| PLUGIN=3 (Noop Plugin) | 325.6 ms ± 12.9 ms | 644.6 ms ± 14.1 ms | 1.015 s ± 0.027 s |
| PLUGIN=2 | 431.1 ms ± 17.2 ms | 894.5 ms ± 28.5 ms | 1.368 s ± 0.040 s |
| PLUGIN=1 | 497.6 ms ± 17.0 ms | 1.100 s ± 0.030 s | 1.814 s ± 0.062 s |
| PLUGIN=0 | 730.7 ms ± 17.8 ms | 1.747 s ± 0.037 s | 2.992 s ± 0.071 s |

## Build time

| Runs | babel + js magicString | oxc raw trasfer + native magicstring | Time Saved | Speedup | 
|------|----------|----------|------------|---------|
| apps/1000 | 730.7 ms | 431.1 ms | 299.6 ms | 1.69x |
| apps/5000 | 1.747 s | 894.5 ms | 852.5 ms | 1.95x |
| apps/10000 | 2.992 s | 1.368 s | 1.624 s | 2.19x |

## Plugin transform time (build time - noop transform build time)

| Runs | Transform Time (babel + js magicString) | Transform Time (oxc raw trasfer + native magicString) | Time Saved | Speedup |
|------|---------------------------|---------------------------|------------|---------|
| 1000 | 405.1 ms | 105.5 ms | 299.6 ms | 3.84x |
| 5000 | 1102.4 ms | 249.9 ms | 852.5 ms | 4.41x |
| 10000 | 1977.0 ms | 353.0 ms | 1624.0 ms | 5.60x |
