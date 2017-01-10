const path = require('path');

const projectRoot = path.resolve(__dirname, '../../');

const webpackConfig = {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          projectRoot,
        ],
        exclude: /node_modules/,
      },
    ],
  },
  devtool: '#inline-source-map',
};

module.exports = function karmaConfig(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
  });
};
