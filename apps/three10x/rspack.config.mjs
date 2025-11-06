import { defineConfig } from "@rspack/cli";
import { fileURLToPath } from "node:url";
import path from "node:path";

import TerserPlugin from "terser-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: "./entry.js",
  devtool: "source-map",
  target: ["web", "es2022"],
  output: {
    path: path.resolve(__dirname, "dist-rspack"),
    filename: "rspack.js",
    clean: false,
  },
  resolve: {
    extensions: [".js", ".jsx"],
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
        test: /\.jsx$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  pragma: "React.createElement",
                  pragmaFrag: "React.Fragment",
                  throwIfNamespace: true,
                  development: false,
                  useBuiltins: false,
                },
              },
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
});
