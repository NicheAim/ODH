import { Grid } from 'styled-css-grid';

const LayoutGrid = Grid.extend`
  position: absolute;
  width: 100%;
  color: #000;
  margin: 0 auto;
  grid-row-gap: 2px;
`;

LayoutGrid.propTypes = {
  ...(Grid.propTypes || {}),
};

export default LayoutGrid;
