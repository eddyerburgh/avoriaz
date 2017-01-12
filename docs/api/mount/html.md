# html()

Returns HTML of wrapper node as a string.

### Returns

(String): HTML of wrapper node

## Example

```js
import { mount } from 'avoriaz';
import { expect } from 'chai';
import Foo from './components/Foo';

describe('Foo', () => {
  it('has the class name bar', () => {
    const wrapper = mount(Foo);
    expect(wrapper.html()).to.equal('<p>Foo</p>');
  });
});
```