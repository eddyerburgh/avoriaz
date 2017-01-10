const functionBind = require('function-bind');
// Polyfill fn.bind() for PhantomJS
/* eslint-disable no-extend-native */
Function.prototype.bind = functionBind;

// require all test files (files that ends with .test.js)
const testsContext = require.context('./', true, /\.spec/);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('../../src', true, /^\.\/(?!main\.js$).+\.(js|vue)$/i);
srcContext.keys().forEach(srcContext);
