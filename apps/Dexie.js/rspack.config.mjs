import { defineConfig } from "@rspack/cli";

import TerserPlugin from "terser-webpack-plugin";

const sourceMap = !!process.env.SOURCE_MAP;
const minify = !!process.env.MINIFY;

export default defineConfig({
	entry: "./src/index.ts",
	devtool: sourceMap ? "source-map" : false,
	target: ["web", "es2022"],
	output: {
		path: "rspack-dist",
		filename: "rspack.js",
		clean: false,
	},
	resolve: {
		extensions: [".ts", ".js", ".d.ts"],
	},
	optimization: {
		minimize: minify,
		minimizer: [
			minify &&
				new TerserPlugin({
					minify: TerserPlugin.esbuildMinify,
					terserOptions: {
						minify: true,
						legalComments: "none",
						target: "es2022",
					},
				}),
		].filter(Boolean),
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				loader: "builtin:swc-loader",
				options: {
					jsc: {
						parser: {
							syntax: "typescript",
						},
					},
				},
				type: "javascript/auto",
			},
		],
	},
});