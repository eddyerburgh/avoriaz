import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../src/mount';
import Wrapper from '../../../src/Wrapper';

// Vue components for testing purposes
import Form from '../../resources/components/form/Form.vue';
import ClickComponent from '../../resources/components/event-components/ClickComponent.vue';
import ClickToggleComponent from '../../resources/components/event-components/ClickToggleComponent.vue';
import KeydownComponent from '../../resources/components/event-components/KeydownComponent.vue';
import Submit from '../../resources/components/form/Submit.vue';
import Paragraph from '../../resources/components/paragraph/Paragraph.vue';
import ComputedProperties from '../../resources/components/data-components/ComputedProperties.vue';
import Parent from '../../resources/components/nested-components/Parent.vue';
import SecondChild from '../../resources/components/nested-components/SecondChild.vue';
import Transition from '../../resources/components/nested-components/Transition.vue';
import SlotParent from '../../resources/components/slots/SlotParent.vue';
import DivColorRed from '../../resources/components/style/DivColorRed.vue';

describe('Wrapper', () => {
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
      const compiled = compileToFunctions('<div><ul><ul></ul><ul/></div>');
      const wrapper = mount(compiled);
      const divs = wrapper.find('div > ul');
      expect(divs[0]).to.be.an.instanceOf(Wrapper);
      expect(divs.length).to.equal(1);
    });

    it('returns an array of VueWrappers of Vue Components matching component', () => {
      const wrapper = mount(Parent);
      const secondChildComponents = wrapper.find(SecondChild);
      expect(secondChildComponents.length).to.equal(6);
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

  describe('contains', () => {
    it('returns true if wrapper contains element', () => {
      const wrapper = mount(Form);
      expect(wrapper.contains('input')).to.equal(true);
    });

    it('returns true if wrapper contains Vue component', () => {
      const wrapper = mount(Form);
      expect(wrapper.contains(Submit)).to.equal(true);
    });

    it('returns true if wrapper that is not a vue component contains Vue component', () => {
      const wrapper = mount(Form);
      const input = wrapper.find('#input-text')[0];

      expect(input.contains(Submit)).to.equal(true);
    });

    it('returns false if wrapper does not contain element', () => {
      const wrapper = mount(Form);
      expect(wrapper.contains('doesntexist')).to.equal(false);
    });

    it('throws an error if selector is not a valid avoriaz selector', () => {
      const wrapper = mount(Form);
      const invalidSelectors = [
        undefined, null, NaN, 0, 2, true, false, () => {}, {}, { name: undefined }, [],
      ];
      invalidSelectors.forEach((invalidSelector) => {
        const message = 'wrapper.find() must be passed a valid CSS selector or a Vue constructor';
        expect(() => wrapper.contains(invalidSelector)).to.throw(Error, message);
      });
    });
  });

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

  describe('simulate', () => {
    it('causes click handler to fire when wrapper.simulate("click") is called on a child node', () => {
      const childClickHandler = sinon.stub();
      const wrapper = mount(ClickComponent, {
        propsData: { childClickHandler, parentClickHandler: () => {} },
      });
      const button = wrapper.find('#button')[0];
      button.simulate('click');

      expect(childClickHandler).to.be.calledOnce;
    });

    it('causes click handler to fire when wrapper.simulate("click") is fired on root node', () => {
      const parentClickHandler = sinon.stub();
      const wrapper = mount(ClickComponent, {
        propsData: { childClickHandler: () => {}, parentClickHandler },
      });
      wrapper.simulate('click');

      expect(parentClickHandler).to.be.calledOnce;
    });

    it('causes keydown handler to fire when wrapper.simulate("keydown") is fired on root node', () => {
      const keydownHandler = sinon.stub();
      const wrapper = mount(KeydownComponent, {
        propsData: { keydownHandler },
      });
      wrapper.simulate('keydown');

      expect(keydownHandler).to.be.calledOnce;
    });

    it('causes DOM to update after clickHandler method that changes components data is called', () => {
      const wrapper = mount(ClickToggleComponent);

      expect(wrapper.hasClass('active')).to.equal(false);

      wrapper.simulate('click');

      expect(wrapper.hasClass('active')).to.equal(true);
    });

    it('throws an error if type is not a string', () => {
      const wrapper = mount(Form);
      const invalidSelectors = [
        undefined, null, NaN, 0, 2, true, false, () => {}, {}, [],
      ];
      invalidSelectors.forEach((invalidSelector) => {
        const message = 'wrapper.simulate() must be passed a string';
        expect(() => wrapper.simulate(invalidSelector)).to.throw(Error, message);
      });
    });
  });

  describe('html', () => {
    it('returns a VueWrappers HTML as a string', () => {
      const expectedHtml = '<input id="input-submit" type="submit" class="input-submit">';
      const wrapper = mount(Submit);

      expect(wrapper.html()).to.equal(expectedHtml);
    });

    it('returns a Wrappers HTML as a string', () => {
      const expectedHtml = '<input id="input-text" type="text" class="input-text">';
      const wrapper = mount(Form);
      const input = wrapper.find('#input-text')[0];

      expect(input.html()).to.equal(expectedHtml);
    });
  });

  describe('is', () => {
    it('returns true if root node matches tag selector', () => {
      const wrapper = mount(Submit);
      expect(wrapper.is('input')).to.equal(true);
    });

    it('returns true if root node matches class selector', () => {
      const wrapper = mount(Submit);
      expect(wrapper.is('.input-submit')).to.equal(true);
    });

    it('returns true if root node matches id selector', () => {
      const wrapper = mount(Submit);
      expect(wrapper.is('#input-submit')).to.equal(true);
    });

    it('returns true if root node matches Vue Component selector', () => {
      const wrapper = mount(Form);
      const submit = wrapper.find(Submit)[0];
      expect(submit.is(Submit)).to.equal(true);
    });

    it('returns false if root node is not a Vue Component', () => {
      const wrapper = mount(Form);
      const input = wrapper.find('#input-text')[0];
      expect(input.is(Submit)).to.equal(false);
    });

    it('returns false if root node does not match tag selector', () => {
      const wrapper = mount(Submit);
      expect(wrapper.is('p')).to.equal(false);
    });

    it('returns false if root node does not match class selector', () => {
      const wrapper = mount(Submit);
      expect(wrapper.is('.p')).to.equal(false);
    });

    it('returns false if root node does not match id selector', () => {
      const wrapper = mount(Submit);
      expect(wrapper.is('#p')).to.equal(false);
    });

    it('throws an error if selector is not a valid avoriaz selector', () => {
      const wrapper = mount(Form);
      const invalidSelectors = [
        undefined, null, NaN, 0, 2, true, false, () => {}, {}, { name: undefined }, [],
      ];
      invalidSelectors.forEach((invalidSelector) => {
        const message = 'wrapper.is() must be passed a valid CSS selector or a Vue constructor';
        expect(() => wrapper.is(invalidSelector)).to.throw(Error, message);
      });
    });
  });

  describe('isEmpty', () => {
    it('returns true if node is empty', () => {
      const wrapper = mount(Submit);

      expect(wrapper.isEmpty()).to.equal(true);
    });

    it('returns false if node contains other nodes', () => {
      const wrapper = mount(Form);

      expect(wrapper.isEmpty()).to.equal(false);
    });
  });

  describe('name', () => {
    it('returns the name of the component it was called on', () => {
      const wrapper = mount(Submit);
      expect(wrapper.name()).to.equal('Submit');
    });

    it('returns the tag name of the element if it is not a Vue component', () => {
      const wrapper = mount(Form);
      expect(wrapper.find('#input-text')[0].name()).to.equal('input');
    });
  });


  describe('text', () => {
    it('returns text content of wrapper node', () => {
      const text = 'test text prop';
      const wrapper = mount(Paragraph, { propsData: { text } });
      expect(wrapper.text()).to.equal(text);
    });
  });

  describe('data', () => {
    it('returns the data object of the Vue instance', () => {
      const wrapper = mount(ComputedProperties);
      expect(wrapper.data()).to.deep.equal(ComputedProperties.data());
    });

    it('throws an error if node is not a Vue instance', () => {
      const message = 'wrapper.data() can only be called on a Vue instance';
      const wrapper = mount(Form);
      const input = wrapper.find('#input-text')[0];
      expect(() => input.data()).throw(Error, message);
    });
  });

  describe('computed', () => {
    it('returns the computed object of the Vue instance', () => {
      const wrapper = mount(ComputedProperties);
      expect(wrapper.computed()).to.deep.equal(ComputedProperties.computed);
    });

    it('throws an error if node is not a Vue instance', () => {
      const message = 'wrapper.computed() can only be called on a Vue instance';
      const wrapper = mount(Form);
      const input = wrapper.find('#input-text')[0];
      expect(() => input.computed()).throw(Error, message);
    });
  });

  describe('methods', () => {
    it('returns the methods object of the Vue instance', () => {
      const wrapper = mount(ClickToggleComponent);
      expect(wrapper.methods()).to.deep.equal(ClickToggleComponent.methods);
    });

    it('throws an error if node is not a Vue instance', () => {
      const message = 'wrapper.methods() can only be called on a Vue instance';
      const wrapper = mount(Form);
      const input = wrapper.find('#input-text')[0];
      expect(() => input.methods()).throw(Error, message);
    });
  });

  describe('propsData', () => {
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
      const wrapper = mount(Form);
      const input = wrapper.find('#input-text')[0];
      expect(() => input.propsData()).throw(Error, message);
    });
  });

  describe('style', () => {
    it('returns inline styles of wrapper element', () => {
      if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
        return;
      }
      const compiled = compileToFunctions('<div style="color:red;"></div>');
      const wrapper = mount(compiled);
      expect(wrapper.style().color).to.equal('rgb(255, 0, 0)');
    });

    it('returns computed styles of wrapper element', () => {
      if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
        return;
      }
      const wrapper = mount(DivColorRed);
      expect(wrapper.style().color).to.equal('rgb(255, 0, 0)');
    });
  });

  describe('hasStyle', () => {
    it('returns inline styles of wrapper element', () => {
      const compiled = compileToFunctions('<div style="color:red;"></div>');
      const wrapper = mount(compiled);
      expect(wrapper.hasStyle('color', 'red')).to.equal(true);
    });

    it('returns computed styles of wrapper element', () => {
      if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
        return;
      }
      const wrapper = mount(DivColorRed);
      expect(wrapper.hasStyle('color', 'red')).to.equal(true);
    });

    it('throws an error if style is not a string', () => {
      const compiled = compileToFunctions('<div />');
      const wrapper = mount(compiled);
      const message = 'wrapper.hasStyle() must be passed style as a string';
      expect(() => wrapper.hasStyle(undefined, 'red')).to.throw(Error, message);
    });

    it('throws an error if value is not a string', () => {
      const compiled = compileToFunctions('<div />');
      const wrapper = mount(compiled);
      const message = 'wrapper.hasClass() must be passed value as string';
      expect(() => wrapper.hasStyle('color', undefined)).to.throw(Error, message);
    });
  });
});
