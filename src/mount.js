// @flow

import Vue from 'vue';
import VueWrapper from './VueWrapper';
import createInstance from './lib/create-instance';
import createElement from './lib/create-element';
import './lib/matches-polyfill';

Vue.config.productionTip = false;

export default function mount(component: Component, options: MountOptions = {}) {
  const vm = createInstance(component, options);

  if (options.attachToDocument) {
    vm.$mount(createElement());
  } else {
    vm.$mount();
  }

  return new VueWrapper(vm, !!options.attachToDocument);
}
