/**
 *
 * ManageTaskPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import Util from 'utils/Util';
import merge from 'lodash/merge';
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import ManageTask from 'components/ManageTask';
import { REQUEST_INTENT, REQUEST_PRIORITY, TASK_PERFORMER_TYPE, TASK_STATUS, TO_DO_DEFINITION } from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectPatientToDos } from 'containers/PatientToDos/selectors';
import { makeSelectRequestIntents, makeSelectRequestPriorities, makeSelectTaskPerformerTypes, makeSelectTaskStatuses } from 'containers/App/lookupSelectors';
import { getPractitionerIdByRole } from 'containers/App/helpers';
import makeSelectTasks from 'containers/Tasks/selectors';
import { makeSelectOrganization, makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectActivityDefinitions, makeSelectEventTypes, makeSelectPractitioner, makeSelectPractitioners, makeSelectSubTasks, makeSelectParentTask, makeSelectTasksByPatient } from './selectors';
import { createTask, getActivityDefinitions, getEventTypes, getPractitioners, getRequester, getSubTasks, getTaskById, getTasksByPatient, updateTask, getParentTask } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManageTaskPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { match, location, organization, user } = this.props;
    this.props.getLookups();
    const logicalId = match.params.id;

    if (logicalId) {
      // Edit of Main or Sub Tasks Scenario
      this.props.getTask(logicalId);
      // get sub tasks belonging to main task
      this.props.getSubTasks(logicalId);
    }

    const queryObj = queryString.parse(location.search);
    const patientId = queryObj.patientId;
    const parentId = queryObj.mainTaskId;
    if (parentId) {
      // Edit of Main or Sub Tasks Scenario
      this.props.getParentTask(parentId);
    }

    if (organization) {
      // get practitioners belonging to requester organization
      this.props.getPractitioners(organization.logicalId);
      const practitionerId = getPractitionerIdByRole(user);
      if (practitionerId) {
        // get practitioner details for the given practitioner
        this.props.getRequester(practitionerId);
        // get Activity Definitions-for for the given practitioner
        this.props.getActivityDefinitions(practitionerId);
      }
    }

    // get episode of cares for the given patient
    this.props.getEventTypes(patientId);
    // get the existing tasks for the patient
    this.props.getTasksByPatient(patientId);
  }

  handleSave(taskFormData, actions) {
    const taskDataToSubmit = {};
    const {
      activityDefinition, status, priority, intent, taskOwner, context, partOf, performerType, description, comments, taskStart, taskEnd,
    } = taskFormData;

    let reference = activityDefinition;
    taskDataToSubmit.definition = find(this.props.activityDefinitions, { reference });

    let code;
    code = status;
    taskDataToSubmit.status = find(this.props.taskStatus, { code });

    code = priority;
    taskDataToSubmit.priority = find(this.props.requestPriority, { code });

    code = intent;
    taskDataToSubmit.intent = find(this.props.requestIntent, { code });

    code = intent;
    taskDataToSubmit.intent = find(this.props.requestIntent, { code });

    code = performerType;
    taskDataToSubmit.performerType = find(this.props.taskPerformerType, { code });

    const creator = this.props.requester;
    reference = `Practitioner/${creator.logicalId}`;
    taskDataToSubmit.agent = find(this.props.practitioners, { reference });
    if (taskDataToSubmit.agent == null) {
      taskDataToSubmit.agent = {
        reference: `Practitioner/${creator.logicalId}`,
      };
    }

    reference = taskOwner;
    taskDataToSubmit.owner = find(this.props.practitioners, { reference });


    // patient
    const patientId = this.props.patient.id;
    const name = getResourceDisplayName(this.props.patient);
    taskDataToSubmit.beneficiary = {
      reference: `Patient/${patientId}`,
      display: name,
    };

    // creator organization -- assumption only one org per application context
    const selOrg = this.props.organization;
    taskDataToSubmit.organization = {
      reference: `Organization/${selOrg.logicalId}`,
      display: selOrg.name,
    };

    // Optional Fields
    if (context) {
      taskDataToSubmit.context = find(this.props.eventTypes, { reference: context });
    }

    if (partOf) {
      reference = partOf;
      taskDataToSubmit.partOf = find(this.props.tasksByPatient, { reference });
    }
    if (description) {
      taskDataToSubmit.description = description;
    }
    if (comments) {
      taskDataToSubmit.note = comments;
    }
    if (taskStart || taskEnd) {
      taskDataToSubmit.executionPeriod = {
        start: moment(taskStart).format('YYYY-MM-DD'),
        end:  moment(taskEnd).format('YYYY-MM-DD'),
      };
    }

    const logicalId = this.props.match.params.id;
    if (logicalId) {
      merge(taskDataToSubmit, { logicalId });
      this.props.updateTask(taskDataToSubmit, () => actions.setSubmitting(false));
    } else {
      this.props.createTask(taskDataToSubmit, () => actions.setSubmitting(false));
    }
  }

  render() {
    const {
      tasks,
      match,
      taskStatus,
      requestIntent,
      requestPriority,
      taskPerformerType,
      eventTypes,
      patient,
      organization,
      activityDefinitions,
      practitioners,
      requester,
      tasksByPatient,
      subTasks,
      toDoSubTasks,
      todoParentTask,
    } = this.props;
    let logicalId = match.params.id;
    let currentTask = null;
    const queryObj = queryString.parse(location.search);
    const isMainTask = queryObj.isMainTask === 'true';
    let filteredActivityDefinitions = activityDefinitions;
    if (logicalId && tasks) {
      if (isMainTask) {
        currentTask = find(tasks.data, { logicalId });
        filteredActivityDefinitions = activityDefinitions && activityDefinitions.filter((activityDefinition) => activityDefinition.display !== TO_DO_DEFINITION);
      } else {
        currentTask = subTasks && find(subTasks, { logicalId });
        if (currentTask === undefined) {
          currentTask = toDoSubTasks && find(toDoSubTasks, { logicalId });
        } else {
          filteredActivityDefinitions = activityDefinitions && activityDefinitions.filter((activityDefinition) => activityDefinition.display !== TO_DO_DEFINITION);
        }
      }
    } else if (isMainTask) {
      filteredActivityDefinitions = activityDefinitions && activityDefinitions.filter((activityDefinition) => activityDefinition.display !== TO_DO_DEFINITION);
    }
    logicalId = queryObj.mainTaskId;
    const editMode = !isUndefined(match.params.id);
    let parentTask = null;
    //  sub task or todo sub task
    if (logicalId) {
      parentTask = tasks && find(tasks.data, { logicalId });
      if(parentTask===undefined || parentTask === null){
        parentTask = todoParentTask;
      }
    }
    let titleHeader;
    if (editMode && isMainTask) {
      titleHeader = <FormattedMessage {...messages.updateMainHeader} />;
    } else if (editMode && !isMainTask) {
      titleHeader = <FormattedMessage {...messages.updateSubHeader} />;
    } else if (!editMode && isMainTask) {
      titleHeader = <FormattedMessage {...messages.createMainHeader} />;
    } else if (!editMode && !isMainTask) {
      titleHeader = <FormattedMessage {...messages.createSubHeader} />;
    }


    const taskProps = {
      taskStatus,
      requestIntent,
      requestPriority,
      taskPerformerType,
      eventTypes,
      patient,
      organization,
      activityDefinitions: filteredActivityDefinitions,
      practitioners,
      requester,
      editMode,
      currentTask,
      tasksByPatient,
      isMainTask,
      parentTask,
      subTasks,
      toDoSubTasks,
    };

    return (
      <Page>
        <Helmet>
          <title>Manage Task</title>
          <meta name="description" content="Manage Task page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={titleHeader}
        />
        <PageContent>
          <ManageTask {...taskProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageTaskPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  getLookups: PropTypes.func.isRequired,
  getRequester: PropTypes.func,
  getPractitioners: PropTypes.func.isRequired,
  getEventTypes: PropTypes.func.isRequired,
  getActivityDefinitions: PropTypes.func.isRequired,
  getTasksByPatient: PropTypes.func.isRequired,
  getParentTask: PropTypes.func.isRequired,
  organization: PropTypes.object,
  tasksByPatient: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  }))),
  tasks: PropTypes.any,
  subTasks: PropTypes.any,
  todoParentTask: PropTypes.any,
  practitioners: PropTypes.any,
  requester: PropTypes.object,
  activityDefinitions: PropTypes.array,
  taskStatus: PropTypes.array,
  requestIntent: PropTypes.array,
  requestPriority: PropTypes.array,
  taskPerformerType: PropTypes.array,
  eventTypes: PropTypes.array,
  toDoSubTasks: PropTypes.array,
  location: PropTypes.object,
  patient: PropTypes.object,
  createTask: PropTypes.func,
  getTask: PropTypes.func,
  updateTask: PropTypes.func,
  getSubTasks: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  taskStatus: makeSelectTaskStatuses(),
  requestIntent: makeSelectRequestIntents(),
  requestPriority: makeSelectRequestPriorities(),
  taskPerformerType: makeSelectTaskPerformerTypes(),
  eventTypes: makeSelectEventTypes(),
  patient: makeSelectPatient(),
  organization: makeSelectOrganization(),
  activityDefinitions: makeSelectActivityDefinitions(),
  practitioners: makeSelectPractitioners(),
  requester: makeSelectPractitioner(),
  tasks: makeSelectTasks(),
  subTasks: makeSelectSubTasks(),
  todoParentTask: makeSelectParentTask(),
  tasksByPatient: makeSelectTasksByPatient(),
  toDoSubTasks: makeSelectPatientToDos(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([TASK_STATUS, REQUEST_INTENT, REQUEST_PRIORITY, TASK_PERFORMER_TYPE])),
    getRequester: (practitionerId) => dispatch(getRequester(practitionerId)),
    getActivityDefinitions: (practitionerId) => dispatch(getActivityDefinitions(practitionerId)),
    getTasksByPatient: (patientId) => dispatch(getTasksByPatient(patientId)),
    getEventTypes: (patientId) => dispatch(getEventTypes(patientId)),
    getPractitioners: (organizationId) => dispatch(getPractitioners(organizationId)),
    createTask: (taskFormData, handleSubmitting) => dispatch(createTask(taskFormData, handleSubmitting)),
    getTask: (logicalId) => dispatch(getTaskById(logicalId)),
    getSubTasks: (logicalId) => dispatch(getSubTasks(logicalId)),
    getParentTask: (logicalId) => dispatch(getParentTask(logicalId)),
    updateTask: (taskFormData, handleSubmitting) => dispatch(updateTask(taskFormData, handleSubmitting)),
  };
}

function getResourceDisplayName(resource) {
  let name = {};
  if (resource.name.length > 0) {
    const fName = resource.name[0];
    const firstName = Util.setEmptyStringWhenUndefined(fName.firstName);
    const lastName = Util.setEmptyStringWhenUndefined(fName.lastName);
    name = `${firstName} ${lastName}`;
  }
  return name;
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageTaskPage', reducer });
const withSaga = injectSaga({ key: 'manageTaskPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageTaskPage);
