/**
 *
 * Organizations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER, OCP_ADMIN_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE } from 'containers/App/constants';
import { setOrganization } from 'containers/App/contextActions';
import { makeSelectOrganization, makeSelectUser } from 'containers/App/contextSelectors';
import { initializePractitioners } from 'containers/Practitioners/actions';
import { initializePatients } from 'containers/Patients/actions';
import makeSelectOrganizations from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getOrganizations, initializeOrganizations, searchOrganizations } from './actions';
import { flattenOrganizationData } from './helpers';
import DefaultViewComponent from './DefaultViewComponent';

export class Organizations extends React.Component {
  static initialState = {
    isShowSearchResult: false,
    searchOrganizations: {
      currentPage: 1,
      searchValue: '',
      showInactive: false,
      searchType: 'name',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      ...Organizations.initialState,
      showViewAllButton: this.getShowViewAllButton(),
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
    this.handleViewAll = this.handleViewAll.bind(this);
  }

  getShowViewAllButton = () => {
    if (this.props.organization && isEqual(this.props.user.role, ORGANIZATION_ADMIN_ROLE_CODE)){
      return false
    } else {
      return !isEmpty(this.props.organization)
    }
  }

  componentDidMount() {
    console.log("this.props.organization")
    console.log(this.props.organization)
    if (this.props.organization && isEqual(this.props.user.role, OCP_ADMIN_ROLE_CODE)) {
      this.props.initializeOrganizations([this.props.organization]);
    } else if (this.props.organization && isEqual(this.props.user.role, ORGANIZATION_ADMIN_ROLE_CODE)){
      this.props.initializeOrganizations([this.props.organization]);
      this.props.searchOrganizations(this.props.organization.logicalId, true, 'logicalId', DEFAULT_START_PAGE_NUMBER);
    }
    else {
      this.props.initializeOrganizations();
      this.props.getOrganizations(DEFAULT_START_PAGE_NUMBER, this.props.pageSize);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organization } = this.props;
    const { organization: newOrganization } = nextProps;
    if (!isEqual(organization, newOrganization)) {
      this.props.initializeOrganizations([newOrganization]);
      this.setState({ ...Organizations.initialState });
      if (this.props.organization && isEqual(this.props.user.role, ORGANIZATION_ADMIN_ROLE_CODE)) {

      } else {
        this.setState({ showViewAllButton: true });
      }
    }
  }

  handleSearch(searchValue, showInactive, searchType) {
    this.setState({
      isShowSearchResult: true,
      searchOrganizations: { searchValue, showInactive, searchType },
    });
    this.props.searchOrganizations(searchValue, showInactive, searchType, this.state.searchOrganizations.currentPage);
  }

  handleListPageClick(currentPage) {
    this.props.getOrganizations(currentPage, this.props.pageSize);
  }

  handleSearchPageClick(currentPage) {
    this.props.searchOrganizations(this.state.searchOrganizations.searchValue, this.state.searchOrganizations.showInactive, this.state.searchOrganizations.searchType, currentPage);
  }

  handleViewAll() {
    this.props.getOrganizations(DEFAULT_START_PAGE_NUMBER, this.props.pageSize);
    this.props.initializePractitioners();
    this.props.initializePatients();
    this.setState({ showViewAllButton: false });
  }

  render() {
    const { organizations, ...rest } = this.props;
    const organizationData = {
      loading: organizations.loading,
      data: organizations.data,
      currentPage: organizations.currentPage,
      totalNumberOfPages: organizations.totalNumberOfPages,
      currentPageSize: organizations.currentPageSize,
      totalElements: organizations.totalElements,
      handlePageClick: this.state.isShowSearchResult ? this.handleSearchPageClick : this.handleListPageClick,
    };

    const viewComponentProps = {
      onSearch: this.handleSearch,
      onOrganizationClick: this.props.onOrganizationClick || this.props.setOrganization,
      onViewAll: this.handleViewAll,
      isShowViewAllButton: this.state.showViewAllButton,
      organizationInContext: this.props.organization,
      flattenOrganizationData,
      organizationData,
      showSearchIcon: isEqual(this.props.user.role, OCP_ADMIN_ROLE_CODE),
      ...rest,
    };
    const Component = this.props.component;
    return (
      <Component {...viewComponentProps} />
    );
  }
}

Organizations.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func]).isRequired,
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
  initializeOrganizations: PropTypes.func.isRequired,
  organization: PropTypes.object,
  setOrganization: PropTypes.func.isRequired,
  initializePractitioners: PropTypes.func,
  initializePatients: PropTypes.func,
  onOrganizationClick: PropTypes.func,
  getOrganizations: PropTypes.func.isRequired,
  searchOrganizations: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  organizations: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    data: PropTypes.array,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
  showSearchBarByDefault: PropTypes.bool,
  hideToolbar: PropTypes.bool,
};

Organizations.defaultProps = {
  component: DefaultViewComponent,
  showSearchBarByDefault: false,
  hideToolbar: false,
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
  organization: makeSelectOrganization(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeOrganizations: (organizations) => dispatch(initializeOrganizations(organizations)),
    initializePractitioners: () => dispatch(initializePractitioners()),
    initializePatients: () => dispatch(initializePatients()),
    getOrganizations: (currentPage, pageSize) => dispatch(getOrganizations(currentPage, pageSize)),
    searchOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(searchOrganizations(searchValue, showInactive, searchType, currentPage)),
    setOrganization: (organization) => dispatch(setOrganization(organization)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Organizations);
