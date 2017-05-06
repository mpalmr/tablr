const path = require('path');
const merge = require('webpack-merge');
const Html = require('html-webpack-plugin');

const paths = {
  src: path.resolve('src'),
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

module.exports = env => merge(base, dev);
