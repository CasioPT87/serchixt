const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');

dotenv.config();

const development = {
  entry: './src/core/renderers/bundler/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/dist/dev'),
  },
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'src/dist/dev/'),
    },
    historyApiFallback: true,
    client: {
      progress: true,
    },
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add all the extensions you are using
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true, // important so front-end files won't crash when making chages (and so the hot reload works as expected)
          },
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/core/html/template.html', // Path to your HTML file
    }),
    new webpack.EnvironmentPlugin([
      'BACKEND_URL',
      'BACKEND_AUTH_PATH',
      'BACKEND_USER_PATH',
      'USER_NAME',
      'USER_PASSWORD',
      'COOKIES_PATH',
      'BACKEND_CLOSE_AUTH_PATH',
      'SERVER_URL',
    ]),
  ],
};

const productionFrontBundle = {
  entry: './src/core/renderers/bundler/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add all the extensions you are using
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'BACKEND_URL',
      'BACKEND_AUTH_PATH',
      'BACKEND_USER_PATH',
      'USER_NAME',
      'USER_PASSWORD',
      'COOKIES_PATH',
      'BACKEND_CLOSE_AUTH_PATH',
      'SERVER_URL',
    ]),
  ],
};

const serverBundle = {
  entry: './transpiled/src/app.js',
  output: {
    filename: 'bundle-server.js',
    path: path.resolve(__dirname, 'src/dist-server'),
  },
  externals: [nodeExternals()],
  devtool: process.env.NODE_ENV === 'production' ? '' : 'source-map', 
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: 'pre'
      }
    ],
  },
  target: 'node',
  plugins: [new MiniCssExtractPlugin()],
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

const bundles = {
  production: { mode: 'production', bundle: productionFrontBundle },
  'production-server': { mode: 'production', bundle: serverBundle },
  development: { mode: 'development', bundle: development },
};

module.exports = (env, args) => ({
  mode: bundles[env.bundle].mode,
  ...bundles[env.bundle].bundle,
});
