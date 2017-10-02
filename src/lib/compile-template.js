// @flow

import { compileToFunctions } from 'vue-template-compiler';
import assign from 'lodash/assign';

export default function compileTemplate(component: Component) {
  assign(component, compileToFunctions(component.template));
}
