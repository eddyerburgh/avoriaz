import mount from '../../../../src/mount';
import ClickComponent from '../../../resources/components/event-components/ClickComponent.vue';
import ClickToggleComponent from '../../../resources/components/event-components/ClickToggleComponent.vue';
import KeydownComponent from '../../../resources/components/event-components/KeydownComponent.vue';
import KeydownWithModifier from '../../../resources/components/event-components/KeydownWithModifierComponent.vue';

describe('simulate', () => {
  beforeEach(() => {
    sinon.spy(console, 'warn');
  });

  afterEach(() => {
    console.warn.restore(); // eslint-disable-line no-console
  });
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

  it('causes click handler to fire when wrapper.simulate("click") is fired on component', () => {
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

  it('causes keydown handler to fire when wrapper.simulate("keydown.enter") is fired on root node', () => {
    const keydownHandler = sinon.stub();
    const wrapper = mount(KeydownWithModifier, {
      propsData: { keydownHandler },
    });
    wrapper.simulate('keydown.enter');

    expect(keydownHandler).to.be.calledOnce;
  });

  it('causes DOM to update after clickHandler method that changes components data is called', () => {
    const wrapper = mount(ClickToggleComponent);

    expect(wrapper.hasClass('active')).to.equal(false);

    wrapper.simulate('click');

    expect(wrapper.hasClass('active')).to.equal(true);
  });

  it('warns that simulate is deprecated and dispatch should be used instead', () => {
    mount(ClickToggleComponent).simulate('click');
    const message = '[avoriaz] WARN: wrapper.simulate() is deprecated and will be removed from future versions. Use wrapper.trigger() instead - https://eddyerburgh.gitbooks.io/avoriaz/content/api/mount/trigger.html';
    expect(console.warn).to.be.calledWith(message); // eslint-disable-line no-console
  });

  it('throws an error if type is not a string', () => {
    const wrapper = mount(ClickToggleComponent);
    const invalidSelectors = [
      undefined, null, NaN, 0, 2, true, false, () => {}, {}, [],
    ];
    invalidSelectors.forEach((invalidSelector) => {
      const message = 'wrapper.simulate() must be passed a string';
      expect(() => wrapper.simulate(invalidSelector)).to.throw(Error, message);
    });
  });
});
