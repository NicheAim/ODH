/**
 *
 * SelectActorsButton
 *
 */

import StyledRaisedButton from 'components/StyledRaisedButton';
import common from 'material-ui-next/colors/common';
import teal from 'material-ui-next/colors/teal';

const SelectActorsButton = StyledRaisedButton.extend`
  && {
    background-color: rgba(238, 238, 238, 1);
    color: ${teal['500']};
    font-size: 13px;
    height: 50px;
    border: 1px solid rgba(0, 153, 153, 1);
  }

  &&:hover {
    background-color: ${teal['500']};
    color: ${common.white};
  }

  &&:disabled {
    color: rgba(0, 0, 0, 0.3);
  }
`;

export default SelectActorsButton;
