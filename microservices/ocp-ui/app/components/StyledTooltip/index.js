/**
 *
 * StyledTooltip
 *
 */

import styled from 'styled-components';
import Tooltip from 'material-ui-next/Tooltip';
import PropTypes from 'prop-types';

const placements = ['bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'];
const StyledTooltip = styled(Tooltip).attrs({
  placement: (props) => props.placement || 'top',
})('');

StyledTooltip.propTypes = {
  placement: PropTypes.oneOf(placements),
};

export default StyledTooltip;
