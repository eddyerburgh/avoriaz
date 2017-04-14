import { compileToFunctions } from 'vue-template-compiler';
import sinon from 'sinon';
import mount from '../../../../src/mount';
import BeforeDestroyed from '../../../resources/components/lifecycle/BeforeDestroy.vue';

describe('destory', () => {
  it('triggers beforeDestroy lifecycle function', () => {
    const func = sinon.stub();
    const wrapper = mount(BeforeDestroyed, {
      propsData: {
        func,
      },
    });
    wrapper.destroy();
    expect(expect(func).to.have.been.calledOnce);
  });

  it('remove element from document.body', () => {
    const compiled = compileToFunctions('<div></div>');
    const wrapper = mount(compiled, { attachToDocument: true });
    expect(wrapper.vm.$el.parentNode).to.equal(document.body);

    wrapper.destroy();
    expect(wrapper.vm.$el.parentNode).to.be.null;
  });

  it('throws an error if node is not a Vue instance', () => {
    const message = 'wrapper.destroy() can only be called on a Vue instance';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    const input = wrapper.find('p')[0];
    expect(() => input.destroy()).throw(Error, message);
  });
});
