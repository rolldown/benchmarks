import { defineConfig } from "rollup";
import * as path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
	input: {
		test: path.resolve(import.meta.dirname, "src/index.jsx"),
	},
	jsx: true,
	output: {
		dir: "dist",
		format: "cjs",
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
