/**
 *
 * PanelToolbar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { ToolbarGroup } from 'material-ui/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import common from 'material-ui-next/colors/common';

import sizeMeHOC from 'utils/SizeMeUtils';
import StyledTooltip from 'components/StyledTooltip';
import StyledIconButton from 'components/StyledIconButton';
import StickyDiv from 'components/StickyDiv';
import SearchBar from 'components/SearchBar';
import StyledToolbar from 'components/StyledToolbar';
import messages from './messages';

const white = common.white;

export class PanelToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchBar: props.showSearchBarByDefault,
    };
    this.handleShowSearchBar = this.handleShowSearchBar.bind(this);
  }

  handleShowSearchBar() {
    this.setState({ isShowSearchBar: !this.state.isShowSearchBar });
    this.setState({ isShowFilter: false });
  }

  renderPanelToolBar() {
    const {
      showSearchIcon,
      onSearch,
      searchField,
      showToDoSpecificFilters,
      hideToolbar,
    } = this.props;
    return (
      <div>
        {!hideToolbar &&
        <StyledToolbar color="#91AAB3" height="20px">
          <ToolbarGroup firstChild />
          <ToolbarGroup lastChild>
            {showSearchIcon &&
            <StyledTooltip
              title={this.state.isShowSearchBar ?
                <FormattedMessage {...messages.cancelSearch} /> :
                <FormattedMessage {...messages.search} />}
            >
              <StyledIconButton svgIconSize="small" onClick={this.handleShowSearchBar}>
                {this.state.isShowSearchBar ?
                  <CancelIcon color={white} /> : <SearchIcon color={white} />
                }
              </StyledIconButton>
            </StyledTooltip>
            }
          </ToolbarGroup>
        </StyledToolbar>}
        {this.state.isShowSearchBar &&
        <SearchBar
          onSearch={onSearch}
          searchField={searchField}
          showToDoSpecificFilters={showToDoSpecificFilters}
        />
        }
      </div>
    );
  }

  render() {
    const {
      sticky,
    } = this.props;
    let renderContent = (
      <div>{this.renderPanelToolBar()}</div>
    );
    if (sticky) {
      renderContent = (
        <StickyDiv>{this.renderPanelToolBar()}</StickyDiv>
      );
    }

    return renderContent;
  }
}

PanelToolbar.propTypes = {
  sticky: PropTypes.bool,
  showToDoSpecificFilters: PropTypes.bool,
  showSearchIcon: PropTypes.bool,
  showSearchBarByDefault: PropTypes.bool,
  onSearch: PropTypes.func,
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })),
    searchValueHintText: PropTypes.node.isRequired,
  }),
  hideToolbar: PropTypes.bool,
};

PanelToolbar.defaultProps = {
  sticky: true,
  showSearchIcon: true,
  showSearchBarByDefault: false,
  showToDoSpecificFilters: false,
  hideToolbar: false,
};

export default sizeMeHOC(PanelToolbar);
