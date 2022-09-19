import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell } from 'styled-css-grid';
import TextField from 'components/TextField';
import DatePicker from 'components/DatePicker';
import StyledRaisedButton from 'components/StyledRaisedButton';
import CreatePatientFormGrid from './CreatePatientFormGrid';
import messages from './messages';


function CreatePatientForm(props) {
  const { onCheckExisting } = props;

  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          onCheckExisting(values, actions);
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          lastName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          birthDate: yup.date()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <CreatePatientFormGrid>
              <Cell area="firstName">
                <TextField
                  fullWidth
                  name="firstName"
                  hintText={<FormattedMessage {...messages.hintText.firstName} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
                />
              </Cell>
              <Cell area="lastName">
                <TextField
                  fullWidth
                  name="lastName"
                  hintText={<FormattedMessage {...messages.hintText.lastName} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
                />
              </Cell>
              <Cell area="birthDate">
                <DatePicker
                  fullWidth
                  name="birthDate"
                  maxDate={new Date()}
                  hintText={<FormattedMessage {...messages.hintText.dob} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.dob} />}
                />
              </Cell>
              <Cell area="button">
                <StyledRaisedButton type="submit" disabled={!dirty || isSubmitting || !isValid}>
                  <FormattedMessage {...messages.checkExistingButton} />
                </StyledRaisedButton>
              </Cell>
            </CreatePatientFormGrid>
          </Form>
        )}
      />
    </div>
  );
}

CreatePatientForm.propTypes = {
  onCheckExisting: PropTypes.func.isRequired,
};

export default CreatePatientForm;

