// @flow

import Vue from 'vue';
import { cloneDeep } from 'lodash';
import addGlobals from 'vue-add-globals';
import addSlots from './add-slots';

export default function createInstance(component: Component, options: MountOptions) {
  const instance = options.instance || Vue;

  // delete cached constructor
  delete component._Ctor; // eslint-disable-line no-param-reassign

  if (options.context) {
    if (!component.functional) {
      throw new Error('mount.context can only be used when mounting a functional component');
    }

    if (typeof options.context !== 'object') {
      throw new Error('mount.context must be an object');
    }
    const clonedComponent = cloneDeep(component);
    component = { // eslint-disable-line no-param-reassign
      render(h) {
        return h(clonedComponent, options.context, options.children);
      },
    };
  }

  const Constructor = instance.extend(component);

  if (options.globals) {
    addGlobals(Constructor, options.globals);
  }
  const vm = new Constructor(options);

  if (options.attrs) {
    vm.$attrs = options.attrs;
  }

  if (options.slots) {
    addSlots(vm, options.slots);
  }

  return vm;
}
