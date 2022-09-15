/**
 *
 * ConsentToActors
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import isEmpty from 'lodash/isEmpty';

import CustomErrorText from 'components/CustomErrorText';
import SelectActorsButton from 'components/SelectConsentActors/SelectActorsButton';
import StyledDialog from 'components/StyledDialog';
import AddedConsentActorsTable from 'components/AddedConsentActorsTable';
import AddToActors from './AddToActors';
import messages from './messages';


class ConsentToActors extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isToActorsDialogOpen: false,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleOpenDialog() {
    this.setState({ isToActorsDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isToActorsDialogOpen: false,
    });
  }

  render() {
    const { consentToActors, addedActors, errors } = this.props;
    return (
      <div>
        <SelectActorsButton fullWidth onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.consentToActorsButton} />
        </SelectActorsButton>
        <FieldArray
          name="consentToActors"
          render={(arrayHelpers) => (
            <div>
              <StyledDialog open={this.state.isToActorsDialogOpen} fullWidth>
                <DialogTitle>
                  <FormattedMessage {...messages.consentToActorsDialogTitle} />
                </DialogTitle>
                <DialogContent>
                  <AddToActors
                    addedActors={addedActors}
                    addedToActors={consentToActors}
                    arrayHelpers={arrayHelpers}
                    onCloseDialog={this.handleCloseDialog}
                  />
                </DialogContent>
              </StyledDialog>
              {!isEmpty(consentToActors) &&
              <AddedConsentActorsTable arrayHelpers={arrayHelpers} actors={consentToActors} />
              }
            </div>
          )}
        />
        {errors && errors.consentToActors &&
        <CustomErrorText>{errors.consentToActors}</CustomErrorText>
        }
      </div>
    );
  }
}

ConsentToActors.propTypes = {
  consentToActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
  addedActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
  errors: PropTypes.shape({
    consentToActors: PropTypes.any,
  }),
};

export default ConsentToActors;
