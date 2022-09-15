/**
 *
 * ManageUsersTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Util from 'utils/Util';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';

const columns = 'repeat(3,1fr) 0.3fr';

function ManageUsersTable(props) {
  const { users, onEditAssignRoles, onOpenResetPasswordModal } = props;
  return (
    <Table>
      <TableHeader columns={columns}>
        <TableHeaderColumn><FormattedMessage {...messages.userName} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.role} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.permissionGroup} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.action} /></TableHeaderColumn>
      </TableHeader>
      {users && users.map((user) => {
        const menuItems = [{
          primaryText: <FormattedMessage {...messages.menuItemAssignRole} />,
          onClick: () => onEditAssignRoles(user),
        }, {
          primaryText: <FormattedMessage {...messages.menuItemResetPassword} />,
          onClick: () => onOpenResetPasswordModal(user),
        }];
        const { givenName, familyName, displayName, role } = user;
        const roleDisplay = role && role.map((roleCode) => roleCode.display).join('\n');
        const permissionGroupName = displayName && displayName.split('.').pop();
        return (
          <TableRow key={user.id} columns={columns}>
            <TableRowColumn>{givenName} {familyName}</TableRowColumn>
            <TableRowColumn>{roleDisplay}</TableRowColumn>
            <TableRowColumn>{Util.deCamelize(permissionGroupName)}</TableRowColumn>
            <TableRowColumn><NavigationIconMenu menuItems={menuItems} /></TableRowColumn>
          </TableRow>
        );
      })}
    </Table>
  );
}

ManageUsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    givenName: PropTypes.string,
    familyName: PropTypes.string,
    displayName: PropTypes.string.isRequired,
    role: PropTypes.array,
  })).isRequired,
  onEditAssignRoles: PropTypes.func.isRequired,
  onOpenResetPasswordModal: PropTypes.func.isRequired,
};

export default ManageUsersTable;
