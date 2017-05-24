const path = require('path');
const webpackConfig = require('./webpack.config');

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: ['tests/**/*.js'],
    preprocessors: {
      'tests/**/*.js': ['webpack'],
    },
    browsers: ['Chrome'],
    singleRun: true,
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },
  });
};
