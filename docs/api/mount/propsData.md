# propsData()

Returns a Vue instances propData object. Can only be called on a Vue component wrapper.

The propsData object contains the data of an instances props.

### Returns

(Object): propsData object 

### Example

```js
import { mount } from 'avoriaz';
import Foo from './components/Foo';

it('renders with the correct propsData', () => {
	const foo = 'bar';
  const wrapper = mount(Foo, {propsData:{foo}});
  expect(wrapper.propsData().foo).to.equal(foo);
});
```