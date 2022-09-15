/**
*
* AssignLocationTable
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
// import uniqueId from 'lodash/uniqueId';
import Checkbox from 'material-ui/Checkbox';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';

import sizeMeHOC from 'utils/SizeMeUtils';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import ExpansionTableRow from 'components/ExpansionTableRow';
import TableRowColumn from 'components/TableRowColumn';
import {
  ASSIGNED_TABLE_COLUMNS, EXPANDED_TABLE_COLUMNS,
  SUMMARIZED_TABLE_COLUMNS, SUMMARY_VIEW_WIDTH, ACTIVE,
} from 'components/AssignLocationTable/constants';
import LocationExpansionRowDetails from 'components/AssignLocationTable/LocationExpansionRowDetails';
import { GoBackButton } from 'components/GoBackButton';
import messages from './messages';


function AssignLocationTable({ elements, showAssigned = false, onCheck, relativeTop, size, flattenLocationData }) {
  const isExpanded = size && size.width && (Math.floor(size.width) > SUMMARY_VIEW_WIDTH);

  let tableColumns = EXPANDED_TABLE_COLUMNS;
  if (showAssigned) {
    tableColumns = ASSIGNED_TABLE_COLUMNS;
  } else {
    tableColumns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
  }
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns} relativeTop={relativeTop}>
          <TableHeaderColumn />
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAssigned} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderContact} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderIdentifier} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
        </TableHeader>
        {!isEmpty(elements) && elements.map((location) => {
          const flattenedLocation = flattenLocationData(location);
          const { logicalId, name, status, telecoms, address, identifiers } = flattenedLocation;
          return (
            <ExpansionTableRow
              expansionTableRowDetails={
                <LocationExpansionRowDetails
                  location={flattenedLocation}
                  physicalType={location.physicalType}
                />
              }
              key={logicalId}
              columns={tableColumns}
            >
              <TableRowColumn>
                <Grid columns={12}>
                  <Cell left={2} width={1}>
                    <Checkbox
                      checked={location.assignToCurrentPractitioner}
                      onCheck={(evt, checked) => onCheck(evt, checked, logicalId)}
                    />
                  </Cell>
                </Grid>
              </TableRowColumn>
              <TableRowColumn>{name}</TableRowColumn>
              <TableRowColumn>{address}</TableRowColumn>
              <TableRowColumn>{telecoms}</TableRowColumn>
              <TableRowColumn>{identifiers}</TableRowColumn>
              <TableRowColumn>{status === ACTIVE ?
                <FormattedMessage {...messages.labelActive} /> :
                <FormattedMessage {...messages.labelInactive} />}
              </TableRowColumn>
            </ExpansionTableRow>
          );
        })}
        <Grid columns={7}>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell><GoBackButton label={'Back to Dashboard'} /></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
        </Grid>
      </Table>
    </div>
  );
}

AssignLocationTable.propTypes = {
  flattenLocationData: PropTypes.func,
  relativeTop: PropTypes.number,
  elements: PropTypes.array,
  showAssigned: PropTypes.bool,
  onCheck: PropTypes.func.isRequired,
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(AssignLocationTable);
