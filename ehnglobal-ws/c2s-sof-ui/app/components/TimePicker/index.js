/**
 *
 * TimePicker
 *
 */

import { Field } from 'formik';
import { TimePicker as MUITimePicker } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';

function TimePickerBridge(props) {
  const { field: { name, value }, form: { handleBlur, setFieldValue, setFieldTouched, errors }, ...rest } = props;
  return (
    <MUITimePicker
      name={name}
      hintText={name}
      value={value}
      onChange={(event, date) => {
        setFieldValue(name, date);
        setFieldTouched(name);
      }}
      onBlur={handleBlur}
      errorText={errors[name]}
      {...rest}
    />
  );
}

TimePickerBridge.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.object,
  }).isRequired,
  form: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    errors: PropTypes.object,
  }).isRequired,
};


function TimePicker(props) {
  const { name, ...rest } = props;
  return (
    <Field
      name={name}
      render={(p) => (<TimePickerBridge {...p} {...rest} />)}
      {...rest}
    />
  );
}

TimePicker.propTypes = {
  /**
   * Inherited propTypes for the wrapped Material UI DatePicker.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/TimePicker/TimePicker.js
   */
  /**
   * If true, automatically accept and close the picker on set minutes.
   */
  autoOk: PropTypes.bool,
  /**
   * Override the label of the 'Cancel' button.
   */
  cancelLabel: PropTypes.node,
  /**
   * The initial time value of the TimePicker.
   */
  defaultTime: PropTypes.object,
  /**
   * Override the inline-styles of TimePickerDialog's body element.
   */
  dialogBodyStyle: PropTypes.object,
  /**
   * Override the inline-styles of TimePickerDialog's root element.
   */
  dialogStyle: PropTypes.object,
  /**
   * If true, the TimePicker is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Tells the component to display the picker in `ampm` (12hr) format or `24hr` format.
   */
  format: PropTypes.oneOf(['ampm', '24hr']),
  /**
   * How many minutes should be added/subtracted when moving the clock pointer.
   */
  minutesStep: PropTypes.number,
  /**
   * Override the label of the 'OK' button.
   */
  okLabel: PropTypes.node,
  /**
   * Callback function that is fired when the time value changes. The time value is passed in a Date Object.
   * Since there is no particular event associated with the change the first argument will always be null
   * and the second argument will be the new Date instance.
   */
  onChange: PropTypes.func,
  /**
   * Callback function fired when the TimePicker is tapped or clicked.
   */
  onClick: PropTypes.func,
  /**
   * Callback function fired when the TimePicker dialog is dismissed.
   */
  onDismiss: PropTypes.func,
  /**
   * Callback function fired when the TimePicker `TextField` gains focus.
   */
  onFocus: PropTypes.func,
  /**
   * Callback function fired when the TimePicker dialog is shown.
   */
  onShow: PropTypes.func,
  /**
   * If true, uses ("noon" / "midnight") instead of ("12 a.m." / "12 p.m.").
   *
   * It's technically more correct to refer to "12 noon" and "12 midnight" rather than "12 a.m." and "12 p.m."
   * and it avoids confusion between different locales. By default (for compatibility reasons) TimePicker uses
   * ("12 a.m." / "12 p.m.").
   */
  pedantic: PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * Override the inline-styles of TimePicker's TextField element.
   */
  textFieldStyle: PropTypes.object,
  /**
   * Sets the time for the Time Picker programmatically.
   */
  value: PropTypes.object,

  // ADDITIONAL/OVERRIDDEN Prop Types
  /**
   * Name applied to the input.
   * NOTE: This prop-type is overridden to be 'required', because it is needed for Formik Field.
   */
  name: PropTypes.string.isRequired,
};

TimePicker.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default TimePicker;
