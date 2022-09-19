import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import Util from 'utils/Util';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';

function AssignedPermissionGroupsTable(props) {
  const tableColumns = 'repeat(2, 1fr) 80px';
  const {
    roles,
    arrayHelpers,
    onEditPermissionGroup,
  } = props;

  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.assignedGroupsTable.tableHeaderOrganization} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.assignedGroupsTable.tableHeaderRole} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.assignedGroupsTable.tableHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {roles && roles.map((role, index) => {
          const { organization, group } = role;
          const groupName = group.displayName.split('.').pop();
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.assignedGroupsTable.tableActionEdit} />,
            onClick: () => onEditPermissionGroup(index, role),
          }, {
            primaryText: <FormattedMessage {...messages.assignedGroupsTable.tableActionRemove} />,
            onClick: () => arrayHelpers.remove(index),
          }];
          return (
            <TableRow key={uniqueId()} columns={tableColumns}>
              <TableRowColumn>{organization.display}</TableRowColumn>
              <TableRowColumn>{Util.deCamelize(groupName)}</TableRowColumn>
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

AssignedPermissionGroupsTable.propTypes = {
  arrayHelpers: PropTypes.object,
  onEditPermissionGroup: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.shape({
    organization: PropTypes.object,
    group: PropTypes.object,
  })),
};

export default AssignedPermissionGroupsTable;
