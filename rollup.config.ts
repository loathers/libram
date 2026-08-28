import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

const watch = process.argv.includes("--watch") || process.argv.includes("-w");

const baseSettings = {
  output: {
    dir: "KoLmafia/scripts",
    format: "cjs",
    entryFileNames: "[name].js",
    chunkFileNames: "[name].js",
    exports: "auto",
  },

  external: ["kolmafia"],

  plugins: [
    replace({
      preventAssignment: true,
      values: {
        "process.env.GITHUB_SHA": JSON.stringify(
          process.env.GITHUB_SHA ?? "CustomBuild",
        ),
        "process.env.GITHUB_REF_NAME": JSON.stringify(
          process.env.GITHUB_REF_NAME ?? "CustomBuild",
        ),
        "process.env.GITHUB_REPOSITORY": JSON.stringify(
          process.env.GITHUB_REPOSITORY ?? "CustomBuild",
        ),
      },
    }),

    resolve({
      extensions: [".js", ".ts"],
    }),

    commonjs(),

    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".ts"],
      babelrc: false,
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              rhino: "1.8.0",
            },
          },
        ],
        "@babel/preset-typescript",
      ],
    }),
  ],

  watch: watch
    ? {
      clearScreen: false,
    }
    : undefined,
};

export default [{ libram: "src/index.ts" }].map((input) => ({
  input,
  ...baseSettings,
}));
