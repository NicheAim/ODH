/**
 *
 * PatientAppointments
 *
 */

import CenterAlign from 'components/Align/CenterAlign';
import AppointmentTable from 'components/AppointmentTable';
import Card from 'components/Card';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import ContentSection from 'components/ContentSection';
import FilterSection from 'components/FilterSection';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import NoResultsFoundText from 'components/NoResultsFoundText';
import { PanelToolbar } from 'components/PanelToolbar';
import RecordsRange from 'components/RecordsRange';
import StatusCheckbox from 'components/StatusCheckbox';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import { getLookupsAction } from 'containers/App/actions';
import {
  APPOINTMENT_STATUS,
  APPOINTMENT_TYPE,
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_APPOINTMENT_URL,
  MANAGE_COMMUNICATION_URL,
} from 'containers/App/constants';
import { makeSelectOrganization, makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectAppointmentStatuses, makeSelectAppointmentTypes } from 'containers/App/lookupSelectors';

import { makeSelectLocation } from 'containers/App/selectors';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Cell } from 'styled-css-grid';
import { ASC, DESC } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import CommunicationsTableDialog from 'components/CommunicationsTableDialog/index';
import Util from 'utils/Util';
import {
  acceptPatientAppointment,
  cancelPatientAppointment,
  declinePatientAppointment,
  getPatientAppointments,
  tentativePatientAppointment,
  getAppointmentRelatedCommunications,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectPatientAppointments,
  makeSelectShowPastAppointments,
  makeSelectCommunicationsByAppointment,
} from './selectors';


export class PatientAppointments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      panelHeight: 0,
      filterHeight: 0,
      open: false,
      columnToSort: '',
      sortDirection: DESC,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.acceptAppointment = this.acceptAppointment.bind(this);
    this.declineAppointment = this.declineAppointment.bind(this);
    this.tentativeAppointment = this.tentativeAppointment.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
    this.handleAppointmentRowClick = this.handleAppointmentRowClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleCommunicationPageClick = this.handleCommunicationPageClick.bind(this);
  }

  componentDidMount() {
    this.props.getUpcomingAppointments({
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
    this.props.getLookupData();
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handleFilterResize(size) {
    this.setState({ filterHeight: size.height });
  }

  handlePageClick(page) {
    this.props.getUpcomingAppointments({ pageNumber: page });
  }

  handleCommunicationPageClick(page) {
    // TODO handle pagination
    console.log(page);
  }

  handleSort(columnName) {
    this.setState({ columnToSort: columnName });
    this.setState({ sortDirection: this.state.columnToSort === columnName ? Util.invertSortDirection(this.state.sortDirection) : ASC });
  }

  handleAppointmentRowClick(appointment) {
    const { patient } = this.props;
    this.props.getAppointmentRelatedCommunications(patient.id, appointment.logicalId, DEFAULT_START_PAGE_NUMBER);
    this.setState({ open: true });
  }

  handleDialogClose() {
    this.setState({ open: false });
  }

  handleCheck(event, checked) {
    const patientId = this.props.patient ? this.props.patient.id : null;
    const practitionerId = (this.props.user && this.props.user.fhirResource) ? this.props.user.fhirResource.logicalId : null;
    if (!isUndefined(patientId) && patientId != null) {
      this.props.getUpcomingAppointments({
        pageNumber: DEFAULT_START_PAGE_NUMBER,
        showPastAppointments: checked,
        patientId,
      });
    } else {
      this.props.getUpcomingAppointments({
        pageNumber: DEFAULT_START_PAGE_NUMBER,
        practitionerId,
        showPastAppointments: checked,
      });
    }
  }

  cancelAppointment(logicalId) {
    this.props.cancelAppointment(logicalId);
  }

  acceptAppointment(logicalId) {
    this.props.acceptAppointment(logicalId, {
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
  }

  declineAppointment(logicalId) {
    this.props.declineAppointment(logicalId, {
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
  }

  tentativeAppointment(logicalId) {
    this.props.tentativeAppointment(logicalId, {
      pageNumber: DEFAULT_START_PAGE_NUMBER,
      showPastAppointments: false,
    });
  }

  render() {
    const communicationBaseUrl = MANAGE_COMMUNICATION_URL;
    const manageAppointmentUrl = MANAGE_APPOINTMENT_URL;
    const { patientAppointments: { loading, data }, appointmentTypes, appointmentStatuses, communications, patient } = this.props;
    // console.log(communications);
    // console.log(patient);
    const patientId = this.props.patient ? this.props.patient.id : null;
    const showPastAppFilter = true;
    const addNewItem = {
      addNewItem: {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        linkUrl: MANAGE_APPOINTMENT_URL,
      },
    };
    const { pathname } = this.props.location;
    const isPatientWorkspace = pathname && pathname.indexOf('/patient-workspace') > 0;
    const isPatientDetailsPage = pathname && pathname.indexOf('/patients/') > 0;
    return (
      <div>
        <Card>
          <PanelToolbar
            {...addNewItem}
            allowedAddNewItemRoles={[CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE]}
            showSearchIcon={false}
            showUploadIcon={false}
            showSettingIcon={false}
            showFilterIcon={false}
            onSize={this.handlePanelResize}
          />
          <LinearProgressIndicator loading={loading} />
          <ContentSection>
            {showPastAppFilter &&
            <SizedStickyDiv onSize={this.handleFilterResize} top={`${this.state.panelHeight}px`}>
              <FilterSection>
                <CheckboxFilterGrid>
                  <Cell>
                    <StatusCheckbox
                      messages={messages.showPastAppointments}
                      elementId="showPastAppointmentsCheckBox"
                      checked={this.props.showPastAppointments}
                      handleCheck={this.handleCheck}
                    />
                  </Cell>
                </CheckboxFilterGrid>
              </FilterSection>
            </SizedStickyDiv>
            }
            {!loading && isEmpty(data) &&
            <NoResultsFoundText>{
              <FormattedMessage {...messages.noUpcomingAppointments} />}</NoResultsFoundText>}
            {!isEmpty(data) && !isEmpty(data.elements) &&
            <CenterAlign>
              <AppointmentTable
                elements={orderBy(data.elements, this.state.columnToSort, this.state.sortDirection)}
                appointmentStatuses={appointmentStatuses}
                appointmentTypes={appointmentTypes}
                cancelAppointment={this.cancelAppointment}
                acceptAppointment={this.acceptAppointment}
                declineAppointment={this.declineAppointment}
                tentativeAppointment={this.tentativeAppointment}
                patientId={patientId}
                communicationBaseUrl={communicationBaseUrl}
                manageAppointmentUrl={manageAppointmentUrl}
                relativeTop={this.state.panelHeight + this.state.filterHeight}
                isPatientWorkspace={isPatientWorkspace}
                isPatientDetailsPage={isPatientDetailsPage}
                handleSort={this.handleSort}
                columnToSort={this.state.columnToSort}
                sortDirection={this.state.sortDirection}
                onAppointmentClick={this.handleAppointmentRowClick}
              />
              <CenterAlignedUltimatePagination
                currentPage={data.currentPage}
                totalPages={data.totalNumberOfPages}
                onChange={this.handlePageClick}
              />
              <RecordsRange
                currentPage={data.currentPage}
                totalPages={data.totalNumberOfPages}
                totalElements={data.totalElements}
                currentPageSize={data.currentPageSize}
              />
            </CenterAlign>
            }
          </ContentSection>
        </Card>

        <CommunicationsTableDialog
          isLoading={false}
          open={this.state.open}
          handleDialogClose={this.handleDialogClose}
          data={communications}
          selectedPatient={patient}
          handleChangePage={this.handleCommunicationPageClick}
          manageCommunicationBaseUrl={communicationBaseUrl}
        ></CommunicationsTableDialog>

      </div>
    );
  }
}

PatientAppointments.propTypes = {
  getUpcomingAppointments: PropTypes.func.isRequired,
  getAppointmentRelatedCommunications: PropTypes.func.isRequired,
  getLookupData: PropTypes.func.isRequired,
  appointmentTypes: PropTypes.array,
  appointmentStatuses: PropTypes.array,
  patientAppointments: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      elements: PropTypes.array,
    }),
  }),
  cancelAppointment: PropTypes.func.isRequired,
  acceptAppointment: PropTypes.func.isRequired,
  declineAppointment: PropTypes.func.isRequired,
  tentativeAppointment: PropTypes.func.isRequired,
  patient: PropTypes.object,
  location: PropTypes.object.isRequired,
  user: PropTypes.object,
  showPastAppointments: PropTypes.bool,
  communications: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  patientAppointments: makeSelectPatientAppointments(),
  appointmentTypes: makeSelectAppointmentTypes(),
  appointmentStatuses: makeSelectAppointmentStatuses(),
  user: makeSelectUser(),
  showPastAppointments: makeSelectShowPastAppointments(),
  patient: makeSelectPatient(),
  location: makeSelectLocation(),
  organization: makeSelectOrganization(),
  communications: makeSelectCommunicationsByAppointment(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUpcomingAppointments: (query, showPastAppointments) => dispatch(getPatientAppointments(query, showPastAppointments)),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    cancelAppointment: (id) => dispatch(cancelPatientAppointment(id)),
    acceptAppointment: (id, query) => dispatch(acceptPatientAppointment(id, query)),
    declineAppointment: (id, query) => dispatch(declinePatientAppointment(id, query)),
    tentativeAppointment: (id, query) => dispatch(tentativePatientAppointment(id, query)),
    getAppointmentRelatedCommunications: (patient, appointmentId, pageNumber) => dispatch(getAppointmentRelatedCommunications(patient, appointmentId, pageNumber)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'patientAppointments', reducer });
const withSaga = injectSaga({ key: 'patientAppointments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PatientAppointments);
