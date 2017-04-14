# mount(...)

### Arguments

component (Component): a CSS selector ('#id', '.class-name', 'tag') or a Vue component. See [selectors](/api/selectors.md).

Create a fully rendered Vue component. Returns a wrapper that includes methods to test the component renders and reacts as expected.

```js
import { mount } from 'avoriaz';
import { expect } from 'chai';
import Foo from './Foo.vue';

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo);
    expect(Foo.contains(div)).to.equal(true);
  });
});
```
