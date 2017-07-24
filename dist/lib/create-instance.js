'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = createInstance;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _lodash = require('lodash');

var _vueAddGlobals = require('vue-add-globals');

var _vueAddGlobals2 = _interopRequireDefault(_vueAddGlobals);

var _addSlots = require('./add-slots');

var _addSlots2 = _interopRequireDefault(_addSlots);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createInstance(component, options) {
  var instance = options.instance || _vue2.default;

  delete component._Ctor;

  if (options.context) {
    (function () {
      if (!component.functional) {
        throw new Error('mount.context can only be used when mounting a functional component');
      }

      if (_typeof(options.context) !== 'object') {
        throw new Error('mount.context must be an object');
      }
      var clonedComponent = (0, _lodash.cloneDeep)(component);
      component = {
        render: function render(h) {
          return h(clonedComponent, options.context, options.children);
        }
      };
    })();
  }

  var Constructor = instance.extend(component);

  if (options.globals) {
    (0, _vueAddGlobals2.default)(Constructor, options.globals);
  }
  var vm = new Constructor(options);

  if (options.attrs) {
    vm.$attrs = options.attrs;
  }

  if (options.slots) {
    (0, _addSlots2.default)(vm, options.slots);
  }

  return vm;
}