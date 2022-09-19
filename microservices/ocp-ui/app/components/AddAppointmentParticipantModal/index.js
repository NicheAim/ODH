/**
 *
 * AddAppointmentParticipantModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next';

import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledDialog from 'components/StyledDialog';
import AddParticipantForm from './AddParticipantForm';
import AddedParticipantsTable from './AddedParticipantsTable';
import messages from './messages';


class AddAppointmentParticipantModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ dialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({ dialogOpen: false });
  }

  render() {
    const {
      errors, participants, healthcareServices, locations, participantAttendance, practitioners,
      participantReferences, onInitializeParticipantReferences, onGetAvailableLocations,
      onGetAvailableHealthcareServices, onGetAvailablePractitioners, onSearchParticipantReferences,
    } = this.props;
    return (
      <div>
        <StyledRaisedButton onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.addParticipantBtn} />
        </StyledRaisedButton>
        <FieldArray
          name="participants"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog maxWidth="md" fullWidth open={this.state.dialogOpen}>
                <DialogTitle>
                  <FormattedMessage {...messages.dialogTitle} />
                </DialogTitle>
                <DialogContent>
                  <AddParticipantForm
                    arrayHelpers={arrayHelpers}
                    onCloseDialog={this.handleCloseDialog}
                    locations={locations}
                    healthcareServices={healthcareServices}
                    practitioners={practitioners}
                    participantReferences={participantReferences}
                    participantAttendance={participantAttendance}
                    onInitializeParticipantReferences={onInitializeParticipantReferences}
                    onGetAvailableLocations={onGetAvailableLocations}
                    onGetAvailableHealthcareServices={onGetAvailableHealthcareServices}
                    onGetAvailablePractitioners={onGetAvailablePractitioners}
                    onSearchParticipantReferences={onSearchParticipantReferences}
                  />
                </DialogContent>
              </StyledDialog>
              <AddedParticipantsTable
                arrayHelpers={arrayHelpers}
                participants={participants}
                errors={errors}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

AddAppointmentParticipantModal.propTypes = {
  errors: PropTypes.object,
  participants: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string,
    participantRequiredCode: PropTypes.string,
    participantStatusCode: PropTypes.string,
    participationTypeCode: PropTypes.string,
    reference: PropTypes.string,
  })),
  healthcareServices: PropTypes.array,
  locations: PropTypes.array,
  practitioners: PropTypes.array,
  participantReferences: PropTypes.shape({
    loading: PropTypes.bool,
    outsideParticipants: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }),
  participantAttendance: PropTypes.array.isRequired,
  onInitializeParticipantReferences: PropTypes.func.isRequired,
  onGetAvailableLocations: PropTypes.func.isRequired,
  onGetAvailableHealthcareServices: PropTypes.func.isRequired,
  onGetAvailablePractitioners: PropTypes.func.isRequired,
  onSearchParticipantReferences: PropTypes.func.isRequired,
};

export default AddAppointmentParticipantModal;
