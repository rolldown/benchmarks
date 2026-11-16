import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist-vite',
    enableBuildReport: false,
    sourcemap: true,
    reportCompressedSize: false // turn off gzip
  }
})
