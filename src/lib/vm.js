function findAllVueComponents(vm, components = []) {
  components.push(vm);

  vm.$children.forEach((child) => {
    findAllVueComponents(child, components);
  });

  return components;
}

export function vmCtorMatchesName(vm, name) {
  return (vm.$vnode && vm.$vnode.componentOptions.Ctor.options.name === name) ||
      (vm._vnode && vm._vnode.functionalOptions && vm._vnode.functionalOptions.name === name);
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
