import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';

import Padding from 'components/Padding';
import AutoSuggestionField from 'components/AutoSuggestion';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import FormSubtitle from 'components/FormSubtitle';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import SubTaskTable from 'components/SubTaskTable';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import {
  MANAGE_TASK_URL, EMPTY_STRING,
  CODE_FIELD_VALUE, DISPLAY_FIELD_VALUE, REFERNCE_FIELD_VALUE,
  TITLE_FIELD_VALUE, paddingTop,
} from 'components/ManageTask/constants';
import { mapToPatientName } from 'utils/PatientUtils';
import messages from './messages';
import ManageTaskFormGrid from './ManageTaskFormGrid';

function ManageTaskForm(props) {
  const datePickerLandscapeMode = 'landscape';

  const {
    taskStatus,
    requestIntent,
    requestPriority,
    taskPerformerType,
    activityDefinitions,
    practitioners,
    eventTypes,
    tasksByPatient,
    subTasks,
    patient,
    isEditTask,
    isSubmitting, dirty, isValid, isMainTask, organization, requester,
  } = props;
  const today = new Date();
  const ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
  const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');

  function createSuggestions(entries, valueField, labelField) {
    return entries && entries
      .filter((entry) => (entry[valueField] !== null) && (entry[labelField] !== null))
      .map((entry) => ({
        value: entry[valueField],
        label: entry[labelField],
      }));
  }

  const activityDefinitionSuggestions = createSuggestions(activityDefinitions, REFERNCE_FIELD_VALUE, TITLE_FIELD_VALUE);
  const taskStatusSuggestions = createSuggestions(taskStatus, CODE_FIELD_VALUE, DISPLAY_FIELD_VALUE);
  const requestPrioritySuggestions = createSuggestions(requestPriority, CODE_FIELD_VALUE, DISPLAY_FIELD_VALUE);
  const requestIntentSuggestions = createSuggestions(requestIntent, CODE_FIELD_VALUE, DISPLAY_FIELD_VALUE);
  const practitionersSuggestions = createSuggestions(practitioners, REFERNCE_FIELD_VALUE, DISPLAY_FIELD_VALUE);
  const taskPerformerTypeSuggestions = createSuggestions(taskPerformerType, CODE_FIELD_VALUE, DISPLAY_FIELD_VALUE);
  const eventTypeSuggestions = createSuggestions(eventTypes, REFERNCE_FIELD_VALUE, DISPLAY_FIELD_VALUE);
  return (
    <Form>
      <ManageTaskFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="activityDefinition">
          <Padding top={paddingTop}>
            <AutoSuggestionField
              fullWidth
              isRequired
              name="activityDefinition"
              placeholder={<FormattedMessage {...messages.floatingLabelText.activityDefinitions} />}
              label={<FormattedMessage {...messages.floatingLabelText.activityDefinitions} />}
              suggestions={activityDefinitionSuggestions}
              /* TODO: fix load activity type in tasks from goals
              disabled={isEditTask || !isMainTask} */
              {...props}
            />
          </Padding>
        </Cell>
        <Cell area="selOrganization">
          <InfoSection margin="4vh 0 0 0">
            <InlineLabel htmlFor={ORGANIZATION_NAME_HTML_ID}><FormattedMessage {...messages.floatingLabelText.organization} />&nbsp;
            </InlineLabel>
            <span id={ORGANIZATION_NAME_HTML_ID}>{organization && organization.name}</span>
          </InfoSection>
        </Cell>
        <Cell area="patientName">
          <InfoSection margin="2vh 0 0 0">
            <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.hintText.patientName} />&nbsp;
            </InlineLabel>
            <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(patient)}</span>
          </InfoSection>
        </Cell>
        <Cell area="selRequester">
          <InfoSection margin="2vh 0 0 0">
            <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.hintText.requester} />&nbsp;
            </InlineLabel>
            <span id={PATIENT_NAME_HTML_ID}>{getResourceName(requester)}</span>
          </InfoSection>
        </Cell>
        <Cell area="authoredOn">
          <DatePicker
            fullWidth
            name="authoredOn"
            disabled
            minDate={today}
            maxDate={today}
            hintText={<FormattedMessage {...messages.hintText.authoredOn} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.authoredOn} />}
          />
        </Cell>
        <Cell area="lastModifiedDate">
          <DatePicker
            fullWidth
            name="lastModifiedDate"
            disabled
            defaultDate={today}
            minDate={today}
            maxDate={today}
            hintText={<FormattedMessage {...messages.hintText.lastModifiedDate} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastModifiedDate} />}
          />
        </Cell>
        <Cell area="status">
          <Padding top={paddingTop}>
            <AutoSuggestionField
              name="status"
              isRequired
              placeholder={<FormattedMessage {...messages.floatingLabelText.status} />}
              label={<FormattedMessage {...messages.floatingLabelText.status} />}
              suggestions={taskStatusSuggestions}
              {...props}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
            />
          </Padding>
        </Cell>
        <Cell area="priority">
          <Padding top={paddingTop}>
            <AutoSuggestionField
              name="priority"
              isRequired
              placeholder={<FormattedMessage {...messages.floatingLabelText.priority} />}
              label={<FormattedMessage {...messages.floatingLabelText.priority} />}
              suggestions={requestPrioritySuggestions}
              {...props}
            />
          </Padding>
        </Cell>
        <Cell area="intent">
          <Padding top={paddingTop}>
            <AutoSuggestionField
              name="intent"
              isRequired
              placeholder={<FormattedMessage {...messages.floatingLabelText.intent} />}
              label={<FormattedMessage {...messages.floatingLabelText.intent} />}
              suggestions={requestIntentSuggestions}
              {...props}
            />
          </Padding>
        </Cell>
        
        <Cell area="taskOwner">
          <Padding top={paddingTop}>
            <AutoSuggestionField
              name="taskOwner"
              isRequired
              placeholder={<FormattedMessage {...messages.floatingLabelText.taskOwner} />}
              label={<FormattedMessage {...messages.floatingLabelText.taskOwner} />}
              suggestions={practitionersSuggestions}
              {...props}
            />
          </Padding>
        </Cell>

        <Cell area="partOf">
          {(tasksByPatient && tasksByPatient.length > 0) && !isMainTask &&
          <SelectField
            fullWidth
            disabled
            name="partOf"
            hintText={<FormattedMessage {...messages.hintText.partOf} />}
          >
            {tasksByPatient && tasksByPatient.map((partOf) =>
              <MenuItem key={uniqueId()} value={partOf.reference} primaryText={partOf.display} />,
            )}
          </SelectField>
          }
        </Cell>
        <Cell area="taskStart">
          <DatePicker
            fullWidth
            name="taskStart"
            mode={datePickerLandscapeMode}
            hintText={<FormattedMessage {...messages.hintText.taskStart} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskStart} />}
          />
        </Cell>
        <Cell area="taskEnd">
          <DatePicker
            fullWidth
            name="taskEnd"
            minDate={today}
            mode={datePickerLandscapeMode}
            hintText={<FormattedMessage {...messages.hintText.taskEnd} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.taskEnd} />}
          />
        </Cell>
        <Cell area="description">
          <TextField
            fullWidth
            name="description"
            multiLine
            rows={2}
            hintText={<FormattedMessage {...messages.hintText.description} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
          />
        </Cell>
        <Cell area="comments">
          <TextField
            fullWidth
            name="comments"
            multiLine
            rows={2}
            hintText={<FormattedMessage {...messages.hintText.comments} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.comments} />}
          />
        </Cell>
        {isEditTask && isMainTask && <Cell area="subTasksSection">
          <SubTaskTable elements={subTasks} patientId={patient.id} taskBaseUrl={MANAGE_TASK_URL} />
        </Cell>
        }
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
      </ManageTaskFormGrid>
    </Form>
  );
}

ManageTaskForm.propTypes = {
  activityDefinitions: PropTypes.array,
  subTasks: PropTypes.array,
  practitioners: PropTypes.array,
  taskStatus: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  requestIntent: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  requestPriority: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  taskPerformerType: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  eventTypes: PropTypes.arrayOf(PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  })),
  tasksByPatient: PropTypes.arrayOf(PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  })),
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  isMainTask: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  organization: PropTypes.object,
  requester: PropTypes.object,
  isEditTask: PropTypes.bool.isRequired,
};

export default ManageTaskForm;

function getResourceName(resource) {
  if (resource === undefined || resource === null) {
    return EMPTY_STRING;
  }
  const names = resource.name;
  return names && names
    .map((name) => {
      const firstName = name.firstName !== EMPTY_STRING ? name.firstName : EMPTY_STRING;
      const lastName = name.lastName !== EMPTY_STRING ? name.lastName : EMPTY_STRING;
      return `${firstName} ${lastName}`;
    })
    .join(', ');
}
