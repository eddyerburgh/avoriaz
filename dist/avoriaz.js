'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var cloneDeep = _interopDefault(require('lodash/cloneDeep'));
var addGlobals = _interopDefault(require('vue-add-globals'));
var assign = _interopDefault(require('lodash/assign'));

// 

function findAllVNodes(vNode, nodes) {
  if ( nodes === void 0 ) nodes = [];

  nodes.push(vNode);

  if (Array.isArray(vNode.children)) {
    vNode.children.forEach(function (childVNode) {
      findAllVNodes(childVNode, nodes);
    });
  }

  if (vNode.child) {
    findAllVNodes(vNode.child._vnode, nodes);
  }

  return nodes;
}

function removeDuplicateNodes(vNodes) {
  var uniqueNodes = [];
  vNodes.forEach(function (vNode) {
    var exists = uniqueNodes.some(function (node) { return vNode.elm === node.elm; });
    if (!exists) {
      uniqueNodes.push(vNode);
    }
  });
  return uniqueNodes;
}

function nodeMatchesSelector(node, selector) {
  return node.elm && node.elm.getAttribute && node.elm.matches(selector);
}

function findMatchingVNodes(vNode, selector) {
  var nodes = findAllVNodes(vNode);
  var matchingNodes = nodes.filter(function (node) { return nodeMatchesSelector(node, selector); });
  return removeDuplicateNodes(matchingNodes);
}

// 

function findAllVueComponents(vm, components) {
  if ( components === void 0 ) components = [];

  components.push(vm);

  vm.$children.forEach(function (child) {
    findAllVueComponents(child, components);
  });

  return components;
}

function vmCtorMatchesName(vm, name) {
  return (vm.$vnode && vm.$vnode.componentOptions.Ctor.options.name === name) ||
      (vm._vnode && vm._vnode.functionalOptions && vm._vnode.functionalOptions.name === name);
}

function findVueComponents(vm, componentName) {
  var components = findAllVueComponents(vm);
  return components.filter(function (component) {
    if (!component.$vnode) {
      return false;
    }
    return vmCtorMatchesName(component, componentName);
  });
}

// 

function isDomSelector(str) {
  if (typeof str !== 'string') {
    return false;
  }

  try {
    if (!document) {
      throw new Error('avoriaz must be run in a browser environment like PhantomJS, jsdom or chrome');
    }
  } catch (error) {
    throw new Error('avoriaz must be run in a browser environment like PhantomJS, jsdom or chrome');
  }

  try {
    document.querySelector(str);
    return true;
  } catch (error) {
    return false;
  }
}

function isVueComponent(component) {
  if (typeof component === 'function') {
    return false;
  }

  if (component === null) {
    return false;
  }

  if (typeof component !== 'object') {
    return false;
  }

  return typeof component.render === 'function';
}

function isValidSelector(selector) {
  if (isDomSelector(selector)) {
    return true;
  }

  return isVueComponent(selector);
}

// 

function warn(message) {
  console.warn(("[avoriaz] WARN: " + message));
}

function error(message) {
  throw new Error(("[avoriaz]: " + message));
}

// 

var Wrapper = function Wrapper(vNode, update, mountedToDom) {
  this.vNode = vNode;
  this.element = vNode.elm;
  this.update = update;
  this.mountedToDom = mountedToDom;
};

/**
 * Returns instances computed object
 *
 * @returns {Object}
 */
Wrapper.prototype.computed = function computed () {
  if (!this.isVueComponent) {
    error('wrapper.computed() can only be called on a Vue instance');
  }

  warn('functions returned by computed() will not have this bound to the vue instance. Calling a computed function that uses this will result in an error. You can access computed functions by using the vue instance. e.g. to call a computed function named compFunc, call wrapper.vm.compFunc. See https://github.com/eddyerburgh/avoriaz/issues/15');

  return this.vm.$options.computed;
};

/**
 * Checks if wrapper contains provided selector.
 *
 * @param {String} selector
 * @returns {Boolean}
 */
Wrapper.prototype.contains = function contains (selector) {
  if (!isValidSelector(selector)) {
    error('wrapper.contains() must be passed a valid CSS selector or a Vue constructor');
  }

  if (typeof selector === 'object') {
    var vm = this.vm || this.vNode.context.$root;
    return findVueComponents(vm, selector.name).length > 0;
  }

  return this.element.querySelectorAll(selector).length > 0;
};

/**
 * Returns instances data object
 *
 * @returns {Object}
 */
Wrapper.prototype.data = function data () {
  if (!this.isVueComponent) {
    error('wrapper.data() can only be called on a Vue instance');
  }

  return this.vm._data;
};

/**
 * Calls destroy on vm
 */
Wrapper.prototype.destroy = function destroy () {
  if (!this.isVueComponent) {
    error('wrapper.destroy() can only be called on a Vue instance');
  }

  if (this.vm.$el.parentNode) {
    this.vm.$el.parentNode.removeChild(this.vm.$el);
  }

  this.vm.$destroy();
};

/**
 * Finds every node in the mount tree of the current wrapper that matches the provided selector.
 *
 * @param {String|Object} selector
 * @returns {VueWrapper||VueWrapper[]}
 */
Wrapper.prototype.find = function find (selector) {
    var this$1 = this;

  if (!isValidSelector(selector)) {
    error('wrapper.find() must be passed a valid CSS selector or a Vue constructor');
  }

  if (typeof selector === 'object') {
    if (!selector.name) {
      error('.find() requires component to have a name property');
    }
    var vm = this.vm || this.vNode.context.$root;
    var components = findVueComponents(vm, selector.name);
    return components.map(function (component) { return new VueWrapper(component, this$1.mountedToDom); });
  }

  var nodes = findMatchingVNodes(this.vNode, selector);

  return nodes.map(function (node) { return new Wrapper(node, this$1.update, this$1.mountedToDom); });
};

/**
 * Returns the first node that matches the provided selector.
 *
 * @param {String|Object} selector
 * @returns {VueWrapper}
 */
Wrapper.prototype.first = function first (selector) {
  var nodes = this.find(selector);

  if (!nodes.length) {
    error('wrapper.first() has no matches with the given selector');
  }

  return nodes[0];
};

/**
 * Returns value of specified attribute of wrapper
 *
 * @param {String} attribute - attribute to assert
 * @returns {String}
 */
Wrapper.prototype.getAttribute = function getAttribute (attribute) {
  if (typeof attribute !== 'string') {
    error('wrapper.getAttribute() must be passed a string');
  }

  if (!this.hasAttribute(attribute)) {
    error(("wrapper has no attribute called " + attribute));
  }

  return this.element.getAttribute(attribute);
};

/**
 * Returns prop value of a Vue instance
 *
 * @param {String} propName - prop name to assert
 * @returns {*}
 */
Wrapper.prototype.getProp = function getProp (propName) {
  if (!this.isVueComponent) {
    error('wrapper.getProp() can only be called on a Vue instance');
  }

  if (typeof propName !== 'string') {
    error('wrapper.getProp() must be passed a string');
  }

  var propValue = this.vm.$props[propName];
  if (typeof propValue === 'function') {
    warn('functions returned by getProp() will not have this bound to the vue instance. Calling a propsData function that uses this will result in an error. You can access propsData functions by using the vue instance. e.g. to call a method function named propsDataFunc, call wrapper.vm.$props.propsDataFunc(). See https://github.com/eddyerburgh/avoriaz/issues/15');
  }
  return propValue;
};

/**
 * Asserts wrapper has an attribute
 *
 * @param {String} attribute - attribute to assert
 * @returns {Boolean}
 */
Wrapper.prototype.hasAttribute = function hasAttribute (attribute, value) {
  if (typeof attribute !== 'string') {
    error('wrapper.hasAttribute() must be passed attribute as a string');
  }

  if (arguments.length === 1) {
    return this.element.hasAttribute(attribute);
  }

  if (typeof value !== 'string') {
    error('wrapper.hasAttribute() must be passed value as a string');
  }

  warn('wrapper.hasAttribute(attribute, value) is deprecated in place of a new syntax and the old syntax will be removed from future versions. Instead, we encourage you to use getAttribute(attribute) === value to assert attribute value for better error report. For detailed information, see: https://github.com/eddyerburgh/avoriaz/issues/100');

  return this.element.getAttribute(attribute) === value;
};

/**
 * Asserts wrapper has a class name
 *
 * @param {String} className - class name to assert
 * @returns {Boolean}
 */
Wrapper.prototype.hasClass = function hasClass (className) {
  if (typeof className !== 'string') {
    error('wrapper.hasClass() must be passed a string');
  }

  return this.element.className.split(' ').indexOf(className) !== -1;
};

/**
 * Checks if wrapper has a style with value
 *
 * @param {String} style - style to assert
 * @param {String} value - value to assert style contains
 * @returns {Boolean}
 */
Wrapper.prototype.hasStyle = function hasStyle (style, value) {
  if (typeof style !== 'string') {
    error('wrapper.hasStyle() must be passed style as a string');
  }

  if (typeof value !== 'string') {
    error('wrapper.hasClass() must be passed value as string');
  }

  /* istanbul ignore next */
  if (navigator.userAgent.includes && navigator.userAgent.includes('node.js')) {
    warn('wrapper.hasStyle is not fully supported when running jsdom - only inline styles are supported');
  }
  var body = document.querySelector('body');
  var mockElement = document.createElement('div');
  // $FlowIgnore
  var mockNode = body.insertBefore(mockElement, null);
  // $FlowIgnore
  mockElement.style[style] = value;

  if (!this.mountedToDom) {
    var vm = this.vm || this.vNode.context.$root;
    // $FlowIgnore
    body.insertBefore(vm.$root._vnode.elm, null);
  }

  var elStyle = window.getComputedStyle(this.element)[style];
  var mockNodeStyle = window.getComputedStyle(mockNode)[style];
  return elStyle === mockNodeStyle;
};

/**
 * Returns HTML of element as a string
 *
 * @returns {String} HTML of wrapper element
 */
Wrapper.prototype.html = function html () {
  var tmp = document.createElement('div');
  tmp.appendChild(this.element);
  return tmp.innerHTML;
};

/**
 * Returns Vue instance
 *
 * @returns {String} HTML of wrapper element
 */
Wrapper.prototype.instance = function instance () {
  if (!this.isVueComponent) {
    error('wrapper.instance() can only be called on a Vue instance');
  }

  return this.vm;
};

/**
 * Checks if node matches selector
 *
 * @param {String} selector - selector to check node is
 * @returns {Boolean}
 */
Wrapper.prototype.is = function is (selector) {
  if (!isValidSelector(selector)) {
    error('wrapper.is() must be passed a valid CSS selector or a Vue constructor');
  }

  if (typeof selector === 'object') {
    if (!this.isVueComponent) {
      return false;
    }

    return vmCtorMatchesName(this.vm, selector.name);
  }

  if (selector[0] === '.') {
    return this.element.className.split(' ').indexOf(selector.substr(1)) !== -1;
  }

  if (selector[0] === '#') {
    return this.element.getAttribute('id') === selector.substr(1);
  }

  return this.element.tagName === selector.toUpperCase();
};

/**
 * Checks if node is empty
 *
 * @returns {Boolean}
 */
Wrapper.prototype.isEmpty = function isEmpty () {
  return this.vNode.children === undefined;
};

/**
 * Returns instances methods object
 *
 * @returns {Object}
 */
Wrapper.prototype.methods = function methods () {
  if (!this.isVueComponent) {
    error('wrapper.methods() can only be called on a Vue instance');
  }

  warn('functions returned by methods() will not have this bound to the vue instance. Calling a method that uses this will result in an error. You can access methods by using the vue instance. e.g. to call a method function named aMethod, call wrapper.vm.aMethod(). See https://github.com/eddyerburgh/avoriaz/issues/15');

  return this.vm.$options.methods;
};

/**
 * Returns name of component, or tag name if node is not a Vue component
 *
 * @returns {String}
 */
Wrapper.prototype.name = function name () {
  if (this.isVueComponent) {
    return this.vm.$options.name;
  }

  return this.vNode.tag;
};

/**
 * Sets vm methods
 *
 * @param {Object} methods - methods to set
 */
Wrapper.prototype.setMethods = function setMethods (methods) {
    var this$1 = this;

  if (!this.isVueComponent) {
    error('wrapper.setMethods() can only be called on a Vue instance');
  }

  Object.keys(methods).forEach(function (key) {
    this$1.vm[key] = methods[key];
    this$1.vm.$options.methods[key] = methods[key];
  });
  this.update();
  this.vNode = this.vm._vnode;
};

/**
 * Returns instances propsData object
 *
 * @returns {String}
 */
Wrapper.prototype.propsData = function propsData () {
  if (!this.isVueComponent) {
    error('wrapper.propsData() can only be called on a Vue instance');
  }

  warn('functions returned by propsData() will not have this bound to the vue instance. Calling a propsData function that uses this will result in an error. You can access propsData functions by using the vue instance. e.g. to call a method function named propsDataFunc, call wrapper.vm.$props.propsDataFunc(). See https://github.com/eddyerburgh/avoriaz/issues/15');

  return this.vm.$props;
};

/**
 * Sets vm data
 *
 * @param {Object} data - data to set
 */
Wrapper.prototype.setData = function setData (data) {
    var this$1 = this;

  if (!this.isVueComponent) {
    error('wrapper.setData() can only be called on a Vue instance');
  }

  Object.keys(data).forEach(function (key) {
    this$1.vm.$set(this$1.vm, [key], data[key]);
  });
  this.update();
  this.vNode = this.vm._vnode;
};

/**
 * Sets vm props
 *
 * @param {Object} props - props to set
 */
Wrapper.prototype.setProps = function setProps (props) {
    var this$1 = this;

  if (!this.isVueComponent) {
    error('wrapper.setProps() can only be called on a Vue instance');
  }
  var vm = this.vm || this.vNode.context.$root;

  Object.keys(props).forEach(function (key) {
    this$1.vm._props[key] = props[key];
  });
  Object.keys(props).forEach(function (key) {
    vm._watchers.forEach(function (watcher) {
      if (watcher.expression === key) { watcher.run(); }
    });
  });
  this.update();

  this.vNode = this.vm._vnode;
};

/**
 * Return text of wrapper element
 *
 * @returns {Boolean}
 */
Wrapper.prototype.text = function text () {
  return this.element.textContent;
};

/**
* Return value of wrapper element
*
* @returns {String | Boolean}
*/
Wrapper.prototype.value = function value () {
  if (!this.element.value) { return false; }
  return this.element.value;
};

/**
   * Triggers a DOM event on wrapper
   *
   * @param {String} type - type of event
   * @returns {Boolean}
   */
Wrapper.prototype.trigger = function trigger (type) {
  if (typeof type !== 'string') {
    error('wrapper.trigger() must be passed a string');
  }

  var modifiers = {
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
  };

  var event = type.split('.');

  var eventObject;

  // Fallback for IE10,11 - https://stackoverflow.com/questions/26596123
  if (typeof (Event) === 'function') {
    eventObject = new window.Event(event[0]);
  } else {
    eventObject = document.createEvent('Event');
    eventObject.initEvent(event[0], true, true);
  }

  if (event.length === 2) {
    // $FlowIgnore
    eventObject.keyCode = modifiers[event[1]];
  }

  this.element.dispatchEvent(eventObject);
  this.update();
};

// 

function update() {
  this.$forceUpdate.call(this);
  this._update(this._render());
}

var VueWrapper = (function (Wrapper$$1) {
  function VueWrapper(vm, mountedToDom) {
    var this$1 = this;

    Wrapper$$1.call(this, vm._vnode, update.bind(vm), mountedToDom);
    this.vm = vm;
    // $FlowIgnore
    Object.defineProperty(this, 'vNode', {
      get: function () { return this$1.vm._vnode; },
      set: function () {},
    });
    this.isVueComponent = true;
  }

  if ( Wrapper$$1 ) VueWrapper.__proto__ = Wrapper$$1;
  VueWrapper.prototype = Object.create( Wrapper$$1 && Wrapper$$1.prototype );
  VueWrapper.prototype.constructor = VueWrapper;

  return VueWrapper;
}(Wrapper));

// 

function addSlotToVm(vm, slotName, slotValue) {
  var elem = slotValue.vNode || vm.$createElement(slotValue);
  if (Array.isArray(vm.$slots[slotName])) {
    vm.$slots[slotName].push(elem); // eslint-disable-line no-param-reassign
  } else {
    vm.$slots[slotName] = [elem]; // eslint-disable-line no-param-reassign
  }
}

function addSlots(vm, slots) {
  Object.keys(slots).forEach(function (key) {
    if (!(Array.isArray(slots[key])) && !(slots[key] !== null && typeof slots[key] === 'object')) {
      throw new Error('slots[key] must be a Component or an array of Components');
    }

    if (Array.isArray(slots[key])) {
      slots[key].forEach(function (slotValue) {
        addSlotToVm(vm, key, slotValue);
      });
    } else {
      addSlotToVm(vm, key, slots[key]);
    }
  });
}

function addProvide(component, options) {
  var provide = typeof options.provide === 'function'
    ? options.provide
    : assign({}, options.provide);

  delete options.provide; // eslint-disable-line no-param-reassign

  options.beforeCreate = function vueTestUtilBeforeCreate() { // eslint-disable-line no-param-reassign,max-len
    this._provided = typeof provide === 'function'
      ? provide.call(this)
      : provide;
  };
}

/* eslint-disable no-param-reassign */

// 

function addAttrs(vm, attrs) {
  var consoleWarnSave = console.error;
  console.error = function () {};
  if (attrs) {
    vm.$attrs = attrs;
  } else {
    vm.$attrs = {};
  }
  console.error = consoleWarnSave;
}

function createInstance(component, options) {
  var instance = options.instance || Vue;

  // delete cached constructor
  delete component._Ctor;

  if (options.context) {
    if (!component.functional) {
      throw new Error('mount.context can only be used when mounting a functional component');
    }

    if (typeof options.context !== 'object') {
      throw new Error('mount.context must be an object');
    }
    var clonedComponent = cloneDeep(component);
    component = {
      render: function render(h) {
        return h(clonedComponent, options.context, options.children);
      },
    };
  }

  if (options.provide) {
    addProvide(component, options);
  }

  var Constructor = instance.extend(component);

  if (options.globals) {
    addGlobals(Constructor, options.globals);
  }
  var vm = new Constructor(options);

  addAttrs(vm, options.attrs);

  if (options.slots) {
    addSlots(vm, options.slots);
  }

  return vm;
}

function createElement() {
  var element = document.createElement('div');
  document.body.appendChild(element);
  return element;
}

/* istanbul ignore next */
if (global.Element && !global.Element.prototype.matches) {
  global.Element.prototype.matches =
    global.Element.prototype.matchesSelector ||
    global.Element.prototype.mozMatchesSelector ||
    global.Element.prototype.msMatchesSelector ||
    global.Element.prototype.oMatchesSelector ||
    global.Element.prototype.webkitMatchesSelector ||
    function matchesShiv(s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s);
      var i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {} // eslint-disable-line no-plusplus, no-empty
      return i > -1;
    };
}

// 

Vue.config.productionTip = false;

function mount(component, options) {
  if ( options === void 0 ) options = {};

  var vm = createInstance(component, options);

  if (options.attachToDocument) {
    vm.$mount(createElement());
  } else {
    vm.$mount();
  }

  return new VueWrapper(vm, !!options.attachToDocument);
}

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated' ];

function stubLifeCycleEvents(component) {
  LIFECYCLE_HOOKS.forEach(function (hook) {
    component[hook] = function () {}; // eslint-disable-line no-param-reassign
  });
}
function isRequired(name) {
  return name === 'KeepAlive' || name === 'Transition' || name === 'TransitionGroup';
}

function extractCoreProps(component) {
  return {
    attrs: component.attrs,
    name: component.name,
    on: component.on,
    key: component.key,
    ref: component.ref,
    props: component.props,
    domProps: component.domProps,
    class: component.class,
    staticClass: component.staticClass,
    staticStyle: component.staticStyle,
    style: component.style,
  };
}
function replaceGlobalComponents(instance, component) {
  Object.keys(instance.options.components).forEach(function (c) {
    if (isRequired(c)) {
      return;
    }
    if (!component.components) {
      component.components = {}; // eslint-disable-line no-param-reassign
    }
    component.components[c] = Object.assign({}, {render: function () {}},
      extractCoreProps(instance.options.components[c]));
    delete component.components[c]._Ctor; // eslint-disable-line no-param-reassign
    stubLifeCycleEvents(component.components[c]);
    stubLifeCycleEvents(instance.options.components[c]);
  });
}

function replaceComponents(component) {
  Object.keys(component.components).forEach(function (c) {
    // Remove cached constructor
    delete component.components[c]._Ctor; // eslint-disable-line no-param-reassign
    component.components[c] = Object.assign({}, extractCoreProps(component.components[c]),
      {render: function () {}});
    Vue.config.ignoredElements.push(c);
    stubLifeCycleEvents(component.components[c]);
  });
}

// 

function shallow(component, options) {
  var clonedComponent = cloneDeep(component);
  if (clonedComponent.components) {
    replaceComponents(clonedComponent);
  }

  replaceGlobalComponents(Vue, clonedComponent);

  return mount(clonedComponent, options);
}

var avoriaz = {
  mount: mount,
  shallow: shallow,
};

module.exports = avoriaz;
