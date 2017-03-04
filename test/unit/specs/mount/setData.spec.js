import mount from '../../../../src/mount';
import If from '../../../resources/components/v-if/If.vue';

describe('setData', () => {
  it('sets component data and updates vm when called on Vue component', () => {
    const wrapper = mount(If);
    expect(wrapper.find('.not-ready').length).to.equal(1);
    wrapper.setData({ ready: true });
    expect(wrapper.find('.ready').length).to.equal(1);
  });
});
