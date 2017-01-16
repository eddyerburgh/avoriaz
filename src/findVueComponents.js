function findAllVueComponents(instance, components = []) {
  components.push(instance);

  if (instance.$children.length > 0) {
    for (let i = 0; i < instance.$children.length; i++) { // eslint-disable-line no-plusplus
      findAllVueComponents(instance.$children[i], components);
    }
  }

  return components;
}

export default function findVueComponents(instance, componentName) {
  const components = findAllVueComponents(instance);
  return components.filter(component => component.$options._componentTag === componentName);
}
