# avoriaz

> a Vue.js testing utility library

## Installation

```
npm install --save-dev avoriaz
```

## Docs

[Visit the docs](https://eddyerburgh.gitbooks.io/avoriaz/content/)

## Examples

##### Call DOM events on the Vue wrapper

```js
import { mount } from 'avoriaz';
import Foo from './Foo';

const wrapper = mount(Foo, {
  propsData: { clickHandler },
});

wrapper.simulate('click');
```

##### Assert wrapper contains a child
```js
import { mount } from 'avoriaz';
import Foo from './Foo';

const wrapper = mount();

expect(wrapper.contains('.bar').to.equal(true));
```

##### Call DOM events on a child 
```js
import { mount } from 'avoriaz';
import Foo from './Foo';

const wrapper = mount(Foo, {
  propsData: { clickHandler },
});

const bar = wrapper.find('#bar');

bar.simulate('click');
```
