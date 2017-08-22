import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import ClickMethodComponent from '../../../resources/components/event-components/ClickMethodComponent.vue';

describe('setMethods', () => {
  it('sets component methods when called on the Vue instance', () => {
    const setClickHandler = () => {};
    const wrapper = mount(ClickMethodComponent);

    wrapper.setMethods({ clickHandler: setClickHandler });

    expect(wrapper.methods().clickHandler).to.equal(setClickHandler);
  });

  it('throws an error if node is not a Vue instance', () => {
    const message = 'wrapper.setMethods() can only be called on a Vue instance';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    const input = wrapper.find('p')[0];
    expect(() => input.setMethods({ ready: true })).throw(Error, message);
  });
});
