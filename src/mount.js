import Vue from './lib/vue';
import './lib/matchesPolyfill';
import VueWrapper from './VueWrapper';

function createElem() {
  const elem = document.createElement('div');

  document.body.appendChild(elem);

  return elem;
}

export default function mount(component, options, mounted = false) {
  const Constructor = Vue.extend(component);
  const vm = new Constructor(options);

  let elem = null;
  if (mounted) {
    elem = createElem();
  }
  vm.$mount(elem);

  return new VueWrapper(vm, options);
}
