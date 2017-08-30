# getProp()

Returns value of specified prop of Vue instance. Can only be called on a Vue component wrapper.

### Returns

(`Any`): value of specified prop.

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const foo = 'bar';
const wrapper = mount(Foo, {propsData:{foo}});
expect(wrapper.getProp('foo')).to.equal(foo);
```
