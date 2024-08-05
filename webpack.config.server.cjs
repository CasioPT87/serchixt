const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");

dotenv.config();

const production = {
  entry: "./transpiled/src/app.js",
  output: {
    filename: "bundle-server.js",
    path: path.resolve(__dirname, "src/dist-server"),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [{
          loader: 'style-loader',
          options: {
            insert: function insertAtTop(element) {
              // Select the specific DOM element where styles should be inserted
              var parent = document.querySelector('#your-element-id');
              // Insert the style tag as the first child of the parent
              parent.insertBefore(element, parent.firstChild);
            },
          },
        }, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      "BACKEND_URL",
      "BACKEND_AUTH_PATH",
      "BACKEND_USER_PATH",
      "USER_NAME",
      "USER_PASSWORD",
      "FRONT_END_URL",
      "COOKIES_PATH",
    ]),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: require.resolve("path-browserify"),
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      "crypto-browserify": false, //require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Add all the extensions you are using
  },
};

module.exports = (env, args) => ({
  mode: "production",
  ...production,
});
