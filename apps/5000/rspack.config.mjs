import { defineConfig } from "@rspack/cli";

const sourceMap = !!process.env.SOURCE_MAP;
const minify = !!process.env.MINIFY;

export default defineConfig({
	entry: "./src/index.jsx",
	devtool: sourceMap ? "source-map" : false,
	target: ["web", "es2022"],
	output: {
		path: "dist-rspack",
		filename: "rspack.js",
		clean: false,
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
	optimization: {
		minimize: minify,
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use: {
					loader: "builtin:swc-loader",
					options: {
						jsc: {
							target: "es2022",
							parser: {
								syntax: "ecmascript",
								jsx: true,
							},
							transform: {
								react: {
									runtime: "automatic",
									development: false,
								},
							},
						},
					},
				},
				type: "javascript/auto",
			},
		],
	},
});

