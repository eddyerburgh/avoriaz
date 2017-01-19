# propsData()

Returns a Vue instances propData object. Can only be called on a Vue component wrapper.

The propsData object contains the data of an instances props. If a Vue component passed props to a child component, the data will be accessible in propsData.

### Returns

(Object): propsData object 

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const foo = 'bar';
const wrapper = mount(Foo, {propsData:{foo}});
expect(wrapper.propsData().foo).to.equal(foo);
```