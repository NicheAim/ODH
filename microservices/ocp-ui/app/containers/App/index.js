/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import 'font-awesome/css/font-awesome.min.css';

import injectSaga from 'utils/injectSaga';
import Authentication from 'containers/Authentication';
import WorkspaceSelectionPage from 'containers/WorkspaceSelectionPage';
import AdminWorkspacePage from 'containers/AdminWorkspacePage';
import AdminManagePermissionsPage from 'containers/AdminManagePermissionsPage';
import PractitionerWorkspacePage from 'containers/PractitionerWorkspacePage';
import PatientWorkspacePage from 'containers/PatientWorkspacePage';
import LoginPage from 'containers/LoginPage';
import ManageAppointmentPage from 'containers/ManageAppointmentPage';
import ManageCareTeamPage from 'containers/ManageCareTeamPage';
import ManageHealthcareServicePage from 'containers/ManageHealthcareServicePage';
import ManageLocationPage from 'containers/ManageLocationPage';
import ManageOrganizationPage from 'containers/ManageOrganizationPage';
import ManagePatientPage from 'containers/ManagePatientPage/index';
import ManagePractitionerPage from 'containers/ManagePractitionerPage';
import ManageUsersPage from 'containers/ManageUsersPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PatientPage from 'containers/PatientPage';
import AssignHealthCareServiceToLocationPage from 'containers/AssignHealthcareServiceToLocationPage';
import ManageTaskPage from 'containers/ManageTaskPage';
import ManageActivityDefinitionPage from 'containers/ManageActivityDefinitionPage';
import ManageRelatedPersonPage from 'containers/ManageRelatedPersonPage';
import Notification from 'containers/Notification';
import ManageCommunicationPage from 'containers/ManageCommunicationPage';
import ManageClientPage from 'containers/ManageClientPage';
import ManageUserRegistration from 'containers/ManageUserRegistration';
import SmartContextInitializerPage from 'containers/SmartContextInitializerPage/Loadable';
import UserLoginDetailsPage from 'containers/UserLoginDetailsPage';
import AssignLocationToPractitionerPage from 'containers/AssignLocationToPractitionerPage';
import PublicLayoutRoute from 'components/PublicLayoutRoute';
import ManageGoalPage from 'containers/ManageGoalPage';
import ManageObservationPage from 'containers/ManageObservationPage';
import saga from './saga';
import './styles.css';
import ManageConditionPage from 'containers/ManageConditionPage';

export function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - Omnibus Care Plan"
        defaultTitle="Omnibus Care Plan"
      >
        <meta name="description" content="Omnibus Care Plan application" />
      </Helmet>
      <div>
        <Switch>
          <Redirect exact from="/" to="/ocp-ui/login" />
          <PublicLayoutRoute exact path="/ocp-ui" component={LoginPage} />
          <PublicLayoutRoute path="/ocp-ui/login" component={LoginPage} />
          <PublicLayoutRoute
            path="/ocp-ui/sample-user-login-details"
            component={UserLoginDetailsPage}
          />
          {/* Import all security page MUST put inside Authorization component */}
          <Authentication>
            <Route
              path="/ocp-ui/workspace-selection"
              component={WorkspaceSelectionPage}
            />
            <Route
              path="/ocp-ui/admin-workspace"
              component={AdminWorkspacePage}
            />
            <Route
              path="/ocp-ui/manage-permissions"
              component={AdminManagePermissionsPage}
            />
            <Route path="/ocp-ui/manage-users" component={ManageUsersPage} />
            <Route
              path="/ocp-ui/manage-user-registration/:id?"
              component={ManageUserRegistration}
            />
            <Route
              path="/ocp-ui/practitioner-workspace/"
              component={PractitionerWorkspacePage}
            />
            <Route
              path="/ocp-ui/patient-workspace"
              component={PatientWorkspacePage}
            />
            <Route exact path="/ocp-ui/patients/:id" component={PatientPage} />
            <Route
              path="/ocp-ui/manage-organization/:id?"
              component={ManageOrganizationPage}
            />
            <Route
              path="/ocp-ui/manage-practitioner/:id?"
              component={ManagePractitionerPage}
            />
            <Route
              path="/ocp-ui/manage-patient/:id?"
              component={ManagePatientPage}
            />
            <Route
              path="/ocp-ui/manage-location/:id?"
              component={ManageLocationPage}
            />
            <Route
              path="/ocp-ui/manage-care-team/:id?"
              component={ManageCareTeamPage}
            />
            <Route
              path="/ocp-ui/manage-healthcare-service/:id?"
              component={ManageHealthcareServicePage}
            />
            <Route
              path="/ocp-ui/assign-healthcareservice-location/:id?"
              component={AssignHealthCareServiceToLocationPage}
            />
            <Route
              path="/ocp-ui/assign-location-practitioner/:id?"
              component={AssignLocationToPractitionerPage}
            />
            <Route path="/ocp-ui/manage-task/:id?" component={ManageTaskPage} />
            <Route
              path="/ocp-ui/manage-activity-definition/:id?"
              component={ManageActivityDefinitionPage}
            />
            <Route
              path="/ocp-ui/manage-related-person/:id?"
              component={ManageRelatedPersonPage}
            />
            <Route
              path="/ocp-ui/manage-appointment/:id?"
              component={ManageAppointmentPage}
            />
            <Route
              path="/ocp-ui/manage-communication/:id?"
              component={ManageCommunicationPage}
            />
            <Route
              path="/ocp-ui/smart-context"
              component={SmartContextInitializerPage}
            />
            <Route path="/ocp-ui/manage-client" component={ManageClientPage} />
            <Route
              path="/ocp-ui/manage-goal/:id?/:useContextDisplayFilter?"
              component={ManageGoalPage}
            />
            <Route
              path="/ocp-ui/manage-observation/:id?"
              component={ManageObservationPage}
            />
            <Route
              path="/ocp-ui/manage-condition/:id?"
              component={ManageConditionPage}
            />
          </Authentication>
          <Route component={NotFoundPage} />
        </Switch>
        <Notification />
      </div>
    </div>
  );
}

const withSaga = injectSaga({ key: 'App', saga });

export default compose(withSaga)(App);
