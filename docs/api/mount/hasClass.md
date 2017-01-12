# hasClass(className)

Check if wrapper has a class name. Returns a boolean.

### Arguments

className (String): class name to check element contains.

### Returns

(Boolean): true if element contains class. False if not.

## Example

```js
import { mount } from 'avoriaz';
import { expect } from 'chai';
import Foo from './components/Foo';

describe('Foo', () => {
  it('has the class name bar', () => {
    const wrapper = mount(Foo);
    expect(wrapper.hasClass('bar')).to.equal(true);
  });
});
```