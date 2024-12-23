import { defineConfig } from "@rspack/cli";

const sourceMap = !!process.env.SOURCE_MAP;
const minify = !!process.env.MINIFY;

export default defineConfig({
	entry: "./entry.js",
	devtool: false,
	target: ["web", "es2022"],
	output: {
		path: "rspack-dist",
		filename: "rspack.js",
		clean: false,
	},
	resolve: {
		extensions: [".js"],
	},
	optimization: {
		minimize: minify,
	},
	module: {},
});
