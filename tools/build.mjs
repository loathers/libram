/* eslint-env node */

import { build } from "esbuild";
import babel from "esbuild-plugin-babel";

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "rhino1.7.14",
  external: ["kolmafia"],
  plugins: [babel()],
  outfile: "KoLmafia/scripts/libram.js",
}).catch(() => process.exit(1));

export {};
