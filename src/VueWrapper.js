import Wrapper from './Wrapper';

export default class VueWrapper extends Wrapper {

  constructor(component) {

    super(component.$el);
  }
}
