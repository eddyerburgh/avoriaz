// @flow

function addSlots(vm: Component, slots: Slots) {
  Object.keys(slots).forEach((key) => {
    if (!(Array.isArray(slots[key])) && !(slots[key] !== null && typeof slots[key] === 'object')) {
      throw new Error('slots[key] must be a Component or an array of Components');
    }

    if (Array.isArray(slots[key])) {
      slots[key].forEach((objKey) => {
        if (Array.isArray(vm.$slots[key])) {
          // $FlowIgnore
          vm.$slots[key].push(vm.$createElement(slots[key][objKey]));
        } else {
          // $FlowIgnore
          vm.$slots[key] = [vm.$createElement(slots[key][objKey])]; // eslint-disable-line no-param-reassign,max-len
        }
      });
    } else if (Array.isArray(vm.$slots[key])) {
      vm.$slots[key].push(vm.$createElement(slots[key]));
    } else {
      vm.$slots[key] = [vm.$createElement(slots[key])]; // eslint-disable-line no-param-reassign,max-len
    }
  });
}

export default addSlots;
