const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, args) => {

  const plugins = []

  if (args.mode === 'development') {
    plugins.push(
      new HtmlWebpackPlugin({
        template: './src/html/template.html', // Path to your HTML file
      }),
    )
  }

  return {
    entry: './src/renderers/bundler/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'src/dist'),
    },
    devServer: {
      port: 8080,
      historyApiFallback: true,
      client: {
        progress: true,
      }
    },
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          }
        }
      ],

    },
    plugins,
  }
};