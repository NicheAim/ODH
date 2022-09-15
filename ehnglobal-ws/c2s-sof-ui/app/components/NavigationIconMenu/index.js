/**
 *
 * NavigationIconMenu
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu, { MenuItem } from 'material-ui-next/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import uniqueId from 'lodash/uniqueId';
import isUndefined from 'lodash/isUndefined';

import StyledIconButton from 'components/StyledIconButton';

class NavigationIconMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const { menuItems } = this.props;
    return (
      <div>
        <StyledIconButton size="x-small" onClick={this.handleClick}>
          <MoreHorizIcon />
        </StyledIconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {menuItems.map((menuItem) => (
            menuItem &&
            <MenuItem
              key={uniqueId()}
              disabled={menuItem.disabled || false}
              onClick={() => {
                this.handleClose();
                if (!isUndefined(menuItem.onClick)) {
                  menuItem.onClick();
                }
              }}
              component={menuItem.linkTo ? Link : null}
              to={menuItem.linkTo}
            >
              {menuItem.primaryText}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

NavigationIconMenu.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      primaryText: PropTypes.node.isRequired,
      onClick: PropTypes.func,
      linkTo: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          pathname: PropTypes.string,
          search: PropTypes.string,
        }),
      ]),
      disabled: PropTypes.bool,
    })).isRequired,
};

export default NavigationIconMenu;
