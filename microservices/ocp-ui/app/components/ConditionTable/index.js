/**
 *
 * ConditionTable
 *
 */

import React from 'react';
import isUndefined from 'lodash/isUndefined';
import has from 'lodash/has';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import moment from 'moment';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import { MANAGE_CONDITION_URL } from 'containers/App/constants';
import messages from './messages';
import { CONDITION_TABLE_COLUMNS } from './constants';
import { getConditionText } from './utils';

const getConditionName = (condition) => {
  try {
    if (has(condition, 'code')) {
      if (has(condition.code, 'coding')) {
        if (condition.code.coding.length > 0) {
          return getConditionText(condition.code.coding[0]);
        }
      }
    }
  } catch (error) {
    return '';
  }
  return '';
};

const getDiagnosisPriority = (condition) => {
  try {
    if (has(condition, 'category')) {
      if (condition.category.length > 0) {
        if (has(condition.category[0], 'text')) {
          if (condition.category[0].text) {
            return condition.category[0].text;
          }
        }
      }
    }
  } catch (error) {
    return '';
  }
  return '';
};

const getRecordedDate = (condition) => {
  try {
    console.log(condition.recordedDate);
    if (isUndefined(condition.recordedDate) || condition.recordedDate == null) {
      return '';
    }
    return moment(condition.recordedDate, 'DD/MM/YYYY').format('YYYY/MM/DD');
  } catch (error) {
    return '';
  }
};

function ConditionTable({ relativeTop, conditions, patientId }) {
  return (
    <Table>
      <TableHeader columns={CONDITION_TABLE_COLUMNS} relativeTop={relativeTop}>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderName} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderDiagnosisPriority} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderRecordedDate} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderAction} />
        </TableHeaderColumn>
      </TableHeader>
      {conditions &&
        conditions.map((condition) => {
          const menuItems = [
            {
              primaryText: <FormattedMessage {...messages.edit} />,
              linkTo: {
                pathname: `${MANAGE_CONDITION_URL}/${condition.conditionid}`,
                search: `?patientId=${patientId}`,
              },
            },
          ];
          return (
            <TableRow key={uniqueId()} columns={CONDITION_TABLE_COLUMNS}>
              <TableRowColumn>{getConditionName(condition)}</TableRowColumn>
              <TableRowColumn>{getDiagnosisPriority(condition)}</TableRowColumn>
              <TableRowColumn>{getRecordedDate(condition)}</TableRowColumn>
              <TableRowColumn>
                <NavigationIconMenu menuItems={menuItems} />
              </TableRowColumn>
            </TableRow>
          );
        })}
    </Table>
  );
}

ConditionTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  conditions: PropTypes.array.isRequired,
  patientId: PropTypes.string.isRequired,
};

export default ConditionTable;
