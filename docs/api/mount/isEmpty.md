# hasClass(className)

Check if wrapper contains child nodes. Returns a boolean.

### Returns

(Boolean): true if node does not contain child nodes. False if it does.

## Example

```js
import { mount } from 'avoriaz';
import { expect } from 'chai';
import Foo from './components/Foo';

describe('Foo', () => {
  it('has the class name bar', () => {
    const wrapper = mount(Foo);
    expect(wrapper.isEmpty()).to.equal(true);
  });
});
```