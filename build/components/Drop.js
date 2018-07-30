'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _Board = require('./../utils/Board');

var _Board2 = _interopRequireDefault(_Board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultGridOpts = {
  width: 20,
  showGrid: true
};

exports.default = function (options) {
  return function dragAndDropWrapper(WrappedComponent) {
    var Drop = function (_Component) {
      _inherits(Drop, _Component);

      function Drop(props) {
        _classCallCheck(this, Drop);

        var _this = _possibleConstructorReturn(this, (Drop.__proto__ || Object.getPrototypeOf(Drop)).call(this, props));

        _this.handleDragOver = function (e) {
          e.preventDefault();

          var overElementHeight = e.currentTarget.getBoundingClientRect().height / 2;
          var overElementTopOffset = e.currentTarget.getBoundingClientRect().top;
          var mousePositionY = e.clientY;

          var showAfter = mousePositionY - overElementTopOffset > overElementHeight;

          if (options.onDragOver) {
            options.onDragOver(_this.props, showAfter);
          }
        };

        _this.handleDragEnd = function (e) {
          e.preventDefault();

          var dragDropManager = _this.context.dragDropManager;

          if (options.onDragEnd) {
            options.onDragEnd(dragDropManager.active);
          }
        };

        _this.handleDrop = function (e) {
          e.preventDefault();

          var dragDropManager = _this.context.dragDropManager;

          if (options.onDrop) {
            options.onDrop(dragDropManager.active);
          }
        };

        _this.state = {
          node: {},
          opts: Object.assign({}, options, defaultGridOpts)
        };
        return _this;
      }

      _createClass(Drop, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          this.subscriptionID = this.context.dragDropManager.subscribe(function () {
            return _this2.forceUpdate();
          });

          this.node = (0, _reactDom.findDOMNode)(this);
          console.log('this node: ', this, ' height: ', this.node.clientHeight, ' width: ', this.node.clientWidth);
          this.node.addEventListener('drop', this.handleDrop);
          this.node.addEventListener('dragend', this.handleDragEnd);
          this.node.addEventListener('dragover', this.handleDragOver);

          this.setState({
            node: this.node
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.node.removeEventListener('drop', this.handleDrop);
          this.node.removeEventListener('dragend', this.handleDragEnd);
          this.node.removeEventListener('dragover', this.handleDragOver);

          this.context.dragDropManager.unsubscribe(this.subscriptionID);
        }
      }, {
        key: 'render',
        value: function render() {
          console.log(' render this: ', this);
          return _react2.default.createElement(
            WrappedComponent,
            this.props,
            'Shreyas'
          );
        }
      }]);

      return Drop;
    }(_react.Component);

    Drop.contextTypes = {
      dragDropManager: _propTypes2.default.object
    };


    return Drop;
  };
};