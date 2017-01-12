import { expect } from 'chai';
import mount from '../../../src/mount';
import Form from '../../resources/components/Form.vue';

describe('render', () => {
  it('returns an object', () => {
    const wrapper = mount(Form);

    expect(wrapper).to.be.an('object');
  });
});
