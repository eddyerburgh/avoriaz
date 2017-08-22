# setMethods(methods)

Sets Vue instance methods and forces update. Can only be called on a Vue component wrapper.

### Arguments

props (`Object`): Methods to set.

### Example

`setMethods` is particularly useful for mocking or stubbing a method, for example mocking a method that makes an ajax request to an external resource.

##### Vue component:
```js
export default {
  methods: {
    asyncMethod() {
      // method we want to mock
    }
  }
}
```

##### Test:
```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
const asyncMethod = () => "{ apiData: 'Some Fake Data' }"
wrapper.setMethods({asyncMethod});
```
