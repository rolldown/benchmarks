import { defineConfig } from "rollup";
import * as path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import { minify } from "rollup-plugin-esbuild";

const sourceMap = !!process.env.SOURCE_MAP;
const m = !!process.env.MINIFY;
export default defineConfig({
	input: {
		test: path.resolve(import.meta.dirname, "src/index.jsx"),
	},
	jsx: 'react-jsx',
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
					minify: true,
					legalComments: "none",
					target: "es2022",
				})
			: null,
	].filter(Boolean),
});
