import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import PropsComponent from '../../../resources/components/data-components/PropsComponent.vue';
import Watch from '../../../resources/components/watch/Watch.vue';
import DependantWatch from '../../../resources/components/watch/DependantWatch.vue';

describe('setProps', () => {
  it('sets component props and updates DOM when called on Vue instance', () => {
    const prop1 = 'prop 1';
    const prop2 = 'prop 2';
    const propsData = { prop1: 'a prop', prop2 };
    const wrapper = mount(PropsComponent, { propsData });
    wrapper.setProps({ prop1 });
    expect(wrapper.find('.prop-1')[0].text()).to.equal(prop1);
    expect(wrapper.find('.prop-2')[0].text()).to.equal(prop2);
  });

  it('sets component props, and updates DOM when propsData was not initially passed', () => {
    const prop1 = 'prop 1';
    const prop2 = 'prop s';
    const wrapper = mount(PropsComponent);
    wrapper.setProps({ prop1, prop2 });
    expect(wrapper.find('.prop-1')[0].text()).to.equal(prop1);
    expect(wrapper.find('.prop-2')[0].text()).to.equal(prop2);
  });

  it('runs watch function when updating a prop', () => {
    const wrapper = mount(Watch);
    const prop1 = 'testest';
    wrapper.setProps({ prop1 });
    expect(wrapper.vm.prop2).to.equal(prop1);
  });

  it('updates all props before running watch', () => {
    const warn = sinon.stub(console, 'warn');
    const wrapper = mount(DependantWatch);
    wrapper.setProps({ show: true, value: 'abc' });
    expect(warn).to.have.been.calledWith('show watch : true,abc');
    warn.restore();
  });

  it('throws an error if node is not a Vue instance', () => {
    const message = 'wrapper.setProps() can only be called on a Vue instance';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    const input = wrapper.find('p')[0];
    expect(() => input.setProps({ ready: true })).throw(Error, message);
  });
});
