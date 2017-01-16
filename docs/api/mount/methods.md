# methods()

Returns a Vue instances methods object. Can only be called on a Vue component wrapper.

The methods object contains the methods of a Vue instance.

### Returns

(Object): methods object 

### Example

```js
import { mount } from 'avoriaz';
import Foo from './components/Foo';

it('renders with the correct propsData', () => {
  const wrapper = mount(Foo);
  expect(typeof wrapper.methods().foo).to.equal('function');
});
```