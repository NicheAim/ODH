/**
*
* FormGrid
*
*/

import { Grid } from 'styled-css-grid';

const FormGrid = Grid.extend`
  color: #000;
  width: auto;
  padding-left: 0.5vw;
  margin: 0 1vw;

  /* grid specific properties */
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
`;

FormGrid.propTypes = {};

export default FormGrid;
