# hasClass(className)

Check if wrapper DOM node has a class name. Returns a boolean.

### Arguments

`className` (`String`): class name to assert element contains.

### Returns

(`Boolean`): `true` if element contains class. `false` otherwise.

## Example

`Foo.vue`

```js
<template lang="html">
    <div class="bar"></div>
</template>

<script>
export default {
    name: 'foo'
}
</script>

<style lang="css">
.bar {
    display: block;
}
</style>
```

`Foo.spec.js`

```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);
expect(wrapper.hasClass('bar')).to.equal(true);
```
