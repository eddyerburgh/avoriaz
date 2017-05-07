function addSlots(vm, slots) {
  Object.keys(slots).forEach((key) => {
    if (!Array.isArray(slots[key])) {
      throw new Error('slots[key] must be an array of vNodes - see https://vuejs.org/v2/api/#vm-slots');
    }
    const slotsObj = slots[key];
    Object.keys(slotsObj).forEach((objKey) => {
      if (Array.isArray(vm.$slots[key])) {
        vm.$slots[key].push(vm.$createElement(slots[key][objKey]));
      } else {
        vm.$slots[key] = [vm.$createElement(slots[key][objKey])]; // eslint-disable-line no-param-reassign,max-len
      }
    });
  });
}

export default addSlots;
