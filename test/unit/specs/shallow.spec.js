import shallow from '../../../src/shallow';
import mount from '../../../src/mount';
import Parent from '../../resources/components/nested-components/Parent.vue';
import FirstChild from '../../resources/components/nested-components/FirstChild.vue';
import SecondChild from '../../resources/components/nested-components/SecondChild.vue';


describe('shallow', () => {
  it('returns mounted wrapper with stubbed components', () => {
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      return;
    }
    const wrapper = shallow(Parent);
    expect(wrapper.find(FirstChild).length).to.equal(2);
    expect(wrapper.find(SecondChild).length).to.equal(0);
  });

  it('stubs lifecycle methods', () => {
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      return;
    }
    const log = sinon.stub(console, 'log');
    shallow(Parent);
    expect(log.called).to.equal(false);
    log.restore();
  });

  it('does not stub root lifecycle methods', () => {
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      return;
    }
    const log = sinon.stub(console, 'log');
    shallow(FirstChild);
    expect(log.called).to.equal(true);
    log.restore();
  });

  it('does not modify component object for later tests', () => {
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      return;
    }
    const shallowWrapper = shallow(Parent);
    expect(shallowWrapper.find(SecondChild).length).to.equal(0);
    const mountWrapper = mount(Parent);
    expect(mountWrapper.find(SecondChild).length).to.equal(6);
  });
});
