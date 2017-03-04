import mount from '../../../../src/mount';
import Form from '../../../resources/components/form/Form.vue';
import Submit from '../../../resources/components/form/Submit.vue';

describe('is', () => {
  it('returns true if root node matches tag selector', () => {
    const wrapper = mount(Submit);
    expect(wrapper.is('input')).to.equal(true);
  });

  it('returns true if root node matches class selector', () => {
    const wrapper = mount(Submit);
    expect(wrapper.is('.input-submit')).to.equal(true);
  });

  it('returns true if root node matches id selector', () => {
    const wrapper = mount(Submit);
    expect(wrapper.is('#input-submit')).to.equal(true);
  });

  it('returns true if root node matches Vue Component selector', () => {
    const wrapper = mount(Form);
    const submit = wrapper.find(Submit)[0];
    expect(submit.is(Submit)).to.equal(true);
  });

  it('returns false if root node is not a Vue Component', () => {
    const wrapper = mount(Form);
    const input = wrapper.find('#input-text')[0];
    expect(input.is(Submit)).to.equal(false);
  });

  it('returns false if root node does not match tag selector', () => {
    const wrapper = mount(Submit);
    expect(wrapper.is('p')).to.equal(false);
  });

  it('returns false if root node does not match class selector', () => {
    const wrapper = mount(Submit);
    expect(wrapper.is('.p')).to.equal(false);
  });

  it('returns false if root node does not match id selector', () => {
    const wrapper = mount(Submit);
    expect(wrapper.is('#p')).to.equal(false);
  });

  it('throws an error if selector is not a valid avoriaz selector', () => {
    const wrapper = mount(Form);
    const invalidSelectors = [
      undefined, null, NaN, 0, 2, true, false, () => {}, {}, { name: undefined }, [],
    ];
    invalidSelectors.forEach((invalidSelector) => {
      const message = 'wrapper.is() must be passed a valid CSS selector or a Vue constructor';
      expect(() => wrapper.is(invalidSelector)).to.throw(Error, message);
    });
  });
});
