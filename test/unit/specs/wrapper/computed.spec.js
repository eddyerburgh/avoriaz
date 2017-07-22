import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import ComputedProperties from '../../../resources/components/data-components/ComputedProperties.vue';

describe('computed', () => {
  beforeEach(() => {
    sinon.spy(console, 'warn');
  });

  afterEach(() => {
    console.warn.restore(); // eslint-disable-line no-console
  });

  it('returns the computed object of the Vue instance', () => {
    const wrapper = mount(ComputedProperties);
    expect(wrapper.computed()).to.deep.equal(ComputedProperties.computed);
  });

  it('throws an error if node is not a Vue instance', () => {
    const message = 'wrapper.computed() can only be called on a Vue instance';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    const input = wrapper.find('p')[0];
    expect(() => input.computed()).throw(Error, message);
  });

  it('calls console.warn with information on unbound this', () => {
    const expectedText = '[avoriaz] WARN: functions returned by computed() will not have this bound to the vue instance. Calling a computed function that uses this will result in an error. You can access computed functions by using the vue instance. e.g. to call a computed function named compFunc, call wrapper.vm.compFunc. See https://github.com/eddyerburgh/avoriaz/issues/15';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    wrapper.computed();
    expect(console.warn).to.be.calledWith(expectedText); // eslint-disable-line no-console
  });
});
