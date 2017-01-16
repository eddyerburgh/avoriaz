import Wrapper from './Wrapper';

export default class VueWrapper extends Wrapper {

  constructor(vm) {
    super(vm._vnode, vm._watcher.run.bind(vm._watcher));
    this.vm = vm;

    this.isVueComponent = true;
  }

  /**
   * Returns instances data object
   *
   * @returns {Object}
   */
  data() {
    return this.vm._data;
  }

  /**
   * Returns instances computed object
   *
   * @returns {Object}
   */
  computed() {
    return this.vm.$options.computed;
  }

  /**
   * Returns instances methods object
   *
   * @returns {Object}
   */
  methods() {
    return this.vm.$options.method;
  }

  /**
   * Returns instances propsData object
   *
   * @returns {String}
   */
  propsData() {
    return this.vm.$options.propsData;
  }
}
