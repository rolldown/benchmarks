import { defineConfig } from "rolldown";
import * as path from "path";

export default defineConfig({
  input: {
    main: "./src/entry.ts",
  },
  platform: "node",
  cwd: import.meta.dirname,
  transform: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
  shimMissingExports: true,
  tsconfig: path.resolve(import.meta.dirname, "src/tsconfig.json"),
  output: {
    minify: true,
    sourcemap: true,
    dir: "dist-rolldown",
  },
});
