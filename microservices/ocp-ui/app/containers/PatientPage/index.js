/**
 *
 * PatientPage
 *
 */

import renderCalendarComponent from 'components/Calendar/render';
import GoldenLayout from 'components/GoldenLayout';
import Page from 'components/Page';
import PatientDetails from 'components/PatientDetails';
import { getPatient, refreshPatient } from 'containers/App/contextActions';
import {
  makeSelectPatient,
  makeSelectUser,
} from 'containers/App/contextSelectors';
import renderAttachmentsComponent from 'containers/Attachments/render';
import renderCareTeamsComponent from 'containers/CareTeams/render';
import renderCommunicationsComponent from 'containers/Communications/render';
import renderCoverageComponent from 'containers/Coverages/render';
import renderGoalsBehavioralComponent from 'containers/GoalsBehavioral/render';
import renderGoalsMedicalComponent from 'containers/GoalsMedical/render';
import renderGoalsSocialComponent from 'containers/GoalsSocial/render';
import renderObservationsComponent from 'containers/Observations/render';
import renderConditionsComponent from 'containers/Conditions/render';
import renderPatientAppointmentsComponent from 'containers/PatientAppointments/render';
import renderPatientToDosComponent from 'containers/PatientToDos/render';
import { flattenPatientData } from 'containers/PatientWorkspacePage/helpers';
import renderRelatedPersonsComponent from 'containers/RelatedPersons/render';
import SmartAppLauncher from 'containers/SmartAppLauncher';
import renderTasksComponent from 'containers/Tasks/render';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { ORGANIZATION_ADMIN_ROLE_CODE } from '../App/constants';
import { makeSelectGoals } from '../Goals/selectors';
import { actions } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPatientPage } from './selectors';

export const orgAdminStateMetadata = {
  settings: {
    hasHeaders: true,
    constrainDragToContainer: false,
    reorderEnabled: true,
    selectionEnabled: false,
    popoutWholeStack: false,
    blockedPopoutsThrowError: true,
    closePopoutsOnUnload: true,
    showPopoutIcon: false,
    showMaximiseIcon: true,
    showCloseIcon: true,
    responsiveMode: 'onload',
    tabOverlapAllowance: 0,
    reorderOnTabMenuClick: true,
    tabControlOffset: 10,
  },
  dimensions: {
    borderWidth: 10,
    minItemHeight: 400,
    minItemWidth: 200,
    headerHeight: 30,
    dragProxyWidth: 300,
    dragProxyHeight: 200,
  },
  labels: {
    close: 'close',
    maximise: 'maximise',
    minimise: 'minimise',
    popout: 'open in new window',
    popin: 'pop in',
    tabDropdown: 'additional tabs',
  },
  content: [
    {
      type: 'column',
      content: [
        {
          type: 'row',
          height: 50,
          content: [
            {
              type: 'column',
              content: [
                {
                  type: 'stack',
                  content: [
                    {
                      title: 'Medical Referral',
                      type: 'component',
                      componentName: 'goalsMedical',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Behavioral Health',
                      type: 'component',
                      componentName: 'goalsBehavioral',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Social Services',
                      type: 'component',
                      componentName: 'goalsSocial',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'row',
          height: 50,
          content: [
            {
              type: 'column',
              content: [
                {
                  type: 'stack',
                  content: [
                    {
                      title: "Careteam's Tasks",
                      type: 'component',
                      componentName: 'tasks',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Attachments',
                      type: 'component',
                      componentName: 'attachments',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Observations',
                      type: 'component',
                      componentName: 'observations',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Conditions',
                      type: 'component',
                      componentName: 'conditions',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'row',
          height: 50,
          content: [
            {
              type: 'column',
              content: [
                {
                  type: 'stack',
                  content: [
                    {
                      title: "Client's Care teams",
                      type: 'component',
                      componentName: 'careTeams',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Related Persons',
                      type: 'component',
                      componentName: 'relatedPersons',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: "Client's Communications",
                      type: 'component',
                      componentName: 'communications',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: "Client's Insurance/Benefits",
                      type: 'component',
                      componentName: 'coverage',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  isClosable: true,
  reorderEnabled: true,
  title: '',
  openPopouts: [],
  maximisedItemId: null,
};

export const defaultRoleStateMetadata = {
  settings: {
    hasHeaders: true,
    constrainDragToContainer: false,
    reorderEnabled: true,
    selectionEnabled: false,
    popoutWholeStack: false,
    blockedPopoutsThrowError: true,
    closePopoutsOnUnload: true,
    showPopoutIcon: false,
    showMaximiseIcon: true,
    showCloseIcon: true,
    responsiveMode: 'onload',
    tabOverlapAllowance: 0,
    reorderOnTabMenuClick: true,
    tabControlOffset: 10,
  },
  dimensions: {
    borderWidth: 10,
    minItemHeight: 400,
    minItemWidth: 200,
    headerHeight: 30,
    dragProxyWidth: 300,
    dragProxyHeight: 200,
  },
  labels: {
    close: 'close',
    maximise: 'maximise',
    minimise: 'minimise',
    popout: 'open in new window',
    popin: 'pop in',
    tabDropdown: 'additional tabs',
  },
  content: [
    {
      type: 'column',
      content: [
        {
          type: 'row',
          height: 50,
          content: [
            {
              type: 'column',
              content: [
                {
                  type: 'stack',
                  content: [
                    {
                      title: 'Medical Referral',
                      type: 'component',
                      componentName: 'goalsMedical',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Behavioral Health',
                      type: 'component',
                      componentName: 'goalsBehavioral',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Social Services',
                      type: 'component',
                      componentName: 'goalsSocial',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'row',
          height: 50,
          content: [
            {
              type: 'column',
              content: [
                {
                  type: 'stack',
                  content: [
                    {
                      title: "Careteam's Tasks",
                      type: 'component',
                      componentName: 'tasks',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Attachments',
                      type: 'component',
                      componentName: 'attachments',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Observations',
                      type: 'component',
                      componentName: 'observations',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Conditions',
                      type: 'component',
                      componentName: 'conditions',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'row',
          height: 50,
          content: [
            {
              type: 'column',
              content: [
                {
                  type: 'stack',
                  content: [
                    {
                      title: "Client's Care teams",
                      type: 'component',
                      componentName: 'careTeams',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: 'Related Persons',
                      type: 'component',
                      componentName: 'relatedPersons',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: "Client's Communications",
                      type: 'component',
                      componentName: 'communications',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                    {
                      title: "Client's Insurance/Benefits",
                      type: 'component',
                      componentName: 'coverage',
                      isClosable: true,
                      reorderEnabled: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  isClosable: true,
  reorderEnabled: true,
  title: '',
  openPopouts: [],
  maximisedItemId: null,
};

export const componentMetadata = [
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasksComponent },
  {
    name: 'appointments',
    text: 'Appointments',
    factoryMethod: renderPatientAppointmentsComponent,
  },
  {
    name: 'communications',
    text: 'Communications',
    factoryMethod: renderCommunicationsComponent,
  },
  {
    name: 'observations',
    text: 'Observations',
    factoryMethod: renderObservationsComponent,
  },
  {
    name: 'conditions',
    text: 'Conditions',
    factoryMethod: renderConditionsComponent,
  },
  { name: 'toDos', text: 'To Do', factoryMethod: renderPatientToDosComponent },
  {
    name: 'coverage',
    text: 'Coverage',
    factoryMethod: renderCoverageComponent,
  },
  {
    name: 'calendar',
    text: 'Calendar',
    factoryMethod: renderCalendarComponent,
  },
  {
    name: 'careTeams',
    text: 'Care teams',
    factoryMethod: renderCareTeamsComponent,
  },
  {
    name: 'attachments',
    text: 'Attachments',
    factoryMethod: renderAttachmentsComponent,
  },
  {
    name: 'goalsMedical',
    text: 'Medical Goals',
    factoryMethod: renderGoalsMedicalComponent,
  },
  {
    name: 'goalsBehavioral',
    text: 'Behavioral Goals',
    factoryMethod: renderGoalsBehavioralComponent,
  },
  {
    name: 'goalsSocial',
    text: 'Social Goals',
    factoryMethod: renderGoalsSocialComponent,
  },
  {
    name: 'relatedPersons',
    text: 'Related Persons',
    factoryMethod: renderRelatedPersonsComponent,
  },
];

export class PatientPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const patientId = this.props.match.params.id;
    const { patient } = this.props;
    if (patient && patient.id && patient.id === patientId) {
      this.props.refreshPatient();
      this.props.getGoals(patientId);
      this.props.getCarePlan(patientId);
      console.log(`getGoals for patientId ${patientId}`);
    } else {
      this.props.getPatient(patientId);
      this.props.getGoals(patientId);
      this.props.getCarePlan(patientId);
      console.log(`getGoals for patientId ${patientId}`);
    }
  }

  getStateMetadataForRole() {
    const {
      user: { role },
    } = this.props;
    switch (role) {
      case ORGANIZATION_ADMIN_ROLE_CODE:
        return orgAdminStateMetadata;
      default:
        return defaultRoleStateMetadata;
    }
  }

  render() {
    const { patient, patientsPage } = this.props;
    const emergencyContact = patientsPage.emergency_contact;
    const patientDetailsProps = { patient, emergencyContact };

    const stateMetadata = this.getStateMetadataForRole();
    return (
      <Page>
        <Helmet>
          <title>Patient</title>
          <meta
            name="description"
            content="Patient page of Omnibus Care Plan application"
          />
        </Helmet>

        {patient && (
          <div>
            <PatientDetails
              {...patientDetailsProps}
              flattenPatientData={flattenPatientData}
            />
            <SmartAppLauncher />
            <GoldenLayout
              containerId="golden-patient"
              containerHeight="75vh"
              containerWidth="95vw"
              componentMetadata={componentMetadata}
              stateMetadata={stateMetadata}
            />
          </div>
        )}
      </Page>
    );
  }
}

PatientPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
  refreshPatient: PropTypes.func,
  getPatient: PropTypes.func.isRequired,
  getGoals: PropTypes.func.isRequired,
  user: PropTypes.object,
  // goals: PropTypes.array.isRequired
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
  user: makeSelectUser(),
  goals: makeSelectGoals(),
  patientsPage: makeSelectPatientPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    refreshPatient: () => dispatch(refreshPatient()),
    getPatient: (logicalId) => dispatch(getPatient(logicalId)),
    getGoals: (patientId) => dispatch(actions.getGoals(patientId)),
    getCarePlan: (patientId) => dispatch(actions.getCarePlan(patientId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'PatientsPage', reducer });
const withSaga = injectSaga({ key: 'PatientsPage', saga });

export default compose(withReducer, withSaga, withConnect)(PatientPage);
