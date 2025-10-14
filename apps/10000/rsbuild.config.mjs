import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  mode: 'production',
  dev: {
    progressBar: false
  },
  performance: {
    printFileSize: {
      compressed: false // turn off gzip
    }
  },
  output: {
    distPath: {
      root: 'dist-rsbuild'
    },
    sourceMap: true
  }
});
