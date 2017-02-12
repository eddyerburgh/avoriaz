# use(plugin)

Install a Vue.js plugin.

A wrapper around [Vue.use](https://vuejs.org/v2/api/#Vue-use)

### Arguments

plugin (Object|Function): If the plugin is an Object, it must expose an install method. If it is a function itself, it will be treated as the install method.

### Example

```js
import vuex from 'vuex';
import avoriaz from 'avoriaz';

avoriaz.use(vuex);
```
