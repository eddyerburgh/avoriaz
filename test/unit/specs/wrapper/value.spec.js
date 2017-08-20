import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';

describe('value', () => {
  it('returns value content of input element', () => {
    const value = 'test value prop';
    const compiled = compileToFunctions(`<input value="${value}"/>`);
    const wrapper = mount(compiled);

    expect(wrapper.value()).to.equal(value);
  });

  it('returns false if value() is called on a non input element', () => {
    const value = 'test value prop';
    const compiled = compileToFunctions(`<div value="${value}"></div>`);
    const wrapper = mount(compiled);

    expect(wrapper.value()).to.equal(false);
  });
});
