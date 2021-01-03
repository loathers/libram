const { DefinePlugin, ProvidePlugin } = require("webpack");
const path = require("path");
const fs = require("fs");

module.exports = {
  mode: 'development',
  devtool: false,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  entry: fs.readdirSync(__dirname)
    .filter(f => f.match(/.*\.(ts|js)$/) && !/webpack.config.js/i.test(f))
    .reduce((a, f) => ({ ...a, [f.split('.').slice(0, -1).join('.')]: path.join(__dirname, f) }), {}),
  output: {
    libraryTarget: 'commonjs',
    filename: 'libram-example-[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        // exclude: /node_modules(?!\/(libram|buffer))/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_DEBUG': false,
      'process.env.NODE_ENV': "'development'",
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      console: path.resolve(path.join(__dirname, '../src/console')),
    }),
  ],
  externals: {
    kolmafia: 'commonjs kolmafia',
  },
};