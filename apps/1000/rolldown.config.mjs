import { defineConfig } from "rolldown";
import { minify } from "rollup-plugin-esbuild";
import * as cjsLexer from "cjs-module-lexer";
import esbuild from "esbuild";
cjsLexer.initSync();
const sourceMap = !!process.env.SOURCE_MAP;
const m = !!process.env.MINIFY;


['react', 'react/jsx']


// import base64Msg from 'data:text/javascript;base64, ZXhwb3J0IGRlZmF1bHQgJ2hpJw==';
/**
 *
 * @param {string[]} pkgs
 */
function cjsToEsm(pkgs) {
  let idCount = 0;
  let idCountToCode = {};
  /**
   * @type {import("rolldown").Plugin}
   */
  const reactShims = {
    name: "cjs-to-esm",
    resolveId(id) {
      if (idCountToCode[id]) {
        return id;
      }
    },
    load(id) {
      if (idCountToCode[id]) {
        return idCountToCode[id];
      }
    },
    async transform(rawCode, id) {
      const ids = [
        "react/index.js",
        "react.production.min.js",
        "cjs/react.development.js",
        "react/jsx-runtime.js",
        "react-jsx-runtime.development.js",
        "cjs/react-jsx-runtime.production.min.js",
      ];
      
      const isCjs = ids.some((eachId) => id.includes(eachId));
      // ideally this should be a check for package name that uses passed to plugin
      // Eg: if module.packageJson.name == "react" ...
      if (isCjs) {
        const code = (await esbuild.transform(rawCode, {
          define: { "process.env.NODE_ENV": JSON.stringify("production") },
          minifySyntax: true,
        })).code;
        const exports = cjsLexer.parse(code);
        console.log(exports);
        if (exports.reexports.length === 0 && exports.exports.length > 0) {
          console.log(exports);
          const newId = `cjs-to-esm:${idCount}`;
          const importReact = `import React from '${newId}'`;
          idCountToCode[newId] = code;
          idCount += 1;

          const exportsStr = exports.exports
            .map(
              (exportName) =>
                `export const ${exportName} = React.${exportName};`
            )
            .join("\n");
          const exportDefault = `export default React;`;

          return [importReact, exportsStr, exportDefault].join("\n");
        } else if (
          exports.reexports.length === 1 &&
          exports.exports.length === 0
        ) {
          const dep = exports.reexports[0];
          console.log(dep);
          return [
            `export * as default from '${dep}';`,
            `export * from '${dep}';`,
          ].join("\n");
        }
      }
      return rawCode;
    },
  };
  return reactShims;
}

export default defineConfig({
  input: {
    main: "./src/index.jsx",
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [
    cjsToEsm(),
    m
      ? minify({
          minify: true,
          legalComments: "none",
          target: "es2022",
        })
      : null,
  ].filter(Boolean),
  profilerNames: !m,
  treeshake: true,
  output: {
    minify: false,

    sourcemap: sourceMap,
    dir: "rolldown-dist",
  },
});
