// @ts-check

import { readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";

import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";
import jsdoc from "eslint-plugin-jsdoc";
import libram, { verifyConstantsSinceRevision } from "eslint-plugin-libram";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

const VERIFY_CONSTANTS_SINCE = 29390;

await verifyConstantsSinceRevision(VERIFY_CONSTANTS_SINCE);

// These files aggregate the public API. diet/index.ts is an implementation module.
const publicBarrels = [
  "src/index.ts",
  "src/actions/index.ts",
  "src/challengePaths/index.ts",
  "src/external/index.ts",
  "src/resources/index.ts",
];

// Resolve restrictions relative to each source directory, including index-less
// imports. This also covers new resource years without blocking diet/index.ts.
const sourceDirectories = [
  "src",
  ...readdirSync(join(import.meta.dirname, "src"), {
    recursive: true,
    withFileTypes: true,
  })
    .filter((entry) => entry.isDirectory())
    .map((entry) =>
      relative(
        import.meta.dirname,
        join(entry.parentPath, entry.name),
      ).replaceAll("\\", "/"),
    ),
];

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  jsdoc.configs["flat/recommended-error"],
  prettier,
  ...libram.configs.recommended,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "libram/verify-constants": [
        "error",
        {
          data: {
            items: [],
            locations: [],
          },
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
      "jsdoc/require-jsdoc": [
        "error",
        {
          publicOnly: true,
        },
      ],
      "jsdoc/require-param-type": 0,
      "jsdoc/require-returns-type": 0,
      "jsdoc/require-property-type": 0,
      "jsdoc/tag-lines": 0,
      "jsdoc/no-defaults": 0,
      "jsdoc/check-tag-names": [
        "error",
        {
          // TypeDoc defines some additional valid tags https://typedoc.org/guides/tags/
          definedTags: ["category", "packageDocumentation"],
        },
      ],
    },
  },
  ...sourceDirectories.flatMap((directory) =>
    defineConfig({
      files: [`${directory}/*.ts`],
      ignores: publicBarrels,
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: publicBarrels.flatMap((barrel) => {
              const target =
                relative(directory, dirname(barrel)).replaceAll("\\", "/") ||
                ".";
              const specifier = target.startsWith(".") ? target : `./${target}`;
              return [
                specifier,
                `${specifier}/`,
                `${specifier}/index`,
                `${specifier}/index.js`,
                `${specifier}/index.ts`,
              ].map((name) => ({
                name,
                message:
                  "Import directly from the defining module to avoid barrel-induced circular imports.",
              }));
            }),
            patterns: [
              {
                group: ["libram", "libram/**"],
                message:
                  "Use a relative import from the defining module inside libram.",
              },
            ],
          },
        ],
      },
    }),
  ),
  {
    ignores: ["dist", "KoLmafia", "**/*.{js,cjs}"],
  },
);
