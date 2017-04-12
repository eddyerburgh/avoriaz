import Vue from './lib/vue';
import './lib/matchesPolyfill';
import VueWrapper from './VueWrapper';

function createElem() {
  const elem = document.createElement('div');

  document.body.appendChild(elem);

  return elem;
}

export default function mount(component, options, mounted = false) {
  let elem = null;
  let mountOptions = options;
  let mountedToDocument = mounted;

  if (typeof options === 'boolean') {
    mountedToDocument = options;
    mountOptions = {};
  }

  if (mountedToDocument) {
    elem = createElem();
  }

  const Constructor = Vue.extend(component);
  const vm = new Constructor(mountOptions);
  vm.$mount(elem);

  return new VueWrapper(vm, mountOptions);
}
