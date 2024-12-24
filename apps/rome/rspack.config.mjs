import { defineConfig } from "@rspack/cli";
import * as path from 'path'

import TerserPlugin from "terser-webpack-plugin";

const sourceMap = !!process.env.SOURCE_MAP;
const minify = !!process.env.MINIFY;

export default defineConfig({
	entry: "./src/entry.ts",
	devtool: sourceMap ? "source-map" : false,
	target: ["node", "es2022"],
	output: {
		path: "rspack-dist",
		filename: "rspack.js",
		clean: false,
	},
	resolve: {
		extensions: [".ts", ".js"],
    tsConfig: path.resolve(import.meta.dirname, "src/tsconfig.json"),
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
