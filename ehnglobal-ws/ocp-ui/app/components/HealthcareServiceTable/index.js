/**
 *
 * HealthcareServiceTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import Checkbox from 'material-ui/Checkbox';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';

import NavigationIconMenu from 'components/NavigationIconMenu';
import sizeMeHOC from 'utils/SizeMeUtils';

import {
  SUMMARIZED_TABLE_COLUMNS,
  SUMMARY_VIEW_WIDTH,
  EXPANDED_TABLE_COLUMNS, ASSIGNED_TABLE_COLUMNS,
} from 'components/HealthcareServiceTable/constants';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import ExpansionTableRow from 'components/ExpansionTableRow';
import TableRowColumn from 'components/TableRowColumn';
import { GoBackButton } from 'components/GoBackButton';
import HealthcareServiceExpansionRowDetails from './HealthcareServiceExpansionRowDetails';
import messages from './messages';


export function HealthcareServiceTable({ elements, showAssigned = false, onCheck, relativeTop, size, flattenHealthcareServiceData }) {
  const isExpanded = size && size.width && (Math.floor(size.width) > SUMMARY_VIEW_WIDTH);

  function getDisplayNameFromValueSetList(valueSets) {
    return valueSets && valueSets.map((entry) =>
      (
        <div key={`healthCareService-valueSet-${uniqueId()}`}>
          {entry.display}
          <br />
        </div>
      ),
    );
  }

  function getProgramNames(programNames) {
    return programNames.map((entry) =>
      (
        <div key={`healthCareService-programNames-${uniqueId()}`}>
          {entry}
          <br />
        </div>
      ),
    );
  }

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
          {showAssigned &&
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAssignedToLocation} /></TableHeaderColumn>
          }
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCategory} /></TableHeaderColumn>
          {isExpanded &&
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderType} /></TableHeaderColumn>
          }
          {isExpanded &&
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderSpecialty} /></TableHeaderColumn>
          }
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderProgramName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {!isEmpty(elements) && elements.map((element) => {
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.edit} />,
            linkTo: `/ocp-ui/manage-healthcare-service/${element.logicalId}`,
          }];
          const flattenedHealthcareService = flattenHealthcareServiceData(element);
          return (
            <ExpansionTableRow
              expansionTableRowDetails={
                <HealthcareServiceExpansionRowDetails
                  healthcareService={flattenedHealthcareService}
                />
              }
              key={element.logicalId}
              columns={tableColumns}
            >
              {showAssigned &&
              <TableRowColumn>
                <Grid columns={12}>
                  <Cell left={2} width={1}>
                    <Checkbox
                      checked={element.assignedToCurrentLocation}
                      onCheck={(evt, checked) => onCheck(evt, checked, element.logicalId)}
                    />
                  </Cell>
                </Grid>
              </TableRowColumn>
              }
              <TableRowColumn>{element.name}</TableRowColumn>
              <TableRowColumn>{element.category && element.category.display}</TableRowColumn>
              {isExpanded &&
              <TableRowColumn>{getDisplayNameFromValueSetList(element.type)}</TableRowColumn>
              }
              {isExpanded &&
              <TableRowColumn>{getDisplayNameFromValueSetList(element.specialty)}</TableRowColumn>
              }
              <TableRowColumn>{getProgramNames(element.programName)}</TableRowColumn>

              <TableRowColumn>{element.active ?
                <FormattedMessage {...messages.labelActive} /> :
                <FormattedMessage {...messages.labelInactive} />}
              </TableRowColumn>
              {!showAssigned &&
              <TableRowColumn>
                <NavigationIconMenu menuItems={menuItems} />
              </TableRowColumn>
              }
            </ExpansionTableRow>
          );
        })}
      </Table>
      {showAssigned &&
      <Grid columns={7}>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell><GoBackButton label={'Back to Dashboard'} /></Cell>
        <Cell></Cell>
        <Cell></Cell>
        <Cell></Cell>
      </Grid>
      }
    </div>
  );
}


HealthcareServiceTable.propTypes = {
  flattenHealthcareServiceData: PropTypes.func.isRequired,
  relativeTop: PropTypes.number,
  elements: PropTypes.array,
  showAssigned: PropTypes.bool,
  onCheck: PropTypes.func,
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(HealthcareServiceTable);
