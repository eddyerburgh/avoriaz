// @flow

function addSlotToVm(vm, slotName, slotValue) {
  if (Array.isArray(vm.$slots[slotName])) {
    vm.$slots[slotName].push(vm.$createElement(slotValue)); // eslint-disable-line no-param-reassign
  } else {
    vm.$slots[slotName] = [vm.$createElement(slotValue)]; // eslint-disable-line no-param-reassign
  }
}
function addSlots(vm: Component, slots: Slots) {
  Object.keys(slots).forEach((key) => {
    if (!(Array.isArray(slots[key])) && !(slots[key] !== null && typeof slots[key] === 'object')) {
      throw new Error('slots[key] must be a Component or an array of Components');
    }

    if (Array.isArray(slots[key])) {
      slots[key].forEach((slotValue) => {
        addSlotToVm(vm, key, slotValue);
      });
    } else {
      addSlotToVm(vm, key, slots[key]);
    }
  });
}

export default addSlots;
