import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import CustomErrorText from 'components/CustomErrorText';
import AutoSuggestionField from 'components/AutoSuggestion';
import messages from './messages';


function AddedOrganizationsTable(props) {
  const tableColumns = '30% 10% 30% 30%';
  const {
    practitionerRoles,
    roleType,
    specialtyType,
    errors,
  } = props;
  const roleSuggestions = roleType
    .filter((entry) => (entry.code !== null) && (entry.display !== null))
    .map((entry) => ({
      value: entry.code,
      label: entry.display,
    }));

  const specialtySuggestions = specialtyType
    .filter((entry) => (entry.code !== null) && (entry.display !== null))
    .map((entry) => ({
      value: entry.code,
      label: entry.display,
    }));

  return (
    <Table>
      <TableHeader columns={tableColumns}>
        <TableHeaderColumn><FormattedMessage {...messages.addedOrganizationsTable.tableColumnName} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedOrganizationsTable.tableColumnActive} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedOrganizationsTable.tableColumnCode} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedOrganizationsTable.tableColumnSpecialty} /></TableHeaderColumn>
      </TableHeader>
      {errors && errors.practitionerRoles &&
      <CustomErrorText>{errors.practitionerRoles}</CustomErrorText>
      }
      {practitionerRoles && practitionerRoles.map((practitionerRole, index) => {
        const { organization, active } = practitionerRole;
        return (
          <TableRow key={uniqueId()} columns={tableColumns}>
            <TableRowColumn>{organization.display}</TableRowColumn>
            <TableRowColumn>{active ? 'Active' : 'Inactive'}</TableRowColumn>
            <TableRowColumn>
              <AutoSuggestionField
                name={`practitionerRoles.${index}.code`}
                isRequired
                placeholder={<FormattedMessage {...messages.addedOrganizationsTable.roleTypeLabel} />}
                suggestions={roleSuggestions}
                {...props}
              />
            </TableRowColumn>
            <TableRowColumn>
              <AutoSuggestionField
                name={`practitionerRoles.${index}.specialty`}
                isRequired
                placeholder={<FormattedMessage {...messages.addedOrganizationsTable.specialtyLabel} />}
                suggestions={specialtySuggestions}
                {...props}
              />
            </TableRowColumn>
          </TableRow>
        );
      })}
    </Table>
  );
}

AddedOrganizationsTable.propTypes = {
  roleType: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  specialtyType: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  errors: PropTypes.object,
  practitionerRoles: PropTypes.array,
};

export default AddedOrganizationsTable;
