const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();

const development = {
  entry: './src/renderers/bundler/index.tsx',
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
      template: './src/html/template.html', // Path to your HTML file
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

const production = {
  entry: './src/renderers/bundler/index.tsx',
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

module.exports = (env, args) => ({
  mode: args.mode === 'production' ? 'production' : 'development',
  ...(args.mode === 'production' ? production : development),
});
