## find(selector)

Returns a static wrapper of an element. Use any valid selector (tag, class, id)


```js
import { mount } from 'avoriaz';
import { expect } from 'chai';
import Foo from './components/Foo';

describe('Foo', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(Foo);
    const input = wrapper.find('div');
    expect(input.contains('p')).to.equal(true);
  });
});
```