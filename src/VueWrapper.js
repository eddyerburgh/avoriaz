import Wrapper from './Wrapper';

export default class VueWrapper extends Wrapper {
  constructor(vm) {
    super(vm._vnode, vm._watcher.run.bind(vm._watcher));

    this.vm = vm;
    Object.defineProperty(this, 'vNode', {
      get: () => this.vm._vnode,
      set: () => {},
    });
    this.isVueComponent = true;
  }
}
