/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "libram", "jsdoc"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsdoc/recommended-error",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],
    "libram/verify-constants": "error",
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
      },
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
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
      },
    },
  },
};
