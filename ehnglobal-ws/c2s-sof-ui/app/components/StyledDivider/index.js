/**
 *
 * StyledDivider
 *
 */

import styled from 'styled-components';
import Divider from 'material-ui/Divider';
import teal from 'material-ui-next/colors/teal';


const teal500 = teal['500'];

const StyledDivider = styled(Divider).attrs({
  style: {
    backgroundColor: teal500,
    height: '3px',
  },
})('');

StyledDivider.propTypes = {};

export default StyledDivider;
