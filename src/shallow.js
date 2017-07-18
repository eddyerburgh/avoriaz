import Vue from 'vue';
import { cloneDeep } from 'lodash';
import mount from './mount';
import { replaceComponents, replaceGlobalComponents } from './lib/stubComponents';

export default function shallow(component, options) {
  const clonedComponent = cloneDeep(component);
  if (clonedComponent.components) {
    replaceComponents(clonedComponent);
  }
  replaceGlobalComponents(Vue, clonedComponent);

  return mount(clonedComponent, options);
}

