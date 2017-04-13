import Vue from './lib/vue';
import VueWrapper from './VueWrapper';
import './lib/matchesPolyfill';

function createElem() {
  const elem = document.createElement('div');

  document.body.appendChild(elem);

  return elem;
}

export default function mount(component, options = {}) {
  let elem = null;
  const mountedToDocument = options.mountToDocument;

  if (mountedToDocument) {
    elem = createElem();
    delete options.mountToDocument; // eslint-disable-line no-param-reassign
  }

  const Constructor = Vue.extend(component);
  const vm = new Constructor(options);
  vm.$mount(elem);

  return new VueWrapper(vm);
}
