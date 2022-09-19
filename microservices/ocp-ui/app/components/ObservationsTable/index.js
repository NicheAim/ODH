/**
 *
 * ObservationsTable
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
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { EXPANDED_TABLE_COLUMNS, SUMMARIZED_TABLE_COLUMNS } from './constants';
import messages from './messages';
import uniqueId from 'lodash/uniqueId';
import { getObservationValueDisplay } from './utils';
import ObservationExpansionRowDetails from './ObservationExpansionRowDetails';

function ObservationsTable({
  observations,
  onRowClick,
  manageObservationsUrl,
  isExpanded,
}) {
  function createTableHeaders() {
    return (
      <TableHeader columns={SUMMARIZED_TABLE_COLUMNS} relativeTop={0}>
        <TableHeaderColumn />
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderIssued} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderStatus} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderCode} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderValue} />
        </TableHeaderColumn>
        <TableHeaderColumn>
          <FormattedMessage {...messages.columnHeaderAction} />
        </TableHeaderColumn>
      </TableHeader>
    );
  }

  function createTableRow(observation, isPatientRole) {
    const menuItems = isPatientRole
      ? []
      : [
          {
            primaryText: <FormattedMessage {...messages.editObservation} />,
            linkTo: {
              pathname: `${manageObservationsUrl}`,
              search: `?id=${observation.logicalId}`,
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
        expansionTableRowDetails={
          <ObservationExpansionRowDetails observation={observation} />
        }
      >
        <TableRowColumn
          onClick={() => {
            onRowClick(observation.id);
          }}
        >
          {observation.issued &&
            moment(observation.issued).format('YYYY-MM-DD')}
        </TableRowColumn>
        <TableRowColumn
          onClick={() => {
            onRowClick(observation.id);
          }}
        >
          {startCase(observation.status)}
        </TableRowColumn>
        <TableRowColumn
          onClick={() => {
            onRowClick(observation.id);
          }}
        >
          {startCase(get(observation, 'code.coding[0].display'))}
        </TableRowColumn>
        <TableRowColumn
          onClick={() => {
            onRowClick(observation.id);
          }}
        >
          {getObservationValueDisplay(observation)}
        </TableRowColumn>
        <TableRowColumn>
          <ShowHideWrapper
            key={uniqueId()}
            allowedRoles={[
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
    <div>
      {createTableHeaders()}
      <Table>
        {!isEmpty(observations) &&
          observations.map((observation) => createTableRow(observation))}
      </Table>
    </div>
  );
}

ObservationsTable.propTypes = {
  observations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  onRowClick: PropTypes.func,
  isExpanded: PropTypes.bool,
};

export default ObservationsTable;
