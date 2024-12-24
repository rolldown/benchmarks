import { defineConfig } from "rolldown";
import { minify } from "rollup-plugin-esbuild";
const sourceMap = !!process.env.SOURCE_MAP;
const m = !!process.env.MINIFY;

export default defineConfig({
	input: {
		main: "./src/index.jsx",
	},
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	plugins: [
		m
			? minify({
					minify: true,
					legalComments: "none",
					target: "es2022",
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

