import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import Wrapper from '../../../../src/Wrapper';
import Parent from '../../../resources/components/nested-components/Parent.vue';
import SecondChild from '../../../resources/components/nested-components/SecondChild.vue';
import Transition from '../../../resources/components/nested-components/Transition.vue';
import SlotParent from '../../../resources/components/slots/SlotParent.vue';
import Form from '../../../resources/components/form/Form.vue';
import Submit from '../../../resources/components/form/Submit.vue';
import Items from '../../../resources/components/v-for/Items.vue';
import UnnamedParent from '../../../resources/components/unnamed-components/UnnamedParent.vue';
import UnnamedChild from '../../../resources/components/unnamed-components/UnnamedChild.vue';

describe('find', () => {
  it('returns an array of Wrappers of elements matching tag selector passed', () => {
    const compiled = compileToFunctions('<div><p></p><p></p></div>');
    const wrapper = mount(compiled);
    const divs = wrapper.find('p');
    expect(divs[0]).to.be.an.instanceOf(Wrapper);
    expect(divs.length).to.equal(2);
  });

  it('returns an array of Wrapper of elements matching class selector passed', () => {
    const wrapper = mount(Form);
    const input = wrapper.find('.input-text')[0];
    expect(input).to.be.an.instanceOf(Wrapper);
    expect(input.element.className).to.equal('input-text');
  });

  it('returns an array of Wrapper of elements matching class selector passed if they are nested in a transition', () => {
    const wrapper = mount(Transition);
    const children = wrapper.find('.child');
    expect(children.length).to.equal(3);
  });

  it('returns an array of Wrapper of elements matching class selector passed if they are declared inside a slot', () => {
    const wrapper = mount(SlotParent);
    const children = wrapper.find('.slot-footer-content');
    expect(children.length).to.equal(1);
  });

  it('returns an array of Wrappers of elements matching id selector passed', () => {
    const wrapper = mount(Form);
    const input = wrapper.find('#input-text')[0];

    expect(input).to.be.an.instanceOf(Wrapper);
    expect(input.element.className).to.equal('input-text');
  });

  it('returns an array of Wrappers of elements matching attribute selector passed', () => {
    const compiled = compileToFunctions('<div><a href="/"></a></div>');
    const wrapper = mount(compiled);
    expect(wrapper.find('[href="/"]').length).to.equal(1);
  });

  it('throws an error when passed an invalid DOM selector', () => {
    const compiled = compileToFunctions('<div><a href="/"></a></div>');
    const wrapper = mount(compiled);
    const message = 'wrapper.find() must be passed a valid CSS selector or a Vue constructor';
    expect(() => wrapper.find('[href=&6"/"]')).to.throw(Error, message);
  });

  it('returns an array of Wrappers of elements matching selector with descendant combinator passed', () => {
    const compiled = compileToFunctions('<div><ul><li>list</li>item<li></li></ul></div>');
    const wrapper = mount(compiled);
    const divs = wrapper.find('div li');
    expect(divs[0]).to.be.an.instanceOf(Wrapper);
    expect(divs.length).to.equal(2);
  });

  it('does not return duplicate nodes', () => {
    const compiled = compileToFunctions('<div><div><div><p/><p/></div></div></div></div>');
    const wrapper = mount(compiled);
    const divs = wrapper.find('div p');
    expect(divs[0]).to.be.an.instanceOf(Wrapper);
    expect(divs.length).to.equal(2);
  });

  it('returns an array of Wrappers of elements matching selector with direct descendant combinator passed', () => {
    const compiled = compileToFunctions('<div><ul><ul></ul></ul></div>');
    const wrapper = mount(compiled);
    const divs = wrapper.find('div > ul');
    expect(divs[0]).to.be.an.instanceOf(Wrapper);
    expect(divs.length).to.equal(1);
  });

  it('returns an array of Wrappers of elements matching selector with direct descendant combinator passed', () => {
    const compiled = compileToFunctions('<div><p></p><p></p></div>');
    const wrapper = mount(compiled);
    const divs = wrapper.find('div p:first-of-type');
    expect(divs[0]).to.be.an.instanceOf(Wrapper);
    expect(divs.length).to.equal(1);
  });

  it('returns an array of VueWrappers of Vue Components matching component', () => {
    const wrapper = mount(Parent);
    const secondChildComponents = wrapper.find(SecondChild);
    expect(secondChildComponents.length).to.equal(6);
  });

  it('returns correct number of Vue Wrapper when component has a v-for', () => {
    const wrapper = mount(Items, { propsData: { list: [{}, {}, {}] } });
    expect(wrapper.find('.item').length).to.equal(3);
  });

  it('returns array of VueWrappers of Vue Components matching component if component name in parent is different to filename', () => {
    const wrapper = mount(Form);
    const submit = wrapper.find(Submit);
    expect(submit.length).to.equal(1);
  });

  it('returns an array of VueWrappers of Vue Components matching component using dom node as reference', () => {
    const wrapper = mount(Parent);
    const div = wrapper.find('div')[0];
    const secondChildComponents = div.find(SecondChild);
    expect(secondChildComponents.length).to.equal(6);
  });

  it('throws an error if component does not have a name property', () => {
    const wrapper = mount(UnnamedParent);
    const message = '.find() requires component to have a name property';
    expect(() => wrapper.find(UnnamedChild)).to.throw(Error, message);
  });

  it('returns an empty array if no nodes matching selector are found', () => {
    const wrapper = mount(Parent);
    const secondChildComponents = wrapper.find('pre');
    expect(secondChildComponents.length).to.equal(0);
  });

  it('throws an error if selector is not a valid avoriaz selector', () => {
    const wrapper = mount(Parent);
    const invalidSelectors = [
      undefined, null, NaN, 0, 2, true, false, () => {}, {}, { name: undefined }, [],
    ];
    invalidSelectors.forEach((invalidSelector) => {
      const message = 'wrapper.find() must be passed a valid CSS selector or a Vue constructor';
      expect(() => wrapper.find(invalidSelector)).to.throw(Error, message);
    });
  });
});
