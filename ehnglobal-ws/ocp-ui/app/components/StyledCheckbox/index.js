/**
 *
 * StyledCheckbox
 *
 */

import styled from 'styled-components';
import { Checkbox } from 'material-ui';


const StyledCheckbox = styled(Checkbox).attrs({
  labelStyle: {
    left: '-10px',
  },
})('');

export default StyledCheckbox;
