/**
 *
 * ManageOrganization
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import FormSubtitle from 'components/FormSubtitle';
import TextField from 'components/TextField';
import FieldGroupGrid from 'components/FieldGroupGrid';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import SelectField from 'components/SelectField';
import MainCell from 'components/FieldGroupGrid/MainCell';
import AddMultipleAddresses from 'components/AddMultipleAddresses';
import AddMultipleTelecoms from 'components/AddMultipleTelecoms';
import AddMultipleContacts from 'components/AddMultipleContacts';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import ManageOrganizationFormGrid from './ManageOrganizationFormGrid';
import messages from './messages';


function ManageOrganization(props) {
  const minimumNumberOfAddresses = 1;
  const minimumNumberOfTelecoms = 1;
  const validationSchemaShape = {
    name: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    addresses: yup.array()
      .required((<FormattedMessage {...messages.validation.required} />))
      .min(minimumNumberOfAddresses, (
        <FormattedMessage {...messages.validation.minAddresses} values={{ minimumNumberOfAddresses }} />)),
    telecoms: yup.array()
      .required((<FormattedMessage {...messages.validation.required} />))
      .min(minimumNumberOfTelecoms, (
        <FormattedMessage {...messages.validation.minTelecoms} values={{ minimumNumberOfTelecoms }} />)),
    identifierSystem: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    identifierValue: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
    contacts: yup.array()
      .required((<FormattedMessage {...messages.validation.required} />)),
  };
  const validationSchemaCreate = yup.object().shape(validationSchemaShape);

  const validationSchemaUpdate = yup.object().shape({
    ...validationSchemaShape,
    status: yup.string()
      .required((<FormattedMessage {...messages.validation.required} />)),
  });

  const {
    id, initialValues, editingOrganization, onSubmitCreate, onSubmitUpdate,
    uspsStates, organizationIdentifierSystems, organizationStatuses,
    telecomSystems, telecomUses, contactPurposes,
  } = props;

  return (
    <Formik
      validationSchema={id ? validationSchemaUpdate : validationSchemaCreate}
      initialValues={initialValues}
      onSubmit={editingOrganization ? onSubmitUpdate : onSubmitCreate}
      render={(formikProps) => {
        const { isSubmitting, dirty, isValid, errors, values } = formikProps;
        const addAddressesProps = {
          uspsStates,
          errors,
          addresses: values.addresses,
        };
        const addTelecomsProps = {
          telecomSystems,
          telecomUses,
          errors,
          telecoms: values.telecoms,
        };
        const addContactsProps = {
          contactPurposes,
          uspsStates,
          errors,
          contacts: values.contacts,
        };

        return (
          <Form>
            <ManageOrganizationFormGrid>
              <Cell area="generalInformationSubtitle">
                <FormSubtitle margin="1vh 0 0 0">
                  <FormattedMessage {...messages.subtitle} />
                </FormSubtitle>
              </Cell>
              <Cell area="name">
                <TextField
                  name="name"
                  floatingLabelText={<FormattedMessage {...messages.form.name} />}
                  fullWidth
                />
              </Cell>
              <Cell area="identifierGroup">
                <FieldGroupGrid>
                  <PrefixCell>
                    <SelectField
                      floatingLabelText={<FormattedMessage {...messages.form.identifierSystem} />}
                      name="identifierSystem"
                      fullWidth
                    >
                      {organizationIdentifierSystems && organizationIdentifierSystems.map(({ uri, display }) => (
                        <MenuItem
                          key={uri}
                          value={uri}
                          primaryText={display}
                        />))}
                    </SelectField>
                  </PrefixCell>
                  <MainCell>
                    <TextField
                      floatingLabelText={<FormattedMessage {...messages.form.identifierValue} />}
                      fullWidth
                      name="identifierValue"
                    />
                  </MainCell>
                </FieldGroupGrid>
              </Cell>
              {id &&
              <Cell area="status">
                <SelectField
                  floatingLabelText={<FormattedMessage {...messages.form.status} />}
                  fullWidth
                  name="status"
                >
                  {organizationStatuses && organizationStatuses.map(({ code, display }) => (
                    <MenuItem
                      key={code.toString()}
                      value={code.toString()}
                      primaryText={display}
                    />))}
                </SelectField>
              </Cell>}
              <Cell area="addresses">
                <AddMultipleAddresses{...addAddressesProps} />
              </Cell>
              <Cell area="telecoms">
                <AddMultipleTelecoms {...addTelecomsProps} />
              </Cell>
              <Cell area="contacts">
                <AddMultipleContacts {...addContactsProps} />
              </Cell>
              <Cell area="buttonGroup">
                <Grid columns={2}>
                  <Cell>
                    <StyledRaisedButton
                      fullWidth
                      type="submit"
                      disabled={!dirty || isSubmitting || !isValid}
                    >
                      {isSubmitting ?
                        <FormattedMessage {...messages.form.savingButton} /> :
                        <FormattedMessage {...messages.form.saveButton} />}
                    </StyledRaisedButton>
                  </Cell>
                  <Cell>
                    <GoBackButton
                      label={<FormattedMessage {...messages.form.cancelButton} />}
                    />
                  </Cell>
                </Grid>
              </Cell>
            </ManageOrganizationFormGrid>
          </Form>
        );
      }}
    />
  );
}

ManageOrganization.propTypes = {
  id: PropTypes.string,
  initialValues: PropTypes.object,
  editingOrganization: PropTypes.object,
  onSubmitCreate: PropTypes.func.isRequired,
  onSubmitUpdate: PropTypes.func.isRequired,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  organizationIdentifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  organizationStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.bool.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })),
  contactPurposes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })),
};

export default ManageOrganization;
