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

function AddedTelecomsTable(props) {
  const tableColumns = 'repeat(3, 1fr) 80px';
  const {
    telecoms,
    errors,
    arrayHelpers,
    handleEditTelecom,
  } = props;

  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.addedTelecomsTable.tableHeaderSystem} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedTelecomsTable.tableHeaderValue} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedTelecomsTable.tableHeaderUse} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.addedTelecomsTable.tableHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {errors && errors.telecoms &&
        <CustomErrorText>{errors.telecoms}</CustomErrorText>
        }
        {telecoms && telecoms.map((telecom, index) => {
          const { system, value, use } = telecom;
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.addedTelecomsTable.tableActionEdit} />,
            onClick: () => handleEditTelecom(index, telecom),
          }, {
            primaryText: <FormattedMessage {...messages.addedTelecomsTable.tableActionRemove} />,
            onClick: () => arrayHelpers.remove(index),
          }];
          return (
            <TableRow key={uniqueId()} columns={tableColumns}>
              <TableRowColumn>{upperFirst(system)}</TableRowColumn>
              <TableRowColumn>{value}</TableRowColumn>
              <TableRowColumn>{upperFirst(use)}</TableRowColumn>
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

AddedTelecomsTable.propTypes = {
  errors: PropTypes.object,
  arrayHelpers: PropTypes.object,
  handleEditTelecom: PropTypes.func,
  telecoms: PropTypes.arrayOf(PropTypes.shape({
    system: PropTypes.string,
    value: PropTypes.string,
    use: PropTypes.string,
  })),
};

export default AddedTelecomsTable;
