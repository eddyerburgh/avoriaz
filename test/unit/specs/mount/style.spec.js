import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import DivColorRed from '../../../resources/components/style/DivColorRed.vue';

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
