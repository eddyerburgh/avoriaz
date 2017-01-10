import Vue from 'vue';

export default function mount(Component) {
  const Ctor = Vue.extend(Component);
  return new Ctor().$mount();

}
