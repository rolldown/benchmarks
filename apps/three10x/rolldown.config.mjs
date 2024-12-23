import { defineConfig } from "rolldown";

const sourceMap = !!process.env.SOURCE_MAP
const minify = !!process.env.MINIFY

export default defineConfig({
	input: {
		main: "./entry.js",
	},
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	output: {
		minify: minify,
    sourcemap: sourceMap,
    dir: "rolldown-dist"
	},
});
