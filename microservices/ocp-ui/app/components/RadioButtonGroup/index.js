/**
*
* RadioButtonGroup
*
*/

import React from 'react';
import { RadioButton, RadioButtonGroup as MUIRadioButtonGroup } from 'material-ui';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { EMPTY_STRING } from 'containers/App/constants';


function RadioButtonGroupBridge(props) {
  const { field: { name, value }, form: { setFieldValue, setFieldTouched, errors, initialValues }, children, ...rest } = props;
  const initialValue = initialValues[name];
  // if initial value exists
  if (initialValue && typeof initialValue === 'string' && initialValue !== EMPTY_STRING) {
    // make it a controlled component
    return (
      <MUIRadioButtonGroup
        name={name}
        value={value}
        defaultSelected={initialValue}
        onChange={(event, newValue) => {
          setFieldValue(name, newValue);
        }}
        onClick={() => setFieldTouched(name)}
        errorText={errors[name]}
        {...rest}
      >
        {children}
      </MUIRadioButtonGroup>
    );
  }
  return (
    <MUIRadioButtonGroup
      name={name}
      value={value}
      onChange={(event, newValue) => {
        setFieldValue(name, newValue);
      }}
      onClick={() => setFieldTouched(name)}
      errorText={errors[name]}
      {...rest}
    >
      {children}
    </MUIRadioButtonGroup>
  );
}

function RadioButtonGroup(props) {
  const { name, valueSelected, ...rest } = props;
  return (
    <Field
      name={name}
      render={(p) => (<RadioButtonGroupBridge {...p} {...rest} />)}
    />);
}

RadioButtonGroupBridge.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    errors: PropTypes.object,
  }).isRequired,
  children: (props, propName, componentName) => {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child.type !== RadioButton) {
        error = new Error(`\`${componentName}\` children should be of type \`RadioButton\`.`);
      }
    });
    return error;
  },
};

RadioButtonGroup.propTypes = {
  /**
   * Inherited propTypes for the wrapped Material UI SelectField.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/RadioButton/RadioButtonGroup.js
   */
  /**
   * The CSS class name of the root element.
   */
  className: PropTypes.string,
  /**
   * The `value` property of the radio button that will be
   * selected by default. This takes precedence over the `checked` property
   * of the `RadioButton` elements.
   */
  defaultSelected: PropTypes.any,
  /**
   * Where the label will be placed for all child radio buttons.
   * This takes precedence over the `labelPosition` property of the
   * `RadioButton` elements.
   */
  labelPosition: PropTypes.oneOf(['left', 'right']),
  /**
   * The name that will be applied to all child radio buttons.
   */
  name: PropTypes.string.isRequired,
  /**
   * Callback function that is fired when a radio button has
   * been checked.
   *
   * @param {object} event `change` event targeting the selected
   * radio button.
   * @param {*} value The `value` of the selected radio button.
   */
  onChange: PropTypes.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * The `value` of the currently selected radio button.
   */
  valueSelected: PropTypes.any,
// ADDITIONAL/OVERRIDDEN Prop Types
  /**
   * Should be used to pass `RadioButton` components.
   * NOTE: This prop-type is overridden to ensure the children's types are always 'RadioButton'.
   */
  children: (props, propName, componentName) => {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child.type !== RadioButton) {
        error = new Error(`\`${componentName}\` children should be of type \`RadioButton\`.`);
      }
    });
    return error;
  },
};

export default RadioButtonGroup;
