function findAllVueComponents(vm, components = []) {
  components.push(vm);

  if (vm.$children.length > 0) {
    for (let i = 0; i < vm.$children.length; i++) { // eslint-disable-line no-plusplus
      findAllVueComponents(vm.$children[i], components);
    }
  }

  return components;
}

export function vmCtorMatchesName(vm, name) {
  return vm.$vnode.componentOptions.Ctor.options.name === name;
}

export function findVueComponents(vm, componentName) {
  const components = findAllVueComponents(vm);
  return components.filter((component) => {
    if (!component.$vnode) {
      return false;
    }
    return vmCtorMatchesName(component, componentName);
  });
}
