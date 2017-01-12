import VueWrapper from './VueWrapper';

export default function mount(component, options) {
  return new VueWrapper(component, options);
}
