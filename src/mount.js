import Vue from 'vue';
import VueWrapper from './VueWrapper';
import createInstance from './lib/createInstance';
import createElement from './lib/createElement';
import './lib/matchesPolyfill';

Vue.config.productionTip = false;

export default function mount(component, options = {}) {
  const vm = createInstance(component, options);

  if (options.attachToDocument) {
    vm.$mount(createElement());
  } else {
    vm.$mount();
  }

  return new VueWrapper(vm, options.attachToDocument);
}
