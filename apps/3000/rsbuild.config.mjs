import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	plugins: [pluginReact()],
  mode: 'production',
  dev: {
    progressBar: false
  },
  output: {
    distPath: 'dist-rsbuild',
    sourceMap: true
  }
});
