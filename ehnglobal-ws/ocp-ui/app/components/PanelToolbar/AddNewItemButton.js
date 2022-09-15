/**
 *
 * AddNewItemButton
 *
 */

import StyledFlatButton from 'components/StyledFlatButton';
import { createPanelToolbarBaseStyleComponent } from './PanelUtils';

const AddNewItemButton = createPanelToolbarBaseStyleComponent(StyledFlatButton);

AddNewItemButton.propTypes = {};

AddNewItemButton.defaultProps = {
  color: 'secondary',
  fontSize: '12px',
  fontWeight: 'normal',
};
export default AddNewItemButton;
