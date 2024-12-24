import { defineConfig } from "rolldown";
import { minify } from "rollup-plugin-esbuild";
const sourceMap = !!process.env.SOURCE_MAP;
import * as path from 'path'
const m = !!process.env.MINIFY;

export default defineConfig({
	input: {
		main: "./src/entry.ts",
	},
  cwd: import.meta.dirname,
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
  platform: "node",
  shimMissingExports: true,
  resolve: {
    extensions: [".ts", ".js"],
    tsconfigFilename: path.resolve(import.meta.dirname, "src/tsconfig.json"),
  },
	plugins: [
		m
			? minify({
					minify: true,
					legalComments: "none",
					target: "es2022",
				})
			: null,
	].filter(Boolean),
	profilerNames: !m,
	output: {
		minify: false,
		sourcemap: sourceMap,
		dir: "rolldown-dist",
	},
});
