'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Wrapper2 = require('./Wrapper');

var _Wrapper3 = _interopRequireDefault(_Wrapper2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function update() {
  this.$forceUpdate.call(this);
  this._update(this._render());
}

var VueWrapper = function (_Wrapper) {
  _inherits(VueWrapper, _Wrapper);

  function VueWrapper(vm, mountedToDom) {
    _classCallCheck(this, VueWrapper);

    var _this = _possibleConstructorReturn(this, (VueWrapper.__proto__ || Object.getPrototypeOf(VueWrapper)).call(this, vm._vnode, update.bind(vm), mountedToDom));

    _this.vm = vm;

    Object.defineProperty(_this, 'vNode', {
      get: function get() {
        return _this.vm._vnode;
      },
      set: function set() {}
    });
    _this.isVueComponent = true;
    return _this;
  }

  return VueWrapper;
}(_Wrapper3.default);

exports.default = VueWrapper;