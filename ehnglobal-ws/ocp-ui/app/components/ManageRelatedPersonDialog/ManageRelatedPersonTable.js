/**
 *
 * ManageRelatedPersonTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog, { DialogActions, DialogTitle } from 'material-ui-next/Dialog';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import RecordsRange from 'components/RecordsRange';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import AddRelatedPersonTableRow from './AddRelatedPersonTableRow';
import messages from './messages';

const tableColumns = '0.4fr repeat(3, 1fr) .3fr';

class ManageRelatedPersonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertDialogOpen: false,
      relatedPerson: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleRemoveRelatedPerson = this.handleRemoveRelatedPerson.bind(this);
  }

  handleOpenDialog(relatedPerson) {
    this.setState({
      alertDialogOpen: true,
      relatedPerson,
    });
  }

  handleCloseDialog() {
    this.setState({ alertDialogOpen: false });
  }

  handleRemoveRelatedPerson() {
    this.props.onRemoveRelatedPerson(this.state.relatedPerson);
  }

  render() {
    const { onAddRelatedPerson, participantRoles, relatedPersonsData } = this.props;
    return (
      <div>
        <LinearProgressIndicator loading={relatedPersonsData.loading} />

        {!relatedPersonsData.loading && relatedPersonsData.data && relatedPersonsData.data.length === 0 &&
        <CenterAlign>
          <NoResultsFoundText><FormattedMessage {...messages.noRelatedPersonFoundText} /></NoResultsFoundText>
        </CenterAlign>
        }
        {!relatedPersonsData.loading && relatedPersonsData.data && relatedPersonsData.data.length > 0 &&
        <div>
          <Table>
            <TableHeader columns={tableColumns}>
              <TableHeaderColumn><FormattedMessage {...messages.manageRelatedPersonTableHeaderName} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.manageRelatedPersonTableHeaderStartDate} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.manageRelatedPersonTableHeaderEndDate} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.manageRelatedPersonTableHeaderRole} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.manageRelatedPersonTableHeaderAction} /></TableHeaderColumn>
            </TableHeader>
            {!isEmpty(relatedPersonsData.data) && relatedPersonsData.data.map((relatedPerson) => {
              const { isInCareTeam, memberFirstName, memberLastName, roleDisplay, startDate, endDate } = relatedPerson;
              return (
                isInCareTeam ?
                  <TableRow key={uniqueId()} columns={tableColumns}>
                    <TableRowColumn>{memberFirstName} {memberLastName}</TableRowColumn>
                    <TableRowColumn>{startDate}</TableRowColumn>
                    <TableRowColumn>{endDate}</TableRowColumn>
                    <TableRowColumn>{roleDisplay}</TableRowColumn>
                    <TableRowColumn>
                      <StyledRaisedButton
                        onClick={() => this.handleOpenDialog(relatedPerson)}
                        disabled={relatedPersonsData.submitting}
                      >
                        <FormattedMessage {...messages.removeButton} />
                      </StyledRaisedButton>
                    </TableRowColumn>
                  </TableRow> :
                  <AddRelatedPersonTableRow
                    key={uniqueId()}
                    columns={tableColumns}
                    relatedPerson={relatedPerson}
                    participantRoles={participantRoles}
                    onAddRelatedPerson={onAddRelatedPerson}
                  />
              );
            })}
          </Table>
          <CenterAlignedUltimatePagination
            currentPage={relatedPersonsData.currentPage}
            totalPages={relatedPersonsData.totalNumberOfPages}
            onChange={relatedPersonsData.handleChangePage}
          />
          <RecordsRange
            currentPage={relatedPersonsData.currentPage}
            totalPages={relatedPersonsData.totalNumberOfPages}
            totalElements={relatedPersonsData.totalElements}
            currentPageSize={relatedPersonsData.currentPageSize}
          />
        </div>
        }
        <Dialog open={this.state.alertDialogOpen} onClose={this.handleCloseDialog}>
          <DialogTitle><FormattedMessage {...messages.alertDialogTitle} /></DialogTitle>
          <DialogActions>
            <StyledRaisedButton onClick={this.handleRemoveRelatedPerson}>
              <FormattedMessage {...messages.okButton} />
            </StyledRaisedButton>
            <StyledFlatButton onClick={this.handleCloseDialog}>
              <FormattedMessage {...messages.cancelButton} />
            </StyledFlatButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ManageRelatedPersonTable.propTypes = {
  onAddRelatedPerson: PropTypes.func.isRequired,
  onRemoveRelatedPerson: PropTypes.func.isRequired,
  participantRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })).isRequired,
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

export default ManageRelatedPersonTable;

