import AddCoverages from 'components/AddCoverages';
import AddEpisodeOfCare from 'components/AddEpisodeOfCare';
import AddFlags from 'components/AddFlags';
import AddMultipleAddresses from 'components/AddMultipleAddresses';
import AddMultipleTelecoms from 'components/AddMultipleTelecoms';
import DatePicker from 'components/DatePicker';
import ErrorText from 'components/ErrorText';
import FieldGroupGrid from 'components/FieldGroupGrid';
import MainCell from 'components/FieldGroupGrid/MainCell';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import FormSubtitle from 'components/FormSubtitle';
import GoBackButton from 'components/GoBackButton';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import { EMAIL, PHONE } from 'components/ManagePatient/constants';
import SelectField from 'components/SelectField';
import StyledFormikCheckbox from 'components/StyledFormikCheckbox';
import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import { Form } from 'formik';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import { env_vars } from '../../../env';
import AddMultipleEmergencyContacts from '../AddMultipleEmergencyContacts';
import ManagePatientFormGrid from './ManagePatientFormGrid';
import messages from './messages';

class ManagePatientForm extends React.Component {
  constructor(props) {
    super(props);

    this.validationsGeneralInformation =
      this.validationsGeneralInformation.bind(this);
    this.hasEmailContact = this.hasEmailContact.bind(this);
    this.hasPhoneContact = this.hasPhoneContact.bind(this);
    this.hasEpisodeOfCare = this.hasEpisodeOfCare.bind(this);
    this.hasEmergencyContacts = this.hasEmergencyContacts.bind(this);
    this.hasAddress = this.hasAddress.bind(this);
  }

  hasEmailContact() {
    const emailContacts =
      this.props.values &&
      this.props.values.telecoms &&
      this.props.values.telecoms.filter((entry) => entry.system === EMAIL);
    return emailContacts && emailContacts.length > 0;
  }

  validationsGeneralInformation() {
    const firstName = this.props.values.firstName;
    const lastName = this.props.values.lastName;
    const birthDate = this.props.values.birthDate;
    const genderCode = this.props.values.genderCode;
    const race = this.props.values.race;
    const ethnicity = this.props.values.ethnicity;
    const identifierValue = this.props.values.identifierValue;
    const identifierValue2 = this.props.values.identifierValue2;
    return (
      firstName &&
      lastName &&
      birthDate &&
      genderCode &&
      race &&
      ethnicity &&
      identifierValue &&
      identifierValue2
    );
  }

  hasPhoneContact() {
    const phoneContacts =
      this.props.values &&
      this.props.values.telecoms &&
      this.props.values.telecoms.filter((entry) => entry.system === PHONE);
    return phoneContacts && phoneContacts.length > 0;
  }
  hasEpisodeOfCare() {
    return (
      this.props.values &&
      this.props.values.episodeOfCares &&
      this.props.values.episodeOfCares.length > 0
    );
  }
  hasEmergencyContacts() {
    return (
      this.props.values &&
      this.props.values.emergencyContacts &&
      this.props.values.emergencyContacts.length > 1
    );
  }
  hasAddress() {
    return (
      this.props.values &&
      this.props.values.addresses &&
      this.props.values.addresses.length > 0
    );
  }

  render() {
    const {
      isSubmitting,
      dirty,
      isValid,
      values,
      errors,
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      usCoreRaces,
      usCoreEthnicities,
      usCoreBirthSexes,
      languages,
      telecomSystems,
      telecomUses,
      flagStatuses,
      flagCategories,
      practitioner,
      practitioners,
      organization,
      episodeOfCareType,
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      subscriptionOptions,
      episodeOfCareStatus,
      composePatientReference,
      patient,
      getPatientFullName,
      relationshipTypes,
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

    const addFlagsProps = {
      flagStatuses,
      flagCategories,
      errors,
      flags: values.flags,
      practitioners,
      practitioner,
      patientName:
        values.firstName !== undefined && values.lastName !== undefined
          ? `${values.firstName} ${values.lastName}`
          : null,
    };

    const addEpisodeOfCareProps = {
      episodeOfCares: values.episodeOfCares,
      episodeOfCareStatus,
      episodeOfCareType,
      errors,
      practitioner,
      practitioners,
      patientName:
        values.firstName !== undefined && values.lastName !== undefined
          ? `${values.firstName} ${values.lastName}`
          : null,
    };

    const addCoverageProps = {
      coverages: values.coverages,
      errors,
      patient,
      practitioners,
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      subscriptionOptions,
      getPatientFullName,
      composePatientReference,
      patientName:
        values.firstName !== undefined && values.lastName !== undefined
          ? `${values.firstName} ${values.lastName}`
          : null,
    };

    const addEmergencyContactsProps = {
      emergencyContacts: values.emergencyContacts,
      relationshipTypes,
      administrativeGenders,
      patientIdentifierSystems,
      telecomSystems,
      telecomUses,
    };

    const ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');

    const MEDICAID_SYSTEM =
      env_vars.REACT_APP_PATIENT_IDENTIFIER_MEDICAID_ID_SYSTEM;

    return (
      <Form>
        <ManagePatientFormGrid>
          <Cell area="generalInformationSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.title} />
            </FormSubtitle>
          </Cell>
          <Cell area="contextGroup">
            <Grid columns={4} gap="30px">
              <InfoSection margin="4vh 0 0 0">
                <InlineLabel htmlFor={ORGANIZATION_NAME_HTML_ID}>
                  <FormattedMessage
                    {...messages.floatingLabelText.organization}
                  />
                  &nbsp;
                </InlineLabel>
                <span id={ORGANIZATION_NAME_HTML_ID}>
                  {organization && organization.name}
                </span>
              </InfoSection>
            </Grid>
          </Cell>
          <Cell area="eligible">
            <StyledFormikCheckbox
              name="active"
              label={
                <FormattedMessage {...messages.floatingLabelText.eligible} />
              }
            />
          </Cell>
          <Cell area="firstName">
            <TextField
              fullWidth
              name="firstName"
              hintText={<FormattedMessage {...messages.hintText.firstName} />}
              floatingLabelText={
                <FormattedMessage {...messages.floatingLabelText.firstName} />
              }
            />
          </Cell>
          <Cell area="lastName">
            <TextField
              fullWidth
              name="lastName"
              hintText={<FormattedMessage {...messages.hintText.lastName} />}
              floatingLabelText={
                <FormattedMessage {...messages.floatingLabelText.lastName} />
              }
            />
          </Cell>
          <Cell area="birthDate">
            <DatePicker
              fullWidth
              name="birthDate"
              maxDate={new Date()}
              hintText={<FormattedMessage {...messages.hintText.dob} />}
              floatingLabelText={
                <FormattedMessage {...messages.floatingLabelText.dob} />
              }
            />
          </Cell>
          <Cell area="genderCode">
            <SelectField
              fullWidth
              name="genderCode"
              hintText={<FormattedMessage {...messages.hintText.gender} />}
              floatingLabelText={
                <FormattedMessage {...messages.floatingLabelText.gender} />
              }
            >
              {administrativeGenders &&
                administrativeGenders.map((genderType) => (
                  <MenuItem
                    key={genderType.code}
                    value={genderType.code}
                    primaryText={genderType.display}
                  />
                ))}
            </SelectField>
          </Cell>
          <Cell area="identifierGroup">
            <FieldGroupGrid>
              <PrefixCell>
                <SelectField
                  fullWidth
                  name="identifierType"
                  hintText={
                    <FormattedMessage {...messages.hintText.identifierType} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.identifierType}
                    />
                  }
                >
                  {patientIdentifierSystems &&
                    patientIdentifierSystems
                      .reverse()
                      .map((identifierType) => (
                        <MenuItem
                          key={identifierType.oid}
                          value={identifierType.uri}
                          primaryText={identifierType.display}
                        />
                      ))}
                </SelectField>
              </PrefixCell>
              <MainCell>
                <TextField
                  fullWidth
                  name="identifierValue"
                  hintText={
                    <FormattedMessage {...messages.hintText.identifierValue} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.identifierValue}
                    />
                  }
                />
              </MainCell>
            </FieldGroupGrid>
          </Cell>

          <Cell area="medicalId">
            <FieldGroupGrid>
              <PrefixCell>
                <SelectField
                  fullWidth
                  name="identifierType2"
                  hintText={
                    <FormattedMessage {...messages.hintText.identifierType} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.identifierType}
                    />
                  }
                >
                  {patientIdentifierSystems &&
                    patientIdentifierSystems
                      .reverse()
                      .map((identifierType) => (
                        <MenuItem
                          key={identifierType.oid}
                          value={identifierType.uri}
                          primaryText={identifierType.display}
                        />
                      ))}
                </SelectField>
              </PrefixCell>
              <MainCell>
                <TextField
                  fullWidth
                  name="identifierValue2"
                  hintText={
                    <FormattedMessage {...messages.hintText.identifierValue} />
                  }
                  floatingLabelText={
                    <FormattedMessage
                      {...messages.floatingLabelText.identifierValue}
                    />
                  }
                />
              </MainCell>
            </FieldGroupGrid>
          </Cell>
          <Cell area="language">
            <SelectField
              fullWidth
              name="language"
              hintText={<FormattedMessage {...messages.hintText.language} />}
              floatingLabelText={
                <FormattedMessage {...messages.floatingLabelText.language} />
              }
            >
              {languages &&
                languages.map((languageType) => (
                  <MenuItem
                    key={languageType.code}
                    value={languageType.code}
                    primaryText={languageType.display}
                  />
                ))}
            </SelectField>
          </Cell>
          <Cell area="race">
            <SelectField
              fullWidth
              name="race"
              hintText={<FormattedMessage {...messages.hintText.race} />}
              floatingLabelText={
                <FormattedMessage {...messages.floatingLabelText.race} />
              }
            >
              {usCoreRaces &&
                usCoreRaces.map((raceType) => (
                  <MenuItem
                    key={raceType.code}
                    value={raceType.code}
                    primaryText={raceType.display}
                  />
                ))}
            </SelectField>
          </Cell>
          <Cell area="ethnicity">
            <SelectField
              fullWidth
              name="ethnicity"
              hintText={<FormattedMessage {...messages.hintText.ethnicity} />}
              floatingLabelText={
                <FormattedMessage {...messages.floatingLabelText.ethnicity} />
              }
            >
              {usCoreEthnicities &&
                usCoreEthnicities.map((ethnicityType) => (
                  <MenuItem
                    key={ethnicityType.code}
                    value={ethnicityType.code}
                    primaryText={ethnicityType.display}
                  />
                ))}
            </SelectField>
          </Cell>
          <Cell area="birthSex">
            <SelectField
              fullWidth
              name="birthSex"
              hintText={<FormattedMessage {...messages.hintText.birthSex} />}
              floatingLabelText={
                <FormattedMessage {...messages.floatingLabelText.birthSex} />
              }
            >
              {usCoreBirthSexes &&
                usCoreBirthSexes.map((birthsexType) => (
                  <MenuItem
                    key={birthsexType.code}
                    value={birthsexType.code}
                    primaryText={birthsexType.display}
                  />
                ))}
            </SelectField>
          </Cell>
          <Cell area="addresses">
            <AddMultipleAddresses {...addAddressesProps} />
            {this.hasAddress() ? (
              ''
            ) : (
              <ErrorText>
                <FormattedMessage {...messages.validation.addressRequired} />
              </ErrorText>
            )}
          </Cell>
          <Cell area="contacts">
            <AddMultipleTelecoms {...addTelecomsProps} />
            {this.hasPhoneContact() ? (
              ''
            ) : (
              <ErrorText>
                <FormattedMessage {...messages.validation.phoneContact} />
              </ErrorText>
            )}
          </Cell>
          <Cell area="emergency-contact">
            <AddMultipleEmergencyContacts {...addEmergencyContactsProps} />
            {this.hasEmergencyContacts() ? (
              ''
            ) : (
              <ErrorText>
                <FormattedMessage {...messages.validation.emergencyContact} />
              </ErrorText>
            )}
          </Cell>
          <Cell area="flags">
            <AddFlags {...addFlagsProps} />
          </Cell>
          <Cell area="episodeOfCares">
            <AddEpisodeOfCare {...addEpisodeOfCareProps} />
            {this.hasEpisodeOfCare() ? (
              ''
            ) : (
              <ErrorText>
                <FormattedMessage {...messages.validation.noEpisodeOfCares} />
              </ErrorText>
            )}
          </Cell>
          {patient && (
            <Cell area="coverages">
              <AddCoverages {...addCoverageProps} />
            </Cell>
          )}
          <Cell area="buttonGroup">
            <Grid columns={2}>
              <Cell>
                <StyledRaisedButton
                  fullWidth
                  id={'btnSavePatient'}
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !this.hasEpisodeOfCare() ||
                    !this.hasEmergencyContacts() ||
                    !this.hasPhoneContact() ||
                    !this.validationsGeneralInformation()
                  }
                >
                  Save
                </StyledRaisedButton>
              </Cell>
              <Cell>
                <GoBackButton disabled={isSubmitting} />
              </Cell>
            </Grid>
          </Cell>
        </ManagePatientFormGrid>
      </Form>
    );
  }
}

ManagePatientForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  uspsStates: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  patientIdentifierSystems: PropTypes.arrayOf(
    PropTypes.shape({
      oid: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  administrativeGenders: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  usCoreRaces: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  usCoreEthnicities: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  usCoreBirthSexes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  telecomSystems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ).isRequired,
  telecomUses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string,
      display: PropTypes.string,
      definition: PropTypes.string,
    })
  ).isRequired,
  flagStatuses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  flagCategories: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  practitioner: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
  practitioners: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    })
  ),
  organization: PropTypes.object,
  episodeOfCareType: PropTypes.array,
  episodeOfCareStatus: PropTypes.array,
  policyHolderRelationship: PropTypes.array,
  coverageFmStatus: PropTypes.array,
  coverageType: PropTypes.array,
  subscriptionOptions: PropTypes.array,
  composePatientReference: PropTypes.func,
  getPatientFullName: PropTypes.func,
  patient: PropTypes.object,
};

export default ManagePatientForm;
