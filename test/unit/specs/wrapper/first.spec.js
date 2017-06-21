import { compileToFunctions } from 'vue-template-compiler';
import mount from '../../../../src/mount';
import Wrapper from '../../../../src/Wrapper';

describe('first', () => {
  it('returns a Wrapper instance matching tag selector passed', () => {
    const compiled = compileToFunctions('<div><p></p><p></p></div>');
    const wrapper = mount(compiled);
    const div = wrapper.first('p');
    expect(div).to.be.an.instanceOf(Wrapper);
  });

  it('returns the first Wrapper matching tag selector passed', () => {
    const compiled = compileToFunctions('<div><p class="active"></p><p></p></div>');
    const wrapper = mount(compiled);
    const div = wrapper.first('p');
    expect(div.hasClass('active')).to.be.true;
  });

  it('throws an error when passed selector has no matches', () => {
    const compiled = compileToFunctions('<div><a></a></div>');
    const wrapper = mount(compiled);
    const message = 'wrapper.first() has no matches with the given selector';
    expect(() => wrapper.first('p')).to.throw(Error, message);
  });
});
