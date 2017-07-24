'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createElement;
function createElement() {
  var element = document.createElement('div');
  document.body.appendChild(element);
  return element;
}