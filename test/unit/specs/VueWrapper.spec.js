import { expect } from 'chai';
import mount from '../../../src/mount';
import Form from '../../resources/mocks/Form.mock.vue';
import Wrapper from '../../../src/Wrapper';

describe('VueWrapper', () => {
  describe('constructor', () => {
    it('returns a wrapper $el set to the DOM node', () => {
      const wrapper = mount(Form);
      expect(typeof wrapper.element).to.equal('object');
    });
  });
  describe('find', () => {
    it('returns an array of VueWrappers of element matching selector passed', () => {
      const wrapper = mount(Form);
      const input = wrapper.find('.input-text');
      expect(input).to.be.an.instanceOf(Wrapper);
      expect(input.element[0].className).to.equal('input-text');
    });
  });
});
