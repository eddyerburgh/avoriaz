// @flow

import findMatchingVNodes from './lib/find-matching-vnodes';
import {
  findVueComponents,
  vmCtorMatchesName,
} from './lib/vm';
import {
  isValidSelector,
} from './lib/validators';
import VueWrapper from './VueWrapper';
import {
  error,
  warn,
} from './lib/logger';

export default class Wrapper implements WrapperInterface {
  vNode: VNode;
  vm: Component;
  element: HTMLElement;
  update: Function;
  mountedToDom: boolean;
  isVueComponent: boolean;

  constructor(vNode: VNode, update: Function, mountedToDom: boolean) {
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
      error('wrapper.computed() can only be called on a Vue instance');
    }

    warn('functions returned by computed() will not have this bound to the vue instance. Calling a computed function that uses this will result in an error. You can access computed functions by using the vue instance. e.g. to call a computed function named compFunc, call wrapper.vm.compFunc. See https://github.com/eddyerburgh/avoriaz/issues/15');

    return this.vm.$options.computed;
  }

  /**
   * Checks if wrapper contains provided selector.
   *
   * @param {String} selector
   * @returns {Boolean}
   */
  contains(selector: Selector) {
    if (!isValidSelector(selector)) {
      error('wrapper.contains() must be passed a valid CSS selector or a Vue constructor');
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
      error('wrapper.data() can only be called on a Vue instance');
    }

    return this.vm._data;
  }

  /**
   * Calls destroy on vm
   */
  destroy() {
    if (!this.isVueComponent) {
      error('wrapper.destroy() can only be called on a Vue instance');
    }

    if (this.vm.$el.parentNode) {
      this.vm.$el.parentNode.removeChild(this.vm.$el);
    }

    this.vm.$destroy();
  }

  /**
   * Finds every node in the mount tree of the current wrapper that matches the provided selector.
   *
   * @param {String|Object} selector
   * @returns {VueWrapper||VueWrapper[]}
   */
  find(selector: Selector) {
    if (!isValidSelector(selector)) {
      error('wrapper.find() must be passed a valid CSS selector or a Vue constructor');
    }

    if (typeof selector === 'object') {
      if (!selector.name) {
        error('.find() requires component to have a name property');
      }
      const vm = this.vm || this.vNode.context.$root;
      const components = findVueComponents(vm, selector.name);
      return components.map(component => new VueWrapper(component, this.mountedToDom));
    }

    const nodes = findMatchingVNodes(this.vNode, selector);

    return nodes.map(node => new Wrapper(node, this.update, this.mountedToDom));
  }

  /**
   * Returns the first node that matches the provided selector.
   *
   * @param {String|Object} selector
   * @returns {VueWrapper}
   */
  first(selector: Selector) {
    const nodes = this.find(selector);

    if (!nodes.length) {
      error('wrapper.first() has no matches with the given selector');
    }

    return nodes[0];
  }

  /**
   * Returns value of specified attribute of wrapper
   *
   * @param {String} attribute - attribute to assert
   * @returns {String}
   */
  getAttribute(attribute: string) {
    if (typeof attribute !== 'string') {
      error('wrapper.getAttribute() must be passed a string');
    }

    if (!this.hasAttribute(attribute)) {
      error(`wrapper has no attribute called ${attribute}`);
    }

    return this.element.getAttribute(attribute);
  }

  /**
   * Returns prop value of a Vue instance
   *
   * @param {String} propName - prop name to assert
   * @returns {*}
   */
  getProp(propName: string) {
    if (!this.isVueComponent) {
      error('wrapper.getProp() can only be called on a Vue instance');
    }

    if (typeof propName !== 'string') {
      error('wrapper.getProp() must be passed a string');
    }

    const propValue = this.vm.$props[propName];
    if (typeof propValue === 'function') {
      warn('functions returned by getProp() will not have this bound to the vue instance. Calling a propsData function that uses this will result in an error. You can access propsData functions by using the vue instance. e.g. to call a method function named propsDataFunc, call wrapper.vm.$props.propsDataFunc(). See https://github.com/eddyerburgh/avoriaz/issues/15');
    }
    return propValue;
  }

  /**
   * Asserts wrapper has an attribute
   *
   * @param {String} attribute - attribute to assert
   * @returns {Boolean}
   */
  hasAttribute(attribute: string, value?: string) {
    if (typeof attribute !== 'string') {
      error('wrapper.hasAttribute() must be passed attribute as a string');
    }

    if (arguments.length === 1) {
      return this.element.hasAttribute(attribute);
    }

    if (typeof value !== 'string') {
      error('wrapper.hasAttribute() must be passed value as a string');
    }

    warn('wrapper.hasAttribute(attribute, value) is deprecated in place of a new syntax and the old syntax will be removed from future versions. Instead, we encourage you to use getAttribute(attribute) === value to assert attribute value for better error report. For detailed information, see: https://github.com/eddyerburgh/avoriaz/issues/100');

    return this.element.getAttribute(attribute) === value;
  }

  /**
   * Asserts wrapper has a class name
   *
   * @param {String} className - class name to assert
   * @returns {Boolean}
   */
  hasClass(className: string) {
    if (typeof className !== 'string') {
      error('wrapper.hasClass() must be passed a string');
    }

    return this.element.classList.contains(className);
  }

  /**
   * Checks if wrapper has a style with value
   *
   * @param {String} style - style to assert
   * @param {String} value - value to assert style contains
   * @returns {Boolean}
   */
  hasStyle(style: string, value: string) {
    if (typeof style !== 'string') {
      error('wrapper.hasStyle() must be passed style as a string');
    }

    if (typeof value !== 'string') {
      error('wrapper.hasStyle() must be passed value as string');
    }

    /* istanbul ignore next */
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      warn('wrapper.hasStyle is not fully supported when running jsdom - only inline styles are supported');
    }
    const body = document.querySelector('body');
    const mockElement = document.createElement('div');
    // $FlowIgnore
    const mockNode = body.insertBefore(mockElement, null);
    // $FlowIgnore
    mockElement.style[style] = value;

    if (!this.mountedToDom) {
      const vm = this.vm || this.vNode.context.$root;
      // $FlowIgnore
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
    return this.element.outerHTML;
  }

  /**
   * Returns Vue instance
   *
   * @returns {String} HTML of wrapper element
   */
  instance() {
    if (!this.isVueComponent) {
      error('wrapper.instance() can only be called on a Vue instance');
    }

    return this.vm;
  }

  /**
   * Checks if node matches selector
   *
   * @param {String} selector - selector to check node is
   * @returns {Boolean}
   */
  is(selector: Selector) {
    if (!isValidSelector(selector)) {
      error('wrapper.is() must be passed a valid CSS selector or a Vue constructor');
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
   * Checks if node is empty or all children are comment nodes
   *
   * @returns {Boolean}
   */
  isEmpty() {
    return this.vNode.children === undefined || this.vNode.children.length === 0 ||
      this.vNode.children.every(child => child.elm.nodeName === '#comment');
  }

  /**
   * Returns instances methods object
   *
   * @returns {Object}
   */
  methods() {
    if (!this.isVueComponent) {
      error('wrapper.methods() can only be called on a Vue instance');
    }

    warn('functions returned by methods() will not have this bound to the vue instance. Calling a method that uses this will result in an error. You can access methods by using the vue instance. e.g. to call a method function named aMethod, call wrapper.vm.aMethod(). See https://github.com/eddyerburgh/avoriaz/issues/15');

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
   * Sets vm methods
   *
   * @param {Object} methods - methods to set
   */
  setMethods(methods: Object) {
    if (!this.isVueComponent) {
      error('wrapper.setMethods() can only be called on a Vue instance');
    }

    Object.keys(methods).forEach((key) => {
      this.vm[key] = methods[key];
      this.vm.$options.methods[key] = methods[key];
    });
    this.update();
    this.vNode = this.vm._vnode;
  }

  /**
   * Returns instances propsData object
   *
   * @returns {String}
   */
  propsData() {
    if (!this.isVueComponent) {
      error('wrapper.propsData() can only be called on a Vue instance');
    }

    warn('functions returned by propsData() will not have this bound to the vue instance. Calling a propsData function that uses this will result in an error. You can access propsData functions by using the vue instance. e.g. to call a method function named propsDataFunc, call wrapper.vm.$props.propsDataFunc(). See https://github.com/eddyerburgh/avoriaz/issues/15');

    return this.vm.$props;
  }

  /**
   * Sets vm data
   *
   * @param {Object} data - data to set
   */
  setData(data: Object) {
    if (!this.isVueComponent) {
      error('wrapper.setData() can only be called on a Vue instance');
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
   * @param {Object} props - props to set
   */
  setProps(props: Object) {
    if (!this.isVueComponent) {
      error('wrapper.setProps() can only be called on a Vue instance');
    }
    const vm = this.vm || this.vNode.context.$root;

    Object.keys(props).forEach((key) => {
      this.vm._props[key] = props[key];
    });
    Object.keys(props).forEach((key) => {
      vm._watchers.forEach((watcher) => {
        if (watcher.expression === key) { watcher.run(); }
      });
    });
    this.update();

    this.vNode = this.vm._vnode;
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
  * Return value of wrapper element
  *
  * @returns {String | Boolean}
  */
  value() {
    if (!this.element.value) return false;
    return this.element.value;
  }

  /**
     * Triggers a DOM event on wrapper
     *
     * @param {String} type - type of event
     * @param {Object} properties - additional event object properities
     * @returns {Boolean}
     */
  trigger(type: string, properties: Object = {}) {
    if (typeof type !== 'string') {
      error('wrapper.trigger() must be passed a string');
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
      end: 35,
      home: 36,
      del: 46,
      backspace: 8,
      insert: 45,
      pageup: 33,
      pagedown: 34,
    };

    const event = type.split('.');

    let eventObject;

    // Fallback for IE10,11 - https://stackoverflow.com/questions/26596123
    if (typeof (Event) === 'function') {
      eventObject = new window.Event(event[0]);
    } else {
      eventObject = document.createEvent('Event');
      eventObject.initEvent(event[0], true, true);
    }

    if (event.length === 2) {
      // $FlowIgnore
      eventObject.keyCode = modifiers[event[1]];
    }

    Object.keys(properties).forEach((key) => {
      eventObject[key] = properties[key];
    });

    this.element.dispatchEvent(eventObject);
    this.update();
  }
}
