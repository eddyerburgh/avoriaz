import Vue from 'vue';
import Wrapper from './Wrapper';

export default class VueWrapper extends Wrapper {

  constructor(component, options) {
    const Constructor = Vue.extend(component);
    const vm = new Constructor(options);
    vm.$mount();
    super(vm._vnode, vm._watcher.run.bind(vm._watcher));
    this.vm = vm;
    this.isVueComponent = true;
  }
}
