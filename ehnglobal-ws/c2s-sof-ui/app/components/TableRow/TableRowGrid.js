import { Grid } from 'styled-css-grid';

const TableRowGrid = Grid.extend`
  border-bottom: 1px outset rgb(51, 51, 51);

  &:nth-child(odd) {
    background-color: #fff;
  }

  &:first-child {
    background-color: #fff;
    font-size: 20px;
  }

  &:hover {
    background-color: #dce4ef;
    cursor: pointer;
  }

  &:focus {
    background-color: #93b9ea;
  }
`;

TableRowGrid.propTypes = {};

export default TableRowGrid;
