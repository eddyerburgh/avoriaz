# is(selector)

Returns true if wrapper node matches selector. Use any valid selector (tag, class, id)

### Arguments

selector (String|Component): selector, can be any valid DOM selector ('#id', '.class-name', 'tag') or a Vue component. See [selectors](/api/selectors)

### Returns

Boolean: returns true if wrapper node matches selector.

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo';

const wrapper = mount(Foo);
expect(wrapper.is('div')).to.equal(true);
```