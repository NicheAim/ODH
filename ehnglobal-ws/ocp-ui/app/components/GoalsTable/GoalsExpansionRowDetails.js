import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function GoalsExpansionRowDetails({ goalWithTasks }) {
  const column = '3fr 3fr 3fr';

  const rowsRender = (_goalWithTasks) => Object.keys(_goalWithTasks).map((key) => {
    const { status, description, executionPeriod } = _goalWithTasks[key];
    return (
      <TableRow key={uniqueId()} columns={column}>
        <TableRowColumn>{description}</TableRowColumn>
        <TableRowColumn>{status && status.display}</TableRowColumn>
        <TableRowColumn>
          {executionPeriod && executionPeriod.end}
        </TableRowColumn>
      </TableRow>
    );
  });

  const noRecordsRender = () => (
    <TableRow>
      <TableRowColumn>
        <span>
          <FormattedMessage {...messages.expansionRowDetails.noRecords} />
        </span>
      </TableRowColumn>
    </TableRow>
    );

  return (
    <div>
      <Table>
        <TableHeader columns={column}>
          <TableHeaderColumn>
            <FormattedMessage {...messages.columnHeaderTaskTitle} />
          </TableHeaderColumn>
          <TableHeaderColumn>
            <FormattedMessage {...messages.columnHeaderStatus} />
          </TableHeaderColumn>
          <TableHeaderColumn>
            <FormattedMessage {...messages.columnHeaderDueDate} />
          </TableHeaderColumn>
        </TableHeader>

        {goalWithTasks && Object.keys(goalWithTasks).length > 0
          ? rowsRender(goalWithTasks)
          : noRecordsRender()}
      </Table>
    </div>
  );
}

GoalsExpansionRowDetails.propTypes = {
  goalWithTasks: PropTypes.shape({
    logicalId: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    executionPeriod: PropTypes.shape({
      end: PropTypes.string,
    }),
  }),
};

export default GoalsExpansionRowDetails;
