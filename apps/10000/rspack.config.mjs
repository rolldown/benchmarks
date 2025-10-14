import { defineConfig } from "@rspack/cli";

export default defineConfig({
	entry: "./src/index.jsx",
	devtool: "source-map",
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
		minimize: true,
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

