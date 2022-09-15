/**
 *
 * NavigationButton
 *
 */

import styled from 'styled-components';
import StyledFlatButton from 'components/StyledFlatButton';

const NavigationButton = styled(StyledFlatButton)`
  && {
    color: #000;
    font-size: 12px;
    max-height: 32px;
    padding: 0;
    font-weight: normal;
    margin-left: 5px;
  }

  &&:hover {
    border-bottom: 2px solid #557b7b;
    background: transparent;
    border-radius: 0;
    padding: 0;
    margin-left: 5px;
  }
`;

NavigationButton.propTypes = {};

export default NavigationButton;
