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
});
