/**
 *
 * StyledDrawer
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Drawer from 'material-ui-next/Drawer';

const StyledDrawer = styled(({ hideBackdrop, width, margin, ...other }) => (
  <Drawer ModalProps={{ hideBackdrop }} {...other} classes={{ paper: 'paper' }} />
))`
  & .paper {
    width: ${(props) => props.width};
    margin: ${(props) => props.margin};
    border: 1px solid rgba(121, 121, 121, 1);
    background-color: rgba(242, 242, 242, 1);
    box-shadow: -5px -5px 5px rgba(0, 0, 0, 0.35);
  }
`;

StyledDrawer.propTypes = {
  hideBackdrop: PropTypes.bool,
  width: PropTypes.string,
  margin: PropTypes.string,
};

StyledDrawer.defaultProps = {
  hideBackdrop: false,
  width: '768px',
  margin: '0px',
};

export default StyledDrawer;
