# value()

Returns value content of wrapper if it is a form element.
Otherwise it returns false.

### Returns

(`String | boolean`): value content of wrapper or false if wrapper is not a form element.

### Example

`Foo.vue`

```js
<template lang="html">
    <input type="text" value="foo"/>
</template>

<script>
export default {
    name: 'foo'
}
</script>
```

`Foo.spec.js`

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
expect(wrapper.value()).to.equal('foo');
```

### Example with non-form element

`Bar.vue`

```js
<template lang="html">
    <div value="foo">
    </div>
</template>

<script>
export default {
    name: 'bar'
}
</script>
```
`Bar.spec.js`

```js
import { mount } from 'avoriaz'
import Bar from './Bar.vue'

const wrapper = mount(Bar);
expect(wrapper.value()).to.equal(false);
```

