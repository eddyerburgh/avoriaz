import Wrapper from './Wrapper';

export default class VueWrapper extends Wrapper {

  constructor(ctor) {
    super(ctor.$el);
  }
}
