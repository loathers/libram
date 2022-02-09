// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "libram"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:import/recommended",
    "plugin:import/typescript",
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
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
};
