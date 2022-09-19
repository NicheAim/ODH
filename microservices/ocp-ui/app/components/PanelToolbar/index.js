/**
 *
 * PanelToolbar
 *
 */

import AddCircle from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import FilterIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import FilterBar from 'components/FilterBar';
import SearchBar from 'components/SearchBar';
import StickyDiv from 'components/StickyDiv';
import StyledIconButton from 'components/StyledIconButton';
import StyledToolbar from 'components/StyledToolbar';
import StyledTooltip from 'components/StyledTooltip';
import ShowHideWrapper, { functionalRoles } from 'containers/ShowHideWrapper';
import isUndefined from 'lodash/isUndefined';
import { ToolbarGroup } from 'material-ui/Toolbar';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import sizeMeHOC from 'utils/SizeMeUtils';
import AddNewItemButton from './AddNewItemButton';
import AddNewItemSpan from './AddNewItemSpan';
import messages from './messages';

export class PanelToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchBar: props.showSearchBarByDefault,
      isShowFilter: false,
    };
    this.handleShowSearchBar = this.handleShowSearchBar.bind(this);
    this.handleShowFilter = this.handleShowFilter.bind(this);
  }

  handleShowFilter() {
    this.setState({ isShowFilter: !this.state.isShowFilter });
    this.setState({ isShowSearchBar: false });
  }

  handleShowSearchBar() {
    this.setState({ isShowSearchBar: !this.state.isShowSearchBar });
    this.setState({ isShowFilter: false });
  }

  renderPanelToolBar() {
    const {
      allowedAddNewItemRoles,
      showUploadIcon,
      showSettingIcon,
      showFilterIcon,
      showSearchIcon,
      customNewButton,
      addNewItem,
      onSearch,
      searchField,
      showToDoSpecificFilters,
      showUserRegistrationRoleSelection,
      showPatientSpecificFilters,
      showAppointmentSpecificFilters,
      showTaskSpecificFilters,
      onFilter,
      filterField,
      hideToolbar,
    } = this.props;
    return (
      <div>
        {!hideToolbar && (
          <StyledToolbar color="#e3e8ea" height="30px">
            <ToolbarGroup firstChild>
              {!isUndefined(customNewButton) &&
                customNewButton &&
                Array.isArray(customNewButton) &&
                customNewButton.length > 0 &&
                customNewButton.map((item) => {
                  return item
                })}
              {!isUndefined(addNewItem) && addNewItem.linkUrl && (
                <ShowHideWrapper allowedRoles={allowedAddNewItemRoles}>
                  <AddNewItemButton component={Link} to={addNewItem.linkUrl}>
                    <StyledIconButton
                      size="x-small"
                      svgIconSize="small"
                      disableIconHover
                      aria-label={'Add icon'}
                    >
                      <AddCircle color={'#3275c1'} />
                    </StyledIconButton>
                    {addNewItem.labelName}
                  </AddNewItemButton>
                </ShowHideWrapper>
              )}
              {!isUndefined(addNewItem) && addNewItem.onClick && (
                <ShowHideWrapper allowedRoles={allowedAddNewItemRoles}>
                  <AddNewItemSpan onClick={addNewItem.onClick}>
                    <StyledIconButton
                      size="x-small"
                      svgIconSize="small"
                      disableIconHover
                    >
                      <AddCircle color={'#3275c1'} />
                    </StyledIconButton>
                    {addNewItem.labelName}
                  </AddNewItemSpan>
                </ShowHideWrapper>
              )}
            </ToolbarGroup>
            <ToolbarGroup lastChild>
              {showUploadIcon && (
                <StyledTooltip
                  title={<FormattedMessage {...messages.uploadFiles} />}
                >
                  <StyledIconButton svgIconSize="small">
                    <FileUploadIcon color={'#3275c1'} />
                  </StyledIconButton>
                </StyledTooltip>
              )}
              {showSettingIcon && (
                <StyledTooltip
                  title={<FormattedMessage {...messages.settings} />}
                >
                  <StyledIconButton svgIconSize="small">
                    <SettingsIcon color={'#3275c1'} />
                  </StyledIconButton>
                </StyledTooltip>
              )}
              {showFilterIcon && (
                <StyledTooltip
                  title={
                    this.state.isShowFilter ? (
                      <FormattedMessage {...messages.cancelFilter} />
                    ) : (
                      <FormattedMessage {...messages.filter} />
                    )
                  }
                >
                  <StyledIconButton
                    svgIconSize="small"
                    onClick={this.handleShowFilter}
                    aria-label={'filter icon'}
                  >
                    {this.state.isShowFilter ? (
                      <CancelIcon color={'#3275c1'} />
                    ) : (
                      <FilterIcon color={'#3275c1'} />
                    )}
                  </StyledIconButton>
                </StyledTooltip>
              )}
              {showSearchIcon && (
                <StyledTooltip
                  title={
                    this.state.isShowSearchBar ? (
                      <FormattedMessage {...messages.cancelSearch} />
                    ) : (
                      <FormattedMessage {...messages.search} />
                    )
                  }
                >
                  <StyledIconButton
                    svgIconSize="small"
                    onClick={this.handleShowSearchBar}
                    aria-label={'search magnifying glass icon'}
                  >
                    {this.state.isShowSearchBar ? (
                      <CancelIcon color={'#3275c1'} />
                    ) : (
                      <SearchIcon color={'#3275c1'} />
                    )}
                  </StyledIconButton>
                </StyledTooltip>
              )}
            </ToolbarGroup>
          </StyledToolbar>
        )}
        {this.state.isShowSearchBar && (
          <SearchBar
            onSearch={onSearch}
            minimumLength={0}
            searchField={searchField}
            showToDoSpecificFilters={showToDoSpecificFilters}
            showUserRegistrationRoleSelection={
              showUserRegistrationRoleSelection
            }
          />
        )}
        {this.state.isShowFilter && (
          <FilterBar
            onFilter={onFilter}
            filterField={filterField}
            showFilter={
              showToDoSpecificFilters ||
              showPatientSpecificFilters ||
              showAppointmentSpecificFilters ||
              showTaskSpecificFilters
            }
          />
        )}
      </div>
    );
  }

  render() {
    const { sticky } = this.props;
    let renderContent = <div>{this.renderPanelToolBar()}</div>;
    if (sticky) {
      renderContent = <StickyDiv>{this.renderPanelToolBar()}</StickyDiv>;
    }

    return renderContent;
  }
}

PanelToolbar.propTypes = {
  sticky: PropTypes.bool,
  customNewButton: PropTypes.arrayOf(PropTypes.element),
  allowedAddNewItemRoles: PropTypes.oneOfType([
    PropTypes.oneOf(functionalRoles).isRequired,
    PropTypes.arrayOf(PropTypes.oneOf(functionalRoles).isRequired),
  ]),
  showToDoSpecificFilters: PropTypes.bool,
  showUserRegistrationRoleSelection: PropTypes.bool,
  showAppointmentSpecificFilters: PropTypes.bool,
  showPatientSpecificFilters: PropTypes.bool,
  showTaskSpecificFilters: PropTypes.bool,
  showUploadIcon: PropTypes.bool,
  showSettingIcon: PropTypes.bool,
  showFilterIcon: PropTypes.bool,
  showSearchIcon: PropTypes.bool,
  showSearchBarByDefault: PropTypes.bool,
  addNewItem: PropTypes.shape({
    labelName: PropTypes.node.isRequired,
    linkUrl: PropTypes.string,
    onClick: PropTypes.func,
  }),
  onSearch: PropTypes.func,
  onFilter: PropTypes.func,
  filterField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(
      PropTypes.shape({
        dateRangeCode: PropTypes.string.isRequired,
        display: PropTypes.node.isRequired,
      })
    ),
    filterValueHintText: PropTypes.node.isRequired,
  }),
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        display: PropTypes.node.isRequired,
      })
    ),
    resourceTypes: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        display: PropTypes.node.isRequired,
      })
    ),
    searchValueHintText: PropTypes.node.isRequired,
  }),
  hideToolbar: PropTypes.bool,
};

PanelToolbar.defaultProps = {
  sticky: true,
  customNewButton: undefined,
  addNewItem: undefined,
  showUploadIcon: true,
  showSettingIcon: true,
  showFilterIcon: true,
  showSearchIcon: true,
  showSearchBarByDefault: false,
  showFilter: true,
  showToDoSpecificFilters: false,
  showPatientSpecificFilters: false,
  showTaskSpecificFilters: false,
  hideToolbar: false,
};

export default sizeMeHOC(PanelToolbar);
