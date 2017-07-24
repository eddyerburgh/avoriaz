'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _findMatchingVnodes = require('./lib/find-matching-vnodes');

var _findMatchingVnodes2 = _interopRequireDefault(_findMatchingVnodes);

var _vm = require('./lib/vm');

var _validators = require('./lib/validators');

var _VueWrapper = require('./VueWrapper');

var _VueWrapper2 = _interopRequireDefault(_VueWrapper);

var _logger = require('./lib/logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wrapper = function () {
  function Wrapper(vNode, update, mountedToDom) {
    _classCallCheck(this, Wrapper);

    this.vNode = vNode;
    this.element = vNode.elm;
    this.update = update;
    this.mountedToDom = mountedToDom;
  }

  _createClass(Wrapper, [{
    key: 'computed',
    value: function computed() {
      if (!this.isVueComponent) {
        (0, _logger.error)('wrapper.computed() can only be called on a Vue instance');
      }

      (0, _logger.warn)('functions returned by computed() will not have this bound to the vue instance. Calling a computed function that uses this will result in an error. You can access computed functions by using the vue instance. e.g. to call a computed function named compFunc, call wrapper.vm.compFunc. See https://github.com/eddyerburgh/avoriaz/issues/15');

      return this.vm.$options.computed;
    }
  }, {
    key: 'contains',
    value: function contains(selector) {
      if (!(0, _validators.isValidSelector)(selector)) {
        (0, _logger.error)('wrapper.contains() must be passed a valid CSS selector or a Vue constructor');
      }

      if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
        var vm = this.vm || this.vNode.context.$root;
        return (0, _vm.findVueComponents)(vm, selector.name).length > 0;
      }

      return this.element.querySelectorAll(selector).length > 0;
    }
  }, {
    key: 'data',
    value: function data() {
      if (!this.isVueComponent) {
        (0, _logger.error)('wrapper.data() can only be called on a Vue instance');
      }

      return this.vm._data;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (!this.isVueComponent) {
        (0, _logger.error)('wrapper.destroy() can only be called on a Vue instance');
      }

      if (this.vm.$el.parentNode) {
        this.vm.$el.parentNode.removeChild(this.vm.$el);
      }

      this.vm.$destroy();
    }
  }, {
    key: 'dispatch',
    value: function dispatch(type) {
      if (typeof type !== 'string') {
        (0, _logger.error)('wrapper.dispatch() must be passed a string');
      }

      (0, _logger.warn)('wrapper.dispatch() is deprecated and will be removed from future versions. Use wrapper.trigger() instead - https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/trigger.html');

      var modifiers = {
        enter: 13,
        tab: 9,
        delete: 46,
        esc: 27,
        space: 32,
        up: 38,
        down: 40,
        left: 37,
        right: 39
      };

      var event = type.split('.');

      var eventObject = new window.Event(event[0]);

      if (event.length === 2) {
        eventObject.keyCode = modifiers[event[1]];
      }

      if (this.isVueComponent) {
        this.vm.$emit(type);
      }

      this.element.dispatchEvent(eventObject);

      this.update();
    }
  }, {
    key: 'find',
    value: function find(selector) {
      var _this = this;

      if (!(0, _validators.isValidSelector)(selector)) {
        (0, _logger.error)('wrapper.find() must be passed a valid CSS selector or a Vue constructor');
      }

      if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
        if (!selector.name) {
          (0, _logger.error)('.find() requires component to have a name property');
        }
        var vm = this.vm || this.vNode.context.$root;
        var components = (0, _vm.findVueComponents)(vm, selector.name);
        return components.map(function (component) {
          return new _VueWrapper2.default(component, _this.mountedToDom);
        });
      }

      var nodes = (0, _findMatchingVnodes2.default)(this.vNode, selector);

      return nodes.map(function (node) {
        return new Wrapper(node, _this.update, _this.mountedToDom);
      });
    }
  }, {
    key: 'first',
    value: function first(selector) {
      var nodes = this.find(selector);

      if (!nodes.length) {
        (0, _logger.error)('wrapper.first() has no matches with the given selector');
      }

      return nodes[0];
    }
  }, {
    key: 'hasAttribute',
    value: function hasAttribute(attribute, value) {
      if (typeof attribute !== 'string') {
        (0, _logger.error)('wrapper.hasAttribute() must be passed attribute as a string');
      }

      if (typeof value !== 'string') {
        (0, _logger.error)('wrapper.hasAttribute() must be passed value as a string');
      }

      return this.element.getAttribute(attribute) === value;
    }
  }, {
    key: 'hasClass',
    value: function hasClass(className) {
      if (typeof className !== 'string') {
        (0, _logger.error)('wrapper.hasClass() must be passed a string');
      }

      return this.element.className.split(' ').indexOf(className) !== -1;
    }
  }, {
    key: 'hasStyle',
    value: function hasStyle(style, value) {
      if (typeof style !== 'string') {
        (0, _logger.error)('wrapper.hasStyle() must be passed style as a string');
      }

      if (typeof value !== 'string') {
        (0, _logger.error)('wrapper.hasClass() must be passed value as string');
      }

      if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
        (0, _logger.warn)('wrapper.hasStyle is not fully supported when running jsdom - only inline styles are supported');
      }
      var body = document.querySelector('body');
      var mockElement = document.createElement('div');

      var mockNode = body.insertBefore(mockElement, null);

      mockElement.style[style] = value;

      if (!this.mountedToDom) {
        var vm = this.vm || this.vNode.context.$root;

        body.insertBefore(vm.$root._vnode.elm, null);
      }

      var elStyle = window.getComputedStyle(this.element)[style];
      var mockNodeStyle = window.getComputedStyle(mockNode)[style];
      return elStyle === mockNodeStyle;
    }
  }, {
    key: 'html',
    value: function html() {
      var tmp = document.createElement('div');
      tmp.appendChild(this.element);
      return tmp.innerHTML;
    }
  }, {
    key: 'instance',
    value: function instance() {
      if (!this.isVueComponent) {
        (0, _logger.error)('wrapper.instance() can only be called on a Vue instance');
      }

      return this.vm;
    }
  }, {
    key: 'is',
    value: function is(selector) {
      if (!(0, _validators.isValidSelector)(selector)) {
        (0, _logger.error)('wrapper.is() must be passed a valid CSS selector or a Vue constructor');
      }

      if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
        if (!this.isVueComponent) {
          return false;
        }

        return (0, _vm.vmCtorMatchesName)(this.vm, selector.name);
      }

      if (selector[0] === '.') {
        return this.element.className.split(' ').indexOf(selector.substr(1)) !== -1;
      }

      if (selector[0] === '#') {
        return this.element.getAttribute('id') === selector.substr(1);
      }

      return this.element.tagName === selector.toUpperCase();
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.vNode.children === undefined;
    }
  }, {
    key: 'methods',
    value: function methods() {
      if (!this.isVueComponent) {
        (0, _logger.error)('wrapper.methods() can only be called on a Vue instance');
      }

      (0, _logger.warn)('functions returned by methods() will not have this bound to the vue instance. Calling a method that uses this will result in an error. You can access methods by using the vue instance. e.g. to call a method function named aMethod, call wrapper.vm.aMethod(). See https://github.com/eddyerburgh/avoriaz/issues/15');

      return this.vm.$options.methods;
    }
  }, {
    key: 'name',
    value: function name() {
      if (this.isVueComponent) {
        return this.vm.$options.name;
      }

      return this.vNode.tag;
    }
  }, {
    key: 'propsData',
    value: function propsData() {
      if (!this.isVueComponent) {
        (0, _logger.error)('wrapper.propsData() can only be called on a Vue instance');
      }

      (0, _logger.warn)('functions returned by propsData() will not have this bound to the vue instance. Calling a propsData function that uses this will result in an error. You can access propsData functions by using the vue instance. e.g. to call a method function named propsDataFunc, call wrapper.vm.$props.propsDataFunc(). See https://github.com/eddyerburgh/avoriaz/issues/15');

      return this.vm.$props;
    }
  }, {
    key: 'setData',
    value: function setData(data) {
      var _this2 = this;

      if (!this.isVueComponent) {
        (0, _logger.error)('wrapper.setData() can only be called on a Vue instance');
      }

      Object.keys(data).forEach(function (key) {
        _this2.vm.$set(_this2.vm, [key], data[key]);
      });
      this.update();
      this.vNode = this.vm._vnode;
    }
  }, {
    key: 'setProps',
    value: function setProps(props) {
      var _this3 = this;

      if (!this.isVueComponent) {
        (0, _logger.error)('wrapper.setProps() can only be called on a Vue instance');
      }
      var vm = this.vm || this.vNode.context.$root;

      Object.keys(props).forEach(function (key) {
        _this3.vm._props[key] = props[key];
      });
      Object.keys(props).forEach(function (key) {
        vm._watchers.forEach(function (watcher) {
          if (watcher.expression === key) {
            watcher.run();
          }
        });
      });
      this.update();

      this.vNode = this.vm._vnode;
    }
  }, {
    key: 'simulate',
    value: function simulate(type) {
      if (typeof type !== 'string') {
        (0, _logger.error)('wrapper.simulate() must be passed a string');
      }

      (0, _logger.warn)('wrapper.simulate() is deprecated and will be removed from future versions. Use wrapper.trigger() instead - https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/trigger.html');

      var modifiers = {
        enter: 13,
        tab: 9,
        delete: 46,
        esc: 27,
        space: 32,
        up: 38,
        down: 40,
        left: 37,
        right: 39
      };

      var event = type.split('.');

      var eventObject = new window.Event(event[0]);

      if (event.length === 2) {
        eventObject.keyCode = modifiers[event[1]];
      }

      this.element.dispatchEvent(eventObject);
      this.update();
    }
  }, {
    key: 'style',
    value: function style() {
      (0, _logger.warn)('wrapper.style() is deprecated and will be removed from future versions. Use wrapper.hasStyle() instead');

      var node = document.querySelector('body').insertBefore(this.element, null);
      return window.getComputedStyle(node);
    }
  }, {
    key: 'text',
    value: function text() {
      return this.element.textContent;
    }
  }, {
    key: 'trigger',
    value: function trigger(type) {
      if (typeof type !== 'string') {
        (0, _logger.error)('wrapper.trigger() must be passed a string');
      }

      this.update();

      var modifiers = {
        enter: 13,
        tab: 9,
        delete: 46,
        esc: 27,
        space: 32,
        up: 38,
        down: 40,
        left: 37,
        right: 39
      };

      var event = type.split('.');

      var eventObject = void 0;

      if (typeof Event === 'function') {
        eventObject = new window.Event(event[0]);
      } else {
        eventObject = document.createEvent('Event');
        eventObject.initEvent(event[0], true, true);
      }

      if (event.length === 2) {
        eventObject.keyCode = modifiers[event[1]];
      }

      this.element.dispatchEvent(eventObject);

      this.update();
    }
  }]);

  return Wrapper;
}();

exports.default = Wrapper;