/**
 *
 * DatePicker
 *
 */

import React from 'react';
import { DatePicker as MUIDatePicker } from 'material-ui';
import PropTypes from 'prop-types';
import { Field } from 'formik';


function DatePickerBridge(props) {
  const { field: { name, value }, form: { setFieldValue, setFieldTouched, errors }, ...rest } = props;
  return (
    <MUIDatePicker
      name={name}
      hintText={name}
      value={value}
      onChange={(event, date) => {
        setFieldValue(name, date);
        setFieldTouched(name);
      }}
      errorText={errors[name]}
      {...rest}
    />
  );
}

DatePickerBridge.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.object,
  }).isRequired,
  form: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    errors: PropTypes.object,
  }).isRequired,
};

function DatePickerWithoutBlur(props) {
  const { name, ...rest } = props;
  return (
    <Field
      name={name}
      render={(p) => (<DatePickerBridge {...p} {...rest} />)}
      {...rest}
    />
  );
}

DatePickerWithoutBlur.propTypes = {
  /**
   * Inherited propTypes for the wrapped Material UI DatePicker.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/DatePicker/DatePicker.js
   */
  /**
   * Constructor for date formatting for the specified `locale`.
   * The constructor must follow this specification: ECMAScript Internationalization API 1.0 (ECMA-402).
   * `Intl.DateTimeFormat` is supported by most modern browsers, see http://caniuse.com/#search=intl,
   * otherwise https://github.com/andyearnshaw/Intl.js is a good polyfill.
   *
   * By default, a built-in `DateTimeFormat` is used which supports the 'en-US' `locale`.
   */
  DateTimeFormat: PropTypes.func,
  /**
   * If true, automatically accept and close the picker on select a date.
   */
  autoOk: PropTypes.bool,
  /**
   * Override the default text of the 'Cancel' button.
   */
  cancelLabel: PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * Used to control how the Date Picker will be displayed when the input field is focused.
   * `dialog` (default) displays the DatePicker as a dialog with a modal.
   * `inline` displays the DatePicker below the input field (similar to auto complete).
   */
  container: PropTypes.oneOf(['dialog', 'inline']),
  /**
   * This is the initial date value of the component.
   * If either `value` or `valueLink` is provided they will override this
   * prop with `value` taking precedence.
   */
  defaultDate: PropTypes.object,
  /**
   * Override the inline-styles of DatePickerDialog's Container element.
   */
  dialogContainerStyle: PropTypes.object,
  /**
   * Disables the year selection in the date picker.
   */
  disableYearSelection: PropTypes.bool,
  /**
   * Disables the DatePicker.
   */
  disabled: PropTypes.bool,
  /**
   * Used to change the first day of week. It varies from
   * Saturday to Monday between different locales.
   * The allowed range is 0 (Sunday) to 6 (Saturday).
   * The default is `1`, Monday, as per ISO 8601.
   */
  firstDayOfWeek: PropTypes.number,
  /**
   * This function is called to format the date displayed in the input field, and should return a string.
   * By default if no `locale` and `DateTimeFormat` is provided date objects are formatted to ISO 8601 YYYY-MM-DD.
   *
   * @param {object} date Date object to be formatted.
   * @returns {any} The formatted date.
   */
  formatDate: PropTypes.func,
  /**
   * Hide date display
   */
  hideCalendarDate: PropTypes.bool,
  /**
   * Locale used for formatting the `DatePicker` date strings. Other than for 'en-US', you
   * must provide a `DateTimeFormat` that supports the chosen `locale`.
   */
  locale: PropTypes.string,
  /**
   * The ending of a range of valid dates. The range includes the endDate.
   * The default value is current date + 100 years.
   */
  maxDate: PropTypes.object,
  /**
   * The beginning of a range of valid dates. The range includes the startDate.
   * The default value is current date - 100 years.
   */
  minDate: PropTypes.object,
  /**
   * Tells the component to display the picker in portrait or landscape mode.
   */
  mode: PropTypes.oneOf(['portrait', 'landscape']),
  /**
   * Override the default text of the 'OK' button.
   */
  okLabel: PropTypes.node,
  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {null} null Since there is no particular event associated with the change,
   * the first argument will always be null.
   * @param {object} date The new date.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when a touch tap event occurs on the Date Picker's `TextField`.
   *
   * @param {object} event TouchTap event targeting the `TextField`.
   */
  onClick: PropTypes.func,
  /**
   * Callback function that is fired when the Date Picker's dialog is dismissed.
   */
  onDismiss: PropTypes.func,
  /**
   * Callback function that is fired when the Date Picker's `TextField` gains focus.
   */
  onFocus: PropTypes.func,
  /**
   * Callback function that is fired when the Date Picker's dialog is shown.
   */
  onShow: PropTypes.func,
  /**
   * If true sets the datepicker to open to year selection first.
   */
  openToYearSelection: PropTypes.bool,
  /**
   * Callback function used to determine if a day's entry should be disabled on the calendar.
   *
   * @param {object} day Date object of a day.
   * @returns {boolean} Indicates whether the day should be disabled.
   */
  shouldDisableDate: PropTypes.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * Override the inline-styles of DatePicker's TextField element.
   */
  textFieldStyle: PropTypes.object,
  /**
   * This object should contain methods needed to build the calendar system.
   *
   * Useful for building a custom calendar system. Refer to the
   * [source code](https://github.com/callemall/material-ui/blob/master/src/DatePicker/dateUtils.js)
   * and an [example implementation](https://github.com/alitaheri/material-ui-persian-date-picker-utils)
   * for more information.
   */
  utils: PropTypes.object,
  /**
   * Sets the date for the Date Picker programmatically.
   */
  value: PropTypes.object,
  // ADDITIONAL/OVERRIDDEN Prop Types
  /**
   * Name applied to the input.
   * NOTE: This prop-type is overridden to be 'required', because it is needed for Formik Field.
   */
  name: PropTypes.string.isRequired,
};

/**
 * Inherited contextTypes for the wrapped Material UI DatePicker.
 * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/DatePicker/DatePicker.js
 */
DatePickerWithoutBlur.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

export default DatePickerWithoutBlur;
