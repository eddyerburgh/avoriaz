import Vue from 'vue';
import Wrapper from './Wrapper';

export default class VueWrapper extends Wrapper {

  constructor(component, options) {
    const Constructor = Vue.extend(component);
    const vm = new Constructor(options);
    const mountedVm = vm.$mount();

    super(mountedVm._vnode); // eslint-disable-line no-underscore-dangle
  }
}
