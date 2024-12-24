import { build } from "esbuild";

const sourceMap = !!process.env.SOURCE_MAP;
const minify = !!process.env.MINIFY;
build({
	entryPoints: ["./src/index.ts"],
	outfile: "esbuild-dist/esbuild.js",
	format: "esm",
	target: "es2022",
	bundle: true,
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
  resolveExtensions: [".ts", ".js", ".d.ts"],
	legalComments: "none",
	sourcemap: sourceMap,
	minify: minify,
	logLevel: "info",
	plugins: []
});
