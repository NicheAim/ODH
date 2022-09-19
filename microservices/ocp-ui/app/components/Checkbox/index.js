/**
 *
 * Checkbox
 *
 */

import React from 'react';
import { Checkbox as MUICheckbox } from 'material-ui';
import PropTypes from 'prop-types';
import { Field } from 'formik';

function CheckboxBridge(props) {
  const { field: { name, value }, form: { setFieldValue, setFieldTouched }, ...rest } = props;
  return (
    <MUICheckbox
      checked={value}
      onCheck={(event, checked) => setFieldValue(name, checked)}
      onFocus={() => setFieldTouched(name)}
      {...rest}
    />
  );
}

function Checkbox(props) {
  const { name, ...rest } = props;
  return (
    <Field
      name={name}
      render={(p) => (<CheckboxBridge {...p} {...rest} />)}
      {...rest}
    />);
}

CheckboxBridge.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
};

Checkbox.propTypes = {
  /**
   * Inherited propTypes for the wrapped Material UI Checkbox.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/Checkbox/Checkbox.js
   */
  /**
   * Checkbox is checked if true.
   */
  checked: PropTypes.bool,
  /**
   * The SvgIcon to use for the checked state.
   * This is useful to create icon toggles.
   */
  checkedIcon: PropTypes.element,
  /**
   * The default state of our checkbox component.
   * **Warning:** This cannot be used in conjunction with `checked`.
   * Decide between using a controlled or uncontrolled input element and remove one of these props.
   * More info: https://fb.me/react-controlled-components
   */
  defaultChecked: PropTypes.bool,
  /**
   * Disabled if true.
   */
  disabled: PropTypes.bool,
  /**
   * Overrides the inline-styles of the icon element.
   */
  iconStyle: PropTypes.object,
  /**
   * Overrides the inline-styles of the input element.
   */
  inputStyle: PropTypes.object,
  /**
   * Where the label will be placed next to the checkbox.
   */
  labelPosition: PropTypes.oneOf(['left', 'right']),
  /**
   * Overrides the inline-styles of the Checkbox element label.
   */
  labelStyle: PropTypes.object,
  /**
   * Callback function that is fired when the checkbox is checked.
   *
   * @param {object} event `change` event targeting the underlying checkbox `input`.
   * @param {boolean} isInputChecked The `checked` value of the underlying checkbox `input`.
   */
  onCheck: PropTypes.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * The SvgIcon to use for the unchecked state.
   * This is useful to create icon toggles.
   */
  uncheckedIcon: PropTypes.element,
  /**
   * ValueLink for when using controlled checkbox.
   */
  valueLink: PropTypes.object,
  // ADDITIONAL/OVERRIDDEN Prop Types
  /**
   * Additional required 'name' prop-type for Formik Field.
   */
  name: PropTypes.string.isRequired,
};

Checkbox.contextTypes = {
  /**
   * Inherited contextTypes for the wrapped Material UI Checkbox.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/Checkbox/Checkbox.js
   */
  muiTheme: PropTypes.object.isRequired,
};
export default Checkbox;
