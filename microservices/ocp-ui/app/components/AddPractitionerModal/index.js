/**
 *
 * AddPractitionerModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import Close from '@material-ui/icons/Close';
import { Cell, Grid } from 'styled-css-grid';

import StyledDialog from 'components/StyledDialog';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import CreatePractitionerForm from './CreatePractitionerForm';
import PractitionerLookupResult from './PractitionerLookupResult';
import messages from './messages';


class AddPractitionerModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { modalOpen, onModalClose, isOrgAdmin, identifierSystems, practitionerLookup, onCheckExisting } = this.props;
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
            <CreatePractitionerForm identifierSystems={identifierSystems} onCheckExisting={onCheckExisting} />
            <PractitionerLookupResult practitionerLookup={practitionerLookup} isOrgAdmin={isOrgAdmin} />
          </DialogContent>
        </StyledDialog>
      </div>
    );
  }
}

AddPractitionerModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onCheckExisting: PropTypes.func.isRequired,
  identifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  isOrgAdmin: PropTypes.bool.isRequired,
  practitionerLookup: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    exists: PropTypes.bool.isRequired,
    practitioner: PropTypes.object,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }).isRequired,
};

export default AddPractitionerModal;
