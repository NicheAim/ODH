/**
*
* ConfirmationDialog
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import StyledDialog from 'components/StyledDialog';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import { FormattedMessage } from 'react-intl';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';

function ConfirmationDialog(props) {
  const { dialogOpen, title, message, handleSubmit, handleCloseDialog } = props;
  return (
    <StyledDialog fullWidth open={dialogOpen}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {message}
        <StyledRaisedButton
          type="submit"
          onClick={handleSubmit}
        >
          <FormattedMessage {...messages.dialogButtonLabelSubmit} />
        </StyledRaisedButton>
        <StyledFlatButton onClick={handleCloseDialog}>
          <FormattedMessage {...messages.dialogButtonLabelCancel} />
        </StyledFlatButton>
      </DialogContent>
    </StyledDialog>
  );
}

ConfirmationDialog.propTypes = {
  dialogOpen: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleCloseDialog: PropTypes.func,
};

export default ConfirmationDialog;
