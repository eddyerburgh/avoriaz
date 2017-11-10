# Migrating to vue-test-utils

vue-test-utils is in beta, and will be released soon. When vue-test-utils is released avoriaz will be deprecated.

avoriaz and vue-test-utils have similar APIs. You can use this guide to migrate from avoriaz to vue-test-utils.

## The find API

The main difference between avoriaz and vue-test-utils is the `find` API.

In avoriaz there is one method to traverse the render tree—`find`. `find` returns an array of wrappers that match the selector.

```js
// avoriaz
const wrapper = mount(Component)
wrapper.find('div')[0].is('div')
```

In vue-test-utils, there are two methods to traverse the render tree—`find` and `findAll`. `find` returns the first wrapper matching the selector, `findAll` returns an array-like object.

```js
// vue-test-utils
const wrapper = mount(Component)
wrapper.find('div').is('div')
wrapper.findAll('div').at(0).is('div')
```

## Mounting options

Another difference is the name of the mounting options:

| avoriaz   |  vue-test-utils |
|---|---|
| `globals`  | `mocks`  |
|  `instance` | `localVue`  |

## hasClass, hasProp, and hasAttribute

vue-test-utils will replace `hasProp`, `hasClass`, and `hasAttribute` with `props`, `classes`, and `attributes`.

`hasProp`, `hasClass`, and `hasAttribute` exist in the early vue-test-utils beta, but will be removed before the full release.

The reason for this is that `hasProp`, `hasClass`, and `hasAttribute` return booleans, which makes debugging difficult. The new methods enable us to write more [value assertions](https://medium.freecodecamp.org/how-to-write-powerful-unit-tests-using-value-assertions-3de5146c0088) in our tests.
