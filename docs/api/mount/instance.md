# instance()

Returns components Vue instance. Can only be called on a Vue component wrapper.

### Returns

Object: Vue instance

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
wrapper.setData({bar: true});
expect(wrapper.instance().bar).to.equal(true);
```
