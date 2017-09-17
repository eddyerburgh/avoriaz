import Vue from 'vue';
import shallow from '../../../src/shallow';
import mount from '../../../src/mount';
import Parent from '../../resources/components/nested-components/Parent.vue';
import FirstChild from '../../resources/components/nested-components/FirstChild.vue';
import SecondChild from '../../resources/components/nested-components/SecondChild.vue';
import ChildProps from '../../resources/components/data-components/ChildProps.vue';
import Submit from '../../resources/components/form/Submit.vue';
import LogMountedParent from '../../resources/components/lifecycle/LogMountedParent.vue';
import LogMounted from '../../resources/components/lifecycle/LogMounted.vue';
import Global from '../../resources/components/slots/Global.vue';

describe('shallow', () => {
  it('returns mounted wrapper with stubbed components', () => {
    const wrapper = shallow(Parent);
    expect(wrapper.find(FirstChild).length).to.equal(2);
    expect(wrapper.find(SecondChild).length).to.equal(0);
  });

  it('stubs lifecycle methods', () => {
    const log = sinon.stub(console, 'log');
    shallow(Parent);
    expect(log.called).to.equal(false);
    log.restore();
  });

  it('stubs global components', () => {
    const log = sinon.stub(console, 'log');
    Vue.component('router-view', LogMounted);
    mount(LogMountedParent);
    shallow(LogMountedParent);
    expect(log).to.have.been.calledOnce;
    log.restore();
  });

  it('does not stub root lifecycle methods', () => {
    const log = sinon.stub(console, 'log');
    shallow(FirstChild);
    expect(log.called).to.equal(true);
    log.restore();
  });

  it('does not modify component object for later tests', () => {
    const shallowWrapper = shallow(Parent);
    expect(shallowWrapper.find(SecondChild).length).to.equal(0);
    const mountWrapper = mount(Parent);
    expect(mountWrapper.find(SecondChild).length).to.equal(6);
  });

  it('returns wrapper that you can test props of', () => {
    const wrapper = shallow(ChildProps);
    expect(wrapper.find(Submit)[0].vm.$props.hello).to.equal('hello');
  });

  it('renders default slot in global components', () => {
    const wrapper = shallow(Global, {
      renderDefaultSlot: true,
    });
    const container = wrapper.first('#container');
    expect(container.text()).to.equal('HELLO');
  });

  it('does not render default slot in global components', () => {
    const wrapper = shallow(Global, {
      renderDefaultSlot: false,
    });
    const container = wrapper.first('#container');
    expect(container.text()).to.equal('');
  });
});

