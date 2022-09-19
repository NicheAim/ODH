/**
 *
 * Patients
 *
 */

import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import ConfirmPatientModal from 'components/ConfirmPatientModal';
import PanelToolbar from 'components/PanelToolbar';
import PatientSearchResult from 'components/PatientSearchResult';
import RecordsRange from 'components/RecordsRange';
import { getLookupsAction } from 'containers/App/actions';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
  USCOREETHNICITY,
  USCORERACE,
} from 'containers/App/constants';
import { setPatient } from 'containers/App/contextActions';
import {
  makeSelectOrganization,
  makeSelectPatient,
  makeSelectUser,
} from 'containers/App/contextSelectors';
import {
  combineAddress,
  getPractitionerIdByRole,
  isAdminWorkspace,
  mapToTelecoms,
} from 'containers/App/helpers';
import {
  makeSelectUsCoreEthnicities,
  makeSelectUsCoreRaces,
} from 'containers/App/lookupSelectors';
import { makeSelectLocation } from 'containers/App/selectors';
import NewPatientResource from 'containers/NewPatientResource';
import { showNotification } from 'containers/Notification/actions';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  fitlerPatient,
  initializePatients,
  loadPatientSearchResult,
} from './actions';
import {
  ALL_ORG_PATIENTS,
  ALL_ORG_PATIENTS_DISPLAY,
  MY_CARE_TEAM_PATIENTS,
  MY_CARE_TEAM_PATIENTS_DISPLAY,
  UNASSIGNED_PATIENTS,
  UNASSIGNED_PATIENTS_DISPLAY,
  PATIENTS_NOT_MEETING_SIL,
  PATIENTS_NOT_MEETING_SIL_DISPLAY,
} from './constants';
import { flattenPatientData } from './helpers';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectPatientSearchResult,
  makeSelectPatientTotalElements,
  makeSelectQueryIncludeInactive,
  makeSelectQuerySearchTerms,
  makeSelectQuerySearchType,
  makeSelectSearchError,
  makeSelectSearchLoading,
  makeSelectTotalPages,
} from './selectors';
import { searchPatients } from 'containers/Patients/api';
import { mapToName } from 'containers/App/helpers';
import ShowHideWrapper from '../ShowHideWrapper';
import AddNewItemSpan from '../../components/PanelToolbar/AddNewItemSpan';
import StyledIconButton from '../../components/StyledIconButton';
import Refresh from '@material-ui/icons/Refresh';
import uniqueId from 'lodash/uniqueId';
export class Patients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relativeTop: 0,
      currentPage: 1,
      patient: null,
      isPatientModalOpen: false,
      isAddPatientModalOpen: false,
      patientWithRepeatedName: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handlePatientClick = this.handlePatientClick.bind(this);
    this.handlePatientViewDetailsClick =
      this.handlePatientViewDetailsClick.bind(this);
    this.handlePatientModalClose = this.handlePatientModalClose.bind(this);
    this.onSize = this.onSize.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.patientsWithSameNameExist = this.patientsWithSameNameExist.bind(this);
    this.handleDetailsModalPreview = this.handleDetailsModalPreview.bind(this);
  }

  componentDidMount() {
    this.reloadPatients();
  }

  componentWillReceiveProps(nextProps) {
    const { patient, organization } = this.props;
    const { patient: newPatient, organization: newOrganization } = nextProps;
    if (!isEqual(patient, newPatient) && !this.props.currentPage) {
      this.props.initializePatients([newPatient]);
    }

    if (!isEqual(organization, newOrganization)) {
      this.props.onSearchPatient('', '', false, newOrganization.logicalId);
    }
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  async patientsWithSameNameExist(patient, organization) {
    console.log('patientsWithSameNameExist');
    try {
      // const searchTerms = mapToName(patient.name)
      const searchTerms = patient.name[0].firstName;
      const searchType = 'fullname';
      const includeInactive = false;
      const currentPage = 1;
      const response = await searchPatients(
        searchTerms,
        searchType,
        includeInactive,
        currentPage,
        organization
      );
      console.log('response');
      console.log(response);
      if (response.elements.length > 1) {
        console.log('more than 1 element');
        return true;
      } else {
        console.log('less than 1 element');
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  reloadPatients() {
    const { patient, organization } = this.props;
    const initSearchTerms = '';
    const includeInactive = false;
    const searchType = 'name';
    if (organization) {
      this.handleSearch(initSearchTerms, includeInactive, searchType);
    }
    if (patient) {
      this.props.initializePatients([patient]);
    } else {
      this.props.initializePatients();
    }
    this.props.getLookUpData();
  }

  async handleDetailsModalPreview(patient) {
    const { organization } = this.props;
    const organizationId = organization.logicalId;
    console.log('organizationId');
    console.log(organizationId);
    const repeatedName = false;
    // if (organizationId) {
    //   if ('name' in patient) {
    //     if (patient.name) {
    //       repeatedName = await this.patientsWithSameNameExist(
    //         patient,
    //         organizationId
    //       );
    //       console.log(
    //         `Patients with same name ${repeatedName ? 'DO' : 'DO NOT'} exist`
    //       );
    //     }
    //   }
    // }
    this.setState({
      patient,
      patientWithRepeatedName: repeatedName,
      isPatientModalOpen: true,
    });
  }

  handlePatientClick(patient) {
    const { onPatientClick } = this.props;
    if (onPatientClick) {
      console.log('if onPatientClick');
      onPatientClick(patient);
    } else {
      console.log('if not onPatientClick');
      this.props.setPatient(patient);
    }
    if (patient && !patient.canViewPatientDetail) {
      this.props.showNotAllowToViewPatientDetailsMessage(
        "Not allowed to view patient's dashboard."
      );
    } else {
      console.log('can View');
      this.handleDetailsModalPreview(patient);
      // this.setState({
      //   patient,
      //   isPatientModalOpen: true,
      // });
    }
  }

  handlePatientViewDetailsClick(patient) {
    if (patient && !patient.canViewPatientDetail) {
      this.props.showNotAllowToViewPatientDetailsMessage(
        "Not allowed to view patient's dashboard."
      );
    } else {
      this.handleDetailsModalPreview(patient);
      // this.setState({
      //   patient,
      //   isPatientModalOpen: true,
      // });
    }
  }

  handlePatientModalClose(redirectUrl) {
    this.setState({ isPatientModalOpen: false }, () => {
      if (redirectUrl) {
        this.props.history.push(redirectUrl);
        this.props.history.go(0);
      }
    });
  }

  handleOpenModal() {
    this.setState({ isAddPatientModalOpen: true });
  }

  handleCloseModal() {
    this.setState({ isAddPatientModalOpen: false });
  }

  handleSearch(searchTerms, includeInactive, searchType) {
    const {
      organization,
      location: { pathname },
    } = this.props;
    const organizationId = isAdminWorkspace(pathname)
      ? null
      : organization.logicalId;

    if (organization) {
      this.props.onSearchPatient(
        searchTerms,
        searchType,
        includeInactive,
        organizationId,
        this.state.currentPage
      );
    } else {
      this.props.onSearchPatient(
        searchTerms,
        searchType,
        includeInactive,
        organizationId,
        this.state.currentPage
      );
    }
  }

  handleFilter(filterBy) {
    console.log('handleFilter');
    console.log(this.props);
    const {
      organization,
      user,
      location: { pathname },
    } = this.props;
    const practitionerId = getPractitionerIdByRole(user);
    const organizationId = isAdminWorkspace(pathname)
      ? null
      : organization.logicalId;
    console.log('practitionerId:');
    console.log(practitionerId);
    console.log('organizationId:');
    console.log(organizationId);
    if (organizationId && practitionerId) {
      this.props.onFitlerPatient(
        filterBy,
        organizationId,
        practitionerId,
        this.state.currentPage,
        this.props.includeInactive
      );
    }
  }

  handleChangePage(newPage) {
    this.setState({ currentPage: newPage });
    const { organization } = this.props;
    if (organization) {
      this.props.onChangePage(
        this.props.searchTerms,
        this.props.searchType,
        this.props.includeInactive,
        newPage,
        organization.logicalId
      );
    } else {
      this.props.onChangePage(
        this.props.searchTerms,
        this.props.searchType,
        this.props.includeInactive,
        newPage
      );
    }
  }

  render() {
    const {
      loading,
      error,
      searchResult,
      organization,
      usCoreRaces,
      usCoreEthnicities,
      showSearchBarByDefault,
      hideToolbar,
      user,
    } = this.props;
    const searchResultProps = {
      loading,
      error,
      searchResult,
      organization,
      usCoreRaces,
      usCoreEthnicities,
    };
    const addNewItem = {
      addNewItem: {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        onClick: this.handleOpenModal,
      },
    };
    const filterDateOptions = [
      { value: ALL_ORG_PATIENTS, display: ALL_ORG_PATIENTS_DISPLAY },
      { value: MY_CARE_TEAM_PATIENTS, display: MY_CARE_TEAM_PATIENTS_DISPLAY },
      { value: UNASSIGNED_PATIENTS, display: UNASSIGNED_PATIENTS_DISPLAY },
      {
        value: PATIENTS_NOT_MEETING_SIL,
        display: PATIENTS_NOT_MEETING_SIL_DISPLAY,
      },
    ];
    const filterField = {
      filterTypes: filterDateOptions,
      filterValueHintText: <FormattedMessage {...messages.filterLabel} />,
    };
    return (
      <div>
        <PanelToolbar
          {...addNewItem}
          allowedAddNewItemRoles={[
            ORGANIZATION_ADMIN_ROLE_CODE,
            CARE_MANAGER_ROLE_CODE,
          ]}
          onSearch={this.handleSearch}
          onSize={this.onSize}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={user.role !== OCP_ADMIN_ROLE_CODE}
          showPatientSpecificFilters
          filterField={filterField}
          onFilter={this.handleFilter}
          showSearchBarByDefault={showSearchBarByDefault}
          hideToolbar={hideToolbar}
          customNewButton={[
            <ShowHideWrapper
              key={uniqueId()}
              allowedRoles={[
                CARE_COORDINATOR_ROLE_CODE,
                CARE_MANAGER_ROLE_CODE,
                ORGANIZATION_ADMIN_ROLE_CODE,
              ]}
            >
              <AddNewItemSpan
                onClick={() => {
                  this.reloadPatients();
                }}
              >
                <StyledIconButton
                  size="x-small"
                  svgIconSize="small"
                  disableIconHover
                >
                  <Refresh color={'#3275c1'} />
                </StyledIconButton>
                {'Reload'}
              </AddNewItemSpan>
            </ShowHideWrapper>,
          ]}
        />
        <PatientSearchResult
          {...searchResultProps}
          relativeTop={this.state.relativeTop}
          onPatientClick={this.handlePatientClick}
          onPatientViewDetailsClick={this.handlePatientViewDetailsClick}
          flattenPatientData={flattenPatientData}
          mapToTelecoms={mapToTelecoms}
          combineAddress={combineAddress}
          showActionButton={false}
          ablePatientClick={user.role !== OCP_ADMIN_ROLE_CODE}
        />
        {!!this.props.searchResult && !!this.props.currentPage && (
          <div>
            <CenterAlignedUltimatePagination
              currentPage={this.props.currentPage}
              totalPages={this.props.totalPages}
              onChange={this.handleChangePage}
            />
            <RecordsRange
              currentPage={this.props.currentPage}
              totalPages={this.props.totalPages}
              totalElements={this.props.totalElements}
              currentPageSize={this.props.searchResult.length}
            />
          </div>
        )}
        {this.state.patient && (
          <ConfirmPatientModal
            patient={this.state.patient}
            isPatientModalOpen={this.state.isPatientModalOpen}
            onPatientModalClose={this.handlePatientModalClose}
            patientWithRepeatedName={this.state.patientWithRepeatedName}
          />
        )}
        {this.state.isAddPatientModalOpen && (
          <NewPatientResource
            modalOpen={this.state.isAddPatientModalOpen}
            onModalClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}

Patients.propTypes = {
  history: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  searchResult: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  usCoreRaces: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  usCoreEthnicities: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  onSearchPatient: PropTypes.func.isRequired,
  onFitlerPatient: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalElements: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  showNotAllowToViewPatientDetailsMessage: PropTypes.func.isRequired,
  searchTerms: PropTypes.string,
  searchType: PropTypes.string,
  includeInactive: PropTypes.bool,
  initializePatients: PropTypes.func.isRequired,
  setPatient: PropTypes.func.isRequired,
  getLookUpData: PropTypes.func.isRequired,
  patient: PropTypes.object,
  organization: PropTypes.object,
  onPatientClick: PropTypes.func,
  showSearchBarByDefault: PropTypes.bool,
  hideToolbar: PropTypes.bool,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

Patients.defaultProps = {
  showSearchBarByDefault: false,
  hideToolbar: false,
};

const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectPatientSearchResult(),
  totalElements: makeSelectPatientTotalElements(),
  loading: makeSelectSearchLoading(),
  error: makeSelectSearchError(),
  currentPage: makeSelectCurrentPage(),
  currentPageSize: makeSelectCurrentPageSize(),
  totalPages: makeSelectTotalPages(),
  searchTerms: makeSelectQuerySearchTerms(),
  searchType: makeSelectQuerySearchType(),
  includeInactive: makeSelectQueryIncludeInactive(),
  patient: makeSelectPatient(),
  organization: makeSelectOrganization(),
  usCoreRaces: makeSelectUsCoreRaces(),
  usCoreEthnicities: makeSelectUsCoreEthnicities(),
  location: makeSelectLocation(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSearchPatient: (
      searchTerms,
      searchType,
      includeInactive,
      organization
    ) => {
      const currentPage = 1;
      dispatch(
        loadPatientSearchResult(
          searchTerms,
          searchType,
          includeInactive,
          currentPage,
          organization
        )
      );
    },
    onChangePage: (
      searchTerms,
      searchType,
      includeInactive,
      currentPage,
      organization
    ) =>
      dispatch(
        loadPatientSearchResult(
          searchTerms,
          searchType,
          includeInactive,
          currentPage,
          organization
        )
      ),
    initializePatients: (patients) => dispatch(initializePatients(patients)),
    getLookUpData: () =>
      dispatch(getLookupsAction([USCORERACE, USCOREETHNICITY])),
    setPatient: (patient) => dispatch(setPatient(patient)),
    onFitlerPatient: (
      filterBy,
      organizationId,
      practitionerId,
      currentPage,
      includeInactive
    ) =>
      dispatch(
        fitlerPatient(
          filterBy,
          organizationId,
          practitionerId,
          currentPage,
          includeInactive
        )
      ),
    showNotAllowToViewPatientDetailsMessage: (message) =>
      dispatch(showNotification(message)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'patients', reducer });
const withSaga = injectSaga({ key: 'patients', saga });

const reduxCompose = compose(withReducer, withSaga, withConnect)(Patients);

export default withRouter(reduxCompose);
