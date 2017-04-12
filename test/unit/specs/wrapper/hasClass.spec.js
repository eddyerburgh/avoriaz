import mount from '../../../../src/mount';
import Form from '../../../resources/components/form/Form.vue';

describe('hasClass', () => {
  it('returns true if wrapper has class name', () => {
    const wrapper = mount(Form);
    expect(wrapper.hasClass('form')).to.equal(true);
  });

  it('returns false if wrapper does not have class name', () => {
    const wrapper = mount(Form);
    expect(wrapper.hasClass('not-class-name')).to.equal(false);
  });

  it('throws an error if selector is not a string', () => {
    const wrapper = mount(Form);
    const invalidSelectors = [
      undefined, null, NaN, 0, 2, true, false, () => {}, {}, [],
    ];
    invalidSelectors.forEach((invalidSelector) => {
      const message = 'wrapper.hasClass() must be passed a string';
      expect(() => wrapper.hasClass(invalidSelector)).to.throw(Error, message);
    });
  });
});
