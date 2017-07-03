import Vue from 'vue';
import { cloneDeep } from 'lodash';
import mount from './mount';

const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
];

function stubLifeCycleEvents(component) {
  LIFECYCLE_HOOKS.forEach((hook) => {
    component[hook] = () => {}; // eslint-disable-line no-param-reassign
  });
}

function replaceComponents(component) {
  Object.keys(component.components).forEach((c) => {
      // Remove cached constructor
    delete component.components[c]._Ctor; // eslint-disable-line no-param-reassign
    component.components[c] = { // eslint-disable-line no-param-reassign
      attrs: component.components[c].attrs,
      name: component.components[c].name,
      on: component.components[c].on,
      key: component.components[c].key,
      ref: component.components[c].ref,
      props: component.components[c].props,
      domProps: component.components[c].domProps,
      class: component.components[c].class,
      render: () => {},
    };
    Vue.config.ignoredElements.push(c);
    stubLifeCycleEvents(component.components[c]);
  });
}

export default function shallow(component, options) {
  const clonedComponent = cloneDeep(component);

  if (clonedComponent.components) {
    replaceComponents(clonedComponent);
  }

  return mount(clonedComponent, options);
}

