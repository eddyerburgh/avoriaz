# avoriaz [![Build Status](https://travis-ci.org/eddyerburgh/avoriaz.svg?branch=master)](https://travis-ci.org/eddyerburgh/avoriaz) [![Coverage Status](https://coveralls.io/repos/github/eddyerburgh/avoriaz/badge.svg?branch=master)](https://coveralls.io/github/eddyerburgh/avoriaz?branch=master)


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
import Foo from './Foo.vue';

const wrapper = mount(Foo, {
  propsData: { clickHandler },
});

wrapper.simulate('click');
```

##### Assert wrapper contains a child
```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);

expect(wrapper.contains('.bar')).to.equal(true);
```

##### Assert wrapper contains text
```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);

expect(wrapper.text()).to.equal('some text');
```

##### Call DOM events on a child 
```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

clickHandler = sinon.stub();

const wrapper = mount(Foo, {
  propsData: { clickHandler },
});

const bar = wrapper.find('#bar')[0];

bar.simulate('click');

expect(clickHandler.called()).to.equal(true)
```
