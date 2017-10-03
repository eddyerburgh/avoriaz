# contains(selector)

Returns true if wrapper contains selector. Use any valid [avoriaz selector](/api/selectors.md).

### Arguments

`selector` (`String`|`Component`): a CSS selector ('#id', '.class-name', 'tag') or a Vue component. See [selectors](/api/selectors.md).

### Returns

(`Boolean`): returns `true` if wrapper contains selector.

### Example

`Foo.vue`

```js
<template lang="html">
    <div>
        <p></p>
    </div>
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
expect(wrapper.contains('p')).to.equal(true);
```

### Example with Component

`Bar.vue`

```js
<template lang="html">
    <div>
        <baz></baz>
    </div>
</template>

<script>
import Baz from './Baz.vue';

export default {
    name: 'bar',
    components: {
        Baz
    }
}
</script>
```

`Baz.vue`

```js
<template lang="html">
    <div></div>
</template>

<script>
export default {
    name: 'baz'
}
</script>
```

`Bar.spec.js`

```js
import { mount } from 'avoriaz';
import Bar from './Bar.vue';
import Baz from './Baz.vue';

const wrapper = mount(Bar)
expect(wrapper.contains(Baz)).to.equal(true)
```
