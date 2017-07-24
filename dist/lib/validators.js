'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isDomSelector = isDomSelector;
exports.isVueComponent = isVueComponent;
exports.isValidSelector = isValidSelector;
function isDomSelector(str) {
  if (typeof str !== 'string') {
    return false;
  }

  try {
    if (!document) {
      throw new Error('avoriaz must be run in a browser environment like PhantomJS, jsdom or chrome');
    }
  } catch (error) {
    throw new Error('avoriaz must be run in a browser environment like PhantomJS, jsdom or chrome');
  }

  try {
    document.querySelector(str);
    return true;
  } catch (error) {
    return false;
  }
}

function isVueComponent(component) {
  if (typeof component === 'function') {
    return false;
  }

  if (component === null) {
    return false;
  }

  if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) !== 'object') {
    return false;
  }

  return typeof component.render === 'function';
}

function isValidSelector(selector) {
  if (isDomSelector(selector)) {
    return true;
  }

  return isVueComponent(selector);
}