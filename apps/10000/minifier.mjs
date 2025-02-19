import * as path from "path";
import * as fs from "fs";
import * as esbuild from "esbuild";
import { minify } from "oxc-minify";

const code = fs.readFileSync(
	path.resolve(import.meta.dirname, "./rolldown-dist/main.js"),
	"utf-8",
);
const result = await esbuild.transform(code, {
	format: "esm",
	loader: "js",
	minify: true,
	minifyIdentifiers: true,
	minifySyntax: true,
	minifyWhitespace: true,
});

console.log(`esbuild:`, result.code.length);



const resultOxc = minify('test.js', code, {
  compress: true,
  mangle: true,
  codegen: true,
});

console.log(`oxc`, resultOxc.code.length)
