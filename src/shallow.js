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
function isRequired(name) {
  return name === 'KeepAlive' || name === 'Transition' || name === 'TransitionGroup';
}

function replaceGlobalComponents(instance, component) {
  Object.keys(instance.options.components).forEach((c) => {
    if (isRequired(c)) {
      return;
    }
    if (!component.components) {
      component.components = {}; // eslint-disable-line no-param-reassign
    }
    component.components[c] = { // eslint-disable-line no-param-reassign
      render: () => {
      },
      attrs: instance.options.components[c].attrs,
      name: instance.options.components[c].name,
      on: instance.options.components[c].on,
      key: instance.options.components[c].key,
      ref: instance.options.components[c].ref,
      props: instance.options.components[c].props,
      domProps: instance.options.components[c].domProps,
      class: instance.options.components[c].class,
    };
    delete component.components[c]._Ctor; // eslint-disable-line no-param-reassign
    stubLifeCycleEvents(component.components[c]);
    stubLifeCycleEvents(instance.options.components[c]);
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
  replaceGlobalComponents(Vue, clonedComponent);

  return mount(clonedComponent, options);
}

