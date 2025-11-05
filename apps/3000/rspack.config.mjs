import { defineConfig } from "@rspack/cli";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	entry: "./src/index.jsx",
	devtool: "source-map",
	target: ["web", "es2022"],
	output: {
		path: path.resolve(__dirname, "dist-rspack"),
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

