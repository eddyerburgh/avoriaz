const webpackConfig = require('./webpack.config.js');

const travis = process.env.TRAVIS;

module.exports = function karmaConfig(config) {
  config.set({
    // If running in travis, use custom chrome
    browsers: travis ? ['PhantomJS'] : ['PhantomJS', 'Chrome'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['../specs/**/*.+(vue|js)'],
    preprocessors: {
      '../specs/**/*.+(vue|js)': ['webpack', 'sourcemap'],
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
