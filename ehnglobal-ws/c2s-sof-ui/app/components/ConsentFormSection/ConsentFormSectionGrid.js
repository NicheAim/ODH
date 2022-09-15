import { Grid } from 'styled-css-grid';
import common from 'material-ui-next/colors/common';

const ConsentFormSectionGrid = Grid.extend`
  margin-top: 10px;
  background-color: ${common.white};
  border-radius: 5px;
  border: 1px solid rgba(0, 153, 153, 1);
`;


ConsentFormSectionGrid.propTypes = {};

export default ConsentFormSectionGrid;
