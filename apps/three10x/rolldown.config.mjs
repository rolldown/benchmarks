import { defineConfig } from "rolldown";

export default defineConfig({
  input: {
    main: "./entry.js",
  },
  transform: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
  output: {
    minify: true,
    sourcemap: true,
    dir: "dist-rolldown",
  },
});
