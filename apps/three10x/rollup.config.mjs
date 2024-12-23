import { defineConfig } from "rollup";
import * as path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
	input: {
		test: path.resolve(import.meta.dirname, "./entry.js"),
	},
	jsx: true,
	output: {
		dir: "rollup-dist",
		format: "esm",
	},
	plugins: [
		commonjs({}),
		nodeResolve({
			extensions: [".js", ".jsx"],
		}),
		replace({
			"process.env.NODE_ENV": JSON.stringify("production"),
		}),
	],
});
