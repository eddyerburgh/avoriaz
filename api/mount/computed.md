# computed()

Returns a Vue instances computed object. Can only be called on a Vue component wrapper.

### Returns

(`Object`): computed object

### Example

`Foo.vue`

```js
<template lang="html">
    <div></div>
</template>

<script>
export default {
    name: 'foo',
    computed: {
        foo () {
            return 'f' + 'o' + 'o';
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
expect(wrapper.computed().foo()).to.equal('foo');
```
