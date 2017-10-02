import mount from '../../../../src/mount';
import Form from '../../../resources/components/form/Form.vue';
import Submit from '../../../resources/components/form/Submit.vue';

describe('html', () => {
  it('returns a VueWrappers HTML as a string', () => {
    const expectedHtml = '<input id="input-submit" type="submit" class="input-submit">';
    const wrapper = mount(Submit);

    expect(wrapper.html()).to.equal(expectedHtml);
  });

  it('does not alter render tree', () => {
    const Component = {
      template: `
          <div>
            <div class="header">
              <h3>{{ title }}</h3>
            </div>
            <div class="body">
              <p>{{ body }}</p>
            </div>
          </div>
        `,
      props: {
        title: String,
        body: String,
      },
    };
    const wrapper = mount(Component, { propsData: { title: 'Foo', body: 'Bar' } });
    const html = wrapper.html();
    wrapper.find('.header')[0].html();
    expect(html).to.equal(wrapper.html());
  });

  it('returns a Wrappers HTML as a string', () => {
    const expectedHtml = '<input id="input-text" type="text" class="input-text">';
    const wrapper = mount(Form);
    const input = wrapper.find('#input-text')[0];

    expect(input.html()).to.equal(expectedHtml);
  });
});
