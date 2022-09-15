/**
 *
 * PermissionGroupsTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import Util from 'utils/Util';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TableHeaderColumn from 'components/TableHeaderColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';
import { PERMISSION_GROUPS_TABLE_COLUMNS } from './constants';

const columns = PERMISSION_GROUPS_TABLE_COLUMNS;


function createTableHeaders() {
  return (
    <TableHeader columns={columns}>
      <TableHeaderColumn><FormattedMessage {...messages.permissionGroup} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.description} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.action} /></TableHeaderColumn>
    </TableHeader>
  );
}

function createTableRows(groups, handleEditPermissionGroup) {
  return (
    <div>
      {groups && groups.map((permissionGroup) => {
        const menuItems = [{
          primaryText: <FormattedMessage {...messages.manageGroup} />,
          onClick: () => handleEditPermissionGroup(permissionGroup),
        }];
        const displayName = permissionGroup.displayName.split('.');
        return (
          <TableRow key={permissionGroup.id || uniqueId()} columns={columns}>
            <TableRowColumn>
              {Util.deCamelize(displayName[displayName.length - 1])}
            </TableRowColumn>
            <TableRowColumn>
              {permissionGroup.description}
            </TableRowColumn>
            <TableRowColumn>
              <NavigationIconMenu menuItems={menuItems} />
            </TableRowColumn>
          </TableRow>
        );
      })}
    </div>
  );
}

function PermissionGroupsTable(props) { // eslint-disable-line react/prefer-stateless-function
  const { groups, handleEditPermissionGroup } = props;
  return (
    <Table>
      {createTableHeaders()}
      {createTableRows(groups, handleEditPermissionGroup)}
    </Table>
  );
}

PermissionGroupsTable.propTypes = {
  groups: PropTypes.array,
  handleEditPermissionGroup: PropTypes.func,
};

export default PermissionGroupsTable;
