const webpackConfig = require('./webpack.config.test.js');

const travis = process.env.TRAVIS;

module.exports = function karmaConfig(config) {
  config.set({
    // If running in travis, use custom chrome
    browsers: travis ? ['PhantomJS', 'Chrome_travis_ci'] : ['PhantomJS', 'Chrome'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['../specs/*.{vue,js}'],
    preprocessors: {
      '../specs/*.{vue,js}': ['webpack', 'sourcemap'],
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
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
  });
};
