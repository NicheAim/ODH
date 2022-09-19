import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';
import upperFirst from 'lodash/upperFirst';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import CustomErrorText from 'components/CustomErrorText';
import messages from './messages';

function addedCoveragesTable(props) {
  const tableColumns = 'repeat(8, 1fr) 80px';
  const {
    errors,
    coverages,
    arrayHelpers,
    handleEditCoverage,
  } = props;
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderCoverage} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.id} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderBeneficiary} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderPeriod} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderSubscriber} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderCopay} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderNetwork} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedCoveragesTable.tableHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {errors && errors.flags &&
        <CustomErrorText>{errors.flags}</CustomErrorText>
        }
        {coverages && coverages.map((coverage, index) => {
          const { logicalId, subscriberId, status, typeDisplay, startDate, endDate, beneficiary, subscriber, groupingPlanDisplay, network } = coverage;
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.addedCoveragesTable.tableActionEdit} />,
            onClick: () => handleEditCoverage(index, coverage),
          }, {
            primaryText: <FormattedMessage {...messages.addedCoveragesTable.tableActionRemove} />,
            disabled: logicalId !== undefined,
            onClick: () => arrayHelpers.remove(index),
          }];
          return (
            <TableRow key={uniqueId()} columns={tableColumns}>
              <TableRowColumn>{upperFirst(typeDisplay)}</TableRowColumn>
              <TableRowColumn>{upperFirst(status)}</TableRowColumn>
              <TableRowColumn>{subscriberId}</TableRowColumn>
              <TableRowColumn>{beneficiary && beneficiary.display}</TableRowColumn>
              <TableRowColumn>{startDate} - {endDate}</TableRowColumn>
              <TableRowColumn>{subscriber && subscriber.display}</TableRowColumn>
              <TableRowColumn>{groupingPlanDisplay}</TableRowColumn>
              <TableRowColumn>{network}</TableRowColumn>
              <TableRowColumn>
                <NavigationIconMenu menuItems={menuItems} />
              </TableRowColumn>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

addedCoveragesTable.propTypes = {
  errors: PropTypes.object,
  arrayHelpers: PropTypes.object,
  handleEditCoverage: PropTypes.func,
  coverages: PropTypes.array,
};

export default addedCoveragesTable;
