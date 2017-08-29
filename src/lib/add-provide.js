import assign from 'lodash/assign';

function addProvide(component, options) {
  const provide = typeof options.provide === 'function'
    ? options.provide
    : assign({}, options.provide);

  delete options.provide; // eslint-disable-line no-param-reassign

  options.beforeCreate = function vueTestUtilBeforeCreate() { // eslint-disable-line no-param-reassign,max-len
    this._provided = typeof provide === 'function'
      ? provide.call(this)
      : provide;
  };
}

export default addProvide;
