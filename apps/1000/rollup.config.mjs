import { defineConfig } from "rollup";
import * as path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import { minify } from "rollup-plugin-swc3";

const sourceMap = !!process.env.SOURCE_MAP;
const m = !!process.env.MINIFY;
export default defineConfig({
	input: {
		test: path.resolve(import.meta.dirname, "src/index.jsx"),
	},
	jsx: true,
	output: {
		dir: "rollup-dist",
		format: "esm",
    sourcemap: sourceMap,
	},
	plugins: [
		commonjs({}),
		nodeResolve({
			extensions: [".js", ".jsx"],
		}),
		replace({
			"process.env.NODE_ENV": JSON.stringify("production"),
		}),
		m
			? minify({
					module: true,
					// swc's minify option here
					mangle: {
						toplevel: true,
					},
					compress: {},
				})
			: null,
	].filter(Boolean),
});
