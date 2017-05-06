const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Clean = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');

const paths = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
};

const base = {
  context: paths.src,
  entry: 'index.js',
  resolve: {
    modules: [
      paths.src,
      'node_modules',
    ],
    extensions: ['.js'],
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
    }],
  },
};

const dev = {
  devtool: 'eval-source-map',
  plugins: [
    new Html({
      title: 'Tablr &bull; Dev',
    }),
  ],
};

const prod = {
  output: {
    path: paths.dist,
    filename: '[name].js',
  },
  plugins: [
    new Clean(path.resolve(paths.dist, '**', '*'), { root: paths.dist }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};

const environment = { dev, prod };

module.exports = env => merge(base, environment[env]);
