# getAttribute(attribute)

Returns value of specified attribute of wrapper DOM node

### Arguments

`attribute` (`String`): attribute name to assert value of.

### Returns

(`String`): value of specified attribute if the attribute exists in the wrapper DOM node, empty string otherwise.

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
expect(wrapper.getAttribute('id')).to.equal('foo');
```
