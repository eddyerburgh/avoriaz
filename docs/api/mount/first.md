# first(selector)

Returns a wrapper of DOM node or Vue component. Use any valid [avoriaz selector](/api/selectors.md).

### Arguments

`selector` (`String`|`Component`): a CSS selector ('#id', '.class-name', 'tag') or a Vue component. See [selectors](/api/selectors.md).

### Returns

(`Object`): returns the first wrapper matching selector. Vue component wrappers have extra methods ([computed](/api/mount/computed.md), [data](/api/mount/data.md), [methods](/api/mount/methods.md), [propsData](/api/mount/propsData.md)). To check if a wrapper is a Vue component wrapper, use wrapper.isVueComponent.

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
const div = wrapper.first('div');
expect(div.is('div')).to.equal(true);
```
