import { defineConfig } from "rolldown";

export default defineConfig({
	input: {
		main: "./src/index.jsx",
	},
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	plugins: [
		{
			name: "test-plugin",

			// outputOptions: function (options) {
			// 	console.log(`outputOptions`, process.memoryUsage().rss);
			// },
			// writeBundle: function (options) {
			// 	console.log(`writeBundle`, process.memoryUsage().rss);
			// },
			generateBundle(options) {
				console.log(`generateBundle`, process.memoryUsage().rss);
			},
		},
	],
	output: {
		minify: false,
	},
});
