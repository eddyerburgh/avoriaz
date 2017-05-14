import { compileToFunctions } from 'vue-template-compiler';
import { isVueComponent } from '../../../../src/lib/validators';
import ClickComponent from '../../../resources/components/event-components/ClickComponent.vue';
import UnnamedChild from '../../../resources/components/unnamed-components/UnnamedChild.vue';

describe('isVueComponent', () => {
  it('returns true using a named .vue file', () => {
    expect(isVueComponent(ClickComponent)).to.equal(true);
  });

  it('returns true using an unnamed .vue file', () => {
    expect(isVueComponent(UnnamedChild)).to.equal(true);
  });

  it('returns true using a compiled vue template', () => {
    const Compiled = compileToFunctions('<div><p></p><p></p></div>');
    expect(isVueComponent(Compiled)).to.equal(true);
  });
});
