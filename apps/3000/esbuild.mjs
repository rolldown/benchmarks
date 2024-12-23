import { build } from "esbuild";

const sourceMap = !!process.env.SOURCE_MAP
const minify = !!process.env.MINIFY

build({
	entryPoints: ["src/index.jsx"],
	outfile: "esbuild-dist/esbuild.js",
	format: "esm",
	target: "es2022",
	bundle: true,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
	legalComments: "none",
  sourcemap: sourceMap,
	minify: false,
	logLevel: "info",
  plugins: [],
});
