import Vue from 'vue';
import mount from './mount';

function replaceComponents(component) {
  Object.keys(component.components).forEach((c) => {
        // Remove cached constructor
    delete component.components[c]._Ctor; // eslint-disable-line no-param-reassign
    component.components[c] = { // eslint-disable-line no-param-reassign
      ...component.components[c],
      render: () => {},
    };
    Vue.config.ignoredElements.push(c);
  });
}

export default function shallow(component, options) {
  if (component.components) {
    replaceComponents(component);
  }

  return mount(component, options);
}

