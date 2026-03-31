import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  mode: 'production',
  splitChunks: false,
  performance: {
    printFileSize: {
      compressed: false // turn off gzip
    }
  },
  output: {
    distPath: 'dist-rsbuild',
    sourceMap: true
  }
});
