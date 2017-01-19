# computed()

Returns a Vue instances computed object. Can only be called on a Vue component wrapper.

### Returns

Object: computed object 

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
expect(wrapper.computed().foo).to.equal('foo');
```