/**
 *
 * TaskTable
 *
 */

import { AddCircle } from '@material-ui/icons';
import ActionEvent from '@material-ui/icons/Event';
import ContentFlag from '@material-ui/icons/Flag';
import NotificationPriorityHigh from '@material-ui/icons/PriorityHigh';
import ExpansionTableRow from 'components/ExpansionTableRow';
import NavigationIconMenu from 'components/NavigationIconMenu';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import {
  DUE_TODAY,
  EXPANDED_TABLE_COLUMNS,
  OVER_DUE,
  STATUS_CODE_CANCELLED,
  SUMMARIZED_TABLE_COLUMNS,
  UPCOMING,
} from 'components/TaskTable/constants';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import DownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-drop-up';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { ASC } from 'utils/constants';
import Util from 'utils/Util';
import {
  getTodayWithoutHours,
  parseStringToDate,
} from '../../utils/dateFormats';
import AddNewItemSpan from '../PanelToolbar/AddNewItemSpan';
import StyledIconButton from '../StyledIconButton';
import messages from './messages';
import TaskExpansionRowDetails from './TaskExpansionRowDetails';

const StyledTableRowColumn = styled(({ ...props }) => (
  <TableRowColumn {...props} />
))`
  color: ${(props) => props.color && props.color};
  background-color: ${(props) =>
    props.backgroundColor && props.backgroundColor};
`;

StyledTableRowColumn.propTypes = {};

function TaskTable({
  onTaskClick,
  elements,
  cancelTask,
  patientId,
  communicationBaseUrl,
  taskBaseUrl,
  relativeTop,
  isExpanded,
  isPatient,
  onSpecialClick,
  handleSort,
  columnToSort,
  sortDirection,
}) {
  function getSortIcon() {
    return Util.equalsIgnoreCase(sortDirection, ASC) ? (
      <UpArrow />
    ) : (
      <DownArrow />
    );
  }

  function getTaskDueWithIcon(statusStr) {
    let statusElement = null;
    if (statusStr === UPCOMING) {
      statusElement = (
        <div>
          <ContentFlag color="#009688" />
          <FormattedMessage {...messages.todoStatusUpcoming} />
        </div>
      );
    } else if (statusStr === OVER_DUE) {
      statusElement = (
        <div>
          <NotificationPriorityHigh color="#d86344" />
          <FormattedMessage {...messages.todoStatusOverdue} />
        </div>
      );
    } else if (statusStr === DUE_TODAY) {
      statusElement = (
        <div>
          <ActionEvent color="#f4b942" />
          <FormattedMessage {...messages.todoStatusDueToday} />
        </div>
      );
    }
    return statusElement;
  }

  function createTableHeaders() {
    const columns = isExpanded
      ? EXPANDED_TABLE_COLUMNS
      : SUMMARIZED_TABLE_COLUMNS;

    const sortingEnabledColumnHeaders = {
      activityType: 'definition.display',
      owner: 'owner.display',
      executionPeriodEnd: 'executionPeriod.end',
    };
    return (
      <TableHeader columns={columns} relativeTop={relativeTop}>
        <TableHeaderColumn />
        <TableHeaderColumn
          onClick={() => handleSort(sortingEnabledColumnHeaders.activityType)}
        >
          <FormattedMessage {...messages.columnHeaderActivityType} />
          {columnToSort === sortingEnabledColumnHeaders.activityType
            ? getSortIcon()
            : null}
        </TableHeaderColumn>
        <TableHeaderColumn>
          {' '}
          <FormattedMessage {...messages.columnHeaderDescription} />
        </TableHeaderColumn>
        <TableHeaderColumn />
        <TableHeaderColumn
          onClick={() => handleSort(sortingEnabledColumnHeaders.owner)}
        >
          {' '}
          <FormattedMessage {...messages.columnHeaderTaskOwner} />
          {columnToSort === sortingEnabledColumnHeaders.owner
            ? getSortIcon()
            : null}
        </TableHeaderColumn>
        {isExpanded && (
          <TableHeaderColumn>
            {' '}
            <FormattedMessage {...messages.columnHeaderCreatedOn} />
          </TableHeaderColumn>
        )}
        {!isExpanded ? (
          <TableHeaderColumn
            onClick={() =>
              handleSort(sortingEnabledColumnHeaders.executionPeriodEnd)
            }
          >
            <FormattedMessage {...messages.columnHeaderTaskEndDate} />
            {columnToSort === sortingEnabledColumnHeaders.executionPeriodEnd
              ? getSortIcon()
              : null}
          </TableHeaderColumn>
        ) : (
          <TableHeaderColumn>
            <FormattedMessage {...messages.columnHeaderTaskPeriod} />
          </TableHeaderColumn>
        )}
        {isExpanded && (
          <TableHeaderColumn>
            <FormattedMessage {...messages.columnHeaderLastModified} />
          </TableHeaderColumn>
        )}
        {isExpanded && (
          <TableHeaderColumn>
            <FormattedMessage {...messages.subTasks} />
          </TableHeaderColumn>
        )}
        {isExpanded && (
          <TableHeaderColumn>
            <FormattedMessage {...messages.columnHeaderStatus} />
          </TableHeaderColumn>
        )}
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderAction} />
        </TableHeaderColumn>
      </TableHeader>
    );
  }

  function getNatWebTaskDetailsBtnRender(task) {
    const splits = task.description.split('nat_task_url: ');
    const splits2 = splits[1].split('\n');
    const taskDetailUrl = splits2[0];

    return (
      <AddNewItemSpan
        onClick={() => {
          console.log('getNatWebTaskDetailsBtnRender(url) {', taskDetailUrl);
          window.open(taskDetailUrl);
        }}
      >
        <StyledIconButton size="x-small" svgIconSize="small" disableIconHover>
          <AddCircle color={'#3275c1'} />
        </StyledIconButton>
        {'NAT Request'}
      </AddNewItemSpan>
    );
  }

  const highlightColors = {
    red: {
      backgroundColor: 'rgba(154, 0, 0, 0.25)',
      color: '#000000',
    },
    yellow: {
      backgroundColor: 'rgba(241, 194, 50, 0.25)',
      color: '#000000',
    },
    green: {
      backgroundColor: 'rgba(56, 118, 29, 0.25)',
      color: '#000000',
    },
  };

  function getHighlightColor(executionPeriodEnd) {
    const nowWithoutHour = getTodayWithoutHours();
    const _ePeriodEnd = parseStringToDate(executionPeriodEnd);
    const currentDate = nowWithoutHour.getTime();
    const ePeriodEnd = _ePeriodEnd.getTime();
    const timeDifference = ePeriodEnd - currentDate;
    const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
    const daysDifference = timeDifference / oneDayInMilliseconds;
    const dayRounded = Math.round(daysDifference);

    if (dayRounded > 0) {
      return highlightColors.green;
    } else if (dayRounded === 0) {
      return highlightColors.yellow;
    } else if (dayRounded < 0) {
      return highlightColors.red;
    }

    return highlightColors.red;
  }

  function createTableRows(task, isPatientRole) {
    const columns = isExpanded
      ? EXPANDED_TABLE_COLUMNS
      : SUMMARIZED_TABLE_COLUMNS;
    const {
      logicalId,
      definition,
      status,
      description,
      authoredOn,
      executionPeriod,
      owner,
      lastModified,
      remainingSubtasks,
      totalSubtasks,
      taskDue,
    } = task;
    const menuItems = isPatientRole
      ? []
      : [
          {
            primaryText: <FormattedMessage {...messages.editTask} />,
            linkTo: {
              pathname: `${taskBaseUrl}/${logicalId}`,
              search: `?patientId=${patientId}&isMainTask=true`,
            },
          },
          {
            primaryText: <FormattedMessage {...messages.addSubTask} />,
            linkTo: {
              pathname: `${taskBaseUrl}`,
              search: `?patientId=${patientId}&isMainTask=false&mainTaskId=${logicalId}`,
            },
          },
          {
            primaryText: <FormattedMessage {...messages.addCommunication} />,
            linkTo: {
              pathname: `${communicationBaseUrl}`,
              search: `?patientId=${patientId}&taskId=${logicalId}`,
            },
          },
          {
            primaryText: <FormattedMessage {...messages.cancelTask} />,
            disabled: status.code === STATUS_CODE_CANCELLED,
            onClick: () => cancelTask(logicalId),
          },
        ];

    const displayNatWebTaskDetailsBtn =
      task.definition &&
      task.definition.display &&
      task.description.includes('nat_task_url:')
        ? task.definition.display === 'nat-request'
        : false;

    const calculatedHighlightColor =
      executionPeriod &&
      executionPeriod.end &&
      getHighlightColor(executionPeriod.end);

    const backgroundColorTableRowColumn =
      calculatedHighlightColor && calculatedHighlightColor.backgroundColor
        ? calculatedHighlightColor.backgroundColor
        : highlightColors.red.backgroundColor;

    const colorTableRowColumn =
      calculatedHighlightColor && calculatedHighlightColor.color
        ? calculatedHighlightColor.color
        : highlightColors.red.color;

    return (
      <ExpansionTableRow
        key={uniqueId()}
        columns={columns}
        expansionTableRowDetails={<TaskExpansionRowDetails task={task} />}
      >
        <StyledTableRowColumn
          onClick={() => {
            onTaskClick(task);
          }}
        >
          {description}
        </StyledTableRowColumn>
        <StyledTableRowColumn
          backgroundColor={backgroundColorTableRowColumn}
          color={colorTableRowColumn}
        >
          {getTaskDueWithIcon(taskDue)}
        </StyledTableRowColumn>
        <StyledTableRowColumn
          onClick={() => {
            onTaskClick(task);
          }}
        >
          {owner && owner.display}{' '}
        </StyledTableRowColumn>
        {isExpanded && (
          <StyledTableRowColumn
            onClick={() => {
              onTaskClick(task);
            }}
          >
            {authoredOn}
          </StyledTableRowColumn>
        )}
        {!isExpanded ? (
          <StyledTableRowColumn
            onClick={() => {
              onTaskClick(task);
            }}
          >
            {executionPeriod && executionPeriod.end}{' '}
          </StyledTableRowColumn>
        ) : (
          <StyledTableRowColumn
            onClick={() => {
              onTaskClick(task);
            }}
          >
            {executionPeriod && executionPeriod.start}-{' '}
            {executionPeriod && executionPeriod.end}{' '}
          </StyledTableRowColumn>
        )}
        {isExpanded && (
          <StyledTableRowColumn
            onClick={() => {
              onTaskClick(task);
            }}
          >
            {lastModified}{' '}
          </StyledTableRowColumn>
        )}
        {isExpanded && (
          <StyledTableRowColumn
            onClick={() => {
              onTaskClick(task);
            }}
          >
            {remainingSubtasks}/{totalSubtasks} tasks remaining
          </StyledTableRowColumn>
        )}
        {isExpanded && (
          <StyledTableRowColumn
            onClick={() => {
              onTaskClick(task);
            }}
          >
            {status && status.display}
          </StyledTableRowColumn>
        )}
        <StyledTableRowColumn>
          <NavigationIconMenu menuItems={menuItems} />
        </StyledTableRowColumn>
      </ExpansionTableRow>
    );
  }

  return (
    <Table>
      {createTableHeaders()}
      {!isEmpty(elements) &&
        elements.map((element) => createTableRows(element, isPatient))}
    </Table>
  );
}

TaskTable.propTypes = {
  isExpanded: PropTypes.bool,
  relativeTop: PropTypes.number.isRequired,
  cancelTask: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func,
  onSpecialClick: PropTypes.func,
  patientId: PropTypes.string.isRequired,
  communicationBaseUrl: PropTypes.string.isRequired,
  taskBaseUrl: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      definition: PropTypes.shape({
        reference: PropTypes.string,
        display: PropTypes.string,
      }),
      status: PropTypes.shape({
        code: PropTypes.string,
        display: PropTypes.string,
      }),
      priority: PropTypes.shape({
        code: PropTypes.string,
        display: PropTypes.string,
      }),
      authoredOn: PropTypes.string,
      executionPeriod: PropTypes.shape({
        start: PropTypes.string,
        end: PropTypes.string,
      }),
      agent: PropTypes.shape({
        reference: PropTypes.string,
        display: PropTypes.string,
      }),
      owner: PropTypes.shape({
        reference: PropTypes.string,
        display: PropTypes.string,
      }),
      totalSubtasks: PropTypes.number.isRequired,
      remainingSubtasks: PropTypes.number.isRequired,
    })
  ),
  isPatient: PropTypes.bool,
  handleSort: PropTypes.func,
  columnToSort: PropTypes.string,
  sortDirection: PropTypes.string,
};

export default TaskTable;
