/**
 *
 * Locations
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Cell } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import { flattenLocationData, mapToIdentifiers } from 'containers/App/helpers';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER, MANAGE_LOCATION_URL, ORGANIZATION_ADMIN_ROLE_CODE } from 'containers/App/constants';
import { makeSelectLocation, makeSelectOrganization } from 'containers/App/contextSelectors';
import { clearLocation, setLocation } from 'containers/App/contextActions';
import LocationTable from 'components/LocationTable';
import StatusCheckbox from 'components/StatusCheckbox';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import FilterSection from 'components/FilterSection';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import StyledFlatButton from 'components/StyledFlatButton';
import PanelToolbar from 'components/PanelToolbar';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import {
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectIncludeInactive,
  makeSelectIncludeSuspended,
  makeSelectLocations,
  makeSelectTotalElements,
  makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getActiveLocations, getFilteredLocations, initializeLocations, searchLocations } from './actions';

export class Locations extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static initalState = {
    panelHeight: 0,
    filterHeight: 0,
    isShowSearchResult: false,
    listLocations: {
      currentPage: 1,
    },
    searchLocations: {
      currentPage: 1,
      searchValue: '',
      includeInactive: false,
      searchType: 'name',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      ...Locations.initalState,
    };
    this.onSize = this.onSize.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
    this.handleIncludeInactive = this.handleIncludeInactive.bind(this);
    this.handleIncludeSuspended = this.handleIncludeSuspended.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
  }

  componentDidMount() {
    this.props.initializeLocations();
    const { organization } = this.props;
    if (organization) {
      this.props.getActiveLocations(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organization } = this.props;
    const { organization: newOrganization } = nextProps;
    if (!isEqual(organization, newOrganization)) {
      this.props.getActiveLocations(1);
      this.setState([...Locations.initalState]);
    }
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  handleSearch(searchValue, includeInactive, searchType) {
    this.setState({
      searchLocations: { searchValue, includeInactive, searchType },
      isShowSearchResult: true,
    });
    this.props.searchLocations(searchValue, includeInactive, searchType, DEFAULT_START_PAGE_NUMBER);
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handleFilterResize(size) {
    this.setState({ filterHeight: size.height });
  }

  handleRowClick(location) {
    const { onLocationClick } = this.props;
    if (onLocationClick) {
      onLocationClick(location);
    } else {
      this.props.setLocation(location);
    }
  }

  handleIncludeInactive(event, checked) {
    this.props.onCheckIncludeInactive(event, checked, this.props.includeSuspended);
  }

  handleIncludeSuspended(event, checked) {
    this.props.onCheckIncludeSuspended(event, checked, this.props.includeInactive);
  }

  handleListPageClick(currentPage) {
    this.props.onChangePage(currentPage, this.props.includeInactive, this.props.includeSuspended);
  }

  handleSearchPageClick(currentPage) {
    this.props.searchLocations(this.state.searchLocations.searchValue, this.state.searchLocations.includeInactive, this.state.searchLocations.searchType, currentPage);
  }

  renderActionSection() {
    return (
      <SizedStickyDiv onSize={this.handleFilterResize} top={`${this.state.panelHeight}px`}>
        <InfoSection margin="0px">
          <div>
            {this.state.isShowSearchResult ? 'Search' : 'The'}&nbsp;
            <FormattedMessage {...messages.locations} /> for &nbsp;
            <InlineLabel htmlFor={this.ORGANIZATION_NAME_HTML_ID}>
              <span id={this.ORGANIZATION_NAME_HTML_ID}>
                {this.props.organization ? this.props.organization.name : ''}&nbsp;
              </span>
            </InlineLabel>
            are :
          </div>
        </InfoSection>
        {this.props.location &&
        <InfoSection margin="0px" width="fit-content" maxWidth="500px">
          <StyledFlatButton onClick={this.props.clearLocation}>
            Clear
          </StyledFlatButton>
        </InfoSection>
        }
        {!this.state.isShowSearchResult &&
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
                handleCheck={this.handleIncludeInactive}
              />
            </Cell>
            <Cell>
              <StatusCheckbox
                messages={messages.suspended}
                elementId="suspendedCheckBox"
                checked={this.props.includeSuspended}
                handleCheck={this.handleIncludeSuspended}
              />
            </Cell>
          </CheckboxFilterGrid>
        </FilterSection>
        }
      </SizedStickyDiv>
    );
  }

  render() {
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_LOCATION_URL,
    };
    const { data, currentPage, totalNumberOfPages, totalElements, currentPageSize, showSearchBarByDefault, hideToolbar } = this.props;
    const locationTableData = {
      data,
      currentPage,
      totalNumberOfPages,
      totalElements,
      currentPageSize,
      handlePageChange: this.state.isShowSearchResult ? this.handleSearchPageClick : this.handleListPageClick,
    };
    return (
      <div>
        {this.props.showActionSection &&
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={ORGANIZATION_ADMIN_ROLE_CODE}
          onSearch={this.handleSearch}
          onSize={this.handlePanelResize}
          showFilterIcon={false}
          showUploadIcon={false}
          showSearchIcon={false}
          showSettingIcon={false}
          showSearchBarByDefault={showSearchBarByDefault}
          hideToolbar={hideToolbar}
        />
        }
        {this.props.showActionSection && this.renderActionSection()}
        <LocationTable
          relativeTop={this.state.panelHeight + this.state.filterHeight}
          locationTableData={locationTableData}
          handleRowClick={this.handleRowClick}
          flattenLocationData={flattenLocationData}
          mapToIdentifiers={mapToIdentifiers}
        />
      </div>);
  }
}

Locations.propTypes = {
  onCheckIncludeInactive: PropTypes.func.isRequired,
  onCheckIncludeSuspended: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initializeLocations: PropTypes.func.isRequired,
  getActiveLocations: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  clearLocation: PropTypes.func.isRequired,
  showActionSection: PropTypes.bool,
  data: PropTypes.array,
  organization: PropTypes.object,
  location: PropTypes.object,
  currentPage: PropTypes.number,
  totalNumberOfPages: PropTypes.number,
  totalElements: PropTypes.number,
  currentPageSize: PropTypes.number,
  includeInactive: PropTypes.bool,
  includeSuspended: PropTypes.bool,
  searchLocations: PropTypes.func,
  onLocationClick: PropTypes.func,
  showSearchBarByDefault: PropTypes.bool,
  hideToolbar: PropTypes.bool,
};

Locations.defaultProps = {
  showActionSection: true,
  showSearchBarByDefault: false,
  hideToolbar: false,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectLocations(),
  organization: makeSelectOrganization(),
  location: makeSelectLocation(),
  currentPage: makeSelectCurrentPage(),
  totalNumberOfPages: makeSelectTotalNumberOfPages(),
  currentPageSize: makeSelectCurrentPageSize(),
  totalElements: makeSelectTotalElements(),
  includeInactive: makeSelectIncludeInactive(),
  includeSuspended: makeSelectIncludeSuspended(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCheckIncludeInactive: (evt, checked, includeSuspended) => {
      const currentPage = 1;
      dispatch(getFilteredLocations(currentPage, checked, includeSuspended));
    },
    onCheckIncludeSuspended: (evt, checked, includeInactive) => {
      const currentPage = 1;
      dispatch(getFilteredLocations(currentPage, includeInactive, checked));
    },
    onChangePage: (currentPage, includeInactive, includeSuspended) => dispatch(getFilteredLocations(currentPage, includeInactive, includeSuspended)),
    initializeLocations: () => dispatch(initializeLocations()),
    getActiveLocations: (currentPage) => dispatch(getActiveLocations(currentPage)),
    setLocation: (location) => dispatch(setLocation(location)),
    clearLocation: () => dispatch(clearLocation()),
    searchLocations: (searchValue, includeInactive, searchType, currentPage) =>
      dispatch(searchLocations(searchValue, includeInactive, searchType, currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'locations', reducer });
const withSaga = injectSaga({ key: 'locations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Locations);
