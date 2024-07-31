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
    entry: args.mode === 'development' ? './src/renderers/bundler/index.tsx' : './transpiled/src/renderers/bundler/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'src/dist'),
    },
    devServer: {
      port: 8080,
      historyApiFallback: true,
      client: {
        progress: true,
      },
      hot: false
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add all the extensions you are using
    },
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs|jsx|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly:true // important so front-end files won't crash when making chages (and so the hot reload works as expected)
            }
          }
        },
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