import mount from '../../../../src/mount';
import Form from '../../../resources/components/form/Form.vue';
import Submit from '../../../resources/components/form/Submit.vue';

describe('name', () => {
  it('returns the name of the component it was called on', () => {
    const wrapper = mount(Submit);
    expect(wrapper.name()).to.equal('Submit');
  });

  it('returns the tag name of the element if it is not a Vue component', () => {
    const wrapper = mount(Form);
    expect(wrapper.find('#input-text')[0].name()).to.equal('input');
  });
});

