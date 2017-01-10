import { expect } from 'chai';
import mount from '../../../src/mount';
import Form from '../../resources/mocks/Form.mock.vue';

describe('mount', () => {
  it('returns an object', () => {
    const wrapper = mount(Form);

    expect(wrapper).to.be.an('object');
  });
});
