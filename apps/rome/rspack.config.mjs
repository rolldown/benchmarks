import { defineConfig } from "@rspack/cli";
import * as path from "path";

import TerserPlugin from "terser-webpack-plugin";

export default defineConfig({
  entry: "./src/entry.ts",
  devtool: "source-map",
  target: ["node", "es2022"],
  output: {
    path: path.resolve(import.meta.dirname, "dist-rspack"),
    filename: "rspack.js",
    clean: false,
  },
  resolve: {
    extensions: [".ts", ".js"],
    tsConfig: path.resolve(import.meta.dirname, "src/tsconfig.json"),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.esbuildMinify,
        terserOptions: {
          minify: true,
          legalComments: "none",
          target: "es2022",
        },
      }),
    ].filter(Boolean),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            target: "es2022",
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
});
