import mount from '../../../src/mount';
import Form from '../../resources/components/Form.vue';
import Wrapper from '../../../src/Wrapper';
import Button from '../../resources/components/event-components/ClickComponent.vue';

describe('Wrapper', () => {
  describe('find', () => {
    it('returns an array of VueWrappers of elements matching tag selector passed', () => {
      const wrapper = mount(Form);
      const input = wrapper.find('input')[0];
      expect(input).to.be.an.instanceOf(Wrapper);
      expect(input.element.className).to.equal('input-text');
    });

    it('returns an array of VueWrappers of elements matching class selector passed', () => {
      const wrapper = mount(Form);
      const input = wrapper.find('.input-text')[0];
      expect(input).to.be.an.instanceOf(Wrapper);
      expect(input.element.className).to.equal('input-text');
    });

    it('returns an array of VueWrappers of elements matching id selector passed', () => {
      const wrapper = mount(Form);
      const input = wrapper.find('#input-text')[0];
      expect(input).to.be.an.instanceOf(Wrapper);
      expect(input.element.className).to.equal('input-text');
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

  describe('simulate', () => {
    it('causes click handler to fire when wrapper.simulate("click") is fired on child', () => {
      const childClickHandler = sinon.stub();
      const wrapper = mount(Button, {
        propsData: { childClickHandler, parentClickHandler: () => {} },
      });
      const button = wrapper.find('#button')[0];
      button.simulate('click');

      expect(childClickHandler).to.be.calledOnce;
    });
  });
});
