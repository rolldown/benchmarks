import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import { minify } from "rollup-plugin-esbuild";

export default defineConfig({
  input: {
    main: "./src/entry.ts",
  },
  jsx: false,
  output: {
    dir: "dist-rollup",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    typescript({
      // tsconfig: path.resolve(import.meta.dirname, "src/tsconfig.json"),
    }),
    nodeResolve({
      extensions: [".ts", ".js"],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    minify({
      minify: true,
      legalComments: "none",
      target: "es2022",
    }),
  ].filter(Boolean),
});
