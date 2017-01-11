import Vue from 'vue';
import VueWrapper from './VueWrapper';

export default function render(component) {
  const Constructor = Vue.extend(component);
  const vm = new Constructor();
  return new VueWrapper(vm.$mount());
}
