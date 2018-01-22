# destroy()

Destroys Vue instance. Can only be called on a Vue component

### Example

`BeforeDestroy.vue`

```js
<template lang="html">
  <div></div>
</template>

<script>
export default {
  name: 'BeforeDestroy',
  beforeDestroy() {
    this.func();
  },
  props: ['func']
}
</script>

```

`BeforeDestroy.spec.js`

```js
import { mount } from 'avoriaz';
import sinon from 'sinon';
import BeforeDestroy from './BeforeDestroy.vue';
const func = sinon.stub();

const wrapper = mount(BeforeDestroyed, { propsData: { func }});

wrapper.destroy();

expect(expect(func).to.have.been.calledOnce);
```
