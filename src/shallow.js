// @flow

import Vue from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import mount from './mount';
import { replaceComponents, replaceGlobalComponents } from './lib/stub-components';

export default function shallow(component: Component, options: MountOptions) {
  const clonedComponent = cloneDeep(component);
  if (clonedComponent.components) {
    replaceComponents(clonedComponent);
  }
  const renderDefaultSlot = options ? options.renderDefaultSlot : false;
  replaceGlobalComponents(Vue, clonedComponent, renderDefaultSlot);

  return mount(clonedComponent, options);
}
