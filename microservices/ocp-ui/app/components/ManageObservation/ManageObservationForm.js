import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import FormSubtitle from 'components/FormSubtitle';
import Padding from 'components/Padding';
import TextField from 'components/TextField';
import AutoSuggestionField from 'components/AutoSuggestion';
import DatePicker from 'components/DatePicker';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';

import { mapToPatientName } from 'utils/PatientUtils';
import {
  getSuggestionsFromValueSetConcepts,
} from './utils';
import { paddingTop } from './constants';
import ManageObservationFormGrid from './ManageObservationFormGrid';
import messages from './messages';
import uniqueId from 'lodash/uniqueId';

class ManageObservationForm extends React.Component {

  constructor(props) {
    super(props);
    this.organizationNameHtmlId = uniqueId('organization_name_');
    this.patientNameHtmlId = uniqueId('patient_name_');
  }

  get codeSuggestions() {
    return Object.entries(this.props.codeSystems).map(([name, codeSystem]) => ({
      value: name,
      label: codeSystem.label,
    }));
  }

  get valueSuggestions() {
    const { observationCode } = this.props.values;
    if (observationCode) {
      const codeSystemDefinition = this.props.codeSystems[observationCode];
      if (codeSystemDefinition) {
        return getSuggestionsFromValueSetConcepts(codeSystemDefinition.contents.concept);
      }
    }
    return [];
  }

  render() {
    const {
      patient,
      organization,
      observation,
      dirty,
      isSubmitting,
      isValid,
      values: { observationCode }
    } = this.props;

    const today = new Date();

    // console.log(JSON.stringify(observation, null, 2))

    return (
      <Form>
        <ManageObservationFormGrid>
          <Cell area="generalInformationSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.title} />
            </FormSubtitle>
          </Cell>
          <Cell area="selOrganization">
            <InfoSection margin="4vh 0 0 0">
              <InlineLabel htmlFor={this.organizationNameHtmlId}><FormattedMessage {...messages.floatingLabelText.organization} />&nbsp;
              </InlineLabel>
              <span id={this.organizationNameHtmlId}>{organization && organization.name}</span>
            </InfoSection>
          </Cell>
          <Cell area="patientName">
            <InfoSection margin="2vh 0 0 0">
              <InlineLabel htmlFor={this.patientNameHtmlId}><FormattedMessage {...messages.floatingLabelText.patientName} />&nbsp;
              </InlineLabel>
              <span id={this.patientNameHtmlId}>{mapToPatientName(patient)}</span>
            </InfoSection>
          </Cell>
          <Cell area="observationIssued">
            <DatePicker
              fullWidth
              name="observationIssued"
              minDate={observation ? undefined : today}
              hintText={<FormattedMessage {...messages.hintText.issued} />}
              floatingLabelText={<FormattedMessage {...messages.hintText.issued} />}
            />
          </Cell>
          <Cell area="observationCode">
            <Padding top={paddingTop}>
              <AutoSuggestionField
                fullWidth
                isRequired
                name="observationCode"
                placeholder={<FormattedMessage {...messages.hintText.code} />}
                label={messages.hintText.code.defaultMessage}
                suggestions={this.codeSuggestions}
                {...this.props}
              />
            </Padding>
          </Cell>
          <Cell area="observationValue">
            <Padding top={paddingTop}>
              {
                observationCode === 'njinck-social-complexity' &&
                <TextField
                  fullWidth
                  name="observationValue"
                  hintText={<FormattedMessage {...messages.hintText.value} />}
                  floatingLabelText={<FormattedMessage {...messages.hintText.value} /> }
                />
              }
              {
                observationCode !== 'njinck-social-complexity' &&
                <AutoSuggestionField
                  fullWidth
                  isRequired
                  name="observationValue"
                  placeholder={<FormattedMessage {...messages.hintText.value} />}
                  label={messages.hintText.value.defaultMessage}
                  suggestions={this.valueSuggestions}
                  {...this.props}
                />
              }
            </Padding>
          </Cell>
          <Cell area="buttonGroup">
            <Padding top={paddingTop}>
              <Grid columns={2}>
                <Cell>
                  <StyledRaisedButton
                    fullWidth type="submit" disabled={!dirty || isSubmitting || !isValid}
                  >
                    Save
                  </StyledRaisedButton>
                </Cell>
                <Cell>
                  <GoBackButton disabled={isSubmitting}/>
                </Cell>
              </Grid>
            </Padding>
          </Cell>
        </ManageObservationFormGrid>
      </Form>
    );
  }
}

ManageObservationForm.propTypes = {
  user: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  medicalComplexities: PropTypes.object,
  socialComplexities: PropTypes.object,
  serviceIntegrationLevels: PropTypes.object,
  codeSystems: PropTypes.object.isRequired,
  observation: PropTypes.object,
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  values: PropTypes.object,
}

export default ManageObservationForm;
