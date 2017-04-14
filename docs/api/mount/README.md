# mount(component,{,options}])

Create a fully rendered Vue component. Returns a wrapper that includes methods to test the component renders and reacts as expected.

### Arguments

`component` (`Component`): A vue component

`options` (`Object`) [optional]: a Vue options object. Vue options are passed to the component when a new instance is created. , e.g. `store`, `propsData`. For full list, see the [Vue API](https://vuejs.org/v2/api/). Also takes avoriaz options:

`options.attachToDocument` (`Boolean`): Component will attach to DOM when rendered. This can be used with [`hasStyle`](/api/mount/hasStyle.md) to check multi element CSS selectors

### Examples

#### Without options

```js
import { mount } from 'avoriaz';
import { expect } from 'chai';
import Foo from './Foo.vue';

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo);
    expect(wrapper.props(div)).to.equal(true);
  });
});
```
#### With Vue options
```js
import { mount } from 'avoriaz';
import { expect } from 'chai';]
import Foo from './Foo.vue';

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo, { 
        propsData: { 
            color: 'red',
        },
    });
    expect(wrapper.props(div)).to.equal(true);
  });
});
```

#### Attach to DOM
```js
import { mount } from 'avoriaz';
import { expect } from 'chai';]
import Foo from './Foo.vue';

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo, { 
        attachToDocument: true
    });
    expect(wrapper.props(div)).to.equal(true);
  });
});
```
