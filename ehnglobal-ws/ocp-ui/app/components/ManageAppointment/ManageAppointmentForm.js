import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';

import { mapToPatientName } from 'utils/PatientUtils';
import AddAppointmentParticipant from 'containers/AddAppointmentParticipant';
import DatePicker from 'components/DatePicker';
import FormSubtitle from 'components/FormSubtitle';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import SelectField from 'components/SelectField';
import GoBackButton from 'components/GoBackButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import ErrorText from 'components/ErrorText';
import ManageAppointmentFormGrid from './ManageAppointmentFormGrid';
import messages from './messages';

class ManageAppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.startDateTime = null;
    this.endDateTime = null;
    this.state = {
      isEndDateBeforeStartDate: false,
    };
    this.onStartTimeChange = this.onStartTimeChange.bind(this);
    this.onEndTimeChange = this.onEndTimeChange.bind(this);
  }

  componentDidMount() {
    const { appointment } = this.props;
    if (appointment && appointment.start && appointment.end && this.startDateTime === null && this.endDateTime === null) {
      const { start, end } = appointment;
      const startTime = new Date(start[0], start[1], start[2], start[3], start[4]);
      const endTime = new Date(end[0], end[1], end[2], end[3], end[4]);
      this.startDateTime = startTime;
      this.endDateTime = endTime;
    }
  }

  onStartTimeChange(event) {
    const startTime = event.target.value;
    const dateTimeArray = startTime && startTime.split(':');

    const startDateTime = this.startDateTime === null ? new Date() : this.startDateTime;
    const endDateTime = this.endDateTime === null ? new Date() : this.endDateTime;
    startDateTime.setHours(dateTimeArray[0], dateTimeArray[1]);
    const result = startDateTime > endDateTime;
    this.startDateTime = startDateTime;
    this.setState({
      isEndDateBeforeStartDate: result,
    });
  }

  onEndTimeChange(event) {
    const endTime = event.target.value;
    const dateTimeArray = endTime && endTime.split(':');

    const startDateTime = this.startDateTime === null ? new Date() : this.startDateTime;
    const endDateTime = this.endDateTime === null ? new Date() : this.endDateTime;
    endDateTime.setHours(dateTimeArray[0], dateTimeArray[1]);

    const result = startDateTime > endDateTime;
    this.endDateTime = endDateTime;
    this.setState({
      isEndDateBeforeStartDate: result,
    });
  }

  render() {
    const today = new Date();
    const {
      isSubmitting, dirty, isValid, errors, values,
      editMode, appointmentTypes, appointmentStatuses,
      patient, appointmentParticipantRequired,
    } = this.props;
    const valuedParticipants = filter(values.participants, (participant) => !isEmpty(participant));
    const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');

    return (
      <div>
        <Form>
          <ManageAppointmentFormGrid gap="1vw">
            <Cell area="generalInformationSubtitle">
              <FormSubtitle margin="0">
                <FormattedMessage {...messages.title} />
              </FormSubtitle>
            </Cell>
            <Cell area="selectedPatient">
              <InfoSection margin="2vh 0 0 0">
                <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}><FormattedMessage {...messages.patientName} />&nbsp;
                </InlineLabel>
                <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(patient)}</span>
              </InfoSection>
            </Cell>
            <Cell area="appointmentType">
              <SelectField
                fullWidth
                name="appointmentType"
                hintText={<FormattedMessage {...messages.hintText.appointmentType} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.appointmentType} />}
              >
                {appointmentTypes && appointmentTypes.map((appointmentType) =>
                  (<MenuItem
                    key={uniqueId()}
                    value={appointmentType.code}
                    primaryText={appointmentType.display}
                  />),
                )}
              </SelectField>
            </Cell>
            <Cell area="appointmentRequired">
              <SelectField
                fullWidth
                name="creatorRequired"
                hintText={<FormattedMessage {...messages.hintText.appointmentOriginatorRequired} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.appointmentOriginatorRequired} />}
              >
                {appointmentParticipantRequired && appointmentParticipantRequired.map((entry) =>
                  (<MenuItem
                    key={uniqueId()}
                    value={entry.code}
                    primaryText={entry.display}
                  />),
                )}
              </SelectField>
            </Cell>
            <Cell area="addParticipant">
              <AddAppointmentParticipant participants={valuedParticipants} formErrors={errors} />
            </Cell>
            <Cell area="date">
              <DatePicker
                fullWidth
                name="date"
                minDate={today}
                mode="landscape"
                hintText={<FormattedMessage {...messages.hintText.date} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.date} />}
              />
            </Cell>
            <Cell area="startTime">
              <TextField
                fullWidth
                type="time"
                name="startTime"
                onBlur={this.onStartTimeChange}
                // hintText={<FormattedMessage {...messages.hintText.startTime} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startTime} />}
              />
            </Cell>
            <Cell area="endTime">
              <TextField
                fullWidth
                type="time"
                name="endTime"
                onBlur={this.onEndTimeChange}
                // hintText={<FormattedMessage {...messages.hintText.endTime} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endTime} />}
              />
              {this.state.isEndDateBeforeStartDate ?
                <ErrorText>
                  <FormattedMessage {...messages.validation.invalidDateRange} />
                </ErrorText> :
                ''
              }
            </Cell>
            <Cell area="description">
              <TextField
                fullWidth
                name="description"
                hintText={<FormattedMessage {...messages.hintText.description} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.description} />}
              />
            </Cell>
            {editMode &&
            <Cell area="appointmentStatus">
              <SelectField
                fullWidth
                name="appointmentStatus"
                hintText={<FormattedMessage {...messages.hintText.status} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
              >
                {appointmentStatuses && appointmentStatuses.map((appointmentStatus) =>
                  (<MenuItem
                    key={uniqueId()}
                    value={appointmentStatus.code}
                    primaryText={appointmentStatus.display}
                  />),
                )}
              </SelectField>
            </Cell>
            }
            <Cell area="buttonGroup">
              <Grid columns={2}>
                <Cell>
                  <StyledRaisedButton
                    fullWidth
                    type="submit"
                    disabled={!dirty || isSubmitting || !isValid || this.state.isEndDateBeforeStartDate}
                  >
                    Save
                  </StyledRaisedButton>
                </Cell>
                <Cell>
                  <GoBackButton disabled={isSubmitting} />
                </Cell>
              </Grid>
            </Cell>
          </ManageAppointmentFormGrid>
        </Form>
      </div>
    );
  }
}

ManageAppointmentForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  appointmentTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  appointmentStatuses: PropTypes.array,
  appointment: PropTypes.object,
  appointmentParticipantRequired: PropTypes.array,
};

export default ManageAppointmentForm;
