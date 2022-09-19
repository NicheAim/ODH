/**
*
* ListBoxField
*
*/

import React from 'react';
import { Field } from 'formik';
import DualListBox from 'react-dual-listbox';
import PropTypes from 'prop-types';

// import styled from 'styled-components';

const optionShape = PropTypes.shape({
  value: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
});
const valuePropType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    PropTypes.string,
    optionShape,
    PropTypes.shape({
      value: PropTypes.any,
      options: PropTypes.arrayOf(optionShape),
    }),
  ]),
);


function ListBoxFieldBridge(props) {
  const { field: { name, value }, form: { setFieldValue, errors, initialValues, setFieldTouched }, handleChange, availableLabel, ...rest } = props;
  const initialValue = initialValues[name];
  // if initial value exists
  if (initialValue) {
    // make it a controlled component
    return (
      <DualListBox
        name={name}
        selected={value}
        value={value}
        onChange={(selected) => {
          handleChange(selected);
          setFieldValue(name, selected);
          setFieldTouched(name);
        }}
        errorText={errors[name]}
        {...rest}
      />);
  }

  return (
    <DualListBox
      name={name}
      onChange={(selected) => {
        handleChange(selected);
        setFieldValue(name, selected);
        setFieldTouched(name);
      }}
      errorText={errors[name]}
      {...rest}
    />
  );
}

function ListBoxField(props) {
  const { name, ...rest } = props;
  return (
    <Field
      name={name}
      render={(p) => (<ListBoxFieldBridge {...p}{...rest} />)}
    />);
}

ListBoxFieldBridge.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    errors: PropTypes.object,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  availableLabel: PropTypes.string,
};

ListBoxField.propTypes = {
  optionShape: PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  }),
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      optionShape,
      PropTypes.shape({
        value: PropTypes.any,
        options: PropTypes.arrayOf(optionShape),
      }),
    ]),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  alignActions: PropTypes.string,
  available: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      optionShape,
      PropTypes.shape({
        value: PropTypes.any,
        options: PropTypes.arrayOf(optionShape),
      }),
    ]),
  ),
  availableLabel: PropTypes.string,
  availableRef: PropTypes.func,
  canFilter: PropTypes.bool,
  disabled: PropTypes.bool,
  filter: PropTypes.shape({
    available: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
  }),
  filterCallback: PropTypes.func,
  filterPlaceholder: PropTypes.string,
  moveKeyCodes: PropTypes.arrayOf(PropTypes.number),
  name: PropTypes.string,
  preserveSelectOrder: PropTypes.bool,
  selected: valuePropType,
  selectedLabel: PropTypes.string,
  selectedRef: PropTypes.func,
  simpleValue: PropTypes.bool,
  onFilterChange: PropTypes.func,
};

export default ListBoxField;
