import DatePicker from 'components/DatePicker';
import ErrorText from 'components/ErrorText';
import FormSubtitle from 'components/FormSubtitle';
import GoBackButton from 'components/GoBackButton';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import { Form } from 'formik';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import { mapToPatientName } from 'utils/PatientUtils';

import Util from 'utils/Util';
import ManageCareTeamFormGrid from './ManageCareTeamFormGrid';
import messages from './messages';
import SelectedParticipants from './SelectedParticipants';

function ManageCareTeamForm(props) {
  const today = new Date();
  const {
    editMode,
    isSubmitting,
    dirty,
    isValid,
    careTeamCategories,
    careTeamReasons,
    careTeamStatuses,
    handleOpen,
    selectedParticipants,
    initialSelectedParticipants,
    removeParticipant,
    episodeOfCares,
    patient,
  } = props;

  const selectedParticipantsProps = {
    selectedParticipants,
    removeParticipant,
  };

  // To check whether has participant
  const hasParticipants = !isEmpty(selectedParticipants);
  const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');

  return (
    <div>
      <Form>
        <ManageCareTeamFormGrid gap="1vw">
          <Cell area="generalInformationSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.title} />
            </FormSubtitle>
          </Cell>
          <Cell area="selectedPatient">
            <InfoSection margin="2vh 0 0 0">
              <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.labelPatientName} />&nbsp;
              </InlineLabel>
              <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(patient)}</span>
            </InfoSection>
          </Cell>
          <Cell area="careTeamName">
            <TextField
              fullWidth
              name="careTeamName"
              hintText={<FormattedMessage {...messages.hintText.careTeamName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.careTeamName} />}
            />
          </Cell>
          <Cell area="category">
            <SelectField
              fullWidth
              name="category"
              hintText={<FormattedMessage {...messages.hintText.category} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.category} />}
            >
              {careTeamCategories && careTeamCategories.map((category) =>
                <MenuItem key={category.code} value={category.code} primaryText={category.display} />,
              )}
            </SelectField>
          </Cell>
          {editMode &&
          <Cell area="status">
            <SelectField
              fullWidth
              name="status"
              hintText={<FormattedMessage {...messages.hintText.status} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
            >
              {careTeamStatuses && careTeamStatuses.map((status) =>
                <MenuItem key={status.code} value={status.code} primaryText={status.display} />,
              )}
            </SelectField>
          </Cell>
          }
          <Cell area="episodeOfCare">
            <SelectField
              fullWidth
              name="episodeOfCareCode"
              hintText={<FormattedMessage {...messages.floatingLabelText.episodeOfCare} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.episodeOfCare} />}
            >
              {episodeOfCares && episodeOfCares.map((episodeOfCare) =>
                <MenuItem key={episodeOfCare.reference} value={episodeOfCare.reference} primaryText={episodeOfCare.display} />,
              )}
            </SelectField>
          </Cell>
          <Cell area="reason">
            <SelectField
              fullWidth
              name="reason"
              hintText={<FormattedMessage {...messages.hintText.reason} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.reason} />}
            >
              {careTeamReasons && careTeamReasons.map((reason) =>
                <MenuItem key={reason.code} value={reason.code} primaryText={reason.display} />,
              )}
            </SelectField>
          </Cell>
          <Cell area="startDate">
            <DatePicker
              fullWidth
              name="startDate"
              minDate={today}
              mode="landscape"
              hintText={<FormattedMessage {...messages.hintText.startDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
            />
          </Cell>
          <Cell area="endDate">
            <DatePicker
              fullWidth
              name="endDate"
              minDate={today}
              mode="landscape"
              hintText={<FormattedMessage {...messages.hintText.endDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
            />
          </Cell>
          <Cell area="participantSubtitle">
            <FormSubtitle margin="0">
              <FormattedMessage {...messages.participantTitle} />
            </FormSubtitle>
          </Cell>
          <Cell area="addParticipant">
            <StyledRaisedButton
              fullWidth
              onClick={handleOpen}
            >
              <FormattedMessage {...messages.addParticipantBtnLabel} />
            </StyledRaisedButton>
          </Cell>
          <Cell area="selectedParticipants">
            <SelectedParticipants {...selectedParticipantsProps} />
            {!hasParticipants &&
            <ErrorText>{hasParticipants ?
              '' : <FormattedMessage {...messages.validation.checkParticipants} />}
            </ErrorText>
            }
          </Cell>
          <Cell area="buttonGroup">
            <Grid columns={2}>
              <Cell>
                <StyledRaisedButton
                  fullWidth
                  type="submit"
                  disabled={!reCheckFormDirty(dirty, selectedParticipants, initialSelectedParticipants) || isSubmitting || !isValid || !hasParticipants}
                >
                  Save
                </StyledRaisedButton>
              </Cell>
              <Cell>
                <GoBackButton disabled={isSubmitting} />
              </Cell>
            </Grid>
          </Cell>
        </ManageCareTeamFormGrid>
      </Form>
    </div>
  );
}

ManageCareTeamForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  selectedParticipants: PropTypes.array,
  episodeOfCares: PropTypes.array,
  initialSelectedParticipants: PropTypes.array,
  careTeamCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  careTeamReasons: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  careTeamStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

export default ManageCareTeamForm;

function reCheckFormDirty(dirty, selectedParticipants, originalSelectedParticipants) {
  let isDirty = dirty;
  const identityOfArray = 'memberId';
  if (!Util.isUnorderedArraysEqual(selectedParticipants, originalSelectedParticipants, identityOfArray)) {
    isDirty = true;
  }

  return isDirty;
}
