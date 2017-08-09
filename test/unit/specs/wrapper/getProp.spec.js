import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import PropsComponent from '../../../resources/components/data-components/PropsComponent.vue';

describe('propsData', () => {
  beforeEach(() => {
    sinon.spy(console, 'warn');
  });

  afterEach(() => {
    console.warn.restore(); // eslint-disable-line no-console
  });


  it('returns prop value of the Vue instance', () => {
    const propsData = {
      prop1: 'prop value',
      prop2: () => 'prop value',
    };
    const wrapper = mount(PropsComponent, { propsData });
    const prop1 = wrapper.getProp('prop1');
    const prop2 = wrapper.getProp('prop2');
    expect(prop1).to.equal(propsData.prop1);
    expect(prop2).to.equal(propsData.prop2);
  });

  it('throws an error if node is not a Vue instance', () => {
    const message = 'wrapper.getProp() can only be called on a Vue instance';
    const compiled = compileToFunctions('<div><p></p></div>');
    const wrapper = mount(compiled);
    const input = wrapper.find('p')[0];
    expect(() => input.getProp('propName')).throw(Error, message);
  });

  it('calls console.warn with information on unbound this', () => {
    const expectedText = '[avoriaz] WARN: functions returned by getProp() will not have this bound to the vue instance. Calling a propsData function that uses this will result in an error. You can access propsData functions by using the vue instance. e.g. to call a method function named propsDataFunc, call wrapper.vm.$props.propsDataFunc(). See https://github.com/eddyerburgh/avoriaz/issues/15';
    const wrapper = mount(PropsComponent, {
      propsData: {
        prop1() {},
      },
    });
    wrapper.getProp('prop1');
    expect(console.warn).to.be.calledWith(expectedText); // eslint-disable-line no-console
  });
});
