import { defineConfig } from "rolldown";

export default defineConfig({
  input: {
    main: "./src/index.jsx",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  profilerNames: false,
  output: {
    minify: true,
    sourcemap: true,
    dir: "dist-rolldown",
  },
});
