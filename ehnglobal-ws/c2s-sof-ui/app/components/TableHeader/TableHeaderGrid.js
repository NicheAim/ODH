import { Grid } from 'styled-css-grid';

const TableHeaderGrid = Grid.extend`
  border-bottom: 2px outset #000;

  &:first-child {
    background-color: #fff;
    font-size: 20px;
  }

  &:nth-child(odd) {
    background-color: #fff;
  }
`;

TableHeaderGrid.propTypes = {};

export default TableHeaderGrid;
