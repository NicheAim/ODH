/**
 *
 * PatientTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';

import TableHeader from 'components/TableHeader';
import Table from 'components/Table';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import messages from './messages';

const tableColumns = 'repeat(5, 1fr)';

function PatientTable(props) {
  const { searchPatientsData, onChangePatientSearchPage, flattenPatientData, onPatientSelect } = props;
  return (
    <div>
      {searchPatientsData.loading && <RefreshIndicatorLoading />}
      {(!searchPatientsData.loading && searchPatientsData.result &&
        searchPatientsData.result.length > 0 ?
          <div>
            <Table>
              <TableHeader columns={tableColumns} sticky={false}>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnDOB} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnGender} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(searchPatientsData.result) && searchPatientsData.result.map((patient) => {
                const { id, name, birthDate, genderCode, identifier, active } = flattenPatientData(patient);
                return (
                  <TableRow
                    key={id}
                    columns={tableColumns}
                    onClick={() => onPatientSelect && onPatientSelect(patient)}
                    role="button"
                    tabIndex="0"
                  >
                    <TableRowColumn>{name}</TableRowColumn>
                    <TableRowColumn>{birthDate}</TableRowColumn>
                    <TableRowColumn>{upperFirst(genderCode)}</TableRowColumn>
                    <TableRowColumn>{identifier}</TableRowColumn>
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
              currentPage={searchPatientsData.currentPage}
              totalPages={searchPatientsData.totalNumberOfPages}
              onChange={onChangePatientSearchPage}
            />
          </div> :
          (<CenterAlign>
            <NoResultsFoundText><FormattedMessage {...messages.noPatientsFound} /></NoResultsFoundText>
          </CenterAlign>)
      )}
    </div>
  );
}

PatientTable.propTypes = {
  searchPatientsData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    result: PropTypes.any.isRequired,
  }),
  onChangePatientSearchPage: PropTypes.func.isRequired,
  flattenPatientData: PropTypes.func.isRequired,
  onPatientSelect: PropTypes.func.isRequired,
};

export default PatientTable;
