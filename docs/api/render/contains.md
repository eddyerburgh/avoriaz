## contains(selector)

Returns true if wrapper contains selector. Use any valid selector (tag, class, id)


```js
import { render } from 'avoriaz';
import { expect } from 'chai';
import Foo from './components/Foo';

describe('Foo', () => {
  it('contains a p tag', () => {
    const wrapper = render(Foo);
    expect(wrapper.contains('p')).to.equal(true);
  });
});

```