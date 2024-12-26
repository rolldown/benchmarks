import { defineConfig } from "rollup";
import * as path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from '@rollup/plugin-typescript';
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import { minify } from "rollup-plugin-esbuild";

const sourceMap = !!process.env.SOURCE_MAP;
const m = !!process.env.MINIFY;
export default defineConfig({
	input: {
		main: "./src/entry.ts"
	},
	jsx: false,
	output: {
		dir: "rollup-dist",
		format: "esm",
		sourcemap: sourceMap,
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
		m
			? minify({
					minify: true,
					legalComments: "none",
					target: "es2022",
				})
			: null,
	].filter(Boolean),
});
