/**
 *
 * ManageCommunicationPage
 *
 */

import ManageCommunication from 'components/ManageCommunication';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import PageHeader from 'components/PageHeader';

import { getLookupsAction } from 'containers/App/actions';
import { COMMUNICATION_CATEGORY, COMMUNICATION_MEDIUM, COMMUNICATION_NOT_DONE_REASON, COMMUNICATION_STATUS, DATE_PICKER_MODE } from 'containers/App/constants';
import { makeSelectOrganization, makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectCommunicationCategories, makeSelectCommunicationMedia, makeSelectCommunicationNotDoneReasons, makeSelectCommunicationStatus } from 'containers/App/lookupSelectors';
import makeSelectCommunications from 'containers/Communications/selectors';
import { makeSelectEpisodeOfCares, makeSelectPractitioner } from 'containers/ManageCommunicationPage/selectors';
import { makeSelectPatientAppointments } from 'containers/PatientAppointments/selectors';
import SearchRecipient from 'containers/SearchRecipient';
import { removeSelectedRecipient } from 'containers/SearchRecipient/actions';
import { makeSelectTasks } from 'containers/Tasks/selectors';
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getPractitionerIdByRole } from 'containers/App/helpers';
import { makeSelectPatientToDos } from 'containers/PatientToDos/selectors';
import { createCommunication, getEpisodeOfCares, getPractitioner, updateCommunication } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';


export class ManageCommunicationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleRemoveRecipient = this.handleRemoveRecipient.bind(this);
  }

  componentDidMount() {
    const { user, selectedPatient, organization } = this.props;
    const practitionerId = getPractitionerIdByRole(user);
    if (practitionerId) {
      this.props.getPractitioner(practitionerId);
    }
    this.props.getLookups();
    this.props.getEpisodeOfCares(selectedPatient.id, organization.logicalId);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleSave(communication, actions) {
    const logicalId = this.props.match.params.id;
    if (logicalId && communication) {
      const mergedCommunication = merge(communication, { logicalId });
      this.props.updateCommunication(mergedCommunication, this.props.selectedPatient.id, () => actions.setSubmitting(false));
    } else {
      this.props.createCommunication(communication, this.props.selectedPatient.id, () => actions.setSubmitting(false));
    }
  }

  handleRemoveRecipient(checked, recipientReference) {
    this.props.removeSelectedRecipient(checked, recipientReference);
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const editingCommunication = false;
    const {
      match,
      communications,
      communicationStatus,
      communicationCategories,
      communicationNotDoneReasons,
      communicationMedia,
      episodeOfCares,
      selectedPatient,
      location,
      tasks,
      appointments,
      practitioner,
      toDos,
    } = this.props;
    const logicalId = match.params.id;
    const editMode = !isUndefined(match.params.id);
    const communication = find(communications.data.elements, { logicalId });
    let selectedTask = null;
    if (location && location.search && tasks && tasks.data) {
      const queryObj = queryString.parse(location.search);
      const taskId = queryObj.taskId;
      selectedTask = find(tasks.data, { logicalId: taskId });
    }

    let selectedAppointment = null;
    if (location && location.search && appointments && appointments.data && appointments.data.elements) {
      const queryObj = queryString.parse(location.search);
      const appointmentId = queryObj.appointmentId;
      selectedAppointment = find(appointments.data.elements, { logicalId: appointmentId });
    }

    let selectedToDo = null;
    if (location && location.search && toDos) {
      const queryObj = queryString.parse(location.search);
      const toDoLogicalId = queryObj.toDoLogicalId;
      selectedToDo = find(toDos, { logicalId: toDoLogicalId });
    }

    const datePickerMode = DATE_PICKER_MODE;
    const manageCommunicationProps = {
      communicationStatus,
      communicationCategories,
      communicationNotDoneReasons,
      communicationMedia,
      episodeOfCares,
      selectedPatient,
      communication,
      practitioner,
      editMode,
      selectedTask,
      selectedAppointment,
      selectedToDo,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Communication</title>
          <meta name="description" content="Manage Communication page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={editingCommunication ?
            <FormattedMessage {...messages.updateModeTitle} /> :
            <FormattedMessage {...messages.createModeTitle} />}
          subtitle={<FormattedMessage {...messages.subtitle} />}
        />
        <PageContent>
          <ManageCommunication
            onSave={this.handleSave}
            datePickerMode={datePickerMode}
            {...manageCommunicationProps}
            handleOpen={this.handleOpen}
            handleRemoveRecipient={this.handleRemoveRecipient}
          >
          </ManageCommunication>
          <SearchRecipient
            communicationId={logicalId}
            isOpen={this.state.open}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
          >
          </SearchRecipient>
        </PageContent>
      </Page>
    );
  }
}

ManageCommunicationPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  selectedPatient: PropTypes.object.isRequired,
  getLookups: PropTypes.func.isRequired,
  getPractitioner: PropTypes.func.isRequired,
  createCommunication: PropTypes.func.isRequired,
  updateCommunication: PropTypes.func.isRequired,
  removeSelectedRecipient: PropTypes.func.isRequired,
  communicationStatus: PropTypes.array.isRequired,
  toDos: PropTypes.array,
  episodeOfCares: PropTypes.array.isRequired,
  communicationCategories: PropTypes.array.isRequired,
  communicationNotDoneReasons: PropTypes.array.isRequired,
  communicationMedia: PropTypes.array.isRequired,
  tasks: PropTypes.object,
  appointments: PropTypes.object,
  communications: PropTypes.object,
  getEpisodeOfCares: PropTypes.func.isRequired,
  user: PropTypes.object,
  practitioner: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedPatient: makeSelectPatient(),
  communicationStatus: makeSelectCommunicationStatus(),
  communicationCategories: makeSelectCommunicationCategories(),
  communicationNotDoneReasons: makeSelectCommunicationNotDoneReasons(),
  communicationMedia: makeSelectCommunicationMedia(),
  episodeOfCares: makeSelectEpisodeOfCares(),
  practitioner: makeSelectPractitioner(),
  communications: makeSelectCommunications(),
  tasks: makeSelectTasks(),
  appointments: makeSelectPatientAppointments(),
  user: makeSelectUser(),
  organization: makeSelectOrganization(),
  toDos: makeSelectPatientToDos(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([COMMUNICATION_STATUS, COMMUNICATION_CATEGORY, COMMUNICATION_NOT_DONE_REASON, COMMUNICATION_MEDIUM])),
    createCommunication: (communication, patientId, handleSubmitting) => dispatch(createCommunication(communication, patientId, handleSubmitting)),
    updateCommunication: (communication, patientId, handleSubmitting) => dispatch(updateCommunication(communication, patientId, handleSubmitting)),
    getEpisodeOfCares: (patientId, organizationId) => dispatch(getEpisodeOfCares(patientId, organizationId)),
    removeSelectedRecipient: (checked, recipientReference) => dispatch(removeSelectedRecipient(checked, recipientReference)),
    getPractitioner: (practitionerId) => dispatch(getPractitioner(practitionerId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageCommunicationPage', reducer });
const withSaga = injectSaga({ key: 'manageCommunicationPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageCommunicationPage);
