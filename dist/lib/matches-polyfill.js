"use strict";

if (global.Element && !global.Element.prototype.matches) {
  global.Element.prototype.matches = global.Element.prototype.matchesSelector || global.Element.prototype.mozMatchesSelector || global.Element.prototype.msMatchesSelector || global.Element.prototype.oMatchesSelector || global.Element.prototype.webkitMatchesSelector || function matchesShiv(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s);
    var i = matches.length;
    while (--i >= 0 && matches.item(i) !== this) {}
    return i > -1;
  };
}