# update()

Force root Vue component to re-render.

### Example

```js
import { mount } from 'avoriaz';
import Foo from './Foo';


const wrapper = mount(Foo);
expect(wrapper.vm.bar).to.equal('bar');
wrapper.vm.bar = 'new value';
wrapper.update();
expect(wrapper.vm.bar).to.equal('new value');
```