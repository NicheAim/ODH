/**
 *
 * OrganizationTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import TableHeader from 'components/TableHeader';
import Table from 'components/Table';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import messages from './messages';

const tableColumns = 'repeat(5, 1fr)';

function OrganizationTable(props) {
  const { searchOrganizationsData, onChangeOrganizationSearchPage, flattenOrganizationData, onOrganizationSelect } = props;
  return (
    <div>
      {searchOrganizationsData.loading && <RefreshIndicatorLoading />}
      {(!searchOrganizationsData.loading && searchOrganizationsData.result &&
        searchOrganizationsData.result.length > 0 ?
          <div>
            <Table>
              <TableHeader columns={tableColumns} sticky={false}>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganizationAddresses} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganizationTelecoms} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(searchOrganizationsData.result) && searchOrganizationsData.result.map((organization) => {
                const flattenedOrganization = flattenOrganizationData(organization);
                const { logicalId, name, telecoms, addresses, identifiers, active } = flattenedOrganization;
                return (
                  <TableRow
                    key={logicalId}
                    columns={tableColumns}
                    onClick={() => onOrganizationSelect && onOrganizationSelect(organization)}
                    role="button"
                    tabIndex="0"
                  >
                    <TableRowColumn>{name}</TableRowColumn>
                    <TableRowColumn>{addresses}</TableRowColumn>
                    <TableRowColumn>{telecoms}</TableRowColumn>
                    <TableRowColumn>{identifiers}</TableRowColumn>
                    <TableRowColumn>
                      {active ?
                        <FormattedMessage {...messages.active} /> :
                        <FormattedMessage {...messages.inactive} />
                      }
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </Table>
            <CenterAlignedUltimatePagination
              currentPage={searchOrganizationsData.currentPage}
              totalPages={searchOrganizationsData.totalNumberOfPages}
              onChange={onChangeOrganizationSearchPage}
            />
          </div> :
          (
            <NoResultsFoundText><FormattedMessage {...messages.noOrganizationsFound} /></NoResultsFoundText>
          )
      )}
    </div>
  );
}

OrganizationTable.propTypes = {
  searchOrganizationsData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    result: PropTypes.any.isRequired,
  }),
  onChangeOrganizationSearchPage: PropTypes.func.isRequired,
  flattenOrganizationData: PropTypes.func.isRequired,
  onOrganizationSelect: PropTypes.func.isRequired,
};

export default OrganizationTable;
