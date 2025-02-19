import { defineConfig } from 'rolldown'
const sourceMap = !!process.env.SOURCE_MAP
const minify = !!process.env.MINIFY

export default defineConfig({
  input: {
    main: './src/index.jsx'
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  profilerNames: !minify,
  output: {
    minify,
    sourcemap: sourceMap,
    dir: 'rolldown-dist'
  }
})
