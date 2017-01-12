# text()

Returns text content of wrapper.

### Returns

Sttring: text content of wrapper.

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo';


const wrapper = mount(Foo);
expect(wrapper.text()).to.equal('bar');
```