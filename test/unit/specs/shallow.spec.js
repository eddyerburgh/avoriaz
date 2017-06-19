import shallow from '../../../src/shallow';
import ParentComponent from '../../resources/components/nested-components/Parent.vue';
import FirstChild from '../../resources/components/nested-components/FirstChild.vue';
import SecondChild from '../../resources/components/nested-components/SecondChild.vue';


describe('shallow', () => {
  it('returns mounted wrapper with stubbed components', () => {
    if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
      return;
    }
    const wrapper = shallow(ParentComponent);
    expect(wrapper.find(FirstChild).length).to.equal(2);
    expect(wrapper.find(SecondChild).length).to.equal(0);
  });
});
