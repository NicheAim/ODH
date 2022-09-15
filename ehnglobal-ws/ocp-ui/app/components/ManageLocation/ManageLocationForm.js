import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';

import AddMultipleTelecoms from 'components/AddMultipleTelecoms';
import Padding from 'components/Padding';
import ErrorText from 'components/ErrorText';
import FieldGroupGrid from 'components/FieldGroupGrid';
import MainCell from 'components/FieldGroupGrid/MainCell';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import FormSubtitle from 'components/FormSubtitle';
import GoBackButton from 'components/GoBackButton';
import InlineLabel from 'components/InlineLabel';
import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import AutoSuggestionField from 'components/AutoSuggestion';
import ManageLocationFormGrid from './ManageLocationFormGrid';
import messages from './messages';

function ManageLocationForm(props) {
  const {
    errors,
    values,
    dirty,
    isValid,
    error,
    uspsStates,
    locationPhysicalTypes,
    addressUses,
    locationStatuses,
    identifierSystems,
    telecomSystems,
    telecomUses,
    isSubmitting,
    organization,
    selectedLocation,
  } = props;
  const ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
  const addTelecomsProps = {
    telecomSystems,
    telecomUses,
    errors,
    telecoms: values.telecoms,
  };
  const stateSuggestions = uspsStates
    .filter((entry) => (entry.code !== null) && (entry.display !== null))
    .map((entry) => ({
      value: entry.code,
      label: entry.display,
    }));
  return (
    <Form>
      <ManageLocationFormGrid gap="1vw">
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="3vh 0 1vh 0">
            <FormattedMessage {...messages.mainLabel} />
          </FormSubtitle>
        </Cell>
        <Cell area="organizationName">
          <InlineLabel htmlFor={ORGANIZATION_NAME_HTML_ID}>
            <FormattedMessage {...messages.organizationNameLabel} />&nbsp;
          </InlineLabel>
          <span id={ORGANIZATION_NAME_HTML_ID}>{organization.name}</span>
        </Cell>
        <Cell area="name">
          <TextField
            name="name"
            fullWidth
            hintText={<FormattedMessage {...messages.locationNameHintText} />}
            floatingLabelText={<FormattedMessage {...messages.locationNameFloatingLabelText} />}
          />
        </Cell>
        <Cell area="status">
          {(selectedLocation && selectedLocation.logicalId &&
            <SelectField
              name="status"
              fullWidth
              floatingLabelText={<FormattedMessage {...messages.statusFloatingLabelText} />}
            >
              {locationStatuses && locationStatuses.map((locationStatus) => (
                <MenuItem key={uniqueId()} value={locationStatus.code} primaryText={locationStatus.display} />
              ))}
            </SelectField>
          )}
        </Cell>
        <Cell area="locationType">
          <SelectField
            name="physicalType"
            fullWidth
            floatingLabelText={<FormattedMessage {...messages.locationPhysicalType} />}
          >
            {locationPhysicalTypes && locationPhysicalTypes.map((locationType) => (
              <MenuItem key={uniqueId()} value={locationType.code} primaryText={locationType.display} />
            ))}
          </SelectField>
        </Cell>
        <Cell area="identifierGroup">
          <FieldGroupGrid>
            <PrefixCell>
              <SelectField
                fullWidth
                name="identifierSystem"
                floatingLabelText={<FormattedMessage {...messages.identifierSystemTypeFloatingLabelText} />}
              >
                {identifierSystems && identifierSystems.map((identifierSystem) => (
                  <MenuItem key={uniqueId()} value={identifierSystem.uri} primaryText={identifierSystem.display} />
                ))}
              </SelectField>
            </PrefixCell>
            <MainCell>
              <TextField
                name="identifierValue"
                hintText={<FormattedMessage {...messages.identifierValueHintText} />}
                floatingLabelText={<FormattedMessage {...messages.identifierValueFloatingLabelText} />}
              />
            </MainCell>
          </FieldGroupGrid>
        </Cell>
        <Cell area="contact">
          <AddMultipleTelecoms {...addTelecomsProps} />
        </Cell>
        <Cell area="addressSubtitle">
          <FormSubtitle margin="3vh 0 1vh 0">
            <FormattedMessage {...messages.addressHeader} />
          </FormSubtitle>
        </Cell>
        <Cell area="address1">
          <TextField
            name="line1"
            fullWidth
            hintText={<FormattedMessage {...messages.address1HintText} />}
            floatingLabelText={<FormattedMessage {...messages.address1FloatingLabelText} />}
          />
        </Cell>
        <Cell area="address2">
          <TextField
            name="line2"
            fullWidth
            hintText={<FormattedMessage {...messages.address2HintText} />}
            floatingLabelText={<FormattedMessage {...messages.address2FloatingLabelText} />}
          />
        </Cell>
        <Cell area="city">
          <TextField
            name="city"
            fullWidth
            hintText={<FormattedMessage {...messages.cityHintText} />}
            floatingLabelText={<FormattedMessage {...messages.cityFloatingLabelText} />}
          />
        </Cell>
        <Cell area="state">
          <Padding top={25}>
            <AutoSuggestionField
              name="stateCode"
              isRequired
              placeholder={<FormattedMessage {...messages.statesFloatingLabelText} />}
              suggestions={stateSuggestions}
              {...props}
            />
          </Padding>
        </Cell>
        <Cell area="postalCode">
          <TextField
            name="postalCode"
            fullWidth
            hintText={<FormattedMessage {...messages.postalCodeHintText} />}
            floatingLabelText={<FormattedMessage {...messages.postalCodeFloatingLabelText} />}
          />
        </Cell>
        <Cell area="countryCode">
          <TextField
            name="countryCode"
            fullWidth
            disabled
            hintText={<FormattedMessage {...messages.countryHintText} />}
            floatingLabelText={<FormattedMessage {...messages.countryFloatingLabelText} />}
          />
        </Cell>
        <Cell area="addressUse">
          <SelectField
            fullWidth
            name="use"
            floatingLabelText={<FormattedMessage {...messages.addressUseFloatingLabelText} />}
          >
            {addressUses && addressUses.map((addressUse) => (
              <MenuItem key={uniqueId()} value={addressUse.code} primaryText={addressUse.display} />
            ))}
          </SelectField>
        </Cell>
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                Save
              </StyledRaisedButton>
            </Cell>
            <Cell>
              <GoBackButton disabled={isSubmitting} />
            </Cell>
          </Grid>
        </Cell>
        <Cell area="errorMessage">
          {error ?
            <ErrorText><FormattedMessage {...messages.saveLocationError} /></ErrorText> : ''}
        </Cell>
      </ManageLocationFormGrid>
    </Form>
  );
}

ManageLocationForm.propTypes = {
  errors: PropTypes.object,
  values: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  uspsStates: PropTypes.array.isRequired,
  locationPhysicalTypes: PropTypes.array,
  locationStatuses: PropTypes.array.isRequired,
  telecomUses: PropTypes.array.isRequired,
  telecomSystems: PropTypes.array.isRequired,
  addressUses: PropTypes.array.isRequired,
  identifierSystems: PropTypes.array.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  organization: PropTypes.object.isRequired,
  selectedLocation: PropTypes.object,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

export default ManageLocationForm;
