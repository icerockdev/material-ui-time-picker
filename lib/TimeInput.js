'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Dialog = require('@material-ui/core/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _DialogActions = require('@material-ui/core/DialogActions');

var _DialogActions2 = _interopRequireDefault(_DialogActions);

var _Button = require('@material-ui/core/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Input = require('@material-ui/core/Input');

var _Input2 = _interopRequireDefault(_Input);

var _styles = require('@material-ui/core/styles');

var _TimePicker = require('./TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  header: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  body: {
    paddingBottom: 20
  }
};

var TimeInput = function (_React$Component) {
  _inherits(TimeInput, _React$Component);

  function TimeInput(props) {
    _classCallCheck(this, TimeInput);

    var _this = _possibleConstructorReturn(this, (TimeInput.__proto__ || Object.getPrototypeOf(TimeInput)).call(this, props));

    _this.showDialog = function () {
      return _this.setState({ open: true, newValue: _this.state.value });
    };

    _this.handleChange = function (newValue) {
      _this.setState({ newValue: newValue, hasChanged: true });
    };

    _this.handleOk = function () {
      if (_this.props.onChange != null) {
        _this.props.onChange(_this.state.newValue);
      }
      _this.setState({ open: false, value: _this.state.newValue, newValue: null });
    };

    _this.handleCancel = function () {
      return _this.setState({ open: false, newValue: null });
    };

    _this.getFormattedValue = function () {
      var _this$props = _this.props,
          mode = _this$props.mode,
          placeholder = _this$props.placeholder;
      var _this$state = _this.state,
          value = _this$state.value,
          hasChanged = _this$state.hasChanged;


      var is12h = mode === '12h';

      if (placeholder && !hasChanged) return placeholder;

      // Allow a null/undefined value for controlled inputs
      if (_this.props.hasOwnProperty('value') && _this.props.value == null) {
        return '';
      }

      var _formatHours = (0, _util.formatHours)(value.getHours(), mode),
          hours = _formatHours.hours,
          isPm = _formatHours.isPm;

      var minutes = (0, _util.twoDigits)(value.getMinutes());
      var displayHours = is12h ? hours : (0, _util.twoDigits)(value.getHours());
      var ending = is12h ? isPm ? ' pm' : ' am' : '';
      return displayHours + ':' + minutes + ending;
    };

    var defaultValue = new Date();
    defaultValue.setSeconds(0);
    defaultValue.setMilliseconds(0);

    _this.state = {
      open: false,
      value: props.value || props.defaultValue || props.initialTime || defaultValue,
      hasChanged: false
    };
    return _this;
  }

  _createClass(TimeInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({ value: nextProps.value });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          autoOk = _props.autoOk,
          cancelLabel = _props.cancelLabel,
          classes = _props.classes,
          defaultValue = _props.defaultValue,
          disabledProp = _props.disabled,
          initialTime = _props.initialTime,
          placeholder = _props.placeholder,
          mode = _props.mode,
          okLabel = _props.okLabel,
          onChange = _props.onChange,
          valueProp = _props.value,
          minutesStep = _props.minutesStep,
          other = _objectWithoutProperties(_props, ['autoOk', 'cancelLabel', 'classes', 'defaultValue', 'disabled', 'initialTime', 'placeholder', 'mode', 'okLabel', 'onChange', 'value', 'minutesStep']);

      var newValue = this.state.newValue;
      var muiFormControl = this.context.muiFormControl;

      var disabled = disabledProp || muiFormControl != null && muiFormControl.disabled;

      return [_react2.default.createElement(_Input2.default, _extends({}, other, {
        disabled: disabled,
        onClick: !disabled ? this.showDialog : null,
        value: this.getFormattedValue(),
        readOnly: true,
        key: 'TimeInput-input'
      })), _react2.default.createElement(
        _Dialog2.default,
        {
          maxWidth: 'xs',
          open: this.state.open,
          key: 'TimeInput-dialog',
          onClose: this.handleCancel
        },
        _react2.default.createElement(_TimePicker2.default, {
          mode: mode,
          minutesStep: minutesStep,
          value: newValue,
          onChange: this.handleChange,
          onMinutesSelected: autoOk ? this.handleOk : null,
          classes: { header: classes.header, body: classes.body }
        }),
        _react2.default.createElement(
          _DialogActions2.default,
          null,
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleCancel, color: 'primary' },
            cancelLabel
          ),
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleOk, color: 'primary' },
            okLabel
          )
        )
      )];
    }
  }]);

  return TimeInput;
}(_react2.default.Component);

TimeInput.propTypes = {
  /** If true, automatically accept and close the picker on set minutes. */
  autoOk: _propTypes2.default.bool,
  /** Override the label of the cancel button. */
  cancelLabel: _propTypes2.default.string,
  /** This default value overrides initialTime and placeholder */
  defaultValue: _propTypes2.default.instanceOf(Date),
  /** The default value for the time picker */
  initialTime: _propTypes2.default.instanceOf(Date),
  /** The placeholder value for the time picker before a time has been selected */
  placeholder: _propTypes2.default.string,
  /** Sets the clock mode, 12-hour or 24-hour clocks are supported. */
  mode: _propTypes2.default.oneOf(['12h', '24h']),
  /** Override the label of the ok button. */
  minutesStep: _propTypes2.default.number,
  okLabel: _propTypes2.default.string,
  /** Callback that is called with the new date (as Date instance) when the value is changed. */
  onChange: _propTypes2.default.func,
  /** The value of the time picker, for use in controlled mode. */
  value: _propTypes2.default.instanceOf(Date)
};

TimeInput.defaultProps = {
  autoOk: false,
  cancelLabel: 'Cancel',
  minutesStep: 1,
  mode: '12h',
  okLabel: 'Ok'
};

TimeInput.contextTypes = {
  muiFormControl: _propTypes2.default.object
};

exports.default = (0, _styles.withStyles)(styles)(TimeInput);