# apps/1000
```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     172.5 ms ±   5.9 ms    [User: 457.6 ms, System: 269.7 ms]
  Range (min … max):   165.9 ms … 177.3 ms    3 runs
 
Benchmark 2: node --run build:rollup
  Time (mean ± σ):      3.776 s ±  0.144 s    [User: 5.946 s, System: 2.514 s]
  Range (min … max):    3.628 s …  3.915 s    3 runs
 
Summary
  'node --run build:rolldown' ran
   21.89 ± 1.12 times faster than 'node --run build:rollup'

```
# apps/3000
```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     252.6 ms ±   0.4 ms    [User: 750.7 ms, System: 383.3 ms]
  Range (min … max):   252.2 ms … 252.8 ms    3 runs
 
  Warning: Statistical outliers were detected. Consider re-running this benchmark on a quiet PC without any interferences from other programs. It might help to use the '--warmup' or '--prepar
e' options.
 
Benchmark 2: node --run build:rollup
  Time (mean ± σ):      6.797 s ±  0.055 s    [User: 10.086 s, System: 4.964 s]
  Range (min … max):    6.738 s …  6.848 s    3 runs
 
Summary
  'node --run build:rolldown' ran
   26.91 ± 0.22 times faster than 'node --run build:rollup'
```

# apps/5000

```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     381.2 ms ±   5.3 ms    [User: 1154.9 ms, System: 613.9 ms]
  Range (min … max):   376.3 ms … 386.9 ms    3 runs
 
Benchmark 2: node --run build:rollup
  Time (mean ± σ):     11.487 s ±  0.301 s    [User: 16.302 s, System: 8.871 s]
  Range (min … max):   11.249 s … 11.825 s    3 runs
 
Summary
  'node --run build:rolldown' ran
   30.13 ± 0.89 times faster than 'node --run build:rollup'
```


# apps/10000
```bash
Benchmark 1: node --run build:rolldown
  Time (mean ± σ):     680.4 ms ±   5.3 ms    [User: 2213.9 ms, System: 1065.4 ms]
  Range (min … max):   674.6 ms … 685.0 ms    3 runs
 
Benchmark 2: node --run build:rollup
  Time (mean ± σ):     26.203 s ±  0.793 s    [User: 33.774 s, System: 15.451 s]
  Range (min … max):   25.301 s … 26.789 s    3 runs
 
Summary
  'node --run build:rolldown' ran
   38.51 ± 1.20 times faster than 'node --run build:rollup'
```
