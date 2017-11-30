# dispatch(eventName)

dispatch an event on the wrapper

### Arguments

event (`String`): type of event (e.g. click).
options (`Object`): options.

## Example

```js
import { mount } from 'avoriaz';
import sinon from 'sinon';
import Foo from './Foo';

const clickHandler = sinon.stub();
const wrapper = mount(Foo, {
  propsData: { clickHandler },
});

wrapper.dispatch('click', {
  clientX: 123
});

expect(clickHandler.called).to.equal(true)
```
