/* eslint-disable no-param-reassign */

// @flow

import Vue from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import addGlobals from 'vue-add-globals';
import addSlots from './add-slots';
import addProvide from './add-provide';

function addAttrs(vm, attrs) {
  const consoleWarnSave = console.error;
  console.error = () => {};
  if (attrs) {
    vm.$attrs = attrs;
  } else {
    vm.$attrs = {};
  }
  console.error = consoleWarnSave;
}

export default function createInstance(component: Component, options: MountOptions) {
  const instance = options.instance || Vue;

  // delete cached constructor
  delete component._Ctor;

  if (options.context) {
    if (!component.functional) {
      throw new Error('mount.context can only be used when mounting a functional component');
    }

    if (typeof options.context !== 'object') {
      throw new Error('mount.context must be an object');
    }
    const clonedComponent = cloneDeep(component);
    component = {
      render(h) {
        return h(clonedComponent, options.context, options.children);
      },
    };
  }

  if (options.provide) {
    addProvide(component, options);
  }

  const Constructor = instance.extend(component);

  if (options.globals) {
    addGlobals(Constructor, options.globals);
  }
  const vm = new Constructor(options);

  addAttrs(vm, options.attrs);

  if (options.slots) {
    addSlots(vm, options.slots);
  }

  return vm;
}
