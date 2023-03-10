/* eslint-env node */
import { build } from "esbuild";
import babel from "esbuild-plugin-babel";

build({
  entryPoints: { libram: "src/index.ts" },
  outdir: "KoLmafia/scripts",
  bundle: true,
  minifySyntax: true,
  platform: "node",
  target: "rhino1.7.14",
  external: ["kolmafia"],
  plugins: [babel()],
  loader: { ".json": "text" },
  inject: ["./kolmafia-polyfill.js"],
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
