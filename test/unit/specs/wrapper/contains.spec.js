import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import Form from '../../../resources/components/form/Form.vue';
import Submit from '../../../resources/components/form/Submit.vue';

describe('contains', () => {
  it('returns true if wrapper contains element', () => {
    const compiled = compileToFunctions('<div><input /></div>');
    const wrapper = mount(compiled);
    expect(wrapper.contains('input')).to.equal(true);
  });

  it('returns true if wrapper contains Vue component', () => {
    const wrapper = mount(Form);
    expect(wrapper.contains(Submit)).to.equal(true);
  });

  it('returns true if wrapper that is not a vue component contains Vue component', () => {
    const wrapper = mount(Form);
    const input = wrapper.find('#input-text')[0];

    expect(input.contains(Submit)).to.equal(true);
  });

  it('returns false if wrapper does not contain element', () => {
    const wrapper = mount(Form);
    expect(wrapper.contains('doesntexist')).to.equal(false);
  });

  it('throws an error if selector is not a valid avoriaz selector', () => {
    const wrapper = mount(Form);
    const invalidSelectors = [
      undefined, null, NaN, 0, 2, true, false, () => {}, {}, { name: undefined }, [],
    ];
    invalidSelectors.forEach((invalidSelector) => {
      const message = 'wrapper.contains() must be passed a valid CSS selector or a Vue constructor';
      expect(() => wrapper.contains(invalidSelector)).to.throw(Error, message);
    });
  });
});
