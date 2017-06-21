import findMatchingVNodes from './lib/findMatchingVNodes';
import {
  findVueComponents,
  vmCtorMatchesName,
} from './lib/vm';
import {
  isValidSelector,
} from './lib/validators';
import VueWrapper from './VueWrapper';

export default class Wrapper {

  constructor(vNode, update, mountedToDom) {
    this.vNode = vNode;
    this.element = vNode.elm;
    this.update = update;
    this.mountedToDom = mountedToDom;
  }

  /**
   * Returns instances computed object
   *
   * @returns {Object}
   */
  computed() {
    if (!this.isVueComponent) {
      throw new Error('wrapper.computed() can only be called on a Vue instance');
    }

    console.warn('warning: functions returned by computed() will not have this bound to the vue instance. Calling a computed function that uses this will result in an error. You can access computed functions by using the vue instance. e.g. to call a computed function named compFunc, call wrapper.vm.compFunc. See https://github.com/eddyerburgh/avoriaz/issues/15'); // eslint-disable-line no-console

    return this.vm.$options.computed;
  }

  /**
   * Checks if wrapper contains provided selector.
   *
   * @param {String} selector
   * @returns {Boolean}
   */
  contains(selector) {
    if (!isValidSelector(selector)) {
      throw new Error('wrapper.contains() must be passed a valid CSS selector or a Vue constructor');
    }

    if (typeof selector === 'object') {
      const vm = this.vm || this.vNode.context.$root;
      return findVueComponents(vm, selector.name).length > 0;
    }

    return this.element.querySelectorAll(selector).length > 0;
  }

  /**
   * Returns instances data object
   *
   * @returns {Object}
   */
  data() {
    if (!this.isVueComponent) {
      throw new Error('wrapper.data() can only be called on a Vue instance');
    }

    return this.vm._data;
  }

  /**
   * Calls destroy on vm
   */
  destroy() {
    if (!this.isVueComponent) {
      throw new Error('wrapper.destroy() can only be called on a Vue instance');
    }

    if (this.vm.$el.parentNode) {
      this.vm.$el.parentNode.removeChild(this.vm.$el);
    }

    this.vm.$destroy();
  }

  /**
   * Dispatches a DOM event on wrapper
   *
   * @param {String} type - type of event
   * @returns {Boolean}
   */
  dispatch(type) {
    if (typeof type !== 'string') {
      throw new Error('wrapper.dispatch() must be passed a string');
    }

    console.warn('wrapper.dispatch() is deprecated and will be removed from future versions. Use wrapper.trigger() instead - https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/trigger.html'); // eslint-disable-line no-console

    const modifiers = {
      enter: 13,
      tab: 9,
      delete: 46,
      esc: 27,
      space: 32,
      up: 38,
      down: 40,
      left: 37,
      right: 39,
    };

    const event = type.split('.');

    const eventObject = new window.Event(event[0]);

    if (event.length === 2) {
      eventObject.keyCode = modifiers[event[1]];
    }

    if (this.isVueComponent) {
      this.vm.$emit(type);
    }

    this.element.dispatchEvent(eventObject);

    this.update();
  }

  /**
   * Finds every node in the mount tree of the current wrapper that matches the provided selector.
   *
   * @param {String|Object} selector
   * @returns {VueWrapper||VueWrapper[]}
   */
  find(selector) {
    if (!isValidSelector(selector)) {
      throw new Error('wrapper.find() must be passed a valid CSS selector or a Vue constructor');
    }

    if (typeof selector === 'object') {
      if (!selector.name) {
        throw new Error('.find() requires component to have a name property');
      }
      const vm = this.vm || this.vNode.context.$root;
      const components = findVueComponents(vm, selector.name);
      return components.map(component => new VueWrapper(component, undefined, this.mounted));
    }

    const nodes = findMatchingVNodes(this.vNode, selector);

    return nodes.map(node => new Wrapper(node, this.update, this.mountedToDom));
  }

  /**
   * Checks if wrapper has an attribute with matching value
   *
   * @param {String} attribute - attribute to assert
   * @param {String} value - value attribute should contain
   * @returns {Boolean}
   */
  hasAttribute(attribute, value) {
    if (typeof attribute !== 'string') {
      throw new Error('wrapper.hasAttribute() must be passed attribute as a string');
    }

    if (typeof value !== 'string') {
      throw new Error('wrapper.hasAttribute() must be passed value as a string');
    }

    return this.element.getAttribute(attribute) === value;
  }

  /**
   * Asserts wrapper has a class name
   *
   * @param {String} className - class name to assert
   * @returns {Boolean}
   */
  hasClass(className) {
    if (typeof className !== 'string') {
      throw new Error('wrapper.hasClass() must be passed a string');
    }

    return this.element.className.split(' ').indexOf(className) !== -1;
  }

  /**
   * Checks if wrapper has a style with value
   *
   * @param {String} style - style to assert
   * @param {String} value - value to assert style contains
   * @returns {Boolean}
   */
  hasStyle(style, value) {
    if (typeof style !== 'string') {
      throw new Error('wrapper.hasStyle() must be passed style as a string');
    }

    if (typeof value !== 'string') {
      throw new Error('wrapper.hasClass() must be passed value as string');
    }

    /* istanbul ignore next */
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      console.warn('wrapper.hasStyle is not fully supported when running jsdom - only inline styles are supported'); // eslint-disable-line no-console
    }
    const body = document.querySelector('body');
    const mockElement = document.createElement('div');
    const mockNode = body.insertBefore(mockElement, null);
    mockElement.style[style] = value;

    if (!this.mountedToDom) {
      const vm = this.vm || this.vNode.context.$root;
      body.insertBefore(vm.$root._vnode.elm, null);
    }

    const elStyle = window.getComputedStyle(this.element)[style];
    const mockNodeStyle = window.getComputedStyle(mockNode)[style];
    return elStyle === mockNodeStyle;
  }

  /**
   * Returns HTML of element as a string
   *
   * @returns {String} HTML of wrapper element
   */
  html() {
    const tmp = document.createElement('div');
    tmp.appendChild(this.element);
    return tmp.innerHTML;
  }

  /**
   * Returns Vue instance
   *
   * @returns {String} HTML of wrapper element
   */
  instance() {
    if (!this.isVueComponent) {
      throw new Error('wrapper.instance() can only be called on a Vue instance');
    }

    return this.vm;
  }

  /**
   * Checks if node matches selector
   *
   * @param {String} selector - selector to check node is
   * @returns {Boolean}
   */
  is(selector) {
    if (!isValidSelector(selector)) {
      throw new Error('wrapper.is() must be passed a valid CSS selector or a Vue constructor');
    }

    if (typeof selector === 'object') {
      if (!this.isVueComponent) {
        return false;
      }

      return vmCtorMatchesName(this.vm, selector.name);
    }

    if (selector[0] === '.') {
      return this.element.className.split(' ').indexOf(selector.substr(1)) !== -1;
    }

    if (selector[0] === '#') {
      return this.element.getAttribute('id') === selector.substr(1);
    }

    return this.element.tagName === selector.toUpperCase();
  }

  /**
   * Checks if node is empty
   *
   * @returns {Boolean}
   */
  isEmpty() {
    return this.vNode.children === undefined;
  }

  /**
   * Returns instances methods object
   *
   * @returns {Object}
   */
  methods() {
    if (!this.isVueComponent) {
      throw new Error('wrapper.methods() can only be called on a Vue instance');
    }

    console.warn('warning: functions returned by methods() will not have this bound to the vue instance. Calling a method that uses this will result in an error. You can access methods by using the vue instance. e.g. to call a method function named aMethod, call wrapper.vm.aMethod(). See https://github.com/eddyerburgh/avoriaz/issues/15'); // eslint-disable-line no-console

    return this.vm.$options.methods;
  }

  /**
   * Returns name of component, or tag name if node is not a Vue component
   *
   * @returns {String}
   */
  name() {
    if (this.isVueComponent) {
      return this.vm.$options.name;
    }

    return this.vNode.tag;
  }

  /**
   * Returns instances propsData object
   *
   * @returns {String}
   */
  propsData() {
    if (!this.isVueComponent) {
      throw new Error('wrapper.propsData() can only be called on a Vue instance');
    }

    console.warn('warning: functions returned by propsData() will not have this bound to the vue instance. Calling a propsData function that uses this will result in an error. You can access propsData functions by using the vue instance. e.g. to call a method function named propsDataFunc, call wrapper.vm.$props.propsDataFunc(). See https://github.com/eddyerburgh/avoriaz/issues/15'); // eslint-disable-line no-console

    return this.vm.$props;
  }

  /**
   * Sets vm data
   *
   * @param {Object} data - data to set
   */
  setData(data) {
    if (!this.isVueComponent) {
      throw new Error('wrapper.setData() can only be called on a Vue instance');
    }

    Object.keys(data).forEach((key) => {
      this.vm.$set(this.vm, [key], data[key]);
    });
    this.update();
    this.vNode = this.vm._vnode;
  }

  /**
   * Sets vm props
   *
   * @param {Object} data - data to set
   */
  setProps(data) {
    if (!this.isVueComponent) {
      throw new Error('wrapper.setProps() can only be called on a Vue instance');
    }

    Object.keys(data).forEach((key) => {
      this.vm._props[key] = data[key];
    });
    this.update();
    this.vNode = this.vm._vnode;
  }

  /**
   * Simulates a DOM event on wrapper
   *
   * @param {String} type - type of event
   * @returns {Boolean}
   */
  simulate(type) {
    if (typeof type !== 'string') {
      throw new Error('wrapper.simulate() must be passed a string');
    }

    console.warn('wrapper.simulate() is deprecated and will be removed from future versions. Use wrapper.trigger() instead - https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/trigger.html'); // eslint-disable-line no-console

    const modifiers = {
      enter: 13,
      tab: 9,
      delete: 46,
      esc: 27,
      space: 32,
      up: 38,
      down: 40,
      left: 37,
      right: 39,
    };

    const event = type.split('.');

    const eventObject = new window.Event(event[0]);

    if (event.length === 2) {
      eventObject.keyCode = modifiers[event[1]];
    }

    this.element.dispatchEvent(eventObject);
    this.update();
  }

  /**
   * Returns element style object
   *
   * @returns {Object}
   */
  style() {
    console.warn('wrapper.style() is deprecated and will be removed from future versions. Use wrapper.hasStyle() instead'); // eslint-disable-line no-console
    const node = document.querySelector('body').insertBefore(this.element, null);
    return window.getComputedStyle(node);
  }

  /**
   * Return text of wrapper element
   *
   * @returns {Boolean}
   */
  text() {
    return this.element.textContent;
  }

    /**
     * Triggers a DOM event on wrapper
     *
     * @param {String} type - type of event
     * @returns {Boolean}
     */
  trigger(type) {
    if (typeof type !== 'string') {
      throw new Error('wrapper.trigger() must be passed a string');
    }

    const modifiers = {
      enter: 13,
      tab: 9,
      delete: 46,
      esc: 27,
      space: 32,
      up: 38,
      down: 40,
      left: 37,
      right: 39,
    };

    const event = type.split('.');

    const eventObject = new window.Event(event[0]);

    if (event.length === 2) {
      eventObject.keyCode = modifiers[event[1]];
    }

    this.element.dispatchEvent(eventObject);

    this.update();
  }
}
