# style()

Returns a style object of native DOM node.

### Returns

(Object): style object

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
expect(Foo.style().color).to.equal('red');
```
