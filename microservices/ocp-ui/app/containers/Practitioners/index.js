/**
 *
 * Practitioners
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEqual from 'lodash/isEqual';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER, OCP_ADMIN_ROLE_CODE } from 'containers/App/constants';
import { makeSelectOrganization, makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectLocation } from 'containers/App/selectors';
import { isAdminWorkspace } from 'containers/App/helpers';
import { setPractitioner } from 'containers/App/contextActions';
import { getPractitionersInOrganization, initializePractitioners, searchPractitioners } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectPractitioners from './selectors';
import DefaultViewComponent from './DefaultViewComponent';
import { flattenPractitionerData } from './helpers';


export class Practitioners extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchResult: false,
      searchPractitioners: {
        searchType: 'name',
        searchValue: '',
        includeInactive: false,
        currentPage: 1,
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSearchPage = this.handleChangeSearchPage.bind(this);
    this.handleChangeListPage = this.handleChangeListPage.bind(this);
  }

  componentDidMount() {
    this.props.initializePractitioners();
    const { organization } = this.props;
    if (organization) {
      this.props.getPractitionersInOrganization(DEFAULT_START_PAGE_NUMBER, this.props.pageSize);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organization } = this.props;
    const { organization: newOrganization } = nextProps;
    if (!isEqual(organization, newOrganization)) {
      this.props.getPractitionersInOrganization(DEFAULT_START_PAGE_NUMBER, this.props.pageSize);
    }
  }

  handleSearch(searchValue, includeInactive, searchType) {
    const { organization, location: { pathname } } = this.props;
    this.setState({
      isShowSearchResult: true,
      searchPractitioners: { searchType, searchValue, includeInactive },
    });

    const organizationId = isAdminWorkspace(pathname) ? null : organization.logicalId;

    if (organization) {
      this.props.searchPractitioners(searchType, searchValue, includeInactive, organizationId, this.state.searchPractitioners.currentPage);
    } else {
      this.props.searchPractitioners(searchType, searchValue, includeInactive, organizationId, this.state.searchPractitioners.currentPage);
    }
  }

  handleChangeSearchPage(currentPage) {
    const { organization } = this.props;
    if (organization) {
      this.props.searchPractitioners(this.state.searchPractitioners.searchType, this.state.searchPractitioners.searchValue, this.state.searchPractitioners.includeInactive, currentPage, organization.logicalId);
    } else {
      this.props.searchPractitioners(this.state.searchPractitioners.searchType, this.state.searchPractitioners.searchValue, this.state.searchPractitioners.includeInactive, currentPage);
    }
  }

  handleChangeListPage(currentPage) {
    this.props.getPractitionersInOrganization(currentPage, this.props.pageSize);
  }

  render() {
    const { practitioners, setSelectedPractitioner, user, ...rest } = this.props;
    const practitionersData = {
      loading: practitioners.loading,
      data: practitioners.data,
      currentPage: practitioners.currentPage,
      totalNumberOfPages: practitioners.totalNumberOfPages,
      currentPageSize: practitioners.currentPageSize,
      totalElements: practitioners.totalElements,
      handleChangePage: this.state.isShowSearchResult ? this.handleChangeSearchPage : this.handleChangeListPage,
      setSelectedPractitioner,
    };

    const viewComponentProps = {
      onSearch: this.handleSearch,
      onPractitionerSelect: this.props.onPractitionerSelect,
      isOcpAdminRole: user.role === OCP_ADMIN_ROLE_CODE,
      flattenPractitionerData,
      practitionersData,
      ...rest,
    };
    const Component = this.props.component;
    return (
      <Component {...viewComponentProps} />
    );
  }
}

Practitioners.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func]).isRequired,
  pageSize: PropTypes.number,
  onPractitionerSelect: PropTypes.func,
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    active: PropTypes.bool,
    name: PropTypes.string,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      stateCode: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
      use: PropTypes.string,
    })),
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }),
  practitioners: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    result: PropTypes.array,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
  getPractitionersInOrganization: PropTypes.func.isRequired,
  setSelectedPractitioner: PropTypes.func.isRequired,
  searchPractitioners: PropTypes.func.isRequired,
  initializePractitioners: PropTypes.func,
  location: PropTypes.object.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
};

Practitioners.defaultProps = {
  component: DefaultViewComponent,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  practitioners: makeSelectPractitioners(),
  location: makeSelectLocation(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    setSelectedPractitioner: (practitioner) => dispatch(setPractitioner(practitioner)),
    initializePractitioners: () => dispatch(initializePractitioners()),
    getPractitionersInOrganization: (currentPage, pageSize) => dispatch(getPractitionersInOrganization(currentPage, pageSize)),
    searchPractitioners: (searchType, searchValue, includeInactive, currentPage, organization) => dispatch(searchPractitioners(searchType, searchValue, includeInactive, currentPage, organization)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitioners', reducer });
const withSaga = injectSaga({ key: 'practitioners', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Practitioners);
