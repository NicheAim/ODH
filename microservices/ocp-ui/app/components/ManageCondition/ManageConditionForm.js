import orderBy from 'lodash/orderBy';
import DatePicker from 'components/DatePicker';
import ErrorText from 'components/ErrorText';
import FieldGroupGrid from 'components/FieldGroupGrid';
import MainCell from 'components/FieldGroupGrid/MainCell';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import FormSubtitle from 'components/FormSubtitle';
import GoBackButton from 'components/GoBackButton';
import InlineLabel from 'components/InlineLabel';
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
import { mapToPatientName } from 'utils/PatientUtils';
import ManageConditionFormGrid from './ManageConditionFormGrid';
import messages from './messages';
import { getConditionText } from './utils';

const diagnosisPriorities = [
  {
    code: 'condition-primary',
    display: 'Primary',
    system:
      'https://healthcare.clients6.google.com/v1/projects/zanenet-njinck/locations/us-east4/datasets/dev-zanenet-njinck/fhirStores/dev-zanenet-ocp-datastore/fhir/CodeSystem?_id=condition-priority',
  },
  {
    code: 'condition-secondary',
    display: 'Secondary',
    system:
      'https://healthcare.clients6.google.com/v1/projects/zanenet-njinck/locations/us-east4/datasets/dev-zanenet-njinck/fhirStores/dev-zanenet-ocp-datastore/fhir/CodeSystem?_id=condition-priority',
  },
];

function ManageConditionForm(props) {
  const today = new Date();
  const {
    isSubmitting,
    dirty,
    isValid,
    values,
    errors,
    uspsStates,
    conditionsPatient,
    patient,
  } = props;
  const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');

  const orderedConditionsPatient = orderBy(conditionsPatient, (c) => c.code);

  return (
    <Form>
      <ManageConditionFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>

        <Cell area="patientName">
          <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}>
            <FormattedMessage {...messages.patientLabel} />
            &nbsp;
          </InlineLabel>
          <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(patient)}</span>
        </Cell>
        <Cell area="conditionCode">
          <SelectField
            fullWidth
            name="conditionCode"
            hintText={<FormattedMessage {...messages.hintText.conditionCode} />}
            floatingLabelText={
              <FormattedMessage {...messages.floatingLabelText.conditionCode} />
            }
          >
            {orderedConditionsPatient &&
              orderedConditionsPatient.map((conditionPatient) => (
                <MenuItem
                  key={conditionPatient.code}
                  value={conditionPatient.code}
                  primaryText={getConditionText(conditionPatient)}
                />
              ))}
          </SelectField>
        </Cell>

        <Cell area="diagnosisPriorityCode">
          <SelectField
            fullWidth
            name="diagnosisPriorityCode"
            hintText={
              <FormattedMessage {...messages.hintText.diagnosisPriorityCode} />
            }
            floatingLabelText={
              <FormattedMessage
                {...messages.floatingLabelText.diagnosisPriorityCode}
              />
            }
          >
            {diagnosisPriorities &&
              diagnosisPriorities
                .reverse()
                .map((diagnosisPriority) => (
                  <MenuItem
                    key={diagnosisPriority.code}
                    value={diagnosisPriority.code}
                    primaryText={diagnosisPriority.display}
                  />
                ))}
          </SelectField>
        </Cell>

        <Cell area="recordedDate">
          <DatePicker
            fullWidth
            name="recordedDate"
            maxDate={today}
            hintText={<FormattedMessage {...messages.hintText.recordedDate} />}
            floatingLabelText={
              <FormattedMessage {...messages.floatingLabelText.recordedDate} />
            }
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
      </ManageConditionFormGrid>
    </Form>
  );
}

ManageConditionForm.propTypes = {
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
  conditionsPatient: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  patient: PropTypes.object,
};

export default ManageConditionForm;
