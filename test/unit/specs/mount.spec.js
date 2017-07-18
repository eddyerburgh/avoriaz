import { compileToFunctions } from 'vue-template-compiler';
import Vue from 'vue';
import mount from '../../../src/mount';
import ClickComponent from '../../resources/components/event-components/ClickComponent.vue';
import SlotChild from '../../resources/components/slots/SlotChild.vue';
import MixinComponent from '../../resources/components/mixins/MixinComponent.vue';
import Table from '../../resources/components/table/Table.vue';
import Row from '../../resources/components/table/Row.vue';

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
    const wrapper = mount(SlotChild, { slots: { default: [ClickComponent] } });
    expect(wrapper.contains(ClickComponent)).to.equal(true);
  });

  it('mounts component with default slot if passed object with template prop in slot object', () => {
    const compiled = compileToFunctions('<div id="div" />');
    const wrapper = mount(SlotChild, { slots: { default: [compiled] } });
    expect(wrapper.contains('#div')).to.equal(true);
  });

  it('mounts component with named slot if passed component in slot object', () => {
    const wrapper = mount(SlotChild, {
      slots: {
        header: [ClickComponent],
        footer: [ClickComponent],
      },
    });
    expect(wrapper.find(ClickComponent).length).to.equal(2);
  });

  it('mounts component with named slot if passed component in slot object', () => {
    const wrapper = mount(SlotChild, {
      slots: {
        header: ClickComponent,
      },
    });
    expect(wrapper.find(ClickComponent).length).to.equal(1);
    expect(Array.isArray(wrapper.vm.$slots.header)).to.equal(true);
  });

  it('returns VueWrapper with mountedToDom set to true when passed attachToDocument in options', () => {
    const compiled = compileToFunctions('<div><input /></div>');
    const wrapper = mount(compiled, { attachToDocument: true });
    expect(wrapper.mountedToDom).to.equal(true);
  });

  it('throws error if slots[key] is not an array or object', () => {
    const message = 'slots[key] must be a Component or an array of Components';
    expect(() => mount(SlotChild, {
      slots: {
        header: 'ClickComponent',
        footer: [ClickComponent],
      },
    })).to.throw(Error, message);
  });

  it('injects global variables when passed as inject object', () => {
    const $store = { store: true };
    const $route = { path: 'http://avoriaz.com' };
    const wrapper = mount(SlotChild, {
      globals: {
        $store,
        $route,
      },
    });
    expect(wrapper.vm.$store).to.equal($store);
    expect(wrapper.vm.$route).to.equal($route);
  });

  it('does not use cached component', () => {
    MixinComponent.methods.someMethod = sinon.stub();
    mount(MixinComponent);
    expect(MixinComponent.methods.someMethod.callCount).to.equal(1);
    MixinComponent.methods.someMethod = sinon.stub();
    mount(MixinComponent);
    expect(MixinComponent.methods.someMethod.callCount).to.equal(1);
  });

  it('mounts tables and sub components', () => {
    const wrapper = mount(Table);
    expect(wrapper.html()).to.equal('<table><tbody><tr><td>contents</td></tr></tbody></table>');
    expect(wrapper.find('td').length).to.be.greaterThan(0);
  });

  it('mounts sub components of tables', () => {
    const wrapper = mount(Row);
    expect(wrapper.html()).to.equal('<tr><td>contents</td></tr>');
    expect(wrapper.find('td').length).to.be.greaterThan(0);
  });

  it('mounts functional component when passed context object', () => {
    const Component = {
      functional: true,
      render(h, { props }) { // eslint-disable-line no-unused-vars
        return h('div');
      },
      name: 'common',
    };
    const context = {
      data: { hellpo: true },
      props: { show: true },
    };

    const wrapper = mount(Component, { context });
    expect(wrapper.is(Component)).to.equal(true);
  });

  it('throws error if non functional component is passed with context option', () => {
    const Component = {
      render: h => h('div'),
    };
    const context = {};
    const message = 'mount.context can only be used when mounting a functional component';
    expect(() => mount(Component, { context })).to.throw(Error, message);
  });

  it('throws error if context option is not an object', () => {
    const Component = {
      functional: true,
      render: h => h('div'),
    };
    const context = 'string';
    const message = 'mount.context must be an object';
    expect(() => mount(Component, { context })).to.throw(Error, message);
  });

  it('uses scoped instance when passed instance', () => {
    const instance = Vue.extend();
    const globals = { globalProp: true };
    const wrapper = mount(ClickComponent, {
      instance,
      globals,
    });
    expect(wrapper.vm.globalProp).to.equal(true);
    const freshWrapper = mount(ClickComponent);
    expect(freshWrapper.vm.globalProp).to.be.undefined;
  });

  it('handles inherit attrs', () => {
    const wrapper = mount(compileToFunctions('<p :id="anAttr" />'), {
      attrs: {
        anAttr: 'an attribute',
      },
    });
    expect(wrapper.vm.$attrs.anAttr).to.equal('an attribute');
    wrapper.update();
    expect(wrapper.vm.$attrs.anAttr).to.equal('an attribute');
  });
});
