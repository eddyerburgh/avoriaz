import { expect } from 'chai';
import render from '../../../src/render';
import Form from '../../resources/mocks/Form.mock.vue';

describe('render', () => {
  it('returns an object', () => {
    const wrapper = render(Form);

    expect(wrapper).to.be.an('object');
  });
});
