/**
 *
 * ManageRelatedPersonDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DialogActions, DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import StyledDialog from 'components/StyledDialog';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledText from 'components/StyledText';
import SearchRelatedPersonsField from './SearchRelatedPersonsField';
import ManageRelatedPersonTable from './ManageRelatedPersonTable';
import messages from './messages';

function ManageRelatedPersonDialog(props) {
  const { dialogOpen, onDialogClose, onAddRelatedPerson, onRemoveRelatedPerson, onRelatedPersonsSearch, careTeamName, participantRoles, relatedPersonsData } = props;
  return (
    <div>
      <StyledDialog open={dialogOpen} fullScreen>
        <DialogTitle>
          <FormattedMessage {...messages.manageRelatedPersonDialogTitle} />
        </DialogTitle>
        <DialogContent>
          <StyledText fontWeight={700}>CareTeam Name:
            <StyledText whiteSpace>{careTeamName}</StyledText>
          </StyledText>
          <SearchRelatedPersonsField onSearch={onRelatedPersonsSearch} />
          <ManageRelatedPersonTable
            relatedPersonsData={relatedPersonsData}
            participantRoles={participantRoles}
            onAddRelatedPerson={onAddRelatedPerson}
            onRemoveRelatedPerson={onRemoveRelatedPerson}
          />
        </DialogContent>
        <DialogActions>
          <StyledFlatButton onClick={onDialogClose}>
            <FormattedMessage {...messages.cancelButton} />
          </StyledFlatButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}

ManageRelatedPersonDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  onAddRelatedPerson: PropTypes.func.isRequired,
  onRelatedPersonsSearch: PropTypes.func.isRequired,
  onRemoveRelatedPerson: PropTypes.func.isRequired,
  participantRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })).isRequired,
  careTeamName: PropTypes.string.isRequired,
  relatedPersonsData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      isInCareTeam: PropTypes.bool.isRequired,
      memberId: PropTypes.string,
      memberFirstName: PropTypes.string,
      memberLastName: PropTypes.string,
      memberName: PropTypes.string,
      memberType: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      onBehalfOfId: PropTypes.string,
      onBehalfOfName: PropTypes.string,
      roleCode: PropTypes.string,
      roleDisplay: PropTypes.string,
    })).isRequired,
  }).isRequired,
};

export default ManageRelatedPersonDialog;

