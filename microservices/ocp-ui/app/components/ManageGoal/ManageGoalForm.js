import AutoSuggestionField from 'components/AutoSuggestion';
import DatePicker from 'components/DatePicker';
import FormSubtitle from 'components/FormSubtitle';
import GoBackButton from 'components/GoBackButton';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import Padding from 'components/Padding';
import StyledRaisedButton from 'components/StyledRaisedButton';
import { Form } from 'formik';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import { mapToPatientName } from 'utils/PatientUtils';
import { paddingTop } from './constants';
import ManageGoalFormGrid from './ManageGoalFormGrid';
import messages from './messages';
import {
  getSuggestionsFromPractitioners,
  getSuggestionsFromValueSetConcepts,
} from './utils';

function ManageGoalForm(props) {
  const {
    goal,
    patient,
    organization,
    goalStatuses,
    goalAchievementStatuses,
    practitioners,
    dirty,
    isSubmitting,
    isValid,
    planSuggestions,
    planIdHtmlId,
    descriptionHtmlId,
    lifecycleStatusHtmlId,
    achievementStatusHtmlId,
    startDateHtmlId,
    dueDateHtmlId,
    ownerHtmlId,
  } = props;

  const ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
  const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
  const today = new Date();
  return (
    <Form>
      <ManageGoalFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="selOrganization">
          <InfoSection margin="4vh 0 0 0">
            <InlineLabel htmlFor={ORGANIZATION_NAME_HTML_ID}>
              <FormattedMessage {...messages.floatingLabelText.organization} />
              &nbsp;
            </InlineLabel>
            <span id={ORGANIZATION_NAME_HTML_ID}>
              {organization && organization.name}
            </span>
          </InfoSection>
        </Cell>
        <Cell area="patientName">
          <InfoSection margin="2vh 0 0 0">
            <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}>
              <FormattedMessage {...messages.hintText.patientName} />
              &nbsp;
            </InlineLabel>
            <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(patient)}</span>
          </InfoSection>
        </Cell>
        <Cell area="startDate">
          <DatePicker
            fullWidth
            name={startDateHtmlId}
            minDate={goal ? undefined : today}
            hintText={<FormattedMessage {...messages.hintText.startDate} />}
            floatingLabelText={
              <FormattedMessage {...messages.hintText.startDate} />
            }
          />
        </Cell>
        <Cell area="dueDate">
          <DatePicker
            fullWidth
            name={dueDateHtmlId}
            minDate={goal ? undefined : today}
            hintText={<FormattedMessage {...messages.hintText.dueDate} />}
            floatingLabelText={
              <FormattedMessage {...messages.hintText.dueDate} />
            }
          />
        </Cell>
        {!goal && (
          <Cell area="planId">
            <Padding top={paddingTop}>
              <AutoSuggestionField
                fullWidth
                isRequired
                name={planIdHtmlId}
                placeholder={
                  <FormattedMessage
                    {...messages.floatingLabelText.selectedCarePlan}
                  />
                }
                label={
                  <FormattedMessage
                    {...messages.floatingLabelText.selectedCarePlan}
                  />
                }
                suggestions={planSuggestions}
                {...props}
              />
            </Padding>
          </Cell>
        )}
        <Cell area="lifecycleStatus">
          <Padding top={paddingTop}>
            <AutoSuggestionField
              fullWidth
              isRequired
              name={lifecycleStatusHtmlId}
              placeholder={
                <FormattedMessage
                  {...messages.floatingLabelText.lifecycleStatus}
                />
              }
              label={
                <FormattedMessage
                  {...messages.floatingLabelText.lifecycleStatus}
                />
              }
              suggestions={getSuggestionsFromValueSetConcepts(goalStatuses)}
              {...props}
            />
          </Padding>
        </Cell>
        <Cell area="achievementStatus">
          <Padding top={paddingTop}>
            <AutoSuggestionField
              fullWidth
              isRequired
              name={achievementStatusHtmlId}
              placeholder={
                <FormattedMessage
                  {...messages.floatingLabelText.achievementStatus}
                />
              }
              label={
                <FormattedMessage
                  {...messages.floatingLabelText.achievementStatus}
                />
              }
              suggestions={getSuggestionsFromValueSetConcepts(
                goalAchievementStatuses
              )}
              {...props}
            />
          </Padding>
        </Cell>
        {!goal && (
          <Cell area="owner">
            <Padding top={paddingTop}>
              <AutoSuggestionField
                fullWidth
                isRequired
                name={ownerHtmlId}
                placeholder={
                  <FormattedMessage {...messages.floatingLabelText.owner} />
                }
                label={
                  <FormattedMessage {...messages.floatingLabelText.owner} />
                }
                suggestions={getSuggestionsFromPractitioners(practitioners)}
                {...props}
              />
            </Padding>
          </Cell>
        )}
        {/* <Cell area="description">
          <TextField
            hidden
            fullWidth
            name={descriptionHtmlId}
            hintText={<FormattedMessage {...messages.hintText.description} />}
            floatingLabelText={<FormattedMessage {...messages.hintText.description} />}
          />
        </Cell> */}
        <Cell area="buttonGroup">
          <Padding top={paddingTop}>
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
          </Padding>
        </Cell>
      </ManageGoalFormGrid>
    </Form>
  );
}

const SuggestionShape = PropTypes.shape({
  code: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
});

ManageGoalForm.propTypes = {
  goal: PropTypes.object,
  patient: PropTypes.object.isRequired,
  requester: PropTypes.object,
  organization: PropTypes.object.isRequired,
  goalStatuses: PropTypes.arrayOf(SuggestionShape).isRequired,
  planSuggestions: PropTypes.array.isRequired,
  goalAchievementStatuses: PropTypes.arrayOf(SuggestionShape).isRequired,
  practitioners: PropTypes.array.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  planIdHtmlId: PropTypes.string,
  descriptionHtmlId: PropTypes.string.isRequired,
  lifecycleStatusHtmlId: PropTypes.string.isRequired,
  achievementStatusHtmlId: PropTypes.string.isRequired,
  startDateHtmlId: PropTypes.string.isRequired,
  dueDateHtmlId: PropTypes.string.isRequired,
  ownerHtmlId: PropTypes.string.isRequired,
};

export default ManageGoalForm;
