# data()

Returns a Vue instances data object. Can only be called on a Vue component wrapper.

### Returns

Object: data object 

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
expect(wrapper.data().foo).to.equal('foo');
```