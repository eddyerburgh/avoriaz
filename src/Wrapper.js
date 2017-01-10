export default class Wrapper {

  constructor(element) {
    this.element = element;
  }

  /**
   * Finds every node in the render tree of the current wrapper that matches the provided selector.
   *
   * @param {String} selector
   * @returns {VueWrapper}
   */
  find(selector) {
    return new Wrapper(this.element.querySelectorAll(selector));
  }
}
