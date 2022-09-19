/**
 *
 * StyledStepper
 *
 */

import styled from 'styled-components';
import Stepper from 'material-ui-next/Stepper';
import teal from 'material-ui-next/colors/teal';

const StyledStepper = styled(Stepper)`
  && svg {
    color: #3275c1;
  }
`;

StyledStepper.propTypes = {};

export default StyledStepper;
