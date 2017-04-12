import mount from '../../../../src/mount';
import Form from '../../../resources/components/form/Form.vue';
import Submit from '../../../resources/components/form/Submit.vue';

describe('html', () => {
  it('returns a VueWrappers HTML as a string', () => {
    const expectedHtml = '<input id="input-submit" type="submit" class="input-submit">';
    const wrapper = mount(Submit);

    expect(wrapper.html()).to.equal(expectedHtml);
  });

  it('returns a Wrappers HTML as a string', () => {
    const expectedHtml = '<input id="input-text" type="text" class="input-text">';
    const wrapper = mount(Form);
    const input = wrapper.find('#input-text')[0];

    expect(input.html()).to.equal(expectedHtml);
  });
});
