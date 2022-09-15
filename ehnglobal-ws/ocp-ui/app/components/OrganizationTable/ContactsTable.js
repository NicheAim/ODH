import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import StyledText from 'components/StyledText';
import { flattenContact } from './helpers';
import messages from './messages';


function ContactsTable(props) {
  const tableColumns = 'repeat(4, 1fr)';
  const { contacts } = props;

  return (
    <Table margin="0px">
      <TableHeader columns={tableColumns}>
        <TableHeaderColumn><FormattedMessage {...messages.contactsTable.tableHeaderName} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.contactsTable.tableHeaderPurpose} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.contactsTable.tableHeaderAddress} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.contactsTable.tableHeaderTelecoms} /></TableHeaderColumn>
      </TableHeader>
      {contacts && contacts.map((contact) => {
        const flattenedContact = flattenContact(contact);
        const { name, telecoms, address } = flattenedContact;
        return (
          <TableRow key={uniqueId()} columns={tableColumns}>
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{contact.purposeDisplay}</TableRowColumn>
            <TableRowColumn>
              <StyledText>{address}</StyledText>
            </TableRowColumn>
            <TableRowColumn>
              <StyledText>{telecoms}</StyledText>
            </TableRowColumn>
          </TableRow>
        );
      })}
    </Table>
  );
}

ContactsTable.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.object,
    purposeDisplay: PropTypes.string,
    telecoms: PropTypes.array,
    address: PropTypes.object,
  })),
};

export default ContactsTable;
