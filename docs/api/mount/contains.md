# contains(selector)

Returns true if wrapper contains selector. Use any valid [avoriaz selector](/api/selectors).

### Arguments

selector (String|Component): a CSS selector ('#id', '.class-name', 'tag') or a Vue component. See [selectors](/api/selectors).

### Returns

Boolean: returns true if wrapper contains selector.

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
expect(wrapper.contains('p')).to.equal(true);
```