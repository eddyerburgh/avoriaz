# hasAttribute(attribute, value)

Check if wrapper DOM node has attribute matching value

### Arguments

attribute (String): attribute name to assert value of.
value (String): the value attribute should hold.

### Returns

(Boolean): true if element contains attribute with matching value. False if not.

## Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
expect(wrapper.hasAttribute('id', 'foo')).to.equal(true);
```
