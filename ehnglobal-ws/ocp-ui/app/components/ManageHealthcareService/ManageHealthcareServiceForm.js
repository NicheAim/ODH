import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import uniqueId from 'lodash/uniqueId';
import { Cell, Grid } from 'styled-css-grid';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import FormSubtitle from 'components/FormSubtitle';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import messages from './messages';
import ManageHealthcareServiceFormGrid from './ManageHealthcareServiceFormGrid';

function ManageHealthcareServiceForm(props) {
  const {
    organization,
    healthcareServiceCategories,
    healthcareServiceTypes,
    healthcareServiceSpecialities,
    healthcareServiceReferralMethods,
    healthcareServiceStatuses,
    telecomSystems,
    isSubmitting, dirty, isValid, editMode,
  } = props;
  const ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
  return (
    <div>
      <FormSubtitle>
        <FormattedMessage {...messages.title} />
      </FormSubtitle>
      <Form>
        <InfoSection margin="3vh 0 0 2vw">
          <InlineLabel htmlFor={ORGANIZATION_NAME_HTML_ID}>
            <FormattedMessage {...messages.hintText.organizationNameLabel} />&nbsp;
          </InlineLabel>
          <span id={ORGANIZATION_NAME_HTML_ID}>{organization.name}</span>
        </InfoSection>
        <ManageHealthcareServiceFormGrid>
          <Cell area="name">
            <TextField
              fullWidth
              name="name"
              hintText={<FormattedMessage {...messages.hintText.name} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.name} />}
            />
          </Cell>
          <Cell area="programName">
            <TextField
              fullWidth
              name="hcsProgramName"
              hintText={<FormattedMessage {...messages.hintText.programName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.programName} />}
            />
          </Cell>
          {editMode &&
          <SelectField
            fullWidth
            name="hcsStatus"
            hintText={<FormattedMessage {...messages.hintText.status} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
          >
            {healthcareServiceStatuses && healthcareServiceStatuses.map((hcsStatus) =>
              (<MenuItem key={hcsStatus.code} value={hcsStatus.code} primaryText={hcsStatus.display} />),
            )}
          </SelectField>
          }
          <Cell area="category">
            <SelectField
              fullWidth
              name="category"
              hintText={<FormattedMessage {...messages.hintText.category} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.category} />}
            >
              {healthcareServiceCategories && healthcareServiceCategories.map((hcsCategory) =>
                (<MenuItem key={hcsCategory.code} value={hcsCategory.code} primaryText={hcsCategory.display} />),
              )}
            </SelectField>
          </Cell>
          <Cell area="hcsType">
            <SelectField
              fullWidth
              name="hcsType"
              hintText={<FormattedMessage {...messages.hintText.type} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.type} />}
            >
              {healthcareServiceTypes && healthcareServiceTypes.map((type) =>
                (<MenuItem key={type.code} value={type.code} primaryText={type.display} />),
              )}
            </SelectField>
          </Cell>
          <Cell area="hcsSpecialty">
            <SelectField
              fullWidth
              name="hcsSpecialty"
              hintText={<FormattedMessage {...messages.hintText.specialty} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.specialty} />}
            >
              {healthcareServiceSpecialities && healthcareServiceSpecialities.map((type) =>
                (<MenuItem key={type.code} value={type.code} primaryText={type.display} />),
              )}
            </SelectField>
          </Cell>
          <Cell area="hcsReferralMethod">
            <SelectField
              fullWidth
              name="hcsReferralMethod"
              hintText={<FormattedMessage {...messages.hintText.referralMethod} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.referralMethod} />}
            >
              {healthcareServiceReferralMethods && healthcareServiceReferralMethods.map((type) =>
                (<MenuItem key={type.code} value={type.code} primaryText={type.display} />),
              )}
            </SelectField>
          </Cell>
          <Cell area="telecomType">
            <SelectField
              fullWidth
              name="telecomType"
              hintText={<FormattedMessage {...messages.hintText.telecomType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.telecomType} />}
            >
              {telecomSystems && telecomSystems.map((telecomType) =>
                (<MenuItem key={telecomType.code} value={telecomType.code} primaryText={telecomType.display} />),
              )}
            </SelectField>
          </Cell>
          <Cell area="telecomValue">
            <TextField
              fullWidth
              name="telecomValue"
              hintText={<FormattedMessage {...messages.hintText.telecomValue} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.telecomValue} />}
            />
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
        </ManageHealthcareServiceFormGrid>
      </Form>
    </div>
  );
}

ManageHealthcareServiceForm.propTypes = {
  organization: PropTypes.object.isRequired,
  healthcareServiceCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  healthcareServiceTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  healthcareServiceSpecialities: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string.isRequired,
  })),
  healthcareServiceStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.bool.isRequired,
    display: PropTypes.string.isRequired,
  })),
  healthcareServiceReferralMethods: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default ManageHealthcareServiceForm;
