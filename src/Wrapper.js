export default class Wrapper {

  constructor(element) {
    this.element = element;
  }

  /**
   * Finds every node in the mount tree of the current wrapper that matches the provided selector.
   *
   * @param {String} selector
   * @returns {VueWrapper||VueWrapper[]}
   */
  find(selector) {
    const nodeList = this.element.querySelectorAll(selector);
    if (nodeList.length === 0) {
      throw new Error('element could not be found');
    }

    const wrappers = [];

    for (let i = 0; i < nodeList.length; i++) { // eslint-disable-line no-plusplus
      wrappers.push(new Wrapper(nodeList[i]));
    }

    return wrappers;
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
