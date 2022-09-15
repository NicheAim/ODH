import { createSelector } from 'reselect';

/**
 * Direct selector to the workspaceSelectionPage state domain
 */
const selectWorkspaceSelectionPageDomain = (state) => state.get('workspaceSelectionPage');

/**
 * Other specific selectors
 */
const makeSelectWorkflowRolesData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.getIn(['workflowRoles', 'data']).toJS(),
);

const makeSelectPractitionersData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.get('practitioners').toJS(),
);

const makeSelectOrganizationsData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.get('searchOrganizations').toJS(),
);

const makeSelectPatientsData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.get('searchPatients').toJS(),
);

/**
 * Default selector used by WorkspaceSelectionPage
 */

const makeSelectWorkspaceSelectionPage = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate.toJS(),
);

export default makeSelectWorkspaceSelectionPage;
export {
  selectWorkspaceSelectionPageDomain,
  makeSelectWorkflowRolesData,
  makeSelectPractitionersData,
  makeSelectOrganizationsData,
  makeSelectPatientsData,
};
