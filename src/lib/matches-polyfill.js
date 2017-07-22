/* istanbul ignore next */
if (global.Element && !global.Element.prototype.matches) {
  global.Element.prototype.matches =
    global.Element.prototype.matchesSelector ||
    global.Element.prototype.mozMatchesSelector ||
    global.Element.prototype.msMatchesSelector ||
    global.Element.prototype.oMatchesSelector ||
    global.Element.prototype.webkitMatchesSelector ||
    function matchesShiv(s) {
      const matches = (this.document || this.ownerDocument).querySelectorAll(s);
      let i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-plusplus, no-empty
      return i > -1;
    };
}
