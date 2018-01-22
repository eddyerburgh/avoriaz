# .isVueComponent

Property on wrapper. True if wrapper is a Vue component, false if not.

## Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
expect(wrapper.isVueComponent).to.equal(true);
expect(wrapper.find('.bar').isVueComponent).to.equal(false);
```
