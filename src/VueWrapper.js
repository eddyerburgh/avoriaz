// @flow

import Wrapper from './Wrapper';

function update() {
  this.$forceUpdate.call(this);
  this._update(this._render());
}

export default class VueWrapper extends Wrapper {
  constructor(vm: Component, mountedToDom: boolean) {
    super(vm._vnode, update.bind(vm), mountedToDom);
    this.vm = vm;
    // $FlowIgnore
    Object.defineProperty(this, 'vNode', {
      get: () => this.vm._vnode,
      set: () => {},
    });
    this.isVueComponent = true;
  }
}
