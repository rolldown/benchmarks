import { defineConfig } from "rolldown";
// import { minify } from "rollup-plugin-esbuild";
const sourceMap = !!process.env.SOURCE_MAP;
const m = !!process.env.MINIFY;
const transformPluginCount = process.env.PLUGIN_COUNT || 0;

let transformCssPlugin = Array.from({ length: transformPluginCount }, (_, i) => {
  let index = i + 1;
  return {
    name: `transform-css-${index}`,
    transform: {
      filter: {
        id: {
          include: new RegExp(`foo${index}.css$`),
        }
      },
      handler(code, id) {
        if (id.endsWith(`foo${index}.css`)) {
          return {
            code: `.index-${index} {
  color: red;
}`,
            map: null,
          };
        }
      }
    }
  }
})
export default defineConfig({
	input: {
		main: "./src/index.jsx",
	},
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
	plugins: [
    ...transformCssPlugin,
	].filter(Boolean),
	profilerNames: !m,
	output: {
		minify: false,
		sourcemap: sourceMap,
		dir: "rolldown-dist",
	},
});

