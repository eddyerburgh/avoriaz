'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.replaceGlobalComponents = replaceGlobalComponents;
exports.replaceComponents = replaceComponents;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated'];

function stubLifeCycleEvents(component) {
  LIFECYCLE_HOOKS.forEach(function (hook) {
    component[hook] = function () {};
  });
}
function isRequired(name) {
  return name === 'KeepAlive' || name === 'Transition' || name === 'TransitionGroup';
}

function extractCoreProps(component) {
  return {
    attrs: component.attrs,
    name: component.name,
    on: component.on,
    key: component.key,
    ref: component.ref,
    props: component.props,
    domProps: component.domProps,
    class: component.class,
    staticClass: component.staticClass,
    staticStyle: component.staticStyle,
    style: component.style
  };
}
function replaceGlobalComponents(instance, component) {
  Object.keys(instance.options.components).forEach(function (c) {
    if (isRequired(c)) {
      return;
    }
    if (!component.components) {
      component.components = {};
    }
    component.components[c] = _extends({
      render: function render() {}
    }, extractCoreProps(instance.options.components[c]));
    delete component.components[c]._Ctor;
    stubLifeCycleEvents(component.components[c]);
    stubLifeCycleEvents(instance.options.components[c]);
  });
}

function replaceComponents(component) {
  Object.keys(component.components).forEach(function (c) {
    delete component.components[c]._Ctor;
    component.components[c] = _extends({}, extractCoreProps(component.components[c]), {
      render: function render() {}
    });
    _vue2.default.config.ignoredElements.push(c);
    stubLifeCycleEvents(component.components[c]);
  });
}