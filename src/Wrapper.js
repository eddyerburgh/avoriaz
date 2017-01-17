import {
  findByClass,
  findByTag,
  findById,
} from './vNode';
import findVueComponents from './findVueComponents';
import VueWrapper from './VueWrapper';

function isValidSelector(selector) {
  if (typeof selector === 'string') {
    return true;
  }
  if (typeof selector === 'function') {
    return false;
  }

  if (selector === null) {
    return false;
  }

  if (typeof selector !== 'object') {
    return false;
  }

  if (typeof selector.name !== 'string') {
    return false;
  }

  return true;
}

export default class Wrapper {

  constructor(vNode, update) {
    this.vNode = vNode;
    this.element = vNode.elm;
    this.update = update;
  }

  /**
   * Checks if wrapper contains provided selector.
   *
   * @param {String} selector
   * @returns {Boolean}
   */
  contains(selector) {
    if (!isValidSelector(selector)) {
      throw new Error('wrapper.find() must be passed a valid CSS selector or a Vue constructor');
    }
    return this.element.querySelectorAll(selector).length > 0;
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
      const vm = this.vm || this.vNode.context.$root;
      const components = findVueComponents(vm, selector.name);
      return components.map(component => new VueWrapper(component));
    }

    if (selector[0] === '.') {
      const nodes = findByClass(this.vNode, selector.substr(1));

      return nodes.map(node => new Wrapper(node, this.update));
    }

    if (selector[0] === '#') {
      const nodes = findById(this.vNode, selector.substr(1));
      return nodes.map(node => new Wrapper(node, this.update));
    }
    const nodes = findByTag(this.vNode, selector);

    return nodes.map(node => new Wrapper(node, this.update));
  }

  /**
   * Checks if wrapper has a class name
   *
   * @param {String} className - class name to check
   * @returns {Boolean}
   */
  hasClass(className) {
    if (typeof className !== 'string') {
      throw new Error('wrapper.hasClass() must be passed a string');
    }

    return this.element.className.split(' ').indexOf(className) !== -1;
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
   * Checks if node matches selector
   *
   * @param {String} selector - selector to check node is
   * @returns {Boolean}
   */
  is(selector) {
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
   * Simulates a DOM event on wrapper
   *
   * @param {String} type - type of event
   * @returns {Boolean}
   */
  simulate(type) {
    const eventObject = new window.Event(type);
    this.element.dispatchEvent(eventObject);
    this.update();
  }

  /**
   * Return text of wrapper element
   *
   * @returns {Boolean}
   */
  text() {
    return this.element.textContent;
  }
}
