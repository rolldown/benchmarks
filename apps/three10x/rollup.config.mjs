import { defineConfig } from "rollup";
import * as path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
	input: {
		test: path.resolve(import.meta.dirname, "./entry.js"),
	},
	output: {
		dir: "dist",
		format: "cjs",
	},
	plugins: [
		commonjs({}),
		replace({
			"process.env.NODE_ENV": JSON.stringify("production"),
		}),
	],
});
