// @flow

import Vue from 'vue';
import { cloneDeep } from 'lodash';
import mount from './mount';
import { replaceComponents, replaceGlobalComponents } from './lib/stub-components';

export default function shallow(component: Component, options: MountOptions) {
  const clonedComponent = cloneDeep(component);
  if (clonedComponent.components) {
    replaceComponents(clonedComponent);
  }

  replaceGlobalComponents(Vue, clonedComponent);

  return mount(clonedComponent, options);
}

