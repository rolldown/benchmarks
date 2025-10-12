import { defineConfig } from "rollup";
import * as path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import { minify } from "rollup-plugin-esbuild";

export default defineConfig({
  input: {
    test: path.resolve(import.meta.dirname, "src/index.jsx"),
  },
  jsx: true,
  output: {
    dir: "dist-rollup",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    commonjs({}),
    nodeResolve({
      extensions: [".js", ".jsx"],
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
