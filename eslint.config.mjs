// @ts-check

import eslint from "@eslint/js";
import jsdoc from "eslint-plugin-jsdoc";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import libram, { verifyConstantsSinceRevision } from "eslint-plugin-libram";
import { defineConfig } from "eslint/config";

const VERIFY_CONSTANTS_SINCE = 28891;

await verifyConstantsSinceRevision(VERIFY_CONSTANTS_SINCE);

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  jsdoc.configs["flat/recommended-error"],
  prettier,
  ...libram.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_" },
      ],
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
  {
    ignores: ["dist", "KoLmafia", "**/*.{js,cjs}"],
  },
);
