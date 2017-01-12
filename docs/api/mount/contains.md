# contains(selector)

Returns true if wrapper contains selector. Use any valid selector (tag, class, id)

### Arguments

selector (String): selector, can be any valid DOM selector ('#id', '.class-name', 'tag')

### Returns

Boolean: returns true if wrapper contains selector.

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo';

const wrapper = mount(Foo);
expect(wrapper.contains('p')).to.equal(true);
```