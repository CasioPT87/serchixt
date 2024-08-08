const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

dotenv.config();

const production = {
  entry: './transpiled/src/app.js',
  output: {
    filename: 'bundle-server.js',
    path: path.resolve(__dirname, 'src/dist-server'),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  target: 'node',
  plugins: [
    new webpack.EnvironmentPlugin([
      'BACKEND_URL',
      'BACKEND_AUTH_PATH',
      'BACKEND_USER_PATH',
      'USER_NAME',
      'USER_PASSWORD',
      'COOKIES_PATH',
      'BACKEND_CLOSE_AUTH_PATH',
    ]),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    fallback: {
      fs: require.resolve('fs'),
      tls: false,
      net: false,
      path: require.resolve('path-browserify'),
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      'crypto-browserify': false,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // extensions you used
  },
};

module.exports = (env, args) => ({
  mode: 'production',
  ...production,
});
