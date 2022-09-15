/**
 *
 * ManageAppointmentPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { mapToPatientName } from 'utils/PatientUtils';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { APPOINTMENT_PARTICIPANT_REQUIRED, APPOINTMENT_STATUS, APPOINTMENT_TYPE } from 'containers/App/constants';
import {
  makeSelectAppointmentParticipationRequired,
  makeSelectAppointmentStatuses,
  makeSelectAppointmentTypes,
} from 'containers/App/lookupSelectors';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import ManageAppointment from 'components/ManageAppointment';
import { getAppointment, initializeManageAppointment, saveAppointment } from './actions';
import { makeSelectAppointment } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class ManageAppointmentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const appointmentId = this.props.match.params.id;
    if (appointmentId) {
      this.props.getAppointment(appointmentId);
    }
  }

  componentWillUnmount() {
    this.props.initializeManageAppointment();
  }

  handleSave(appointmentFormData, actions) {
    const patientId = this.props.patient.id;
    const practitionerId = (this.props.user && this.props.user.fhirResource) ? this.props.user.fhirResource.logicalId : null;
    if (practitionerId) {
      merge(appointmentFormData, { practitionerId });
    }
    const practitionerName = mapToPatientName(this.props.user.fhirResource);
    if (practitionerName) {
      merge(appointmentFormData, { practitionerName });
    }
    if (patientId) {
      merge(appointmentFormData, { patientId });
    }
    const patientName = mapToPatientName(this.props.patient);
    if (patientName) {
      merge(appointmentFormData, { patientName });
    }
    const appointmentId = this.props.match.params.id;
    if (appointmentId) {
      merge(appointmentFormData, { appointmentId });
    }

    // Add Appointment Type
    const { appointmentType } = appointmentFormData;
    if (!isUndefined(appointmentType)) {
      const selectedType = find(this.props.appointmentTypes, { code: appointmentType });
      const appType = [];
      appType.push(selectedType);
      merge(appointmentFormData, { appointmentType: appType }); // Adding the field as object
    }
    this.props.saveAppointment(appointmentFormData, () => actions.setSubmitting(false));
  }

  render() {
    const {
      match,
      patient,
      appointmentStatuses,
      appointmentTypes,
      selectedAppointment,
      appointmentParticipantRequired,
    } = this.props;
    const editMode = !isUndefined(match.params.id);
    let appointment = null;
    if (editMode && selectedAppointment) {
      appointment = selectedAppointment;
    }

    const manageAppointmentProps = {
      patient,
      appointment,
      editMode,
      appointmentStatuses,
      appointmentTypes,
      appointmentParticipantRequired,
    };

    return (
      <Page>
        <Helmet>
          <title>Manage Appointment</title>
          <meta name="description" content="Manage Appointment" />
        </Helmet>
        <PageHeader
          title={editMode ?
            <FormattedMessage {...messages.updateTitle} />
            : <FormattedMessage {...messages.createTitle} />}
          subtitle={<FormattedMessage {...messages.generalInfoTitle} />}
        />
        <ManageAppointment{...manageAppointmentProps} onSave={this.handleSave} />
      </Page>
    );
  }
}

ManageAppointmentPage.propTypes = {
  match: PropTypes.object,
  getLookups: PropTypes.func.isRequired,
  getAppointment: PropTypes.func.isRequired,
  saveAppointment: PropTypes.func.isRequired,
  patient: PropTypes.object,
  user: PropTypes.object,
  initializeManageAppointment: PropTypes.func.isRequired,
  appointmentStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  appointmentTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  selectedAppointment: PropTypes.object,
  appointmentParticipantRequired: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  patient: makeSelectPatient(),
  selectedAppointment: makeSelectAppointment(),
  appointmentStatuses: makeSelectAppointmentStatuses(),
  appointmentTypes: makeSelectAppointmentTypes(),
  appointmentParticipantRequired: makeSelectAppointmentParticipationRequired(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManageAppointment: () => dispatch(initializeManageAppointment()),
    getLookups: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE, APPOINTMENT_PARTICIPANT_REQUIRED])),
    saveAppointment: (appointmentFormData, handleSubmitting) => dispatch(saveAppointment(appointmentFormData, handleSubmitting)),
    getAppointment: (appointmentId) => dispatch(getAppointment(appointmentId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageAppointmentPage', reducer });
const withSaga = injectSaga({ key: 'manageAppointmentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageAppointmentPage);
