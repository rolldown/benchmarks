import { defineConfig } from "rolldown";

export default defineConfig({
	input: {
		main: "./entry.js",
	},
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	output: {
		minify: false,
	},
});
