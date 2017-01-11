import { expect } from 'chai';
import mount from '../../../src/mount';
import Form from '../../resources/mocks/Form.mock.vue';
import Wrapper from '../../../src/Wrapper';

describe('Wrapper', () => {
  describe('find', () => {
    it('returns an array of VueWrappers of elements matching tag selector passed', () => {
      const wrapper = mount(Form);
      const input = wrapper.find('input');
      expect(input).to.be.an.instanceOf(Wrapper);
      expect(input.element[0].className).to.equal('input-text');
    });

    it('returns an array of VueWrappers of elements matching class selector passed', () => {
      const wrapper = mount(Form);
      const input = wrapper.find('.input-text');
      expect(input).to.be.an.instanceOf(Wrapper);
      expect(input.element[0].className).to.equal('input-text');
    });

    it('returns an array of VueWrappers of elements matching id selector passed', () => {
      const wrapper = mount(Form);
      const input = wrapper.find('#input-text');
      expect(input).to.be.an.instanceOf(Wrapper);
      expect(input.element[0].className).to.equal('input-text');
    });
  });

  describe('contains', () => {
    it('returns true if wrapper contains element', () => {
      const wrapper = mount(Form);
      expect(wrapper.contains('input')).to.equal(true);
    });

    it('returns false if wrapper does not contain element', () => {
      const wrapper = mount(Form);
      expect(wrapper.contains('doesntexist')).to.equal(false);
    });
  });
});
