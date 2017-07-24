"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
exports.error = error;
function warn(message) {
  console.warn("[avoriaz] WARN: " + message);
}

function error(message) {
  throw new Error("[avoriaz]: " + message);
}