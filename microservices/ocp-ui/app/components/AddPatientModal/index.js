/**
*
* AddPatientModal
*
*/

import React from 'react';

import PropTypes from 'prop-types';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import Close from '@material-ui/icons/Close';
import { Cell, Grid } from 'styled-css-grid';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import StyledDialog from 'components/StyledDialog';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import CreatePatientForm from './CreatePatientForm';
import PatientLookupResult from './PatientLookupResult';

import messages from './messages';

class AddPatientModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { modalOpen, onModalClose, isOrgAdmin, patientLookup, onCheckExisting, organization } = this.props;
    return (
      <div>
        <StyledDialog fullWidth maxWidth="md" open={modalOpen}>
          <DialogTitle>
            <Grid columns="95% 5%">
              <Cell>
                <FormattedMessage {...messages.title} />
              </Cell>
              <Cell>
                <StyledTooltip title={<FormattedMessage {...messages.closeButton} />}>
                  <StyledIconButton size="x-small" onClick={onModalClose}>
                    <Close />
                  </StyledIconButton>
                </StyledTooltip>
              </Cell>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <CreatePatientForm onCheckExisting={onCheckExisting} />
            <PatientLookupResult patientLookup={patientLookup} isOrgAdmin={isOrgAdmin} organization={organization}/>
          </DialogContent>
        </StyledDialog>
      </div>
    );
  }
}

AddPatientModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onCheckExisting: PropTypes.func.isRequired,
  isOrgAdmin: PropTypes.bool.isRequired,
  patientLookup: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    exists: PropTypes.bool.isRequired,
    patient: PropTypes.object,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }).isRequired,
  organization: PropTypes.object,
};

export default AddPatientModal;
