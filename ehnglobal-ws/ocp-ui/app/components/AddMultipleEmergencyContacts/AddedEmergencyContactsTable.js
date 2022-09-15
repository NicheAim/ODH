import CustomErrorText from 'components/CustomErrorText';
import NavigationIconMenu from 'components/NavigationIconMenu';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class AddedEmergencyContactsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tableColumns = 'repeat(3, 1fr) 80px';
    const { emergencyContacts, errors, handleEdit } = this.props;

    return (
      <div>
        <Table>
          <TableHeader columns={tableColumns}>
            <TableHeaderColumn>
              <FormattedMessage
                {...messages.addedTelecomsTable.tableHeaderFirstName}
              />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage
                {...messages.addedTelecomsTable.tableHeaderLastName}
              />
            </TableHeaderColumn>
            <TableHeaderColumn>
              <FormattedMessage
                {...messages.addedTelecomsTable.tableHeaderAction}
              />
            </TableHeaderColumn>
          </TableHeader>
          {errors && errors.emergencyContacts && (
            <CustomErrorText>{errors.emergencyContacts}</CustomErrorText>
          )}
          {emergencyContacts &&
            emergencyContacts.map((item, index) => {
              const menuItems = [
                {
                  primaryText: (
                    <FormattedMessage
                      {...messages.addedTelecomsTable.tableActionEdit}
                    />
                  ),
                  onClick: () => handleEdit(index, item),
                },
                {
                  primaryText: (
                    <FormattedMessage
                      {...messages.addedTelecomsTable.tableActionRemove}
                    />
                  ),
                  onClick: () => {
                    document.getElementById(
                      `${item.relatedPersonId}`
                    ).style.display = 'none';
                    item.active = false;
                  },
                },
              ];
              return (
                <TableRow
                  idRow={`${item.relatedPersonId}`}
                  key={uniqueId()}
                  columns={tableColumns}
                >
                  <TableRowColumn>{item.firstName}</TableRowColumn>
                  <TableRowColumn>{item.lastName}</TableRowColumn>
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
}

AddedEmergencyContactsTable.propTypes = {
  errors: PropTypes.object,
  handleEdit: PropTypes.func,
  emergencyContacts: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    })
  ),
};

export default AddedEmergencyContactsTable;
