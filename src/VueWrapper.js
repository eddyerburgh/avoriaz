import Wrapper from './Wrapper';

function update() {
  this.$forceUpdate.call(this);
  this._update(this._render());
  this._watchers.forEach(watcher => watcher.run());
}

export default class VueWrapper extends Wrapper {
  constructor(vm, mountedToDom) {
    super(vm._vnode, update.bind(vm), mountedToDom);
    this.vm = vm;
    Object.defineProperty(this, 'vNode', {
      get: () => this.vm._vnode,
      set: () => {},
    });
    this.isVueComponent = true;
  }
}
