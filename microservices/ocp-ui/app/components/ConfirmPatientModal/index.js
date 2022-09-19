/**
 *
 * ConfirmPatientModal
 *
 */

import Close from '@material-ui/icons/Close';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledDialog from 'components/StyledDialog';
import StyledIconButton from 'components/StyledIconButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledTooltip from 'components/StyledTooltip';
import UserAvatar from 'components/UserAvatar';
import { PATIENTS_URL, WHITE_SPACE } from 'containers/App/constants';
import upperFirst from 'lodash/upperFirst';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import { mapToPatientName, mapToPatientPhone } from 'utils/PatientUtils';
import messages from './messages';
import PatientModalCell from './PatientModalCell';

function ConfirmPatientModal(props) {
  const {
    patient,
    isPatientModalOpen,
    onPatientModalClose,
    patientWithRepeatedName,
  } = props;

  return (
    <div>
      <StyledDialog open={isPatientModalOpen} fullWidth>
        <DialogTitle>
          <HorizontalAlignment position={'end'}>
            <StyledTooltip title="Close">
              <StyledIconButton onClick={() => onPatientModalClose()}>
                <Close />
              </StyledIconButton>
            </StyledTooltip>
          </HorizontalAlignment>
        </DialogTitle>
        <DialogContent>
          <Grid columns={1} alignContent="space-between">
            <Cell center>
              <UserAvatar size={80} genderCode={patient.genderCode} />
            </Cell>
            <PatientModalCell center>
              Name{WHITE_SPACE}
              <strong>{mapToPatientName(patient)}</strong>
            </PatientModalCell>
            <PatientModalCell center>
              DOB{WHITE_SPACE}
              <strong>{patient.birthDate}</strong>
            </PatientModalCell>
            <PatientModalCell center>
              Gender{WHITE_SPACE}
              <strong>{upperFirst(patient.genderCode)}</strong>
            </PatientModalCell>
            <PatientModalCell center>
              MRN{WHITE_SPACE}
              <strong>{patient.mrn}</strong>
            </PatientModalCell>
            <PatientModalCell center>
              Phone{WHITE_SPACE}
              <strong>{mapToPatientPhone(patient)}</strong>
            </PatientModalCell>
            <Cell center>
              <StyledRaisedButton
                onClick={() =>
                  onPatientModalClose(`${PATIENTS_URL}/${patient.id}`)
                }
              >
                <FormattedMessage {...messages.continueButton} />
              </StyledRaisedButton>
            </Cell>
            {patientWithRepeatedName && (
              <Cell center>
                <FormattedMessage {...messages.patientWithRepeatedName} />
              </Cell>
            )}
          </Grid>
        </DialogContent>
      </StyledDialog>
    </div>
  );
}

ConfirmPatientModal.propTypes = {
  isPatientModalOpen: PropTypes.bool.isRequired,
  onPatientModalClose: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
    birthDate: PropTypes.string,
    genderCode: PropTypes.string,
  }).isRequired,
};

export default ConfirmPatientModal;
