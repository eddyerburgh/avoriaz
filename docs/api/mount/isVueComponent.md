# .isVueComponent

Check if wrapper is a Vue component. Returns a boolean.

### Returns

(`Boolean`): true if the wrapper is a Vue component.

## Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
expect(wrapper.isVueComponent()).to.equal(true);
```
