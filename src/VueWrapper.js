import Wrapper from './Wrapper';

export default class VueWrapper extends Wrapper {
  constructor(vm, mountedToDom) {
    super(vm._vnode, vm._watcher.run.bind(vm._watcher), mountedToDom);
    this.vm = vm;
    this.isVueComponent = true;
  }
}
