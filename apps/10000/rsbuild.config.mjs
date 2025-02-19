import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

const minify = !!process.env.MINIFY

export default defineConfig({
  plugins: [pluginReact()],
  dev: {
    progressBar: false
  },
  tools: {
    rspack: {
      optimization: {
        minimize: minify
      }
    }
  }
})
