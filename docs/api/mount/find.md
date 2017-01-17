# find(selector)

Returns a static wrapper of an element. Use any valid selector (tag, class, id) or Vue component.

### Arguments

selector (String|Component): selector, can be any valid DOM selector ('#id', '.class-name', 'tag') or a Vue component. See [selectors](/api/selectors)

### Returns

Array: returns an array of wrappers matching selector, or Vue Wrappers matching component.

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';


const wrapper = mount(Foo);
const input = wrapper.find('div');
expect(input.contains('p')).to.equal(true);
```

With a Vue Component:
```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';
import Bar from './Bar.vue'

const wrapper = mount(Foo);
const bar = wrapper.find(Bar)[0];
expect(bar.props().foo).to.equal('foo');
```