import Vue from 'vue';
import VueWrapper from './VueWrapper';

export default function mount(component) {
  const Ctor = Vue.extend(component);
  const vm = new Ctor().$mount();
  return new VueWrapper(vm);
}
