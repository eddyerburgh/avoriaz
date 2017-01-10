## find(selector)

Returns a static wrapper of an element. Use any valid selector (tag, class, id)


```js
import { render } from 'avoriaz';
import { expect } from 'chai';
import Foo from './components/Foo';

describe('Foo', () => {
  it('can find a div that contains a p tag', () => {
    const wrapper = render(Foo);
    const input = wrapper.find('div');
    expect(input.contains('p')).to.equal(true);
  });
});
```