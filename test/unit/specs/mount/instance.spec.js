import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import ComputedProperties from '../../../resources/components/data-components/ComputedProperties.vue';

describe('instance', () => {
  it('returns the Vue instance', () => {
    const wrapper = mount(ComputedProperties);
    expect(wrapper.instance()).to.deep.equal(wrapper.vm);
  });

  it('throws an error if node is not a Vue instance', () => {
    const message = 'wrapper.instance() can only be called on a Vue instance';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    const input = wrapper.find('p')[0];
    expect(() => input.instance()).throw(Error, message);
  });
});
