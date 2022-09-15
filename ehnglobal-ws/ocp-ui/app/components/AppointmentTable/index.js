/**
 *
 * AppointmentTable
 *
 */

import AppointmentExpansionRowDetails from 'components/AppointmentTable/AppointmentExpansionRowDetails';
import ExpansionTableRow from 'components/ExpansionTableRow';
import NavigationIconMenu from 'components/NavigationIconMenu';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import find from 'lodash/find';
import Done from 'material-ui/svg-icons/action/done';
import HelpOutline from 'material-ui/svg-icons/action/help-outline';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import NotInterested from 'material-ui/svg-icons/av/not-interested';
import DownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-drop-up';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ASC } from 'utils/constants';
import sizeMeHOC from 'utils/SizeMeUtils';
import Util from 'utils/Util';
import {
  EXPANDED_TABLE_COLUMNS,
  PATIENT_WORKSPACE_EXPANDED_TABLE_COLUMNS,
  PATIENT_WORKSPACE_SUMMARIZED_TABLE_COLUMNS,
  SUMMARIZED_TABLE_COLUMNS,
  SUMMARY_VIEW_WIDTH,
} from './constants';
import messages from './messages';


function AppointmentTable({ onAppointmentClick, elements, appointmentStatuses, appointmentTypes, cancelAppointment, acceptAppointment, declineAppointment, tentativeAppointment, patientId, communicationBaseUrl, relativeTop, manageAppointmentUrl, size, isPatientWorkspace, isPatientDetailsPage, handleSort, columnToSort, sortDirection, handlePatientNameClick }) { // eslint-disable-line react/prefer-stateless-function
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  const practitionerWorkspace = !isPatientWorkspace && !isPatientDetailsPage;

  function getColumns() {
    let columns = '';
    if (practitionerWorkspace) {
      columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
    } else {
      columns = isExpanded ? PATIENT_WORKSPACE_EXPANDED_TABLE_COLUMNS : PATIENT_WORKSPACE_SUMMARIZED_TABLE_COLUMNS;
    }
    return columns;
  }

  function getSortIcon() {
    return (Util.equalsIgnoreCase(sortDirection, ASC) ? <UpArrow /> : <DownArrow />);
  }

  function getMyResponseIcon(appointment) {
    if (appointment.requesterParticipationStatusCode === 'accepted') {
      return <Done color="#009688" />;
    }
    if (appointment.requesterParticipationStatusCode === 'declined') {
      return <HighlightOff color="#d86344" />;
    }
    if (appointment.requesterParticipationStatusCode === 'tentative') {
      return <HelpOutline color="#9868b9" />;
    }
    if (appointment.requesterParticipationStatusCode === 'needs-action') {
      return <AlertErrorOutline color="#ff3300" />;
    }
    return <NotInterested />;
  }


  function createTableHeaders() {
    const columns = getColumns();
    const sortingEnabledColumnHeaders = [
      'patientName',
      'typeCode',
      'statusCode',
      'start',
      'appointmentDuration',
      'description',
    ];
    return (
      <TableHeader columns={columns} relativeTop={relativeTop}>
        <TableHeaderColumn />
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderMyResponse} /></TableHeaderColumn>
        {practitionerWorkspace &&
        <TableHeaderColumn onClick={() => handleSort(sortingEnabledColumnHeaders[0])}>
          <FormattedMessage {...messages.columnHeaderPatientName} />
          {columnToSort === sortingEnabledColumnHeaders[0] ? getSortIcon() : null}
        </TableHeaderColumn>
        }
        {isExpanded &&
        <TableHeaderColumn onClick={() => handleSort(sortingEnabledColumnHeaders[1])}>
          <FormattedMessage {...messages.columnHeaderAppointmentType} />
          {columnToSort === sortingEnabledColumnHeaders[1] ? getSortIcon() : null}
        </TableHeaderColumn>
        }
        <TableHeaderColumn onClick={() => handleSort(sortingEnabledColumnHeaders[2])}>
          <FormattedMessage {...messages.columnHeaderStatus} />
          {columnToSort === sortingEnabledColumnHeaders[2] ? getSortIcon() : null}
        </TableHeaderColumn>
        <TableHeaderColumn onClick={() => handleSort(sortingEnabledColumnHeaders[3])}>
          <FormattedMessage {...messages.columnHeaderDate} />
          {columnToSort === sortingEnabledColumnHeaders[3] ? getSortIcon() : null}
        </TableHeaderColumn>
        <TableHeaderColumn onClick={() => handleSort(sortingEnabledColumnHeaders[4])}>
          <FormattedMessage {...messages.columnHeaderTime} />
          {columnToSort === sortingEnabledColumnHeaders[4] ? getSortIcon() : null}
        </TableHeaderColumn>
        {isExpanded &&
        <TableHeaderColumn onClick={() => handleSort(sortingEnabledColumnHeaders[5])}>
          <FormattedMessage {...messages.columnHeaderDescription} />
          {columnToSort === sortingEnabledColumnHeaders[5] ? getSortIcon() : null}
        </TableHeaderColumn>
        }
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
      </TableHeader>
    );
  }

  return (
    <div>
      <Table>
        {createTableHeaders()}
        {elements && elements.map((appointment) => {
          const addCommunicationMenuItem = (patientId && isPatientDetailsPage) ? {
            primaryText: <FormattedMessage {...messages.addCommunication} />,
            linkTo: {
              pathname: `${communicationBaseUrl}`,
              search: `?patientId=${patientId}&appointmentId=${appointment.logicalId}`,
            },
          } : null;
          const editAppointmentMenuItem = appointment.canEdit ? {
            primaryText: <FormattedMessage {...messages.editAppointment} />,
            linkTo: `${manageAppointmentUrl}/${appointment.logicalId}`,
          } : null;
          const menuItems = [
            addCommunicationMenuItem,
            editAppointmentMenuItem,
            {
              primaryText: <FormattedMessage {...messages.cancelAppointment} />,
              disabled: !appointment.canCancel,
              onClick: () => cancelAppointment(appointment.logicalId),
            },
            {
              primaryText: <FormattedMessage {...messages.acceptAppointment} />,
              disabled: !appointment.canAccept,
              onClick: () => acceptAppointment(appointment.logicalId),
            },
            {
              primaryText: <FormattedMessage {...messages.declineAppointment} />,
              disabled: !appointment.canDecline,
              onClick: () => declineAppointment(appointment.logicalId),
            },
            {
              primaryText: <FormattedMessage {...messages.tentativeAppointment} />,
              disabled: !appointment.canTentativelyAccept,
              onClick: () => tentativeAppointment(appointment.logicalId),
            },
          ];
          const appointmentType = find(appointmentTypes, { code: appointment.typeCode });
          return (
            <ExpansionTableRow
              key={appointment.logicalId}
              columns={getColumns()}
              role="button"
              tabIndex="0"
              expansionTableRowDetails={
                <AppointmentExpansionRowDetails
                  participants={appointment.participant}
                  locationObject={appointment.location}
                  appointmentType={appointmentType && appointmentType.display}
                />
              }
            >
              <TableRowColumn
                onClick={() => {
                  onAppointmentClick(appointment);
                }}
              >{getMyResponseIcon(appointment)}</TableRowColumn>
              {practitionerWorkspace &&
              <TableRowColumn
                textDecorationLine="underline"
                onClick={() => {
                  handlePatientNameClick(appointment.patient);
                }}
              >
                {appointment.patientName}
                </TableRowColumn>
              }
              {isExpanded &&
              <TableRowColumn
                onClick={() => {
                  onAppointmentClick(appointment);
                }}
              >
                {mapDisplayFromCode(appointmentTypes, appointment.typeCode)}
              </TableRowColumn>
              }
              <TableRowColumn
                onClick={() => {
                  onAppointmentClick(appointment);
                }}
              >{mapDisplayFromCode(appointmentStatuses, appointment.statusCode)}</TableRowColumn>
              <TableRowColumn
                onClick={() => {
                  onAppointmentClick(appointment);
                }}
              >{appointment.appointmentDate}</TableRowColumn>
              <TableRowColumn
                onClick={() => {
                  onAppointmentClick(appointment);
                }}
              >{appointment.appointmentDuration}</TableRowColumn>
              {isExpanded &&
              <TableRowColumn
                onClick={() => {
                  onAppointmentClick(appointment);
                }}
              >{appointment.description}</TableRowColumn>
              }
              <TableRowColumn>
                <NavigationIconMenu menuItems={menuItems} />
              </TableRowColumn>
            </ExpansionTableRow>
          );
        })}
      </Table>
    </div>
  );
}

function mapDisplayFromCode(appointmentLookup, key) {
  if (key) {
    const appointment = find(appointmentLookup, { code: key });
    return appointment && appointment.display;
  }
  return key;
}

AppointmentTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  elements: PropTypes.array.isRequired,
  size: PropTypes.object.isRequired,
  appointmentStatuses: PropTypes.array,
  appointmentTypes: PropTypes.array,
  cancelAppointment: PropTypes.func,
  onAppointmentClick: PropTypes.func,
  acceptAppointment: PropTypes.func,
  declineAppointment: PropTypes.func,
  tentativeAppointment: PropTypes.func,
  communicationBaseUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string,
  // enableEditAppointment: PropTypes.bool,
  isPatientWorkspace: PropTypes.bool,
  isPatientDetailsPage: PropTypes.bool,
  manageAppointmentUrl: PropTypes.string,
  handleSort: PropTypes.func,
  columnToSort: PropTypes.string,
  sortDirection: PropTypes.string,
  handlePatientNameClick: PropTypes.func,
};

export default sizeMeHOC(AppointmentTable);
