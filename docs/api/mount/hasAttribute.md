# hasAttribute(attribute)

Check if wrapper DOM node has specified attribute

### Arguments

`attribute` (`String`): attribute name to assert.

### Returns

(`Boolean`): `true` if element contains specified attribute, `false` otherwise.

## Example

`Foo.vue`

```js
<template lang="html">
    <div id="foo"></div>
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
expect(wrapper.hasAttribute('id')).to.equal(true);
```
