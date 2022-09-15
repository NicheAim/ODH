/**
 *
 * UpcomingTaskTable
 *
 */

import ActionEvent from '@material-ui/icons/Event';
import ContentFlag from '@material-ui/icons/Flag';
import NotificationPriorityHigh from '@material-ui/icons/PriorityHigh';
import ExpansionTableRow from 'components/ExpansionTableRow';
import NavigationIconMenu from 'components/NavigationIconMenu';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Util from 'utils/Util';
import { DUE_TODAY, OVER_DUE, UPCOMING } from '../TaskTable/constants';
import messages from './messages';
import UpcomingTasksExpansionRowDetails from './UpcomingTasksExpansionRowDetails';
import { PATIENTS_URL } from 'containers/App/constants';

const tableColumns = '50px repeat(7, 1fr) 10px';

// Todo: Fix ViewDetail(onPatientViewDetailsClick) that is already not working. Needs patient Object to be sent, not just patient id.

function UpcomingTaskTable({ elements, onPatientViewDetailsClick, relativeTop }) {
  function getTaskDueWithIcon(statusStr) {
    let statusElement = null;
    if (statusStr === UPCOMING) {
      statusElement = (<div><ContentFlag color="#009688" /><FormattedMessage {...messages.todoStatusUpcoming} /></div>);
    } else if (statusStr === OVER_DUE) {
      statusElement = (
        <div><NotificationPriorityHigh color="#d86344" /><FormattedMessage {...messages.todoStatusOverdue} /></div>);
    } else if (statusStr === DUE_TODAY) {
      statusElement = (<div><ActionEvent color="#f4b942" /><FormattedMessage {...messages.todoStatusDueToday} /></div>);
    }
    return statusElement;
  }

  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns} relativeTop={relativeTop}>
          <TableHeaderColumn />
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPatientName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
          <TableHeaderColumn />
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTask} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskStartDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskEndDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {!isEmpty(elements) && elements.map((upcomingTask) => {
          const { logicalId, definition, description, executionPeriod, beneficiary, taskDue } = upcomingTask;
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.viewDetails} />,
            disabled: false,
            linkTo: {
              pathname: `${PATIENTS_URL}/${getPatientIdFromTask(beneficiary)}`,
            },
          }];
          return (
            <ExpansionTableRow
              columns={tableColumns}
              key={logicalId}
              expansionTableRowDetails={<UpcomingTasksExpansionRowDetails task={upcomingTask} />}
            >
              <TableRowColumn>{beneficiary.display}</TableRowColumn>
              <TableRowColumn>{definition.display}</TableRowColumn>
              <TableRowColumn>{getTaskDueWithIcon(taskDue)}</TableRowColumn>
              <TableRowColumn>{description}</TableRowColumn>
              <TableRowColumn>{executionPeriod.start}</TableRowColumn>
              <TableRowColumn>{executionPeriod.end}</TableRowColumn>
              <TableRowColumn>
                <NavigationIconMenu menuItems={menuItems} />
              </TableRowColumn>
            </ExpansionTableRow>
          );
        })}
      </Table>
    </div>
  );
}

UpcomingTaskTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  elements: PropTypes.arrayOf(PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    beneficiary: PropTypes.object.isRequired,
    definition: PropTypes.object,
    description: PropTypes.string,
    executionPeriod: PropTypes.object,
  })),
  onPatientViewDetailsClick: PropTypes.func.isRequired,
};

export default UpcomingTaskTable;

function getPatientIdFromTask(beneficiary) {
  const patientPattern = 'Patient/';
  let patientId = null;
  if (!isUndefined(beneficiary.reference)) {
    patientId = Util.extractTrimmedStringByCharacters(beneficiary.reference, patientPattern);
  }
  return patientId.toLowerCase();
}
