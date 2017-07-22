import mount from '../../../../src/mount';
import ClickComponent from '../../../resources/components/event-components/ClickComponent.vue';
import ClickToggleComponent from '../../../resources/components/event-components/ClickToggleComponent.vue';
import KeydownComponent from '../../../resources/components/event-components/KeydownComponent.vue';
import KeydownWithModifier from '../../../resources/components/event-components/KeydownWithModifierComponent.vue';

describe('dispatch', () => {
  beforeEach(() => {
    sinon.spy(console, 'warn');
  });

  afterEach(() => {
    console.warn.restore(); // eslint-disable-line no-console
  });

  it('causes click handler to fire when wrapper.dispatch("click") is called on a child node', () => {
    const childClickHandler = sinon.stub();
    const wrapper = mount(ClickComponent, {
      propsData: { childClickHandler, parentClickHandler: () => {} },
    });
    const button = wrapper.find('#button')[0];
    button.dispatch('click');

    expect(childClickHandler).to.be.calledOnce;
  });

  it('causes click handler to fire when wrapper.dispatch("click") is fired on root node', () => {
    const parentClickHandler = sinon.stub();
    const wrapper = mount(ClickComponent, {
      propsData: { childClickHandler: () => {}, parentClickHandler },
    });
    wrapper.dispatch('click');

    expect(parentClickHandler).to.be.calledOnce;
  });

  it('causes click handler to fire when wrapper.dispatch("click") is fired on root node', () => {
    const parentClickHandler = sinon.stub();
    const TestComponent = {
      render: h => h(ClickComponent, {
        props: {
          childClickHandler: () => {}, parentClickHandler,
        },
      }),
    };
    const wrapper = mount(TestComponent);
    wrapper.find(ClickComponent)[0].dispatch('click');

    expect(parentClickHandler).to.be.calledOnce;
  });

  it('causes keydown handler to fire when wrapper.dispatch("keydown") is fired on root node', () => {
    const keydownHandler = sinon.stub();
    const wrapper = mount(KeydownComponent, {
      propsData: { keydownHandler },
    });
    wrapper.dispatch('keydown');

    expect(keydownHandler).to.be.calledOnce;
  });

  it('causes keydown handler to fire when wrapper.dispatch("keydown.enter") is fired on root node', () => {
    const keydownHandler = sinon.stub();
    const wrapper = mount(KeydownWithModifier, {
      propsData: { keydownHandler },
    });
    wrapper.dispatch('keydown.enter');

    expect(keydownHandler).to.be.calledOnce;
  });

  it('causes DOM to update after clickHandler method that changes components data is called', () => {
    const wrapper = mount(ClickToggleComponent);

    expect(wrapper.hasClass('active')).to.equal(false);

    wrapper.dispatch('click');

    expect(wrapper.hasClass('active')).to.equal(true);
  });

  it('warns that dispatch is deprecated and dispatch should be used instead', () => {
    mount(ClickToggleComponent).dispatch('click');
    const message = '[avoriaz] WARN: wrapper.dispatch() is deprecated and will be removed from future versions. Use wrapper.trigger() instead - https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/trigger.html';
    expect(console.warn).to.be.calledWith(message); // eslint-disable-line no-console
  });

  it('throws an error if type is not a string', () => {
    const wrapper = mount(ClickToggleComponent);
    const invalidSelectors = [
      undefined, null, NaN, 0, 2, true, false, () => {}, {}, [],
    ];
    invalidSelectors.forEach((invalidSelector) => {
      const message = 'wrapper.dispatch() must be passed a string';
      expect(() => wrapper.dispatch(invalidSelector)).to.throw(Error, message);
    });
  });
});
