# name()

Returns component name if node is a Vue component, or the tag name if it is a native DOM node.

### Returns

(String): If node is a Vue instance, it returns the component name. If node is a native DOM node, it returns the tag name.

## Example

```js
import { mount } from 'avoriaz';
import { expect } from 'chai';
import Foo from './components/Foo';

describe('Foo', () => {
  it('has the class name bar', () => {
    const wrapper = mount(Foo);
    expect(wrapper.name()).to.equal('Foo');
  });
});
```