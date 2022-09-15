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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { initializePractitioners } from 'containers/Practitioners/actions';
import makeSelectOrganizations from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getOrganizations, initializeOrganizations, searchOrganizations } from './actions';
import { flattenOrganizationData } from './helpers';

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
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
  }

  componentDidMount() {
    this.props.initializeOrganizations();
    this.props.getOrganizations(DEFAULT_START_PAGE_NUMBER, this.props.pageSize);
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
      onOrganizationClick: this.props.onOrganizationClick,
      flattenOrganizationData,
      organizationData,
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
  initializeOrganizations: PropTypes.func.isRequired,
  initializePractitioners: PropTypes.func,
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
  showSearchBarByDefault: false,
  hideToolbar: false,
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeOrganizations: (organizations) => dispatch(initializeOrganizations(organizations)),
    initializePractitioners: () => dispatch(initializePractitioners()),
    getOrganizations: (currentPage, pageSize) => dispatch(getOrganizations(currentPage, pageSize)),
    searchOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(searchOrganizations(searchValue, showInactive, searchType, currentPage)),
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
