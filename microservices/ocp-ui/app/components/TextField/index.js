/**
 *
 * TextField
 *
 */

import React from 'react';
import { TextField as MUITextField } from 'material-ui';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { EMPTY_STRING } from '../../containers/App/constants';

function TextFieldBridge(props) {
  const { field: { name, value }, form: { handleChange, handleBlur, setFieldTouched, errors, initialValues }, ...rest } = props;
  const initialValue = initialValues[name];

  // if initial value exists
  if (initialValue && typeof initialValue === 'string' && initialValue !== EMPTY_STRING) {
    // make it a controlled component
    return (
      <MUITextField
        name={name}
        value={value}
        onChange={(event) => {
          handleChange(event);
          setFieldTouched(name);
        }}
        onBlur={handleBlur}
        errorText={errors[name]}
        {...rest}
      />);
  }
  // else, make it an uncontrolled component
  return (
    <MUITextField
      name={name}
      onChange={(event) => {
        handleChange(event);
        setFieldTouched(name);
      }}
      onBlur={handleBlur}
      errorText={errors[name]}
      {...rest}
    />);
}

function TextField(props) {
  const { name, ...rest } = props;
  return (
    <Field
      name={name}
      render={(p) => (<TextFieldBridge {...p} {...rest} />)}
      {...rest}
    />
  );
}

TextFieldBridge.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    errors: PropTypes.object,
  }).isRequired,
};

TextField.propTypes = {
  /**
   * Inherited propTypes for the wrapped Material UI TextField.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/TextField/TextField.js
   */
  children: PropTypes.node,
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The text string to use for the default value.
   */
  defaultValue: PropTypes.any,
  /**
   * Disables the text field if set to true.
   */
  disabled: PropTypes.bool,
  /**
   * The style object to use to override error styles.
   */
  errorStyle: PropTypes.object,
  /**
   * The error content to display.
   */
  errorText: PropTypes.node,
  /**
   * If true, the floating label will float even when there is no value.
   */
  floatingLabelFixed: PropTypes.bool,
  /**
   * The style object to use to override floating label styles when focused.
   */
  floatingLabelFocusStyle: PropTypes.object,
  /**
   * The style object to use to override floating label styles when shrunk.
   */
  floatingLabelShrinkStyle: PropTypes.object,
  /**
   * The style object to use to override floating label styles.
   */
  floatingLabelStyle: PropTypes.object,
  /**
   * The content to use for the floating label element.
   */
  floatingLabelText: PropTypes.node,
  /**
   * If true, the field receives the property width 100%.
   */
  fullWidth: PropTypes.bool,
  /**
   * Override the inline-styles of the TextField's hint text element.
   */
  hintStyle: PropTypes.object,
  /**
   * The hint content to display.
   */
  hintText: PropTypes.node,
  /**
   * The id prop for the text field.
   */
  id: PropTypes.string,
  /**
   * Override the inline-styles of the TextField's input element.
   * When multiLine is false: define the style of the input element.
   * When multiLine is true: define the style of the container of the textarea.
   */
  inputStyle: PropTypes.object,
  /**
   * If true, a textarea element will be rendered.
   * The textarea also grows and shrinks according to the number of lines.
   */
  multiLine: PropTypes.bool,
  /** @ignore */
  onBlur: PropTypes.func,
  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {object} event Change event targeting the text field.
   * @param {string} newValue The new value of the text field.
   */
  onChange: PropTypes.func,
  /** @ignore */
  onFocus: PropTypes.func,
  /**
   * Number of rows to display when multiLine option is set to true.
   */
  rows: PropTypes.number,
  /**
   * Maximum number of rows to display when
   * multiLine option is set to true.
   */
  rowsMax: PropTypes.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * Override the inline-styles of the TextField's textarea element.
   * The TextField use either a textarea or an input,
   * this property has effects only when multiLine is true.
   */
  textareaStyle: PropTypes.object,
  /**
   * Specifies the type of input to display
   * such as "password" or "text".
   */
  type: PropTypes.string,
  /**
   * Override the inline-styles of the
   * TextField's underline element when disabled.
   */
  underlineDisabledStyle: PropTypes.object,
  /**
   * Override the inline-styles of the TextField's
   * underline element when focussed.
   */
  underlineFocusStyle: PropTypes.object,
  /**
   * If true, shows the underline for the text field.
   */
  underlineShow: PropTypes.bool,
  /**
   * Override the inline-styles of the TextField's underline element.
   */
  underlineStyle: PropTypes.object,
  /**
   * The value of the text field.
   */
  value: PropTypes.any,
  // ADDITIONAL/OVERRIDDEN Prop Types
  /**
   * Name applied to the input.
   * NOTE: This prop-type is overridden to be 'required', because it is needed for Formik Field.
   */
  name: PropTypes.string.isRequired,
};

TextField.contextTypes = {
  /**
   * Inherited contextTypes for the wrapped Material UI TextField.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/TextField/TextField.js
   */
  muiTheme: PropTypes.object.isRequired,
};

export default TextField;
