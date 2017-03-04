import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import ClickToggleComponent from '../../../resources/components/event-components/ClickToggleComponent.vue';

describe('methods', () => {
  it('returns the methods object of the Vue instance', () => {
    const wrapper = mount(ClickToggleComponent);
    expect(wrapper.methods()).to.deep.equal(ClickToggleComponent.methods);
  });

  it('throws an error if node is not a Vue instance', () => {
    const message = 'wrapper.methods() can only be called on a Vue instance';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    const input = wrapper.find('p')[0];
    expect(() => input.methods()).throw(Error, message);
  });
});
