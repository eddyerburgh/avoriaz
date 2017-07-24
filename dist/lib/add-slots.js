'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function addSlotToVm(vm, slotName, slotValue) {
  if (Array.isArray(vm.$slots[slotName])) {
    vm.$slots[slotName].push(vm.$createElement(slotValue));
  } else {
    vm.$slots[slotName] = [vm.$createElement(slotValue)];
  }
}
function addSlots(vm, slots) {
  Object.keys(slots).forEach(function (key) {
    if (!Array.isArray(slots[key]) && !(slots[key] !== null && _typeof(slots[key]) === 'object')) {
      throw new Error('slots[key] must be a Component or an array of Components');
    }

    if (Array.isArray(slots[key])) {
      slots[key].forEach(function (slotValue) {
        addSlotToVm(vm, key, slotValue);
      });
    } else {
      addSlotToVm(vm, key, slots[key]);
    }
  });
}

exports.default = addSlots;