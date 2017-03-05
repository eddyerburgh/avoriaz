import Vue from './lib/vue';
import './lib/matchesPolyfill';
import VueWrapper from './VueWrapper';

export default function mount(component, options) {
  const Constructor = Vue.extend(component);
  const vm = new Constructor(options);
  vm.$mount();
  return new VueWrapper(vm, options);
}
