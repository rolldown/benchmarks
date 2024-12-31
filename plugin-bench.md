Although the Rolldown core is written in Rust and utilizes modern CPU parallel computing capabilities to improve build speed, it still relies on the JavaScript runtime to provide the execution environment and (by the JavaScript engine) execute user-side JavaScript plugin code in order to maintain compatibility with JavaScript plugins as much as possible. Therefore, one of the common issues users may encounter is that as the number of JavaScript plugins increases, the build performance gradually deteriorates.

# What?

Here, we use a specific example, taking `apps/10000` as an example.

```diff
diff --git a/apps/10000/rolldown.config.mjs b/apps/10000/rolldown.config.mjs
index 0858e4d6..822af995 100644
--- a/apps/10000/rolldown.config.mjs
+++ b/apps/10000/rolldown.config.mjs
@@ -1,8 +1,25 @@
 import { defineConfig } from "rolldown";
-import { minify } from "rollup-plugin-esbuild";
+// import { minify } from "rollup-plugin-esbuild";
 const sourceMap = !!process.env.SOURCE_MAP;
 const m = !!process.env.MINIFY;
+const transformPluginCount = process.env.PLUGIN_COUNT || 0;
 
+let transformCssPlugin = Array.from({ length: transformPluginCount }, (_, i) => {
+  let index = i + 1;
+  return {
+    name: `transform-css-${index}`,
+    transform(code, id) {
+      if (id.endsWith(`foo${index}.css`)) {
+        return {
+          code: `.index-${index} {
+  color: red;
+}`,
+          map: null,
+        };
+      }
+    }
+  }
+})
 export default defineConfig({
 	input: {
 		main: "./src/index.jsx",
@@ -11,13 +28,7 @@ export default defineConfig({
 		"process.env.NODE_ENV": JSON.stringify("production"),
 	},
 	plugins: [
-		m
-			? minify({
-					minify: true,
-					legalComments: "none",
-					target: "es2022",
-				})
-			: null,
+    ...transformCssPlugin,
 	].filter(Boolean),
 	profilerNames: !m,
 	output: {
diff --git a/apps/10000/src/index.css b/apps/10000/src/index.css
deleted file mode 100644
index e69de29b..00000000
diff --git a/apps/10000/src/index.jsx b/apps/10000/src/index.jsx
index 0b95f9a8..53a15ba8 100644
--- a/apps/10000/src/index.jsx
+++ b/apps/10000/src/index.jsx
@@ -1,7 +1,16 @@
 import React from "react";
 import ReactDom from "react-dom/client";
 import App1 from "./f0";
-import './index.css'
+import './foo1.css'
+import './foo2.css'
+import './foo3.css'
+import './foo4.css'
+import './foo5.css'
+import './foo6.css'
+import './foo7.css'
+import './foo8.css'
+import './foo9.css'
+import './foo10.css'
 
 ReactDom.createRoot(document.getElementById("root")).render(
 	<React.StrictMode>

```

**Diff Explanation**

1. To better reflect the impact of the number of JavaScript plugins on build time, the example uses `build + disable minify`.
2. Added ten empty CSS files named `foo1.css` to `foo10.css`.
3. Controlled the number of enabled plugins through `process.env.PLUGIN_COUNT`. The plugin content is similar to conventional community plugins, using filter to exclude non-matching files and generating corresponding dummy CSS files for matching files.

## Benchmark Result

```bash
Benchmark 1: PLUGIN_COUNT=0 node --run build:rolldown
  Time (mean ± σ):     745.6 ms ±  11.8 ms    [User: 2298.0 ms, System: 1161.3 ms]
  Range (min … max):   732.1 ms … 753.6 ms    3 runs
 
Benchmark 2: PLUGIN_COUNT=1 node --run build:rolldown
  Time (mean ± σ):     862.6 ms ±  61.3 ms    [User: 2714.1 ms, System: 1192.6 ms]
  Range (min … max):   808.3 ms … 929.2 ms    3 runs
 
Benchmark 3: PLUGIN_COUNT=2 node --run build:rolldown
  Time (mean ± σ):      1.106 s ±  0.020 s    [User: 3.287 s, System: 1.382 s]
  Range (min … max):    1.091 s …  1.130 s    3 runs
 
Benchmark 4: PLUGIN_COUNT=5 node --run build:rolldown
  Time (mean ± σ):      1.848 s ±  0.022 s    [User: 4.398 s, System: 1.728 s]
  Range (min … max):    1.825 s …  1.869 s    3 runs
 
Benchmark 5: PLUGIN_COUNT=10 node --run build:rolldown
  Time (mean ± σ):      2.792 s ±  0.065 s    [User: 6.013 s, System: 2.198 s]
  Range (min … max):    2.722 s … 2.850 s    3 runs
 
Summary
 'PLUGIN_COUNT=0 node --run build:rolldown' ran
    1.16 ± 0.08 times faster than 'PLUGIN_COUNT=1 node --run build:rolldown'
    1.48 ± 0.04 times faster than 'PLUGIN_COUNT=2 node --run build:rolldown'
    2.48 ± 0.05 times faster than 'PLUGIN_COUNT=5 node --run build:rolldown'
    3.74 ± 0.10 times faster than 'PLUGIN_COUNT=10 node --run build:rolldown'

```

It can be seen that when the number of JavaScript plugins is ten, the build time is almost four times that of having no plugins at all. Before understanding the reasons, let's look at how to optimize this.

# How? (the optimization)

To address this issue, Rolldown supports passing additional fields `filter` when JavaScript plugin are passed as object. Below are the changes made to the plugin:

```diff
diff --git a/apps/10000/rolldown.config.mjs b/apps/10000/rolldown.config.mjs
index 822af995..dee07e68 100644
--- a/apps/10000/rolldown.config.mjs
+++ b/apps/10000/rolldown.config.mjs
@@ -8,14 +8,21 @@ let transformCssPlugin = Array.from({ length: transformPluginCount }, (_, i) =>
   let index = i + 1;
   return {
     name: `transform-css-${index}`,
-    transform(code, id) {
-      if (id.endsWith(`foo${index}.css`)) {
-        return {
-          code: `.index-${index} {
+    transform: {
+      filter: {
+        id: {
+          include: new RegExp(`foo${index}.css$`),
+        }
+      },
+      handler(code, id) {
+        if (id.endsWith(`foo${index}.css`)) {
+          return {
+            code: `.index-${index} {
   color: red;
 }`,
-          map: null,
-        };
+            map: null,
+          };
+        }
       }
     }
   }

```
## New Benchmark Result

```bash
Benchmark 1: PLUGIN_COUNT=0 node --run build:rolldown
  Time (mean ± σ):     739.1 ms ±   6.8 ms    [User: 2312.5 ms, System: 1153.0 ms]
  Range (min … max):   733.0 ms … 746.5 ms    3 runs
 
Benchmark 2: PLUGIN_COUNT=1 node --run build:rolldown
  Time (mean ± σ):     760.6 ms ±  18.3 ms    [User: 2422.1 ms, System: 1107.4 ms]
  Range (min … max):   739.7 ms … 773.6 ms    3 runs
 
Benchmark 3: PLUGIN_COUNT=2 node --run build:rolldown
  Time (mean ± σ):     731.2 ms ±  11.1 ms    [User: 2461.3 ms, System: 1141.4 ms]
  Range (min … max):   723.9 ms … 744.0 ms    3 runs
 
Benchmark 4: PLUGIN_COUNT=5 node --run build:rolldown
  Time (mean ± σ):     741.5 ms ±   9.3 ms    [User: 2621.6 ms, System: 1111.3 ms]
  Range (min … max):   734.0 ms … 751.9 ms    3 runs
 
Benchmark 5: PLUGIN_COUNT=10 node --run build:rolldown
  Time (mean ± σ):     747.3 ms ±   2.1 ms    [User: 2900.9 ms, System: 1120.0 ms]
  Range (min … max):   745.0 ms … 749.2 ms    3 runs
 
Summary
  'PLUGIN_COUNT=2 node --run build:rolldown' ran
    1.01 ± 0.02 times faster than 'PLUGIN_COUNT=0 node --run build:rolldown'
    1.01 ± 0.02 times faster than 'PLUGIN_COUNT=5 node --run build:rolldown'
    1.02 ± 0.02 times faster than 'PLUGIN_COUNT=10 node --run build:rolldown'
    1.04 ± 0.03 times faster than 'PLUGIN_COUNT=1 node --run build:rolldown'
```

It can be seen that after adding `filter`, when there are fewer matching files for the JavaScript plugin itself, the number of JavaScript plugins has little observable impact on build performance.

# Why?

Native language-based bundlers typically use algorithms similar to solving the [producer-consumer problem](https://en.wikipedia.org/wiki/Producer%E2%80%93consumer_problem) to generate ModuleGraph and metadata for each module in parallel.
Here’s a simple example to illustrate the entire build process:

**Dependency Graph**
![IMAGE (3)](https://github.com/user-attachments/assets/e49c29f1-1d2f-4d21-a277-311bcc33eda7)

## Rolldown without JavaScript Plugin
![IMAGE (2) 1](https://github.com/user-attachments/assets/ad071cf9-6a34-4a7d-a669-02efec342d45)


> [!note]
>
> The illustrations only represent an approximate algorithm of Rolldown and do not depict specific implementations.
> For better visualization, some time slices in the illustrations can be enlarged; for instance, in actual programs, `fetch_module` time is at the nanosecond level.

## Rolldown with JavaScript Plugin
![IMAGE (4)](https://github.com/user-attachments/assets/7e95fb60-d345-4d23-a35e-c7d062fa2b70)


Although parts of Rolldown core can handle multiple tasks in parallel, JavaScript plugins execute in a single thread. Thus, each task's hook call phase is almost executed serially. As the number of JavaScript plugins increases, leading to increased execution time in that diamond-shaped section and significantly reduced overall CPU utilization.

After using `filter`, Rolldown core can determine whether a plugin matches module metadata before invoking `FFI` calls. If it does not match, it skips it altogether, greatly reducing execution time in that diamond-shaped section and improving the CPU utilization.



