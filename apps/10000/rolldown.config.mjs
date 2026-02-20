import { defineConfig } from "rolldown";

export default defineConfig({
  input: {
    main: "./src/index.jsx",
  },
  transform: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
  output: {
    minify: true,
    sourcemap: true,
    comments: false,
    dir: "dist-rolldown",
  },
});
