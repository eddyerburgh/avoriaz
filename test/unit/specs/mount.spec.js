import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../src/mount';
import ClickComponent from '../../resources/components/event-components/ClickComponent.vue';

describe('mount', () => {
  it('returns new VueWrapper with mounted Vue instance if no options are passed', () => {
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      return;
    }
    const compiled = compileToFunctions('<div><input /></div>');
    const wrapper = mount(compiled);
    expect(wrapper.element.querySelector('input')).to.be.instanceOf(HTMLElement);
    expect(wrapper.vm).to.be.an('object');
  });

  it('returns new VueWrapper with mounted Vue instance with props, if passed as propsData', () => {
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      return;
    }
    const childClickHandler = () => {};
    const wrapper = mount(ClickComponent, { propsData: { childClickHandler } });
    expect(wrapper.element.querySelector('button')).to.be.instanceOf(HTMLElement);
    expect(wrapper.vm).to.be.an('object');
    expect(wrapper.vm.$props.childClickHandler).to.equal(childClickHandler);
  });

  it('mounts component to DOM before returning VueWrapper when passed mountToDom in options', () => {
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      return;
    }
    const compiled = compileToFunctions('<div><input /></div>');
    const wrapper = mount(compiled, { mountToDom: true });
    expect(wrapper.element.querySelector('input')).to.be.instanceOf(HTMLElement);
    expect(wrapper.vm).to.be.an('object');
    expect(document.querySelectorAll('input').length).to.equal(1);
  });

  it('returns VueWrapper with mountedToDom set to true when passed mountToDom in options', () => {
    const compiled = compileToFunctions('<div><input /></div>');
    const wrapper = mount(compiled, { mountToDom: true });
    expect(wrapper.mountedToDom).to.equal(true);
  });
});
