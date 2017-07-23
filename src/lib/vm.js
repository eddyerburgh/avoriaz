// @flow

function findAllVueComponents(vm: Component, components: Array<Component> = []) {
  components.push(vm);

  vm.$children.forEach((child) => {
    findAllVueComponents(child, components);
  });

  return components;
}

export function vmCtorMatchesName(vm: Component, name: string) {
  return (vm.$vnode && vm.$vnode.componentOptions.Ctor.options.name === name) ||
      (vm._vnode && vm._vnode.functionalOptions && vm._vnode.functionalOptions.name === name);
}

export function findVueComponents(vm: Component, componentName: string) {
  const components = findAllVueComponents(vm);
  return components.filter((component) => {
    if (!component.$vnode) {
      return false;
    }
    return vmCtorMatchesName(component, componentName);
  });
}
