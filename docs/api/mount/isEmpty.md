# isEmpty(className)

Check if wrapper contains child nodes. Returns a boolean.

### Returns

(Boolean): true if node does not contain any child nodes. False if it does.

## Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
expect(wrapper.isEmpty()).to.equal(true);
```