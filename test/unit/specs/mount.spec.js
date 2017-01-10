import mount from '../../../src/mount';
import Form from '../../resources/mocks/Form.mock.vue';
import { expect } from 'chai';

describe('mount', () => {
  it('returns an object', () => {
    const wrapper = mount(Form);

    expect(wrapper).to.be.an('object');
  })
});