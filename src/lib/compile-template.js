// @flow

import { compileToFunctions } from 'vue-template-compiler';

export default function compileTemplate(component: Component) {
  Object.assign(component, compileToFunctions(component.template));
}
