import { build } from "bun"

const sourceMap = !!process.env.SOURCE_MAP
const minify = !!process.env.MINIFY

await build({
  entrypoints: ["./src/index.jsx"],
  outdir: "./bun-dist",
  sourcemap: sourceMap ? "inline" : "none",
  minify: minify ? true : false,
})
