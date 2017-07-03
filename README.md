# avoriaz [![Build Status](https://travis-ci.org/eddyerburgh/avoriaz.svg?branch=master)](https://travis-ci.org/eddyerburgh/avoriaz)


> a Vue.js testing utility library


## Installation

```
npm install --save-dev avoriaz
```

## Documentation

[Visit the docs](https://eddyerburgh.gitbooks.io/avoriaz/content/)

## Examples

- [Example using karma and mocha](https://github.com/eddyerburgh/avoriaz-karma-mocha-example)
- [Example using karma and jasmine](https://github.com/eddyerburgh/avoriaz-karma-jasmine-example)
- [Example using Jest](https://github.com/eddyerburgh/avoriaz-jest-example)
- [Example using mocha-webpack](https://github.com/eddyerburgh/avoriaz-mocha-example)
- [Example using tape](https://github.com/eddyerburgh/avoriaz-tape-example)
- [Example using ava](https://github.com/eddyerburgh/avoriaz-ava-example)

##### Assert wrapper contains a child
```js
import { mount } from 'avoriaz'
import Foo from './Foo.vue'

const wrapper = mount(Foo)
expect(wrapper.contains('.bar')).to.equal(true)
```

##### Shallow render components
```js
import { shallow } from 'avoriaz'
import Foo from './Foo.vue'
import Bar from './Bar.vue'

const wrapper = shallow(Foo)
expect(wrapper.contains(Bar)).to.equal(true)
```

##### Assert style is rendered
```js
const button = wrapper.find('div > button .button-child')[0]
expect(button.hasStyle('color', 'red')).to.equal(true)
```

##### Assert method is called when DOM event is triggered
```js
const clickHandler = sinon.stub()
const wrapper = mount(Foo, {
  propsData: { clickHandler }
})
wrapper.find('div .bar')[0].trigger('click')
expect(clickHandler.called).to.equal(true)
```

##### Assert wrapper contains text
```js
const title = wrapper.find('h1.title')[0]
expect(title.text()).to.equal('some text')
```

##### Inject globals
```js
const $route = { path: 'http://www.example-path.com' }
const wrapper = mount(Foo, { 
    globals: {
        $route
    }
})
expect(wrapper.vm.$route.path).to.equal($route.path)
```

##### Inject slots
```js
const wrapper = mount(Foo, { 
    slots: {
        default: Foo
    }
})
```

##### Set data
```js
wrapper.setData({
  someData: 'some data'
})

expect(wrapper.vm.someData).to.equal('some data')
```

##### Update props
```js
wrapper.setProps({
  someProp: 'some prop',
  anotherProp: 'another prop'
})
```

For more examples, [see the docs](https://eddyerburgh.gitbooks.io/avoriaz/content/)
