import Vue from './lib/vue';
import VueWrapper from './VueWrapper';
import './lib/matchesPolyfill';
import addSlots from './lib/addSlots';

Vue.config.productionTip = false;

function createElem() {
  const elem = document.createElement('div');

  document.body.appendChild(elem);

  return elem;
}

export default function mount(component, options = {}) {
  let elem = null;
  const attachToDocument = options.attachToDocument;

  if (attachToDocument) {
    elem = createElem();
    delete options.attachToDocument; // eslint-disable-line no-param-reassign
  }

  const Constructor = Vue.extend(component);
  const vm = new Constructor(options);

  if (options.slots) {
    addSlots(vm, options.slots);
  }

  vm.$mount(elem);

  return new VueWrapper(vm, attachToDocument);
}
