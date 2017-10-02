import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';

describe('isEmpty', () => {
  it('returns true if node is empty', () => {
    const compiled = compileToFunctions('<div></div>');
    const wrapper = mount(compiled);

    expect(wrapper.isEmpty()).to.equal(true);
  });

  it('returns true if node has whitespace', () => {
    const compiled = compileToFunctions('<div>  </div>');
    const wrapper = mount(compiled);

    expect(wrapper.isEmpty()).to.equal(true);
  });

  it('returns true if node contains removed element', () => {
    const compiled = compileToFunctions('<div><p v-if="false"></p></div>');
    const wrapper = mount(compiled);

    expect(wrapper.isEmpty()).to.equal(true);
  });

  it('returns true if node contains empty slot', () => {
    const compiled = compileToFunctions('<div><slot></slot></div>');
    const wrapper = mount(compiled);

    expect(wrapper.isEmpty()).to.equal(true);
  });

  it('returns false if node contains element nodes', () => {
    const compiled = compileToFunctions('<div><p /></div>');
    const wrapper = mount(compiled);

    expect(wrapper.isEmpty()).to.equal(false);
  });

  it('returns false if node contains text nodes', () => {
    const compiled = compileToFunctions('<div>Text content</div>');
    const wrapper = mount(compiled);

    expect(wrapper.isEmpty()).to.equal(false);
  });
});
