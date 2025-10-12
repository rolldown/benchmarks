import { defineConfig } from "@farmfe/core";

export default defineConfig({
  plugins: ["@farmfe/plugin-react"],
  compilation: {
    minify: true,
    persistentCache: false,
    input: {
      main: "./index.html",
    },
    progress: false,
    output: {
      path: 'dist-farm'
    },
    sourcemap: true
  },
});
