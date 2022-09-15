/**
 *
 * WorkspaceSelectionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import union from 'lodash/union';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLinkUrlByRole, mapToName } from 'containers/App/helpers';
import {
  CARE_MANAGER_ROLE_CODE,
  DEFAULT_START_PAGE_NUMBER,
  OCP_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
} from 'containers/App/constants';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { setOrganization, setPatient, setUser } from 'containers/App/contextActions';
import WorkspaceSelection from 'components/WorkspaceSelection';
import {
  getPractitionersOnRoleOrganization,
  getWorkflowRoles,
  initializeSelection,
  searchOrganizations,
  searchPatients,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectOrganizationsData,
  makeSelectPatientsData,
  makeSelectPractitionersData,
  makeSelectWorkflowRolesData,
} from './selectors';
import { filteredFunctionalRoles, flattenOrganizationData, flattenPatientData, mapToRoleObject } from './helpers';

export class WorkspaceSelectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      searchPatients: {
        searchValue: '',
        searchType: 'name',
        showInactive: false,
        currentPage: 1,
      },
      searchOrganizations: {
        searchValue: '',
        searchType: 'name',
        showInactive: false,
        currentPage: 1,
      },
    };
    this.handleSetWorkspaceContext = this.handleSetWorkspaceContext.bind(this);
    this.handleGetPractitionersOnRoleOrganization = this.handleGetPractitionersOnRoleOrganization.bind(this);
    this.handlePatientSearch = this.handlePatientSearch.bind(this);
    this.handleChangePatientSearchPage = this.handleChangePatientSearchPage.bind(this);
    this.handleOrganizationSearch = this.handleOrganizationSearch.bind(this);
    this.handleChangeOrganizationSearchPage = this.handleChangeOrganizationSearchPage.bind(this);
  }

  componentDidMount() {
    this.props.getWorkflowRoles();
  }

  handleSetWorkspaceContext(role, organization, practitioner, patient) {
    const { user } = this.props;
    this.props.setUser({ ...user, role });
    if (!isEmpty(organization)) {
      this.props.setOrganization(organization);
    }
    if (!isEmpty(practitioner)) {
      this.props.setUser({ ...user, role, resource: practitioner });
    }
    if (!isEmpty(patient)) {
      this.props.setPatient(patient);
    }
  }

  // Todo: handle page change when needed
  handleGetPractitionersOnRoleOrganization(role, organization) {
    this.props.getPractitionersOnRoleOrganization(role, organization, DEFAULT_START_PAGE_NUMBER);
  }

  handleOrganizationSearch(searchValue, showInactive, searchType) {
    this.setState({
      searchOrganizations: { searchValue, showInactive, searchType },
    });
    this.props.searchOrganizations(searchValue, showInactive, searchType, DEFAULT_START_PAGE_NUMBER);
  }

  handleChangeOrganizationSearchPage(currentPage) {
    this.props.searchOrganizations(this.state.searchOrganizations.searchValue, this.state.searchOrganizations.showInactive, this.state.searchOrganizations.searchType, currentPage);
  }

  handlePatientSearch(searchValue, showInactive, searchType) {
    this.setState({
      searchPatients: { searchValue, showInactive, searchType },
    });
    this.props.searchPatients(searchValue, showInactive, searchType, DEFAULT_START_PAGE_NUMBER);
  }

  handleChangePatientSearchPage(currentPage) {
    this.props.searchPatients(this.state.searchPatients.searchValue, this.state.searchPatients.showInactive, this.state.searchPatients.searchType, currentPage);
  }

  render() {
    const {
      history, searchOrganizationsData, practitioners, searchPatientsData, workflowRoles,
    } = this.props;
    const ocpAdminFunctionalRole = {
      code: OCP_ADMIN_ROLE_CODE,
      display: 'OCP Admin',
    };
    const patientFunctionalRole = {
      code: PATIENT_ROLE_CODE,
      display: 'Patient',
    };
    const workspaceSelectionProps = {
      history,
      searchOrganizationsData,
      practitioners,
      searchPatientsData,
      workflowRoles: union([ocpAdminFunctionalRole, patientFunctionalRole], filteredFunctionalRoles(workflowRoles)),
      ocpAdminRoleCode: OCP_ADMIN_ROLE_CODE,
      patientRoleCode: PATIENT_ROLE_CODE,
    };
    return (
      <div>
        <Helmet>
          <title>Workspace Selection</title>
          <meta name="description" content="Workspace selection page of Omnibus Care Plan application" />
        </Helmet>
        {!isEmpty(workflowRoles) &&
        <WorkspaceSelection
          {...workspaceSelectionProps}
          defaultRole={CARE_MANAGER_ROLE_CODE}
          initializeSelection={this.props.initializeSelection}
          mapToRoleObject={mapToRoleObject}
          mapToName={mapToName}
          flattenPatientData={flattenPatientData}
          flattenOrganizationData={flattenOrganizationData}
          getLinkUrlByRole={getLinkUrlByRole}
          onSetWorkspaceContext={this.handleSetWorkspaceContext}
          onPractitionerSelection={this.handleGetPractitionersOnRoleOrganization}
          onPatientSearch={this.handlePatientSearch}
          onChangePatientSearchPage={this.handleChangePatientSearchPage}
          onOrganizationSearch={this.handleOrganizationSearch}
          onChangeOrganizationSearchPage={this.handleChangeOrganizationSearchPage}
        />
        }
      </div>
    );
  }
}

WorkspaceSelectionPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  practitioners: PropTypes.any.isRequired,
  searchPatientsData: PropTypes.any.isRequired,
  searchOrganizationsData: PropTypes.any.isRequired,
  workflowRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })),
  user: PropTypes.object,
  initializeSelection: PropTypes.func.isRequired,
  getWorkflowRoles: PropTypes.func.isRequired,
  getPractitionersOnRoleOrganization: PropTypes.func.isRequired,
  searchPatients: PropTypes.func.isRequired,
  searchOrganizations: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setOrganization: PropTypes.func.isRequired,
  setPatient: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  workflowRoles: makeSelectWorkflowRolesData(),
  practitioners: makeSelectPractitionersData(),
  searchOrganizationsData: makeSelectOrganizationsData(),
  searchPatientsData: makeSelectPatientsData(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeSelection: () => dispatch(initializeSelection()),
    getWorkflowRoles: () => dispatch(getWorkflowRoles()),
    getPractitionersOnRoleOrganization: (role, organization, currentPage) => dispatch(getPractitionersOnRoleOrganization(role, organization, currentPage)),
    searchOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(searchOrganizations(searchValue, showInactive, searchType, currentPage)),
    searchPatients: (searchValue, showInactive, searchType, currentPage) => dispatch(searchPatients(searchValue, showInactive, searchType, currentPage)),
    setUser: (user) => dispatch(setUser(user)),
    setOrganization: (organization) => dispatch(setOrganization(organization)),
    setPatient: (patient) => dispatch(setPatient(patient)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'workspaceSelectionPage', reducer });
const withSaga = injectSaga({ key: 'workspaceSelectionPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WorkspaceSelectionPage);
