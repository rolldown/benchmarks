// Same options as rolldown.config.mjs. It does not import "rolldown", because that loads the stock binding too.
export default {
  input: {
    main: "./src/index.jsx",
  },
  external: [/\.css$/],
  transform: {
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  },
  output: {
    minify: true,
    sourcemap: true,
    comments: false,
    dir: "dist-rolldown-preview",
  },
};
