import Vue from 'vue';

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

function extractCoreProps(component) {
  return {
    attrs: component.attrs,
    name: component.name,
    on: component.on,
    key: component.key,
    ref: component.ref,
    props: component.props,
    domProps: component.domProps,
    class: component.class,
    staticClass: component.staticClass,
    staticStyle: component.staticStyle,
    style: component.style,
  };
}
export function replaceGlobalComponents(instance, component) {
  Object.keys(instance.options.components).forEach((c) => {
    if (isRequired(c)) {
      return;
    }
    if (!component.components) {
      component.components = {}; // eslint-disable-line no-param-reassign
    }
    component.components[c] = { // eslint-disable-line no-param-reassign
      render: () => {},
      ...extractCoreProps(instance.options.components[c]),
    };
    delete component.components[c]._Ctor; // eslint-disable-line no-param-reassign
    stubLifeCycleEvents(component.components[c]);
    stubLifeCycleEvents(instance.options.components[c]);
  });
}

export function replaceComponents(component) {
  Object.keys(component.components).forEach((c) => {
    // Remove cached constructor
    delete component.components[c]._Ctor; // eslint-disable-line no-param-reassign
    component.components[c] = { // eslint-disable-line no-param-reassign
      ...extractCoreProps(component.components[c]),
      render: () => {},
    };
    Vue.config.ignoredElements.push(c);
    stubLifeCycleEvents(component.components[c]);
  });
}
