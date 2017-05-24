const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Clean = require('clean-webpack-plugin');
const Html = require('html-webpack-plugin');

const dir = {
  src: path.resolve('src'),
  dist: path.resolve('dist'),
};

const base = {
  context: dir.src,
  entry: 'index.js',
  resolve: {
    modules: [
      dir.src,
      'node_modules',
    ],
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
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    'index.js',
  ],
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin({ multistep: true }),
    new Html({ template: path.resolve('devTemplate.html') }),
  ],
  devServer: {
    inline: true,
    hot: true,
    contentBase: dir.dist,
    historyApiFallback: true,
    stats: 'minimal',
    publicPath: '/',
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
};

const prod = {
  output: {
    path: dir.dist,
    filename: '[name].js',
  },
  plugins: [
    new Clean(path.resolve(dir.dist, '**', '*'), { root: dir.dist }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};

const environment = { dev, prod };

module.exports = env => merge(base, environment[env]);
