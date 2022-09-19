/**
 *
 * TaskTable
 *
 */
import ExpansionTableRow from 'components/ExpansionTableRow';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SUMMARIZED_TABLE_COLUMNS } from './constants';
import messages from './messages';

function AttachmentsTable({ elements, onRowClick }) {
  function createTableHeaders() {
    return (
      <TableHeader columns={SUMMARIZED_TABLE_COLUMNS} relativeTop={0}>
        <TableHeaderColumn />

        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderTitle} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderContentType} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderCreation} />
        </TableHeaderColumn>
      </TableHeader>
    );
  }

  function createTableRows(item) {
    return (
      <ExpansionTableRow
        key={item.logicalId}
        columns={SUMMARIZED_TABLE_COLUMNS}
        expansionTableRowDetails={null}
      >
        <TableRowColumn
          onClick={() => {
            onRowClick(item.logicalId);
          }}
        >
          {item.content[0].attachment.title && item.content[0].attachment.title}
        </TableRowColumn>
        <TableRowColumn
          onClick={() => {
            onRowClick(item.logicalId);
          }}
        >
          {item.content[0].attachment.contentType &&
            item.content[0].attachment.contentType}
        </TableRowColumn>
        <TableRowColumn
          onClick={() => {
            onRowClick(item.logicalId);
          }}
        >
          {item.content[0].attachment.creation &&
            item.content[0].attachment.creation}
        </TableRowColumn>
      </ExpansionTableRow>
    );
  }

  return (
    <div>
      {createTableHeaders()}
      <Table>
        {!isEmpty(elements) &&
          elements.map((element) => createTableRows(element))}
      </Table>
    </div>
  );
}

AttachmentsTable.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
    })
  ),
  onRowClick: PropTypes.func,
};

export default AttachmentsTable;
