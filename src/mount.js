import Vue from 'vue';
import VueWrapper from './VueWrapper';
import createInstance from './lib/createInstance';
import './lib/matchesPolyfill';

Vue.config.productionTip = false;

function createElem() {
  const elem = document.createElement('div');
  document.body.appendChild(elem);
  return elem;
}

export default function mount(component, options = {}) {
  const vm = createInstance(component, options);

  if (options.attachToDocument) {
    vm.$mount(createElem());
  } else {
    vm.$mount();
  }

  return new VueWrapper(vm, options.attachToDocument);
}
