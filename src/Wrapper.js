import {
  findByClass,
  findByTag,
  findById,
} from './vNode';

export default class Wrapper {

  constructor(vNode) {
    this.vNode = vNode;
    this.element = vNode.elm;
  }

  /**
   * Finds every node in the mount tree of the current wrapper that matches the provided selector.
   *
   * @param {String} selector
   * @returns {VueWrapper||VueWrapper[]}
   */
  find(selector) {
    if (selector[0] === '.') {
      const nodes = findByClass(this.vNode, selector.substr(1));

      return nodes.map(node => new Wrapper(node));
    }

    if (selector[0] === '#') {
      const nodes = findById(this.vNode, selector.substr(1));
      return nodes.map(node => new Wrapper(node));
    }
    const nodes = findByTag(this.vNode, selector);

    return nodes.map(node => new Wrapper(node));
  }

  /**
   * Checks if wrapper contains provided selector.
   *
   * @param {String} selector
   * @returns {Boolean}
   */
  contains(selector) {
    return this.element.querySelectorAll(selector).length > 0;
  }

  /**
   * Checks if wrapper has a class name
   *
   * @param {String} className - class name to check
   * @returns {Boolean}
   */
  hasClass(className) {
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
   * Simulates a DOM event on wrapper
   *
   * @param {String} type - type of event
   * @returns {Boolean}
   */
  simulate(type) {
    const eventObject = new Event(type);
    this.element.dispatchEvent(eventObject);
  }
}
