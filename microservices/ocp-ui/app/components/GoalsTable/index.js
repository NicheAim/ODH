/**
 *
 * Table
 *
 */
import ExpansionTableRow from 'components/ExpansionTableRow';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
} from 'containers/App/constants';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { EXPANDED_TABLE_COLUMNS, SUMMARIZED_TABLE_COLUMNS } from './constants';
import GoalsExpansionRowDetails from './GoalsExpansionRowDetails';
import messages from './messages';

function GoalsTable({ elements, onRowClick, goalsWithTasks, manageGoalsUrl, isExpanded }) {
  function createTableHeaders() {
    return (
      <TableHeader columns={SUMMARIZED_TABLE_COLUMNS} relativeTop={0}>
        <TableHeaderColumn />
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderTitle} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderStatus} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderDueDate} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderAction} />
        </TableHeaderColumn>
      </TableHeader>
    );
  }

  function createTableRows(goal, isPatientRole) {
    const menuItems = (isPatientRole) ? [] : [
      {
        primaryText: <FormattedMessage {...messages.editGoal} />,
        linkTo: {
          pathname: `${manageGoalsUrl}`,
          search: `?id=${goal.logicalId}`,
        },
      },
    ];

    const columns = isExpanded
      ? EXPANDED_TABLE_COLUMNS
      : SUMMARIZED_TABLE_COLUMNS;

    return (
      <ExpansionTableRow
        key={uniqueId()}
        columns={columns}
        showOpenButton={
          (goalsWithTasks[goal.logicalId] &&
            Object.keys(goalsWithTasks[goal.logicalId]).length > 0 &&
            goalsWithTasks[goal.logicalId][
              Object.keys(goalsWithTasks[goal.logicalId])[0]
            ]) ||
          false
        }
        expansionTableRowDetails={
          <GoalsExpansionRowDetails
            goalWithTasks={goalsWithTasks[goal.logicalId]}
          />
        }
      >
        <TableRowColumn
          onClick={() => {
            onRowClick(goal.logicalId);
          }}
        >
          {goal.description && goal.description.text}
        </TableRowColumn>
        <TableRowColumn
          onClick={() => {
            onRowClick(goal.logicalId);
          }}
        >
          {goal.lifecycleStatus}
        </TableRowColumn>
        <TableRowColumn
          onClick={() => {
            onRowClick(goal.logicalId);
          }}
        >
          {goal.target &&
            goal.target[0] &&
            goal.target[0].dueDate &&
            goal.target[0].dueDate}
        </TableRowColumn>
        <TableRowColumn>
          <ShowHideWrapper
            key={uniqueId()}
            allowedRoles={[
              CARE_COORDINATOR_ROLE_CODE,
              CARE_MANAGER_ROLE_CODE,
              ORGANIZATION_ADMIN_ROLE_CODE,
            ]}
          >
            <NavigationIconMenu menuItems={menuItems} />
          </ShowHideWrapper>
        </TableRowColumn>
      </ExpansionTableRow>
    );
  }

  return (
    // ui-todo: Obtain "isPatientRole" value.
    <div>
      {createTableHeaders()}
      <Table key={uniqueId()}>
        {!isEmpty(elements) &&
          elements.map((goal) => createTableRows(goal, false))}
      </Table>
    </div>
  );
}

GoalsTable.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      description: PropTypes.shape({
        text: PropTypes.string.isRequired,
      }),
      target: PropTypes.arrayOf(
        PropTypes.shape({
          dueDate: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  onRowClick: PropTypes.func,
};

export default GoalsTable;
