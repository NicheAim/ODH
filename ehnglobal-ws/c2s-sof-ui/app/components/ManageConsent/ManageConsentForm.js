import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';
import { Form } from 'formik';

import { GoBackButton } from 'components/GoBackButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import DatePicker from 'components/DatePicker';
import Checkbox from 'components/Checkbox';
import SelectConsentActors from 'components/SelectConsentActors';
import SelectMedicalInformation from 'components/SelectMedicalInformation';
import ConsentFormSection from 'components/ConsentFormSection';
import PurposeOfUse from 'components/PurposeOfUse';
import { SHARE_ALL, SHARE_SPECIFIC } from 'components/SelectMedicalInformation/constants';
import ManageConsentFormGrid from './ManageConsentFormGrid';
import messages from './messages';


function ManageConsentForm(props) {
  const datePickerLandscapeMode = 'landscape';
  const {
    isSubmitting, dirty, isValid, errors, values,
    purposeOfUse,
    securityLabels,
    isCareCoordinator,
    shareType,
    editMode,
  } = props;

  const isGeneralDesignation = values.consentType;
  const today = new Date();

  const selectActorsProps = {
    errors,
    consentFromActors: values.consentFromActors,
    consentToActors: values.consentToActors,
    isCareCoordinator,
  };
  const selectMedicalInfoProps = {
    errors,
    securityLabels,
    medicalInformation: values.medicalInformation || [],
    isGeneralDesignation,
    shareType: values.shareType || shareType,
  };
  const purposeOfUseProps = {
    errors,
    purposeOfUse,
    purpose: values.purpose || [],
    isGeneralDesignation,
  };

  return (
    <Form>
      <ManageConsentFormGrid>
        <Cell area="careTeamGroup">
          <ConsentFormSection title={<FormattedMessage {...messages.selectActorsTitle} />}>
            <Checkbox
              name="consentType"
              label={<FormattedMessage {...messages.consentType} />}
              disabled={editMode}
            >
            </Checkbox>
            {!isGeneralDesignation &&
            <SelectConsentActors {...selectActorsProps} />
            }
          </ConsentFormSection>
        </Cell>
        <Cell area="medicalInfoGroup">
          <ConsentFormSection title={<FormattedMessage {...messages.medicalInformationTitle} />}>
            <SelectMedicalInformation {...selectMedicalInfoProps} />
          </ConsentFormSection>
        </Cell>
        <Cell area="purposeOfUseGroup">
          <ConsentFormSection title={<FormattedMessage {...messages.purposeOfUseTitle} />}>
            <PurposeOfUse {...purposeOfUseProps} />
          </ConsentFormSection>
        </Cell>
        <Cell area="consentTermGroup">
          <ConsentFormSection title={<FormattedMessage {...messages.consentTermTitle} />}>
            <FormattedMessage {...messages.consentTermSubtitle} />
            <Grid columns={4} gap="30px">
              <DatePicker
                fullWidth
                name="consentStart"
                mode={datePickerLandscapeMode}
                minDate={today}
                hintText={<FormattedMessage {...messages.hintText.consentStart} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.consentStart} />}
                disabled={editMode}
              />
              <DatePicker
                fullWidth
                name="consentEnd"
                minDate={today}
                mode={datePickerLandscapeMode}
                hintText={<FormattedMessage {...messages.hintText.consentEnd} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.consentEnd} />}
              />
            </Grid>
          </ConsentFormSection>
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
      </ManageConsentFormGrid>
    </Form>
  );
}

ManageConsentForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    consentType: PropTypes.any,
    consentFromActors: PropTypes.any,
    consentToActors: PropTypes.any,
    medicalInformation: PropTypes.any,
    consentStart: PropTypes.any,
    consentEnd: PropTypes.any,
  }),
  values: PropTypes.shape({
    consentType: PropTypes.bool.isRequired,
    consentFromActors: PropTypes.array,
    consentToActors: PropTypes.array,
  }),
  securityLabels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  purposeOfUse: PropTypes.arrayOf((PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  }))),
  isCareCoordinator: PropTypes.bool.isRequired,
  shareType: PropTypes.oneOf([SHARE_ALL, SHARE_SPECIFIC]),
  editMode: PropTypes.bool,
};

export default ManageConsentForm;
