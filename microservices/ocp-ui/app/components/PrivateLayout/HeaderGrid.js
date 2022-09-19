import { Grid } from 'styled-css-grid';

const HeaderGrid = Grid.extend`
  grid-row-gap: 0;
  grid-column-gap: 0;
  background-color: #fff;
`;

HeaderGrid.propTypes = {};

export default HeaderGrid;
