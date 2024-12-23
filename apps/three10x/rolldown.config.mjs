import { defineConfig } from "rolldown";
import { minify } from "rollup-plugin-swc3";
const sourceMap = !!process.env.SOURCE_MAP;
const m = !!process.env.MINIFY;

export default defineConfig({
	input: {
		main: "./entry.js",
	},
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	plugins: [
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
	profilerNames: !m,
	output: {
		minify: false,
		sourcemap: sourceMap,
		dir: "rolldown-dist",
	},
});



