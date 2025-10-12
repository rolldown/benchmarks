import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const sourceMap = !!process.env.SOURCE_MAP;
const minify = !!process.env.MINIFY;

export default defineConfig({
	plugins: [pluginReact()],
  dev: {
    progressBar: false
  },
  output: {
    distPath: 'dist-rsbuild',
    minify,
    sourceMap
  }
});
