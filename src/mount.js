import Vue from 'vue';
import addGlobals from 'vue-add-globals';
import { cloneDeep } from 'lodash';
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

  delete component._Ctor; // eslint-disable-line no-param-reassign

  if (options.context) {
    if (!component.functional) {
      throw new Error('mount.context can only be used when mounting a functional component');
    }

    if (typeof options.context !== 'object') {
      throw new Error('mount.context must be an object');
    }
    const clonedComponent = cloneDeep(component);
    component = { // eslint-disable-line no-param-reassign
      render(h) {
        return h(clonedComponent, options.context);
      },
    };
  }
  let Constructor;

  if (options.instance) {
    Constructor = options.instance.extend(component);
  } else {
    Constructor = Vue.extend(component);
  }

  if (options.globals) {
    const globals = addGlobals(options.globals);
    Constructor.use(globals);
  }
  const vm = new Constructor(options);

  if (options.slots) {
    addSlots(vm, options.slots);
  }

  vm.$mount(elem);

  return new VueWrapper(vm, attachToDocument);
}
