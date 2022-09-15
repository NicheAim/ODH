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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { getPractitioners, initializePractitioners, searchPractitioners } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectPractitioners from './selectors';
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
    this.props.getPractitioners(DEFAULT_START_PAGE_NUMBER, this.props.pageSize);
  }

  handleSearch(searchValue, includeInactive, searchType) {
    this.setState({
      isShowSearchResult: true,
      searchPractitioners: { searchType, searchValue, includeInactive },
    });
    this.props.searchPractitioners(searchType, searchValue, includeInactive, this.state.searchPractitioners.currentPage);
  }

  handleChangeSearchPage(currentPage) {
    this.props.searchPractitioners(this.state.searchPractitioners.searchType, this.state.searchPractitioners.searchValue, this.state.searchPractitioners.includeInactive, currentPage);
  }

  handleChangeListPage(currentPage) {
    this.props.getPractitioners(currentPage, this.props.pageSize);
  }

  render() {
    const { practitioners, ...rest } = this.props;
    const practitionersData = {
      loading: practitioners.loading,
      data: practitioners.data,
      currentPage: practitioners.currentPage,
      totalNumberOfPages: practitioners.totalNumberOfPages,
      currentPageSize: practitioners.currentPageSize,
      totalElements: practitioners.totalElements,
      handleChangePage: this.state.isShowSearchResult ? this.handleChangeSearchPage : this.handleChangeListPage,
    };

    const viewComponentProps = {
      onSearch: this.handleSearch,
      onPractitionerSelect: this.props.onPractitionerSelect,
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
  getPractitioners: PropTypes.func.isRequired,
  searchPractitioners: PropTypes.func.isRequired,
  initializePractitioners: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  practitioners: makeSelectPractitioners(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializePractitioners: () => dispatch(initializePractitioners()),
    getPractitioners: (currentPage, pageSize) => dispatch(getPractitioners(currentPage, pageSize)),
    searchPractitioners: (searchType, searchValue, includeInactive, currentPage) => dispatch(searchPractitioners(searchType, searchValue, includeInactive, currentPage)),
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
