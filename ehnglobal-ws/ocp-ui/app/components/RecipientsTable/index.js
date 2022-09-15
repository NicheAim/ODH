/**
*
* RecipientsTable
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import Checkbox from 'material-ui/Checkbox';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import messages from './messages';

function RecipientsTable(props) {
  const { recipients, updateCheck, selectedRecipients, getRoleName } = props;
  function createRecipientTable() {
    return (
      <Table>
        <TableHeader key={uniqueId()}>
          <TableHeaderColumn></TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderName} />}</TableHeaderColumn>
          <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderRole} />}</TableHeaderColumn>
        </TableHeader>
        {createRecipientTableRows()}
      </Table>
    );
  }

  function createRecipientTableRows() {
    return recipients.map((recipient) => (
      <TableRow key={uniqueId()}>
        <TableRowColumn>
          <Checkbox
            checked={recipient.checked}
            onCheck={(evt, checked) => {
              updateCheck(evt, checked, recipient.reference);
            }}
            disabled={recipientIsSelected(recipient.reference, selectedRecipients)}
          >
          </Checkbox>
        </TableRowColumn>
        <TableRowColumn>
          {recipient.display}
        </TableRowColumn>
        <TableRowColumn>
          {getRoleName(recipient.reference)}
        </TableRowColumn>
      </TableRow>
    ));
  }

  function createNoRecipientTable() {
    return (<Table>
      <TableHeader key={uniqueId()}>
        <TableHeaderColumn></TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderName} />}</TableHeaderColumn>
        <TableHeaderColumn>{<FormattedMessage {...messages.recipientTableHeaderRole} />}</TableHeaderColumn>
      </TableHeader>
      <TableRow key={uniqueId()}>
        <TableRowColumn> {<FormattedMessage {...messages.noRecipientRecord} />}</TableRowColumn>
        <TableRowColumn> </TableRowColumn>
        <TableRowColumn> </TableRowColumn>
      </TableRow>
    </Table>);
  }

  function recipientIsSelected(recipientReference, recipientList) {
    if (recipientReference && recipientList && recipientList.length > 0) {
      for (let i = 0; i < recipientList.length; i += 1) {
        if (recipientList[i].reference === recipientReference) {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <div>
      {recipients && recipients.length > 0 && createRecipientTable()}
      {recipients && recipients.length === 0 && createNoRecipientTable()}
    </div>
  );
}

RecipientsTable.propTypes = {
  recipients: PropTypes.array.isRequired,
  selectedRecipients: PropTypes.array.isRequired,
  updateCheck: PropTypes.func.isRequired,
  getRoleName: PropTypes.func.isRequired,
};

export default RecipientsTable;
