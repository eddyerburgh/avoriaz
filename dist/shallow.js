'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallow;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _lodash = require('lodash');

var _mount = require('./mount');

var _mount2 = _interopRequireDefault(_mount);

var _stubComponents = require('./lib/stub-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shallow(component, options) {
  var clonedComponent = (0, _lodash.cloneDeep)(component);
  if (clonedComponent.components) {
    (0, _stubComponents.replaceComponents)(clonedComponent);
  }

  (0, _stubComponents.replaceGlobalComponents)(_vue2.default, clonedComponent);

  return (0, _mount2.default)(clonedComponent, options);
}