import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';

describe('getAttribute', () => {
  it('returns attribute value if wrapper contains attribute with value', () => {
    const attribute = 'attribute';
    const value = 'value';
    const compiled = compileToFunctions(`<div ${attribute}=${value}></div>`);
    const wrapper = mount(compiled);
    expect(wrapper.getAttribute(attribute)).to.equal(value);
  });

  it('returns empty string if wrapper contains attribute without value', () => {
    const attribute = 'attribute';
    const compiled = compileToFunctions(`<div ${attribute}></div>`);
    const wrapper = mount(compiled);
    expect(wrapper.getAttribute(attribute)).to.equal('');
  });

  it('throws an error if wrapper does not contain attribute', () => {
    const compiled = compileToFunctions('<div />');
    const wrapper = mount(compiled);
    const message = 'wrapper has no attribute called attribute';
    expect(() => wrapper.getAttribute('attribute')).to.throw(Error, message);
  });

  it('throws an error if attribute is not a string', () => {
    const compiled = compileToFunctions('<div />');
    const wrapper = mount(compiled);
    const message = 'wrapper.getAttribute() must be passed a string';
    expect(() => wrapper.getAttribute(undefined)).to.throw(Error, message);
  });
});
