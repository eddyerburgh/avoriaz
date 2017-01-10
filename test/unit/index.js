// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = require('function-bind');

// require all test files (files that ends with .test.js)
const testsContext = require.context('./', true, /\.spec/);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('../../src', true, /^\.\/(?!main\.js$).+\.(js|vue)$/i);
srcContext.keys().forEach(srcContext);
