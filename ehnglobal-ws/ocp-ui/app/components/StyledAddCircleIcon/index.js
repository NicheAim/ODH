/**
 *
 * StyledAddCircleIcon
 *
 */

import styled from 'styled-components';
import AddCircle from '@material-ui/icons/AddCircle';


const StyledAddCircleIcon = styled(AddCircle).attrs({
  style: {
    width: '30px',
    height: '23px',
  },
})('');

StyledAddCircleIcon.propTypes = {};

export default StyledAddCircleIcon;
