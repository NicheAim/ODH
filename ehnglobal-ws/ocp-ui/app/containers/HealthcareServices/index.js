/**
 *
 * HealthcareServices
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import { Cell } from 'styled-css-grid';

import RecordsRange from 'components/RecordsRange';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import HealthcareServiceTable from 'components/HealthcareServiceTable';
import StatusCheckbox from 'components/StatusCheckbox';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import FilterSection from 'components/FilterSection';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import PanelToolbar from 'components/PanelToolbar';
import { makeSelectLocation, makeSelectOrganization } from 'containers/App/contextSelectors';
import {
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_HEALTHCARE_SERVICE_URL,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
} from 'containers/App/constants';
import { getHealthcareServices, initializeHealthcareServices, searchHealthcareServices } from './actions';
import {
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectHealthcareServices,
  makeSelectIncludeInactive,
  makeSelectQueryError,
  makeSelectQueryLoading,
  makeSelectTotalElements,
  makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { flattenHealthcareServiceData } from './helpers';

export class HealthcareServices extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static initalState = {
    relativeTop: 0,
    panelHeight: 0,
    filterHeight: 0,
    currentPage: 1,
    isShowSearchResult: false,
    listHealthcareServices: {
      currentPage: 1,
    },
    searchHealthcareServices: {
      currentPage: 1,
      searchValue: '',
      includeInactive: false,
      searchType: 'name',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      ...HealthcareServices.initalState,
    };
    this.onSize = this.onSize.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
    this.LOCATION_NAME_HTML_ID = uniqueId('location_name_');
  }

  componentDidMount() {
    this.props.initializeHealthcareServices();
    const { organization, location } = this.props;
    if (organization || (organization && location)) {
      this.props.getHealthcareServices(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organization, location } = this.props;
    const { organization: newOrganization, location: newLocation } = nextProps;
    if (!isEqual(organization, newOrganization) || !isEqual(location, newLocation)) {
      this.props.getHealthcareServices(1);
      this.setState({ ...HealthcareServices.initalState });
    }
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  handleSearch(searchValue, includeInactive, searchType) {
    this.setState({
      searchHealthcareServices: { searchValue, includeInactive, searchType },
      isShowSearchResult: true,
    });
    this.props.searchHealthcareServices(searchValue, includeInactive, searchType, DEFAULT_START_PAGE_NUMBER);
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handleFilterResize(size) {
    this.setState({ filterHeight: size.height });
  }

  handleListPageClick(currentPage) {
    this.props.getHealthcareServices(currentPage, this.props.includeInactive);
  }

  handleSearchPageClick(currentPage) {
    this.props.searchHealthcareServices(this.state.searchHealthcareServices.searchValue, this.state.searchHealthcareServices.includeInactive, this.state.searchHealthcareServices.searchType, currentPage);
  }

  handleCheck(event, checked) {
    this.props.getHealthcareServices(DEFAULT_START_PAGE_NUMBER, checked);
  }

  render() {
    const { loading, healthcareServices, organization, location, showActionSection } = this.props;
    let CREATE_HEALTHCARE_SERVICE_URL = '';
    if (organization) {
      CREATE_HEALTHCARE_SERVICE_URL = `${MANAGE_HEALTHCARE_SERVICE_URL}`;
    }
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: CREATE_HEALTHCARE_SERVICE_URL,
    };
    let healthcareServicesData = {
      handlePageClick: this.handleListPageClick,
    };
    if (this.state.isShowSearchResult) {
      healthcareServicesData = {
        handlePageClick: this.handleSearchPageClick,
      };
    }
    return (
      <div>
        {showActionSection &&
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={[ORGANIZATION_ADMIN_ROLE_CODE, OCP_ADMIN_ROLE_CODE]}
          onSearch={this.handleSearch}
          onSize={this.handlePanelResize}
          showFilterIcon={false}
          showUploadIcon={false}
          showSearchIcon={false}
          showSettingIcon={false}
        />
        }
        {showActionSection &&
        <SizedStickyDiv onSize={this.handleFilterResize} top={`${this.state.panelHeight}px`}>
          {!isEmpty(organization) &&
          <InfoSection margin="0px">
            {this.state.isShowSearchResult ? 'Search' : 'The'}&nbsp;
            <FormattedMessage {...messages.healthCareService} /> for &nbsp;
            <InlineLabel htmlFor={this.ORGANIZATION_NAME_HTML_ID}>
              <span id={this.ORGANIZATION_NAME_HTML_ID}>{organization.name}</span>&nbsp;
            </InlineLabel>
            {!isEmpty(location) &&
            <span>
              at the&nbsp;
              <InlineLabel htmlFor={this.LOCATION_NAME_HTML_ID}>
                <span id={this.LOCATION_NAME_HTML_ID}>{location.name}</span>&nbsp;
              </InlineLabel>
            </span>}
            are :
          </InfoSection>}
          {!this.state.isShowSearchResult && !isEmpty(organization) && isEmpty(location) &&
          <FilterSection>
            <CheckboxFilterGrid>
              <Cell>
                <FormattedMessage {...messages.filterLabel} />
              </Cell>
              <Cell>
                <StatusCheckbox
                  messages={messages.inactive}
                  elementId="inactiveCheckBox"
                  checked={this.props.includeInactive}
                  handleCheck={this.handleCheck}
                />
              </Cell>
            </CheckboxFilterGrid>
          </FilterSection>
          }
        </SizedStickyDiv>
        }

        {isEmpty(organization) &&
        <CenterAlign>
          <NoResultsFoundText>
            <FormattedMessage {...messages.organizationNotSelected} />
          </NoResultsFoundText>
        </CenterAlign>
        }

        {!loading && !isEmpty(organization) && isEmpty(healthcareServices) &&
          <NoResultsFoundText>
            <FormattedMessage {...messages.noHealthcareServicesFound} />
          </NoResultsFoundText>
        }

        {!isEmpty(organization) && !isEmpty(healthcareServices) && healthcareServices.length > 0 &&
        <div>
          <CenterAlign>
            <HealthcareServiceTable
              elements={healthcareServices}
              relativeTop={this.state.panelHeight + this.state.filterHeight}
              flattenHealthcareServiceData={flattenHealthcareServiceData}
            />
          </CenterAlign>

          <CenterAlignedUltimatePagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            onChange={healthcareServicesData.handlePageClick}
          />

          <RecordsRange
            currentPage={this.props.currentPage}
            totalPages={this.props.totalPages}
            totalElements={this.props.totalElements}
            currentPageSize={this.props.currentPageSize}
          />
        </div>
        }
      </div>
    );
  }
}

HealthcareServices.propTypes = {
  loading: PropTypes.bool,
  includeInactive: PropTypes.bool,
  showActionSection: PropTypes.bool,
  healthcareServices: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalElements: PropTypes.number,
  currentPageSize: PropTypes.number,
  initializeHealthcareServices: PropTypes.func,
  getHealthcareServices: PropTypes.func.isRequired,
  organization: PropTypes.object,
  location: PropTypes.object,
  searchHealthcareServices: PropTypes.func,
};

HealthcareServices.defaultProps = {
  showActionSection: true,
};

const mapStateToProps = createStructuredSelector({
  organization: makeSelectOrganization(),
  location: makeSelectLocation(),
  loading: makeSelectQueryLoading(),
  error: makeSelectQueryError(),
  currentPage: makeSelectCurrentPage(),
  totalPages: makeSelectTotalNumberOfPages(),
  totalElements: makeSelectTotalElements(),
  currentPageSize: makeSelectCurrentPageSize(),
  includeInactive: makeSelectIncludeInactive(),
  healthcareServices: makeSelectHealthcareServices(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeHealthcareServices: () => dispatch(initializeHealthcareServices()),
    getHealthcareServices: (currentPage, includeInactive) =>
      dispatch(getHealthcareServices(currentPage, includeInactive)),
    searchHealthcareServices: (searchValue, includeInactive, searchType, currentPage) =>
      dispatch(searchHealthcareServices(searchValue, includeInactive, searchType, currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'healthcareServices', reducer });
const withSaga = injectSaga({ key: 'healthcareServices', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HealthcareServices);
