/**
 *
 * PurposeOfUse
 *
 */

import React from 'react';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import CustomErrorText from 'components/CustomErrorText';
import StyledDialog from 'components/StyledDialog';
import StyledRaisedButton from 'components/StyledRaisedButton';
import AddPurposeOfUse from './AddPurposeOfUse';
import AddedPurposeOfUse from './AddedPurposeOfUse';
import messages from './messages';


class PurposeOfUse extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isPurposeOfUsesDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isPurposeOfUsesDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({ isPurposeOfUsesDialogOpen: false });
  }

  render() {
    const { errors, purposeOfUse, purpose, isGeneralDesignation } = this.props;
    const addPurposeOfUsesProps = { purposeOfUse, purpose };
    return (
      <div>
        <div><FormattedMessage {...messages.purposeOfUseTitle} /></div>
        <FormattedHTMLMessage {...messages.purposeOfUseSubTitle} />
        <StyledRaisedButton
          onClick={this.handleOpenDialog}
          disabled={isGeneralDesignation}
        >
          <FormattedMessage {...messages.addPurposeOfUseButton} />
        </StyledRaisedButton>
        <FieldArray
          name="purpose"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog open={this.state.isPurposeOfUsesDialogOpen} onClose={this.handleCloseDialog} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.dialogPurposeOfUseTitle} />
                </DialogTitle>
                <DialogContent>
                  <AddPurposeOfUse
                    {...addPurposeOfUsesProps}
                    arrayHelpers={arrayHelpers}
                    onCloseDialog={this.handleCloseDialog}
                  />
                </DialogContent>
              </StyledDialog>
            </div>
          )}
        />
        <AddedPurposeOfUse purpose={purpose} />
        {errors && errors.purpose &&
        <CustomErrorText>{errors.purpose}</CustomErrorText>
        }
      </div>
    );
  }
}

PurposeOfUse.propTypes = {
  errors: PropTypes.shape({
    purpose: PropTypes.any,
  }),
  purposeOfUse: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string.isRequired,
  })).isRequired,
  purpose: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  isGeneralDesignation: PropTypes.bool.isRequired,
};

export default PurposeOfUse;
