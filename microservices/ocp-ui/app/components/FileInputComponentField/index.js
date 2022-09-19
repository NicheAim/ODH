/**
 *
 * FileInputComponentField
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
import { Field } from 'formik';
import FileInputComponent from 'react-file-input-previews-base64';


function FileInputComponentFieldBridge(props) {
  const { field: { name, value }, form: { setFieldValue, errors, initialValues }, ...rest } = props;
  const initialValue = initialValues[name];
  // if initial value exists
  if (initialValue) {
    // make it a controlled component
    return (
      <FileInputComponent
        name={name}
        value={value}
        callbackFunction={(fileArr) => {
          setFieldValue(name, fileArr);
        }}
        errorText={errors[name]}
        {...rest}
      />);
  }

  return (
    <FileInputComponent
      name={name}
      callbackFunction={(fileArr) => {
        setFieldValue(name, fileArr);
      }}
      errorText={errors[name]}
      {...rest}
    />
  );
}

function FileInputComponentField(props) {
  const { name, ...rest } = props;
  return (
    <Field
      name={name}
      render={(p) => (<FileInputComponentFieldBridge {...p}{...rest} />)}
    />);
}

FileInputComponentFieldBridge.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    errors: PropTypes.object,
  }).isRequired,
};

FileInputComponentField.propTypes = {
  inputName: PropTypes.string,
  inputId: PropTypes.string,
  callbackFunction: PropTypes.func,
  labelText: PropTypes.string,
  useTapEventPlugin: PropTypes.bool,
  multiple: PropTypes.bool,
  imagePreview: PropTypes.bool,
  textBoxVisible: PropTypes.bool,
  accept: PropTypes.string,
  imageContainerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  parentStyle: PropTypes.object,
  buttonComponent: PropTypes.element,
  nonPreviewComponent: PropTypes.element,
  textFieldComponent: PropTypes.element,
  defaultFiles: PropTypes.array,
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
};

export default FileInputComponentField;
