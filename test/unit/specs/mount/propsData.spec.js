import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import ClickComponent from '../../../resources/components/event-components/ClickComponent.vue';

describe('propsData', () => {
  it('returns props object of the Vue instance', () => {
    const propsData = {
      childClickHandler: () => 'childClickHandler',
      parentClickHandler: () => 'parentClickHandler',
    };
    const wrapper = mount(ClickComponent, { propsData });
    expect(wrapper.propsData()).to.deep.equal(propsData);
  });

  it('throws an error if node is not a Vue instance', () => {
    const message = 'wrapper.propsData() can only be called on a Vue instance';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    const input = wrapper.find('p')[0];
    expect(() => input.propsData()).throw(Error, message);
  });
});
