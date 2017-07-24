'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mount;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _VueWrapper = require('./VueWrapper');

var _VueWrapper2 = _interopRequireDefault(_VueWrapper);

var _createInstance = require('./lib/create-instance');

var _createInstance2 = _interopRequireDefault(_createInstance);

var _createElement = require('./lib/create-element');

var _createElement2 = _interopRequireDefault(_createElement);

require('./lib/matches-polyfill');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.productionTip = false;

function mount(component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var vm = (0, _createInstance2.default)(component, options);

  if (options.attachToDocument) {
    vm.$mount((0, _createElement2.default)());
  } else {
    vm.$mount();
  }

  return new _VueWrapper2.default(vm, !!options.attachToDocument);
}