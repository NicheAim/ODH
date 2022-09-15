import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import FormSubtitle from 'components/FormSubtitle';
import FieldGroupGrid from 'components/FieldGroupGrid';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import MainCell from 'components/FieldGroupGrid/MainCell';
import ErrorText from 'components/ErrorText';
import GoBackButton from 'components/GoBackButton';
import AddMultipleTelecoms from 'components/AddMultipleTelecoms';
import AddMultipleAddresses from 'components/AddMultipleAddresses';
import AddAssociateOrganizations from 'components/AddAssociateOrganizations';
import AddAssociateRole from 'components/AddAssociateRole';
import ManagePractitionerFormGrid from './ManagePractitionerFormGrid';
import { EMAIL, PHONE } from './constants';
import messages from './messages';

class ManagePractitionerForm extends React.Component {
  constructor(props) {
    super(props);
    this.hasEmailContact = this.hasEmailContact.bind(this);
    this.hasTelephoneContact = this.hasTelephoneContact.bind(this);
  }

  hasEmailContact() {
    const { values: { telecoms } } = this.props;
    const emailContacts = telecoms && telecoms.filter((entry) => entry.system === EMAIL);
    return emailContacts && emailContacts.length > 0;
  }

  hasTelephoneContact() {
    const { values: { telecoms } } = this.props;
    const phoneContacts = telecoms && telecoms.filter((entry) => entry.system === PHONE);
    return phoneContacts && phoneContacts.length > 0;
  }

  render() {
    const {
      isSubmitting, dirty, isValid, values, errors,
      uspsStates, identifierSystems, telecomSystems, telecomUses, providerRoles, providerSpecialties,
      organizations, organizationContext, isOcpAdmin, onSearch, onPageClick, initialSearchOrganizationResult,
    } = this.props;

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
    const addAssociateOrganizationsProps = {
      organizations,
      onSearch,
      roleType: providerRoles,
      specialtyType: providerSpecialties,
      existingOrganizations: values.practitionerRoles,
      onChangePage: onPageClick,
      initialSearchOrganizationResult,
      errors,
    };
    const addAssociateRoleProps = {
      roleType: providerRoles,
      specialtyType: providerSpecialties,
      organizationContext,
      errors,
    };
    return (
      <div>
        <Form>
          <ManagePractitionerFormGrid>
            <Cell area="generalInformationSubtitle">
              <FormSubtitle margin="1vh 0 0 0">
                <FormattedMessage {...messages.title} />
              </FormSubtitle>
            </Cell>
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
            <Cell area="identifierGroup">
              <FieldGroupGrid>
                <PrefixCell>
                  <SelectField
                    fullWidth
                    name="identifierType"
                    hintText={<FormattedMessage {...messages.hintText.identifierType} />}
                    floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierType} />}
                  >
                    {identifierSystems && identifierSystems.map((identifierType) => (
                      <MenuItem
                        key={identifierType.uri}
                        value={identifierType.uri}
                        primaryText={identifierType.display}
                      />),
                    )}
                  </SelectField>
                </PrefixCell>
                <MainCell>
                  <TextField
                    fullWidth
                    name="identifierValue"
                    hintText={<FormattedMessage {...messages.hintText.identifierValue} />}
                    floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierValue} />}
                  />
                </MainCell>
              </FieldGroupGrid>
            </Cell>
            <Cell area="addresses">
              <AddMultipleAddresses{...addAddressesProps} />
            </Cell>
            <Cell area="contacts">
              <AddMultipleTelecoms {...addTelecomsProps} />
              {this.hasEmailContact() ?
                '' :
                <ErrorText>
                  <FormattedMessage {...messages.validation.emailContact} /><br />
                </ErrorText>
              }
              {this.hasTelephoneContact() ?
                '' :
                <ErrorText>
                  <FormattedMessage {...messages.validation.phoneContact} />
                </ErrorText>
              }
            </Cell>
            <Cell area="associateOrganizationSection">
              {isOcpAdmin ?
                <AddAssociateOrganizations {...addAssociateOrganizationsProps} /> :
                <AddAssociateRole {...addAssociateRoleProps} />
              }
            </Cell>
            <Cell area="buttonGroup">
              <Grid columns={2}>
                <Cell>
                  <StyledRaisedButton
                    fullWidth
                    type="submit"
                    disabled={!dirty || isSubmitting || !isValid || !this.hasEmailContact() || !this.hasTelephoneContact()}
                  >
                    Save
                  </StyledRaisedButton>
                </Cell>
                <Cell>
                  <GoBackButton disabled={isSubmitting} />
                </Cell>
              </Grid>
            </Cell>
          </ManagePractitionerFormGrid>
        </Form>
      </div>
    );
  }
}

ManagePractitionerForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  identifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
  providerRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  providerSpecialties: PropTypes.array,
  onPageClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  initialSearchOrganizationResult: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
  }),
  organizationContext: PropTypes.shape({
    name: PropTypes.string.isRequired,
    identifiers: PropTypes.array,
    addresses: PropTypes.array,
    logicalId: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }),
  isOcpAdmin: PropTypes.bool.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
};

export default ManagePractitionerForm;
