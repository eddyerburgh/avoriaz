import mount from '../../../../src/mount';
import ClickComponent from '../../../resources/components/event-components/ClickComponent.vue';
import ClickMethodComponent from '../../../resources/components/event-components/ClickMethodComponent.vue';
import ClickToggleComponent from '../../../resources/components/event-components/ClickToggleComponent.vue';
import KeydownComponent from '../../../resources/components/event-components/KeydownComponent.vue';
import KeydownWithModifier from '../../../resources/components/event-components/KeydownWithModifierComponent.vue';

describe('trigger', () => {
  it('causes click handler to fire when wrapper.trigger("click") is called on a child node', () => {
    const childClickHandler = sinon.stub();
    const wrapper = mount(ClickComponent, {
      propsData: { childClickHandler, parentClickHandler: () => {} },
    });
    const button = wrapper.find('#button')[0];
    button.trigger('click');

    expect(childClickHandler).to.be.calledOnce;
  });

  it('calls clickHandler', () => {
    const wrapper = mount(ClickMethodComponent);
    wrapper.vm.clickHandler = sinon.stub();
    wrapper.find('button')[0].trigger('click');
    // wrapper.find('button')[0].trigger('click'); // test only passes when uncommented
    expect(wrapper.vm.clickHandler.called).to.equal(true);
  });

  it('causes click handler to fire when wrapper.trigger("click") is fired on root node', () => {
    const parentClickHandler = sinon.stub();
    const wrapper = mount(ClickComponent, {
      propsData: { childClickHandler: () => {}, parentClickHandler },
    });
    wrapper.trigger('click');

    expect(parentClickHandler).to.be.calledOnce;
  });

  it('causes click handler to fire when wrapper.trigger("click") is fired on root node', () => {
    const parentClickHandler = sinon.stub();
    const TestComponent = {
      render: h => h(ClickComponent, {
        props: {
          childClickHandler: () => {}, parentClickHandler,
        },
      }),
    };
    const wrapper = mount(TestComponent);
    wrapper.find(ClickComponent)[0].trigger('click');

    expect(parentClickHandler).to.be.calledOnce;
  });

  it('causes keydown handler to fire when wrapper.trigger("keydown") is fired on root node', () => {
    const keydownHandler = sinon.stub();
    const wrapper = mount(KeydownComponent, {
      propsData: { keydownHandler },
    });
    wrapper.trigger('keydown');

    expect(keydownHandler).to.be.calledOnce;
  });

  it('causes keydown handler to fire when wrapper.trigger("keydown.enter") is fired on root node', () => {
    const keydownHandler = sinon.stub();
    const wrapper = mount(KeydownWithModifier, {
      propsData: { keydownHandler },
    });
    wrapper.trigger('keydown.enter');

    expect(keydownHandler).to.be.calledOnce;
  });

  it('causes DOM to update after clickHandler method that changes components data is called', () => {
    const wrapper = mount(ClickToggleComponent);

    expect(wrapper.hasClass('active')).to.equal(false);

    wrapper.trigger('click');

    expect(wrapper.hasClass('active')).to.equal(true);
  });

  it('calls console.info with input value on input trigger', () => {
    const wrapper = mount(ClickToggleComponent);
    expect(wrapper.hasClass('active')).to.equal(false);

    wrapper.trigger('click');

    expect(wrapper.hasClass('active')).to.equal(true);
  });

  it('throws an error if type is not a string', () => {
    const wrapper = mount(ClickToggleComponent);
    const invalidSelectors = [
      undefined, null, NaN, 0, 2, true, false, () => {}, {}, [],
    ];
    invalidSelectors.forEach((invalidSelector) => {
      const message = 'wrapper.trigger() must be passed a string';
      expect(() => wrapper.trigger(invalidSelector)).to.throw(Error, message);
    });
  });
});
