import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../src/mount';
import ClickComponent from '../../resources/components/event-components/ClickComponent.vue';
import SlotChild from '../../resources/components/slots/SlotChild.vue';

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

  it('mounts component to DOM before returning VueWrapper when passed attachToDocument in options', () => {
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      return;
    }
    const compiled = compileToFunctions('<div><input /></div>');
    const wrapper = mount(compiled, { attachToDocument: true });
    expect(wrapper.element.querySelector('input')).to.be.instanceOf(HTMLElement);
    expect(wrapper.vm).to.be.an('object');
    expect(document.querySelectorAll('input').length).to.equal(1);
  });

  it('mounts component with default slot if passed component in slot object', () => {
    const wrapper = mount(SlotChild, { slots: { default: ClickComponent } });
    expect(wrapper.contains(ClickComponent)).to.equal(true);
  });

  it('mounts component with default slot if passed object with template prop in slot object', () => {
    const compiled = compileToFunctions('<div id="div" />');
    const wrapper = mount(SlotChild, { slots: { default: compiled } });
    expect(wrapper.contains('#div')).to.equal(true);
  });

  it('mounts component with named slot if passed component in slot object', () => {
    const wrapper = mount(SlotChild, { slots: { header: ClickComponent, footer: ClickComponent } });
    expect(wrapper.find(ClickComponent).length).to.equal(2);
  });

  it('returns VueWrapper with mountedToDom set to true when passed attachToDocument in options', () => {
    const compiled = compileToFunctions('<div><input /></div>');
    const wrapper = mount(compiled, { attachToDocument: true });
    expect(wrapper.mountedToDom).to.equal(true);
  });
});
