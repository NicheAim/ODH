/**
 *
 * OrganizationTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import sizeMeHOC from 'utils/SizeMeUtils';
import RecordsRange from 'components/RecordsRange';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import NavigationIconMenu from 'components/NavigationIconMenu';
import ExpansionTableRow from 'components/ExpansionTableRow';
import TableHeader from 'components/TableHeader';
import Table from 'components/Table';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import OrganizationExpansionRowDetails from './OrganizationExpansionRowDetails';
import messages from './messages';
import { ENTER_KEY, EXPANDED_TABLE_COLUMNS, SUMMARIZED_TABLE_COLUMNS, SUMMARY_VIEW_WIDTH } from './constants';


function OrganizationTable(props) {
  const { organizationData, flattenOrganizationData, combineAddress, mapToTelecoms, onRowClick, relativeTop, onOrganizationViewDetails, size } = props;
  const menuItems = [{
    primaryText: <FormattedMessage {...messages.viewDetails} />,
    onClick: () => onOrganizationViewDetails(),
  }];
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;

  return (
    <div>
      <LinearProgressIndicator loading={organizationData.loading} />
      {!organizationData.loading && organizationData.data && organizationData.data.length === 0 &&
      <NoResultsFoundText><FormattedMessage {...messages.noOrganizationsFound} /></NoResultsFoundText>
      }
      {(!organizationData.loading && organizationData.data && organizationData.data.length > 0 &&
        <div>
          <Table>
            <TableHeader columns={columns} relativeTop={relativeTop}>
              <TableHeaderColumn />
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganization} /></TableHeaderColumn>
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
              }
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
              }
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderTelecom} /></TableHeaderColumn>
              }
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAction} /></TableHeaderColumn>
            </TableHeader>
            {!isEmpty(organizationData.data) && organizationData.data.map((organization) => {
              const flattenOrganization = flattenOrganizationData(organization);

              const { addresses, telecoms } = organization;
              const address = addresses && addresses.length > 0 ? combineAddress(addresses[0]) : '';
              const contact = telecoms && telecoms.length > 0 ? mapToTelecoms(telecoms.slice(0, 1)) : '';

              const { logicalId, name, identifiers, active } = flattenOrganization;
              return (
                <ExpansionTableRow
                  expansionTableRowDetails={<OrganizationExpansionRowDetails organization={flattenOrganization} />}
                  columns={columns}
                  key={logicalId}
                  onClick={() => onRowClick && onRowClick(organization)}
                  onKeyPress={(e) => {
                    if (e.key === ENTER_KEY) {
                      if (onRowClick) {
                        onRowClick(organization);
                      }
                    }
                    e.preventDefault();
                  }}
                  role="button"
                  tabIndex="0"
                >
                  <TableRowColumn>{name}</TableRowColumn>
                  {isExpanded ?
                    <TableRowColumn>{identifiers}</TableRowColumn> : null
                  }
                  {isExpanded &&
                  <TableRowColumn>{address}</TableRowColumn>
                  }
                  {isExpanded ?
                    <TableRowColumn>{contact}</TableRowColumn> : null
                  }
                  <TableRowColumn>
                    {active ?
                      <FormattedMessage {...messages.active} /> :
                      <FormattedMessage {...messages.inactive} />
                    }
                  </TableRowColumn>
                  <TableRowColumn>
                    <NavigationIconMenu menuItems={menuItems} />
                  </TableRowColumn>
                </ExpansionTableRow>
              );
            })}
          </Table>
          {!!organizationData && !!organizationData.currentPage &&
          <div>
            <CenterAlignedUltimatePagination
              currentPage={organizationData.currentPage}
              totalPages={organizationData.totalNumberOfPages}
              onChange={organizationData.handlePageClick}
            />
            <RecordsRange
              currentPage={organizationData.currentPage}
              totalPages={organizationData.totalNumberOfPages}
              totalElements={organizationData.totalElements}
              currentPageSize={organizationData.currentPageSize}
            />
          </div>}
        </div>
      )}
    </div>
  );
}

OrganizationTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  organizationData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handlePageClick: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
      active: PropTypes.bool,
      name: PropTypes.string.isRequired,
      addresses: PropTypes.arrayOf(PropTypes.shape({
        line1: PropTypes.string,
        line2: PropTypes.string,
        city: PropTypes.string,
        stateCode: PropTypes.string,
        postalCode: PropTypes.string,
        countryCode: PropTypes.string,
        use: PropTypes.string,
      })),
      telecoms: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        value: PropTypes.string,
        use: PropTypes.string,
      })),
    })).isRequired,
  }),
  onRowClick: PropTypes.func,
  flattenOrganizationData: PropTypes.func.isRequired,
  combineAddress: PropTypes.func.isRequired,
  mapToTelecoms: PropTypes.func.isRequired,
  onOrganizationViewDetails: PropTypes.func.isRequired,
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(OrganizationTable);
