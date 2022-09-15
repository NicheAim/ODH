/**
 *
 * PatientSearchResult
 *
 */

import ExpansionTableRow from 'components/ExpansionTableRow';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import NavigationIconMenu from 'components/NavigationIconMenu';
import NoResultsFoundText from 'components/NoResultsFoundText';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import {
  MANAGE_CARE_TEAM_URL,
  MANAGE_PATIENT_URL,
  MANAGE_TASK_URL,
  MANAGE_USER_REGISTRATION,
} from 'containers/App/constants';
import { mapToName } from 'containers/App/helpers';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import sizeMeHOC from 'utils/SizeMeUtils';
import { SUMMARY_VIEW_WIDTH } from './constants';
import {
  defineTableColumns,
  mapToIdentifiersSSNMedicaid,
  mapToPatientUaaAssignment,
} from './helpers';
import messages from './messages';
import PatientExpansionRowDetails from './PatientExpansionRowDetails';

function displayPatientSearchResult(
  patients,
  onPatientClick,
  onPatientViewDetailsClick,
  flattenPatientData,
  isExpanded,
  columns,
  mapToTelecoms,
  combineAddress,
  usCoreRaces,
  usCoreEthnicities,
  manageUserEnabled,
  showActionButton,
  ablePatientClick
) {
  return (
    patients &&
    patients.map((patient) => {
      let menuItems;
      if (manageUserEnabled) {
        menuItems = [
          {
            primaryText: <FormattedMessage {...messages.manageUser} />,
            linkTo: `${MANAGE_USER_REGISTRATION}/${patient.id}?resourceType=Patient`,
          },
        ];
      } else {
        menuItems = [
          {
            primaryText: <FormattedMessage {...messages.edit} />,
            linkTo: `${MANAGE_PATIENT_URL}/${patient.id}`,
          },
          {
            primaryText: <FormattedMessage {...messages.viewDetails} />,
            onClick: () => onPatientViewDetailsClick(patient),
          },
          {
            primaryText: <FormattedMessage {...messages.addAdvisory} />,
            linkTo: `${MANAGE_PATIENT_URL}/${patient.id}`,
          },
          {
            primaryText: <FormattedMessage {...messages.addTask} />,
            linkTo: {
              pathname: MANAGE_TASK_URL,
              search: `?patientId=${patient.id}&isMainTask=true`,
            },
          },
          {
            primaryText: <FormattedMessage {...messages.addCareTeam} />,
            linkTo: {
              pathname: MANAGE_CARE_TEAM_URL,
              search: `?patientId=${patient.id}`,
            },
          },
          {
            primaryText: <FormattedMessage {...messages.addRelatedPerson} />,
            linkTo: {
              pathname: '/ocp-ui/manage-related-person',
              search: `?patientId=${patient.id}`,
            },
          },
          {
            primaryText: <FormattedMessage {...messages.remove} />,
            disabled: true,
          },
        ];
      }
      const { telecoms } = patient;
      const contact =
        telecoms && telecoms.length > 0
          ? mapToTelecoms(telecoms.slice(0, 1))
          : '';
      const address =
        patient && patient.addresses && patient.addresses.length > 0
          ? combineAddress(patient.addresses[0])
          : '';

      return (
        <ExpansionTableRow
          expansionTableRowDetails={
            <PatientExpansionRowDetails patient={flattenPatientData(patient)} />
          }
          columns={columns}
          key={`patient_${patient.id}`}
          role="button"
          tabIndex="0"
        >
          <TableRowColumn
            onClick={() =>
              ablePatientClick && onPatientClick && onPatientClick(patient)
            }
          >
            {mapToName(patient.name)}
          </TableRowColumn>
          {isExpanded && (
            <TableRowColumn
              onClick={() =>
                ablePatientClick && onPatientClick && onPatientClick(patient)
              }
            >
              {patient && patient.mrn}
            </TableRowColumn>
          )}
          {manageUserEnabled && (
            <TableRowColumn
              onClick={() =>
                ablePatientClick && onPatientClick && onPatientClick(patient)
              }
            >
              {mapToPatientUaaAssignment(patient)}
            </TableRowColumn>
          )}
          <TableRowColumn
            onClick={() =>
              ablePatientClick && onPatientClick && onPatientClick(patient)
            }
          >
            {contact}
          </TableRowColumn>
          {isExpanded && (
            <TableRowColumn
              onClick={() =>
                ablePatientClick && onPatientClick && onPatientClick(patient)
              }
            >
              {address}
            </TableRowColumn>
          )}
          {isExpanded && (
            <TableRowColumn
              onClick={() =>
                ablePatientClick && onPatientClick && onPatientClick(patient)
              }
            >
              {patient.race &&
                find(usCoreRaces, { code: patient.race }) &&
                find(usCoreRaces, { code: patient.race }).display}
            </TableRowColumn>
          )}
          {isExpanded && (
            <TableRowColumn
              onClick={() =>
                ablePatientClick && onPatientClick && onPatientClick(patient)
              }
            >
              {patient.ethnicity &&
                find(usCoreEthnicities, { code: patient.ethnicity }) &&
                find(usCoreEthnicities, { code: patient.ethnicity }).display}
            </TableRowColumn>
          )}
          <TableRowColumn
            onClick={() =>
              ablePatientClick && onPatientClick && onPatientClick(patient)
            }
          >
            {patient.birthDate}
          </TableRowColumn>
          <TableRowColumn
            onClick={() =>
              ablePatientClick && onPatientClick && onPatientClick(patient)
            }
          >
            {patient.genderDisplayString}
          </TableRowColumn>
          {isExpanded && (
            <TableRowColumn
              onClick={() =>
                ablePatientClick && onPatientClick && onPatientClick(patient)
              }
            >
              {mapToIdentifiersSSNMedicaid(patient.identifier)}
            </TableRowColumn>
          )}
          <TableRowColumn
            onClick={() =>
              ablePatientClick && onPatientClick && onPatientClick(patient)
            }
          >
            {showActionButton && <NavigationIconMenu menuItems={menuItems} />}
          </TableRowColumn>
        </ExpansionTableRow>
      );
    })
  );
}

function PatientSearchResult({
  loading,
  error,
  searchResult,
  onPatientClick,
  onPatientViewDetailsClick,
  flattenPatientData,
  relativeTop,
  size,
  mapToTelecoms,
  combineAddress,
  usCoreRaces,
  usCoreEthnicities,
  manageUserEnabled,
  showActionButton,
  ablePatientClick,
}) {
  const isExpanded =
    size && size.width && Math.floor(size.width) > SUMMARY_VIEW_WIDTH;
  const columns = defineTableColumns(isExpanded, manageUserEnabled);

  return (
    <div>
      <LinearProgressIndicator loading={loading} />

      {error === false &&
        !loading &&
        searchResult !== false &&
        searchResult !== null &&
        searchResult.length === 0 && (
          <NoResultsFoundText>
            <FormattedMessage {...messages.noPatientsFound} />
          </NoResultsFoundText>
        )}

      {error === false &&
        !loading &&
        searchResult !== false &&
        searchResult !== null &&
        searchResult.length !== 0 && (
          <Table>
            <TableHeader columns={columns} relativeTop={relativeTop}>
              <TableHeaderColumn />
              <TableHeaderColumn>
                <FormattedMessage {...messages.fullName} />
              </TableHeaderColumn>
              {isExpanded && (
                <TableHeaderColumn>
                  <FormattedMessage {...messages.mrn} />
                </TableHeaderColumn>
              )}
              {manageUserEnabled && (
                <TableHeaderColumn>
                  <FormattedMessage {...messages.uaaAssignment} />
                </TableHeaderColumn>
              )}
              <TableHeaderColumn>
                <FormattedMessage {...messages.tableColumnHeaderTelecom} />
              </TableHeaderColumn>
              {isExpanded && (
                <TableHeaderColumn>
                  <FormattedMessage {...messages.address} />
                </TableHeaderColumn>
              )}
              {isExpanded && (
                <TableHeaderColumn>
                  <FormattedMessage {...messages.race} />
                </TableHeaderColumn>
              )}
              {isExpanded && (
                <TableHeaderColumn>
                  <FormattedMessage {...messages.ethnicity} />
                </TableHeaderColumn>
              )}
              <TableHeaderColumn>
                <FormattedMessage {...messages.dob} />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <FormattedMessage {...messages.gender} />
              </TableHeaderColumn>
              {isExpanded && (
                <TableHeaderColumn>
                  <FormattedMessage {...messages.identifier} />
                </TableHeaderColumn>
              )}
              {showActionButton && (
                <TableHeaderColumn>
                  <FormattedMessage {...messages.actions} />
                </TableHeaderColumn>
              )}
            </TableHeader>
            {displayPatientSearchResult(
              searchResult,
              onPatientClick,
              onPatientViewDetailsClick,
              flattenPatientData,
              isExpanded,
              columns,
              mapToTelecoms,
              combineAddress,
              usCoreRaces,
              usCoreEthnicities,
              manageUserEnabled,
              showActionButton,
              ablePatientClick
            )}
          </Table>
        )}
    </div>
  );
}

PatientSearchResult.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  manageUserEnabled: PropTypes.bool,
  error: PropTypes.any,
  searchResult: PropTypes.any,
  onPatientClick: PropTypes.func,
  onPatientViewDetailsClick: PropTypes.func,
  flattenPatientData: PropTypes.func.isRequired,
  mapToTelecoms: PropTypes.func.isRequired,
  combineAddress: PropTypes.func.isRequired,
  showActionButton: PropTypes.bool,
  ablePatientClick: PropTypes.bool,
  size: PropTypes.object.isRequired,
  usCoreRaces: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  usCoreEthnicities: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
};

export default sizeMeHOC(PatientSearchResult);
