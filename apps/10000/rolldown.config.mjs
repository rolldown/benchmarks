import { defineConfig } from "rolldown";
import { babelMagicString, oxcMagicString, oxcNative, noopTransform } from '../../plugins/sourcemap.js'
const sourceMap = !!process.env.SOURCE_MAP;
const m = !!process.env.MINIFY;

let plugins = [
  process.env.PLUGIN === "0" ? babelMagicString :
  process.env.PLUGIN === "1" ? oxcMagicString :
  process.env.PLUGIN === "2" ? oxcNative :
  process.env.PLUGIN === "3" ? noopTransform :
  null
].filter(Boolean);

export default defineConfig({
  input: {
    main: "./src/index.jsx",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins,
  profilerNames: !m,
  output: {
    minify: m,
    sourcemap: true,
    dir: "rolldown-dist",
  },
});

