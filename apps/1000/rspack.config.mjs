import { defineConfig } from "@rspack/cli";

const sourceMap = !!process.env.SOURCE_MAP;
const minify = !!process.env.MINIFY;

export default defineConfig({
	entry: "./src/index.jsx",
	devtool: sourceMap ? "source-map" : false,
	target: ["web", "es2022"],
	output: {
		path: "rspack-dist",
		filename: "rspack.js",
		clean: false,
	},
	resolve: {
		extensions: [".js", ".jsx"],
	},
  optimization: {
    minimize: minify
  },
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use: {
					loader: "builtin:swc-loader",
					options: {
						jsc: {
							parser: {
								syntax: "ecmascript",
								jsx: true,
							},
							transform: {
								react: {
									pragma: "React.createElement",
									pragmaFrag: "React.Fragment",
									throwIfNamespace: true,
									development: false,
									useBuiltins: false,
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
