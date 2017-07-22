import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import ClickComponent from '../../../resources/components/event-components/ClickComponent.vue';

describe('propsData', () => {
  beforeEach(() => {
    sinon.spy(console, 'warn');
  });

  afterEach(() => {
    console.warn.restore(); // eslint-disable-line no-console
  });


  it('returns props object of the Vue instance', () => {
    const propsData = {
      childClickHandler: () => 'childClickHandler',
      parentClickHandler: () => 'parentClickHandler',
    };
    const wrapper = mount(ClickComponent, { propsData });
    expect(wrapper.propsData()).to.deep.equal(propsData);
  });

  it('throws an error if node is not a Vue instance', () => {
    const message = 'wrapper.propsData() can only be called on a Vue instance';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    const input = wrapper.find('p')[0];
    expect(() => input.propsData()).throw(Error, message);
  });

  it('calls console.warn with information on unbound this', () => {
    const expectedText = '[avoriaz] WARN: functions returned by propsData() will not have this bound to the vue instance. Calling a propsData function that uses this will result in an error. You can access propsData functions by using the vue instance. e.g. to call a method function named propsDataFunc, call wrapper.vm.$props.propsDataFunc(). See https://github.com/eddyerburgh/avoriaz/issues/15';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    wrapper.propsData();
    expect(console.warn).to.be.calledWith(expectedText); // eslint-disable-line no-console
  });
});

