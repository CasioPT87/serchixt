const path = require("path");
const webpack = require("webpack");
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require("html-webpack-plugin");

dotenv.config();

module.exports = (env, args) => {

  const plugins = [];

  if (args.mode === "development") {
    plugins.push(
      new HtmlWebpackPlugin({
        template: "./src/html/template.html", // Path to your HTML file
      })
    );
  }

  plugins.push(
    new webpack.EnvironmentPlugin([
      'BACKEND_URL',
      'BACKEND_AUTH_PATH',
      'BACKEND_USER_PATH',
      'USER_NAME',
      'USER_PASSWORD',
      'FRONT_END_URL',
      'COOKIES_PATH',      
    ])
  )

return {
    entry:
      args.mode === "development"
        ? "./src/renderers/bundler/index.tsx"
        : "./transpiled/src/renderers/bundler/index.js",
    output: {
      filename: "bundle.js",
      path:
        args.mode === "development"
          ? path.resolve(__dirname, "src/dist/dev")
          : path.resolve(__dirname, "src/dist"),
    },
    devServer: {
      port: 8080,
      static: {
        directory: path.join(__dirname, "src/dist/dev/"),
      },
      historyApiFallback: true,
      client: {
        progress: true,
      },
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"], // Add all the extensions you are using
    },
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true, // important so front-end files won't crash when making chages (and so the hot reload works as expected)
            },
          },
        },
      ],
    },
    plugins,
  };
};
