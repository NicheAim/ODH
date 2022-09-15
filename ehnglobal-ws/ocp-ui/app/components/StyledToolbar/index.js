/**
 *
 * StyledToolbar
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Toolbar } from 'material-ui/Toolbar';

const StyledToolbar = styled(Toolbar)`
  background-color: ${(props) => props.color || '#fff'} !important;
  height: ${(props) => props.height || '50px'} !important;
`;

StyledToolbar.propTypes = {
  color: PropTypes.string,
  height: PropTypes.string,
};

export default StyledToolbar;
