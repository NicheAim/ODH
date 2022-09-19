/**
*
* AutoSuggestion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Field } from 'formik';
import ErrorMessage from 'components/AutoSuggestion/ErrorMessage';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import StyledSelect from './styledSelect';

class AutoSuggestionBridge extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      suggestion: null,
      defaultRequiredMessage: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    const { isRequired } = this.props;
    const defaultMessage = (!selectedOption) || (selectedOption && selectedOption.value === null) ? 'Required' : null;
    if (isRequired && defaultMessage === 'Required') {
      this.setState({ suggestion: selectedOption, defaultRequiredMessage: defaultMessage });
    } else {
      this.setState({ suggestion: selectedOption, defaultRequiredMessage: null });
    }
  }

  render() {
    const { suggestions, disabled, label, field: { name, value }, form: { setFieldValue, setFieldTouched, errors }, ...rest } = this.props;
    this.defaultMessage = errors && errors[name] && errors[name].props && errors[name].props.defaultMessage ? errors[name].props.defaultMessage : '';
    return (
      <span>
        {label &&
        <span>{label}</span>
        }
        <StyledSelect
          name={name}
          options={suggestions}
          value={value || this.state.suggestion}
          disabled={disabled}
          onChange={(event) => {
            setFieldValue(name, event && event.value);
            this.handleChange(event);
          }}
          onClick={() => setFieldTouched(name)}
          errorText={errors[name]}
          {...rest}

        />
        {(this.defaultMessage && this.defaultMessage.length > 0) || this.state.defaultRequiredMessage ?
          <ErrorMessage>
            <FormattedMessage {...messages.required} />
          </ErrorMessage> : ''
        }
      </span>
    );
  }
}


function AutoSuggestionField(props) {
  const { name, ...rest } = props;
  return (
    <Field
      name={name}
      render={(p) => (<AutoSuggestionBridge {...p} {...rest} />)}
    />);
}


AutoSuggestionBridge.propTypes = {
  suggestions: PropTypes.array,
  name: PropTypes.string,
  disabled: PropTypes.bool,
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
  isRequired: PropTypes.bool,
  label: PropTypes.string,
};

AutoSuggestionField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

AutoSuggestionField.defaultProps = {
  isRequired: false, // Pass this parameter with a true value if this field is required
};

export default AutoSuggestionField;
