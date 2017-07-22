import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import ClickToggleComponent from '../../../resources/components/event-components/ClickToggleComponent.vue';

describe('methods', () => {
  beforeEach(() => {
    sinon.spy(console, 'warn');
  });

  afterEach(() => {
    console.warn.restore(); // eslint-disable-line no-console
  });

  it('returns the methods object of the Vue instance', () => {
    const wrapper = mount(ClickToggleComponent);
    expect(wrapper.methods()).to.deep.equal(ClickToggleComponent.methods);
  });

  it('throws an error if node is not a Vue instance', () => {
    const message = 'wrapper.methods() can only be called on a Vue instance';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    const input = wrapper.find('p')[0];
    expect(() => input.methods()).throw(Error, message);
  });

  it('calls console.warn with information on unbound this', () => {
    const expectedText = '[avoriaz] WARN: functions returned by methods() will not have this bound to the vue instance. Calling a method that uses this will result in an error. You can access methods by using the vue instance. e.g. to call a method function named aMethod, call wrapper.vm.aMethod(). See https://github.com/eddyerburgh/avoriaz/issues/15';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    wrapper.methods();
    expect(console.warn).to.be.calledWith(expectedText); // eslint-disable-line no-console
  });
});
