# hasStyle(style, value)

Check if wrapper DOM node has style matching value

### Arguments

`style` (`String`): style name to assert value of.
`value` (`String`): the value style property should hold.

### Returns

(`Boolean`): `true` if element contains style with matching value,
`false` otherwise.

## Example

`Foo.vue`

```js
<template lang="html">
    <div :style="[styles]"></div>
</template>

<script>
export default {
    name: 'foo',
    data () {
        return {
            styles: {
                color: 'red'
            }
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
expect(wrapper.hasStyle('color', 'red')).to.equal(true);
```

### Note

Will only work with inline styles when running in `jsdom`.

This will not work, even though `is-danger` has style `color` set to `red`:

```js
<template lang="html">
    <div class="is-danger"></div>
</template>

<script>
export default {
    name: 'foo'
}
</script>

<css lang="css">
.is-danger {
    color: red;
}
</css>
```
