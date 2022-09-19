import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import upperFirst from 'lodash/upperFirst';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import CustomErrorText from 'components/CustomErrorText';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';


function AddedParticipantsTable(props) {
  const tableColumns = 'repeat(5, 1fr) 110px';
  const {
    participants,
    errors,
    arrayHelpers,
  } = props;

  return (
    <Table margin="10px 0">
      <TableHeader columns={tableColumns}>
        <TableHeaderColumn><FormattedMessage {...messages.addedParticipantsTable.tableHeaderName} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedParticipantsTable.tableHeaderType} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedParticipantsTable.tableHeaderParticipationType} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedParticipantsTable.tableHeaderAttendance} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedParticipantsTable.tableHeaderStatus} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedParticipantsTable.tableHeaderAction} /></TableHeaderColumn>
      </TableHeader>
      {errors && errors.participants &&
      <CustomErrorText>{errors.participants}</CustomErrorText>
      }
      {participants && participants.map((participant, index) => {
        const { display, reference, participationTypeDisplay, participantRequiredDisplay, participantStatusDisplay } = participant;
        return (
          <TableRow key={uniqueId()} columns={tableColumns}>
            <TableRowColumn>{display}</TableRowColumn>
            <TableRowColumn>{reference && reference.split('/')[0]}</TableRowColumn>
            <TableRowColumn>{upperFirst(participationTypeDisplay)}</TableRowColumn>
            <TableRowColumn>{participantRequiredDisplay}</TableRowColumn>
            <TableRowColumn>{participantStatusDisplay}</TableRowColumn>
            <TableRowColumn>
              <StyledRaisedButton onClick={() => arrayHelpers.remove(index)}>
                <FormattedMessage {...messages.addedParticipantsTable.removeParticipantBtn} />
              </StyledRaisedButton>
            </TableRowColumn>
          </TableRow>
        );
      })}
    </Table>
  );
}

AddedParticipantsTable.propTypes = {
  errors: PropTypes.object,
  arrayHelpers: PropTypes.object.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string,
    participantRequiredCode: PropTypes.string,
    participantStatusCode: PropTypes.string,
    participationTypeCode: PropTypes.string,
    reference: PropTypes.string,
  })),
};

export default AddedParticipantsTable;
