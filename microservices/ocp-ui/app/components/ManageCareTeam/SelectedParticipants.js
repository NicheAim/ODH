import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import StyledRaisedButton from 'components/StyledRaisedButton';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import messages from './messages';

function SelectedParticipants(props) {
  const {
    selectedParticipants,
    removeParticipant,
  } = props;

  const handleRemoveParticipant = (participant) => {
    removeParticipant(participant);
  };

  const capitalizeFirstLetter = (word) => (word ? (word.charAt(0).toUpperCase().concat(word.slice(1))) : '');

  return (
    <Table>
      <TableHeader>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderName} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderType} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderRole} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderStartDate} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderEndDate} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.participantTableHeaderAction} />}</TableHeaderColumn>
      </TableHeader>
      {selectedParticipants && selectedParticipants.length > 0 ?
        selectedParticipants.map((participant) => (
          <TableRow key={uniqueId()}>
            <TableRowColumn>{participant.name}</TableRowColumn>
            <TableRowColumn>{capitalizeFirstLetter(participant.memberType)}</TableRowColumn>
            <TableRowColumn>{participant.roleDisplay}</TableRowColumn>
            <TableRowColumn>{participant.startDate}</TableRowColumn>
            <TableRowColumn>{participant.endDate}</TableRowColumn>
            <TableRowColumn>
              <StyledRaisedButton onClick={() => handleRemoveParticipant(participant)}>
                <FormattedMessage {...messages.removeParticipantBtnLabel} />
              </StyledRaisedButton>
            </TableRowColumn>
          </TableRow>
        )) :
        <TableRow>
          <TableRowColumn>
            <span><FormattedMessage {...messages.noParticipantAdded} /></span>
          </TableRowColumn>
        </TableRow>
      }
    </Table>
  );
}

SelectedParticipants.propTypes = {
  removeParticipant: PropTypes.func.isRequired,
  selectedParticipants: PropTypes.array,
};

export default SelectedParticipants;
