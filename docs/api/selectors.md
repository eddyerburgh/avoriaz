# Selectors

A lot of avoriaz methods take a selector as an argument. A selector can either be a CSS selector, or a Vue component.

## CSS Selectors

avoriaz handles the following CSS selecors:

- tag selectors (div, foo, bar)
- class selectors (.foo, .bar)
- attribute selectors ([foo], [foo="bar"])
- id selectors (#foo, #bar)

You can also use descendant combinators:

- direct descendant combinator (div > bar > foo)
- general descendant combinator (div bar foo)

## Vue Components

Vue components are also valid selectors.

avoriaz uses the *name* property to search the instance tree for matching Vue components.

### Example

```js
// Foo.vue

export default{
  name: 'Foo',
};
```

```js
import Foo from './Foo.vue';
const wrapper = mount(Foo);

expect(wrapper.is(Foo)).to.equal(true);
```
