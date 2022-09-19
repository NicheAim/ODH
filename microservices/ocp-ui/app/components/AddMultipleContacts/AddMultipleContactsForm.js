import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';
import merge from 'lodash/merge';

import { PHONE_PATTERN, POSTAL_CODE_PATTERN } from 'containers/App/constants';
import Padding from 'components/Padding';
import AutoSuggestionField from 'components/AutoSuggestion';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import messages from './messages';
import AddMultipleContactsFormGrid from './AddMultipleContactsFormGrid';


function AddMultipleContactsForm(props) {
  const postalCodePattern = new RegExp(POSTAL_CODE_PATTERN);
  const phonePattern = new RegExp(PHONE_PATTERN);
  const {
    initialValues,
    contactPurposes,
    uspsStates,
    onAddContact,
    onRemoveContact,
    onCloseDialog,
  } = props;

  const stateSuggestions = uspsStates
    .filter((entry) => (entry.code !== null) && (entry.display !== null))
    .map((entry) => ({
      value: entry.code,
      label: entry.display,
    }));

  function setInitialValue() {
    if (initialValues) {
      return merge(initialValues, { contact: { countryCode: 'United States' } }).contact;
    }
    return { contact: { countryCode: 'United States' } }.contact;
  }

  return (
    <div>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveContact(initialValues.index);
          }
          onAddContact(values);
          onCloseDialog();
        }}
        initialValues={setInitialValue()}
        validationSchema={yup.object().shape({
          firstName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          lastName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          purpose: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          phone: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .matches(phonePattern, (<FormattedMessage {...messages.validation.phone} />)),
          email: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .email(),
          line1: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          city: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          stateCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          postalCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
          countryCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <AddMultipleContactsFormGrid>
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
              <Cell area="purpose">
                <SelectField
                  name="purpose"
                  hintText={<FormattedMessage {...messages.hintText.purpose} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.purpose} />}
                  fullWidth
                >
                  {contactPurposes && contactPurposes.map((contactPurpose) => (
                    <MenuItem
                      key={contactPurpose.code}
                      value={contactPurpose.code}
                      primaryText={contactPurpose.display}
                    />))}
                </SelectField>
              </Cell>
              <Cell area="email">
                <TextField
                  fullWidth
                  name="email"
                  hintText={<FormattedMessage {...messages.hintText.email} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.email} />}
                />
              </Cell>
              <Cell area="phone">
                <TextField
                  fullWidth
                  name="phone"
                  hintText={<FormattedMessage {...messages.hintText.phone} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.phone} />}
                />
              </Cell>
              <Cell area="line1">
                <TextField
                  fullWidth
                  name="line1"
                  hintText={<FormattedMessage {...messages.hintText.line1} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.line1} />}
                />
              </Cell>
              <Cell area="line2">
                <TextField
                  fullWidth
                  name="line2"
                  hintText={<FormattedMessage {...messages.hintText.line2} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.line2} />}
                />
              </Cell>
              <Cell area="city">
                <TextField
                  fullWidth
                  name="city"
                  hintText={<FormattedMessage {...messages.hintText.city} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.city} />}
                />
              </Cell>
              <Cell area="state">
                <Padding top={25}>
                  <AutoSuggestionField
                    name="stateCode"
                    isRequired
                    placeholder={<FormattedMessage {...messages.hintText.stateCode} />}
                    suggestions={stateSuggestions}
                    {...props}
                  />
                </Padding>
              </Cell>
              <Cell area="postalCode">
                <TextField
                  fullWidth
                  name="postalCode"
                  hintText={<FormattedMessage {...messages.hintText.postalCode} />}
                />
              </Cell>
              <Cell area="country">
                <TextField
                  fullWidth
                  name="countryCode"
                  hintText={<FormattedMessage {...messages.hintText.countryCode} />}
                />
              </Cell>
              <Cell area="buttonGroup">
                <Grid columns={2}>
                  <StyledRaisedButton
                    type="submit"
                    disabled={!dirty || isSubmitting || !isValid}
                  >
                    <FormattedMessage {...messages.saveButton} />
                  </StyledRaisedButton>
                  <StyledFlatButton type="reset" onClick={onCloseDialog}>
                    <FormattedMessage {...messages.cancelButton} />
                  </StyledFlatButton>
                </Grid>
              </Cell>
            </AddMultipleContactsFormGrid>
          </Form>
        )}
      />
    </div>
  );
}

AddMultipleContactsForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
  onRemoveContact: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number.isRequired,
    contact: PropTypes.object.isRequired,
  }),
  contactPurposes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
};

export default AddMultipleContactsForm;

