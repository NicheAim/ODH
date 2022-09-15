/**
 *
 * PatientWorkspacePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import renderCalendarComponent from 'containers/AppointmentsCalendar/render';
import renderTasks from 'containers/Tasks/render';
import renderCareTeamsComponent from 'containers/CareTeams/render';
import renderRelatedPersonsComponent from 'containers/RelatedPersons/render';
import renderPatientAppointmentsComponent from 'containers/PatientAppointments/render';
import renderCoveragesComponent from 'containers/Coverages/render';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import PatientDetails from 'components/PatientDetails';
import GoldenLayout from 'components/GoldenLayout';
import Page from 'components/Page';
import SmartAppLauncher from 'containers/SmartAppLauncher';
import { flattenPatientData } from './helpers';

export const initialStateMetadata =
  {
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
      headerHeight: 30,
      minItemWidth: 400,
      minItemHeight: 200,
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
    content: [{
      type: 'column',
      content: [
        {
          type: 'row',
          height: 40,
          content: [
            {
              title: 'Tasks',
              type: 'component',
              componentName: 'tasks',
              isClosable: true,
              reorderEnabled: true,
            },
            {
              title: 'Care Teams',
              type: 'component',
              componentName: 'careTeams',
              isClosable: true,
              reorderEnabled: true,
            },
            
          ],
        },
        {
          type: 'row',
          height: 60,
          content: [
            /*{
              title: 'Appointments',
              type: 'component',
              componentName: 'appointments',
              isClosable: true,
              reorderEnabled: true,
            },*/{
              title: 'Related Persons',
              type: 'component',
              componentName: 'relatedPersons',
              isClosable: true,
              reorderEnabled: true,
            },
            {
              title: 'Insurance/Benefits',
              type: 'component',
              componentName: 'coverage',
              isClosable: true,
              reorderEnabled: true,
            },
            /*{
              title: 'Calendar',
              type: 'component',
              componentName: 'calendar',
              isClosable: true,
              reorderEnabled: true,
            },*/
          ],
        },
      ],
    }],
    isClosable: true,
    reorderEnabled: true,
    title: '',
    openPopouts: [],
    maximisedItemId: null,
  };

export const componentMetadata = [
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasks },
  { name: 'appointments', text: 'Appointments', factoryMethod: renderPatientAppointmentsComponent },
  { name: 'calendar', text: 'Calendar', factoryMethod: renderCalendarComponent },
  { name: 'careTeams', text: 'Care teams', factoryMethod: renderCareTeamsComponent },
  { name: 'coverage', text: 'Coverage', factoryMethod: renderCoveragesComponent },
  { name: 'relatedPersons', text: 'Related Persons', factoryMethod: renderRelatedPersonsComponent },
];

export class PatientWorkspacePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { patient } = this.props;
    return (
      <Page color="workspaces">
        <Helmet>
          <title>Patient Workspace</title>
          <meta name="description" content="Patient workspace page of Omnibus Care Plan application" />
        </Helmet>
        {patient &&
        <div>
          <PatientDetails
            patient={patient}
            flattenPatientData={flattenPatientData}
          />
          <SmartAppLauncher />
          <GoldenLayout
            containerHeight="75vh"
            containerWidth="95vw"
            containerId="golden-patient-workspace"
            componentMetadata={componentMetadata}
            stateMetadata={initialStateMetadata}
          />
        </div>}
      </Page>
    );
  }
}

PatientWorkspacePage.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(PatientWorkspacePage);
