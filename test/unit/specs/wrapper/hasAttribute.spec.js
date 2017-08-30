import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';

describe('hasAttribute', () => {
  describe('hasAttribute(attribute, value) - old syntax should still work', () => {
    // https://github.com/eddyerburgh/avoriaz/pull/101#discussion_r132471262

    beforeEach(() => {
      sinon.spy(console, 'warn');
    });

    afterEach(() => {
      console.warn.restore(); // eslint-disable-line no-console
    });

    it('returns true if wrapper contains attribute matching value', () => {
      const attribute = 'attribute';
      const value = 'value';
      const compiled = compileToFunctions(`<div ${attribute}=${value}></div>`);
      const wrapper = mount(compiled);
      expect(wrapper.hasAttribute(attribute, value)).to.equal(true);
    });

    it('returns false if wrapper does not contain attribute', () => {
      const compiled = compileToFunctions('<div />');
      const wrapper = mount(compiled);
      expect(wrapper.hasAttribute('attribute', 'value')).to.equal(false);
    });

    it('throws an error if attribute is not a string', () => {
      const compiled = compileToFunctions('<div />');
      const wrapper = mount(compiled);
      const message = 'wrapper.hasAttribute() must be passed attribute as a string';
      expect(() => wrapper.hasAttribute(undefined, 'value')).to.throw(Error, message);
    });

    it('throws an error if value is not a string', () => {
      const compiled = compileToFunctions('<div />');
      const wrapper = mount(compiled);
      const message = 'wrapper.hasAttribute() must be passed value as a string';
      expect(() => wrapper.hasAttribute('attribute', undefined)).to.throw(Error, message);
    });

    it('calls console.warn with information on old syntax being deprecated', () => {
      const expectedText = '[avoriaz] WARN: wrapper.hasAttribute(attribute, value) is deprecated in place of a new syntax and the old syntax will be removed from future versions. Instead, we encourage you to use getAttribute(attribute) === value to assert attribute value for better error report. For detailed information, see: https://github.com/eddyerburgh/avoriaz/issues/100';
      const compiled = compileToFunctions('<div />');
      const wrapper = mount(compiled);
      wrapper.hasAttribute('attribute', 'value');
      expect(console.warn).to.be.calledWith(expectedText); // eslint-disable-line no-console
    });
  });

  describe('hasAttribute(attribute) - new syntax', () => {
    it('returns true if wrapper contains attribute with value', () => {
      const attribute = 'attribute';
      const value = 'value';
      const compiled = compileToFunctions(`<div ${attribute}=${value}></div>`);
      const wrapper = mount(compiled);
      expect(wrapper.hasAttribute(attribute)).to.equal(true);
    });

    it('returns true if wrapper contains attribute without value', () => {
      const attribute = 'attribute';
      const compiled = compileToFunctions(`<div ${attribute}></div>`);
      const wrapper = mount(compiled);
      expect(wrapper.hasAttribute(attribute)).to.equal(true);
    });

    it('returns false if wrapper does not contain attribute', () => {
      const compiled = compileToFunctions('<div />');
      const wrapper = mount(compiled);
      expect(wrapper.hasAttribute('attribute')).to.equal(false);
    });

    it('throws an error if attribute is not a string', () => {
      const compiled = compileToFunctions('<div />');
      const wrapper = mount(compiled);
      const message = 'wrapper.hasAttribute() must be passed attribute as a string';
      expect(() => wrapper.hasAttribute(undefined)).to.throw(Error, message);
    });
  });
});
