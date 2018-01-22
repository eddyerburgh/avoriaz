# instance()

Returns components Vue instance. Can only be called on a Vue component wrapper.

### Returns

(`Object`): Vue instance

### Example

`Foo.vue`

```js
<template lang="html">
    <div></div>
</template>

<script>
export default {
    name: 'foo',
    data () {
        return {
            bar: false
        }
    }
}
</script>
```

`Foo.spec.js`

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
wrapper.setData({bar: true});
expect(wrapper.instance().bar).to.equal(true);
```
