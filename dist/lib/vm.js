"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vmCtorMatchesName = vmCtorMatchesName;
exports.findVueComponents = findVueComponents;


function findAllVueComponents(vm) {
  var components = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  components.push(vm);

  vm.$children.forEach(function (child) {
    findAllVueComponents(child, components);
  });

  return components;
}

function vmCtorMatchesName(vm, name) {
  return vm.$vnode && vm.$vnode.componentOptions.Ctor.options.name === name || vm._vnode && vm._vnode.functionalOptions && vm._vnode.functionalOptions.name === name;
}

function findVueComponents(vm, componentName) {
  var components = findAllVueComponents(vm);
  return components.filter(function (component) {
    if (!component.$vnode) {
      return false;
    }
    return vmCtorMatchesName(component, componentName);
  });
}