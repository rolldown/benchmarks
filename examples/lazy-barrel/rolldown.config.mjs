import { defineConfig } from "rolldown";

let counter = 0;
export default defineConfig({
  input: "./index.js",
  plugins: [
    {
      name: "count-modules",
      transform() {
        counter++;
      },
      buildEnd() {
        console.log("Modules count:", counter);
      },
    },
  ],
  experimental: {
    lazyBarrel: true,
  },
});
