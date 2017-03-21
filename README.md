# avoriaz [![Build Status](https://travis-ci.org/eddyerburgh/avoriaz.svg?branch=master)](https://travis-ci.org/eddyerburgh/avoriaz)


> a Vue.js testing utility library


## Installation

```
npm install --save-dev avoriaz
```

## Docs

[Visit the docs](https://eddyerburgh.gitbooks.io/avoriaz/content/)

## Examples

- [Example using karma and mocha](https://github.com/eddyerburgh/avoriaz-karma-mocha-example)
- [Example using mocha-webpack](https://github.com/eddyerburgh/avoriaz-mocha-example)
- [Example use karama and jasmine](https://github.com/eddyerburgh/avoriaz-karma-jasmine-example)


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
const button = wrapper.find('div > button')[0];

expect(wrapper.text()).to.equal('some text');
```

##### Check style is rendered
```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

const wrapper = mount(Foo);

wrapper.hasStyle('color', 'red');
```

##### Call DOM events on a child
```js
import { mount } from 'avoriaz';
import Foo from './Foo.vue';

clickHandler = sinon.stub();

const wrapper = mount(Foo, {
  propsData: { clickHandler },
});

const bar = wrapper.find('div .bar')[0];

bar.simulate('click');

expect(clickHandler.called()).to.equal(true)
```
