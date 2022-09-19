/**
 *
 * AddAppointmentParticipant
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLookupsAction } from 'containers/App/actions';
import { APPOINTMENT_PARTICIPANT_REQUIRED, DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { makeSelectOrganization, makeSelectPatient } from 'containers/App/contextSelectors';
import { makeSelectAppointmentParticipationRequired } from 'containers/App/lookupSelectors';
import { getLogicalIdFromReference } from 'containers/App/helpers';
import AddAppointmentParticipantModal from 'components/AddAppointmentParticipantModal';
import {
  getHealthcareServiceReferences,
  getLocationReferences,
  getPractitionerReferences,
  initializeParticipantReferences,
  searchParticipantReferences,
} from './actions';
import {
  makeSelectHealthcareServiceReferences,
  makeSelectLocationReferences,
  makeSelectPractitionerReferences,
  makeSelectSearchParticipantReferences,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

export class AddAppointmentParticipant extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleInitializeParticipantReferences = this.handleInitializeParticipantReferences.bind(this);
    this.handleGetAvailableLocations = this.handleGetAvailableLocations.bind(this);
    this.handleGetAvailableHealthcareServices = this.handleGetAvailableHealthcareServices.bind(this);
    this.handleGetAvailablePractitioners = this.handleGetAvailablePractitioners.bind(this);
    this.handleSearchParticipantReferences = this.handleSearchParticipantReferences.bind(this);
  }

  componentDidMount() {
    this.handleInitializeParticipantReferences();
  }

  handleInitializeParticipantReferences() {
    const { organization } = this.props;
    this.props.getLookups();
    if (organization) {
      const resourceValue = organization.logicalId;
      this.props.initializeParticipantReferences(resourceValue);
    }
  }

  handleGetAvailableLocations(resourceType, resourceReferenceValue) {
    const resourceValue = getLogicalIdFromReference(resourceReferenceValue);
    if (resourceValue) {
      this.props.getLocationReferences(resourceType, resourceValue);
    }
  }

  handleGetAvailableHealthcareServices(resourceType, resourceReferenceValue) {
    const resourceValue = getLogicalIdFromReference(resourceReferenceValue);
    if (resourceValue) {
      this.props.getHealthcareServiceReferences(resourceType, resourceValue);
    }
  }

  handleGetAvailablePractitioners(resourceType, resourceReferenceValue) {
    const resourceValue = getLogicalIdFromReference(resourceReferenceValue);
    if (resourceValue) {
      this.props.getPractitionerReferences(resourceType, resourceValue);
    }
  }

  handleSearchParticipantReferences(searchType, searchValue, actions) {
    const { patient, organization } = this.props;
    const patientId = patient.id;
    const organizationId = organization.logicalId;
    this.props.searchParticipantReferences(searchType, searchValue, patientId, organizationId, DEFAULT_START_PAGE_NUMBER, () => actions.setSubmitting(false));
  }

  render() {
    const {
      formErrors,
      participants,
      healthcareServices,
      locations,
      practitioners,
      participantReferences,
      appointmentParticipantAttendance,
    } = this.props;

    return (
      (!isEmpty(healthcareServices) || !isEmpty(practitioners) || !isEmpty(locations)) &&
      <AddAppointmentParticipantModal
        errors={formErrors}
        participants={participants}
        healthcareServices={healthcareServices}
        locations={locations}
        practitioners={practitioners}
        participantReferences={participantReferences}
        participantAttendance={appointmentParticipantAttendance}
        onInitializeParticipantReferences={this.handleInitializeParticipantReferences}
        onGetAvailableLocations={this.handleGetAvailableLocations}
        onGetAvailableHealthcareServices={this.handleGetAvailableHealthcareServices}
        onGetAvailablePractitioners={this.handleGetAvailablePractitioners}
        onSearchParticipantReferences={this.handleSearchParticipantReferences}
      />
    );
  }
}

AddAppointmentParticipant.propTypes = {
  getLookups: PropTypes.func.isRequired,
  healthcareServices: PropTypes.array,
  locations: PropTypes.array,
  appointmentParticipantAttendance: PropTypes.array,
  practitioners: PropTypes.array,
  participantReferences: PropTypes.shape({
    loading: PropTypes.bool,
    outsideParticipants: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }),
  initializeParticipantReferences: PropTypes.func.isRequired,
  getHealthcareServiceReferences: PropTypes.func.isRequired,
  getPractitionerReferences: PropTypes.func.isRequired,
  getLocationReferences: PropTypes.func.isRequired,
  searchParticipantReferences: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  formErrors: PropTypes.object,
  participants: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string,
    participantRequiredCode: PropTypes.string,
    participantStatusCode: PropTypes.string,
    participationTypeCode: PropTypes.string,
    reference: PropTypes.string,
  })),
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
  organization: makeSelectOrganization(),
  healthcareServices: makeSelectHealthcareServiceReferences(),
  locations: makeSelectLocationReferences(),
  practitioners: makeSelectPractitionerReferences(),
  participantReferences: makeSelectSearchParticipantReferences(),
  appointmentParticipantAttendance: makeSelectAppointmentParticipationRequired(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([APPOINTMENT_PARTICIPANT_REQUIRED])),
    initializeParticipantReferences: (resourceValue) => dispatch(initializeParticipantReferences(resourceValue)),
    getHealthcareServiceReferences: (resourceType, resourceValue) => dispatch(getHealthcareServiceReferences(resourceType, resourceValue)),
    getLocationReferences: (resourceType, resourceValue) => dispatch(getLocationReferences(resourceType, resourceValue)),
    getPractitionerReferences: (resourceType, resourceValue) => dispatch(getPractitionerReferences(resourceType, resourceValue)),
    searchParticipantReferences: (searchType, searchValue, patientId, organizationId, currentPage, handleSubmitting) => dispatch(searchParticipantReferences(searchType, searchValue, patientId, organizationId, currentPage, handleSubmitting)),
  };
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'addAppointmentParticipant', reducer });
const withSaga = injectSaga({ key: 'addAppointmentParticipant', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddAppointmentParticipant);
