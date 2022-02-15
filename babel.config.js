/* eslint-env node */

module.exports = function (api) {
  api.cache(true);
  return {
    exclude: [],
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          targets: { rhino: "1.7.14" },
        },
      ],
    ],
    plugins: ["@babel/plugin-proposal-object-rest-spread"],
  };
};
