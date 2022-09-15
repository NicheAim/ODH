/**
 *
 * SelectField
 *
 */

import React from 'react';

import { MenuItem, SelectField as MUISelectField } from 'material-ui';
import PropTypes from 'prop-types';
import { Field } from 'formik';


function SelectFieldBridge(props) {
  const { field: { name, value }, form: { setFieldValue, setFieldTouched, errors }, children, onChange, ...rest } = props;
  return (
    <MUISelectField
      name={name}
      value={value}
      onChange={(event, key, newValue) => {
        setFieldValue(name, newValue);
        if (onChange) {
          onChange(newValue);
        }
      }}
      onClick={() => setFieldTouched(name)}
      errorText={errors[name]}
      {...rest}
    >
      {children}
    </MUISelectField>
  );
}

function SelectField(props) {
  const { name, ...rest } = props;
  return (
    <Field
      name={name}
      render={(p) => (<SelectFieldBridge {...p} {...rest} />)}
    />);
}

SelectFieldBridge.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  onChange: PropTypes.func,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    errors: PropTypes.object,
  }).isRequired,
  children: (props, propName, componentName) => {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child.type !== MenuItem) {
        error = new Error(`\`${componentName}\` children should be of type \`MenuItem\`.`);
      }
    });
    return error;
  },
};

SelectField.propTypes = {
  /**
   * Inherited propTypes for the wrapped Material UI SelectField.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/SelectField/SelectField.js
   */
  /**
   * If true, the width will automatically be set according to the
   * items inside the menu.
   * To control the width in CSS instead, leave this prop set to `false`.
   */
  autoWidth: PropTypes.bool,
  /**
   * If true, the select field will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Object that can handle and override any property of component DropDownMenu.
   */
  dropDownMenuProps: PropTypes.object,
  /**
   * Override the inline-styles of the error element.
   */
  errorStyle: PropTypes.object,
  /**
   * The error content to display.
   */
  errorText: PropTypes.node,
  /**
   * If true, the floating label will float even when no value is selected.
   */
  floatingLabelFixed: PropTypes.bool,
  /**
   * Override the inline-styles of the floating label.
   */
  floatingLabelStyle: PropTypes.object,
  /**
   * The content of the floating label.
   */
  floatingLabelText: PropTypes.node,
  /**
   * If true, the select field will take up the full width of its container.
   */
  fullWidth: PropTypes.bool,
  /**
   * Override the inline-styles of the hint element.
   */
  hintStyle: PropTypes.object,
  /**
   * The hint content to display.
   */
  hintText: PropTypes.node,
  /**
   * Override the inline-styles of the icon element.
   */
  iconStyle: PropTypes.object,
  /**
   * The id prop for the text field.
   */
  id: PropTypes.string,
  /**
   * Override the label style when the select field is inactive.
   */
  labelStyle: PropTypes.object,
  /**
   * Override the inline-styles of the underlying `List` element.
   */
  listStyle: PropTypes.object,
  /**
   * Override the default max-height of the underlying `DropDownMenu` element.
   */
  maxHeight: PropTypes.number,
  /**
   * Override the inline-styles of menu items.
   */
  menuItemStyle: PropTypes.object,
  /**
   * Override the inline-styles of the underlying `DropDownMenu` element.
   */
  menuStyle: PropTypes.object,
  /**
   * If true, `value` must be an array and the menu will support
   * multiple selections.
   */
  multiple: PropTypes.bool,
  /** @ignore */
  onBlur: PropTypes.func,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event TouchTap event targeting the menu item
   * that was selected.
   * @param {number} key The index of the selected menu item, or undefined
   * if `multiple` is true.
   * @param {any} payload If `multiple` is true, the menu's `value`
   * array with either the menu item's `value` added (if
   * it wasn't already selected) or omitted (if it was already selected).
   * Otherwise, the `value` of the menu item.
   */
  onChange: PropTypes.func,
  /** @ignore */
  onFocus: PropTypes.func,
  /**
   * Override the inline-styles of selected menu items.
   */
  selectedMenuItemStyle: PropTypes.object,
  /**
   * Customize the rendering of the selected item.
   *
   * @param {any} value If `multiple` is true, the menu's `value`
   * array with either the menu item's `value` added (if
   * it wasn't already selected) or omitted (if it was already selected).
   * Otherwise, the `value` of the menu item.
   * @param {any} menuItem The selected `MenuItem`.
   * If `multiple` is true, this will be an array with the `MenuItem`s matching the `value`s parameter.
   */
  selectionRenderer: PropTypes.func,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * Override the inline-styles of the underline element when the select
   * field is disabled.
   */
  underlineDisabledStyle: PropTypes.object,
  /**
   * Override the inline-styles of the underline element when the select field
   * is focused.
   */
  underlineFocusStyle: PropTypes.object,
  /**
   * Override the inline-styles of the underline element.
   */
  underlineStyle: PropTypes.object,
  /**
   * If `multiple` is true, an array of the `value`s of the selected
   * menu items. Otherwise, the `value` of the selected menu item.
   * If provided, the menu will be a controlled component.
   */
  value: PropTypes.any,
  // ADDITIONAL/OVERRIDDEN Prop Types
  /**
   * Additional required 'name' prop-type for Formik Field.
   */
  name: PropTypes.string.isRequired,
  /**
   * The `MenuItem` elements to populate the select field with.
   * If the menu items have a `label` prop, that value will
   * represent the selected menu item in the rendered select field.
   * NOTE: This prop-type is overridden to ensure the children's types are always 'MenuItem'.
   */
  children: (props, propName, componentName) => {
    const prop = props[propName];

    let error = null;
    React.Children.forEach(prop, (child) => {
      if (child.type !== MenuItem) {
        error = new Error(`\`${componentName}\` children should be of type \`MenuItem\`.`);
      }
    });
    return error;
  },
};

SelectField.contextTypes = {
  /**
   * Inherited contextTypes for the wrapped Material UI SelectField.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/SelectField/SelectField.js
   */
  muiTheme: PropTypes.object.isRequired,
};

export default SelectField;
